import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";

interface GitHubRepoInfo {
  default_branch: string;
}

export async function POST(request: NextRequest) {
  try {
    const { gitUrl, token } = await request.json();

    if (!gitUrl) {
      return NextResponse.json({ error: "请提供Git仓库URL" }, { status: 400 });
    }

    // 解析GitHub URL，支持仓库根目录和子目录
    // 支持格式：
    // https://github.com/owner/repo
    // https://github.com/owner/repo/tree/branch/path/to/directory
    // https://github.com/owner/repo/blob/branch/path/to/file
    const urlMatch = gitUrl.match(/github\.com\/([^/]+)\/([^/]+)(?:\/(?:tree|blob)\/([^/]+)(?:\/(.+))?)?/);
    if (!urlMatch) {
      return NextResponse.json(
        { error: "仅支持GitHub仓库URL" },
        { status: 400 },
      );
    }

    const [, owner, repo, branch, directory] = urlMatch;
    const cleanRepo = repo.replace(/\.git$/, "");
    
    // 如果URL包含文件路径（blob），提取目录部分
    let targetDirectory = directory;
    if (gitUrl.includes('/blob/') && directory) {
      // 对于文件URL，获取其所在目录
      const pathParts = directory.split('/');
      pathParts.pop(); // 移除文件名
      targetDirectory = pathParts.join('/');
    }

    // 设置请求头
    const headers: Record<string, string> = {
      "User-Agent": "Git-Download-Tool",
    };

    // 优先使用用户提供的token，否则使用服务端默认token
    const authToken = token || process.env.GITHUB_TOKEN;
    if (authToken) {
      headers["Authorization"] = `token ${authToken}`;
    }

    // 获取仓库信息以确定默认分支（如果用户没有指定分支）
    let targetBranch = branch;
    if (!targetBranch) {
      const repoInfoUrl = `https://api.github.com/repos/${owner}/${cleanRepo}`;
      const repoInfoResponse = await fetch(repoInfoUrl, { headers });

      if (!repoInfoResponse.ok) {
        if (repoInfoResponse.status === 404) {
          throw new Error("仓库不存在或无法访问");
        } else if (repoInfoResponse.status === 403) {
          const rateLimitRemaining = repoInfoResponse.headers.get(
            "X-RateLimit-Remaining",
          );
          const rateLimitReset =
            repoInfoResponse.headers.get("X-RateLimit-Reset");

          if (rateLimitRemaining === "0") {
            const resetTime = rateLimitReset
              ? new Date(parseInt(rateLimitReset) * 1000).toLocaleTimeString(
                  "zh-CN",
                )
              : "未知";
            throw new Error(
              `GitHub API频率限制已达上限，请在 ${resetTime} 后重试，或提供访问令牌以提高限制`,
            );
          } else {
            throw new Error("访问被拒绝，可能是私有仓库或需要访问令牌");
          }
        }
        throw new Error(`GitHub API错误: ${repoInfoResponse.status}`);
      }

      const repoInfo: GitHubRepoInfo = await repoInfoResponse.json();
      targetBranch = repoInfo.default_branch;
    }

    // 使用GitHub Archive API下载整个仓库
    const archiveUrl = `https://api.github.com/repos/${owner}/${cleanRepo}/zipball/${targetBranch}`;
    const response = await fetch(archiveUrl, {
      headers,
      redirect: "follow", // GitHub Archive API会返回302重定向
    });

    if (!response.ok) {
      if (response.status === 403) {
        const rateLimitRemaining = response.headers.get(
          "X-RateLimit-Remaining",
        );
        const rateLimitReset = response.headers.get("X-RateLimit-Reset");

        if (rateLimitRemaining === "0") {
          const resetTime = rateLimitReset
            ? new Date(parseInt(rateLimitReset) * 1000).toLocaleTimeString(
                "zh-CN",
              )
            : "未知";
          throw new Error(
            `GitHub API频率限制已达上限，请在 ${resetTime} 后重试，或提供访问令牌以提高限制`,
          );
        } else {
          throw new Error("访问被拒绝，可能是私有仓库或需要访问令牌");
        }
      }
      throw new Error(`GitHub API错误: ${response.status}`);
    }

    const zipBuffer = await response.arrayBuffer();

    // 如果没有指定目录，直接返回整个仓库的zip
    if (!targetDirectory) {
      const fileName = `${cleanRepo}.zip`;
      return new NextResponse(zipBuffer, {
        headers: {
          "Content-Type": "application/zip",
          "Content-Disposition": `attachment; filename="${fileName}"`,
          "Content-Length": zipBuffer.byteLength.toString(),
        },
      });
    }

    // 如果指定了目录，从整个仓库zip中提取指定目录的文件
    const originalZip = new JSZip();
    await originalZip.loadAsync(zipBuffer);

    const filteredZip = new JSZip();
    let foundFiles = false;

    // 遍历zip中的所有文件，查找匹配指定目录的文件
    originalZip.forEach((relativePath, file) => {
      // GitHub Archive API返回的zip文件中，所有文件都在一个以仓库名-分支名命名的根目录下
      // 例如：repo-main/src/components/Button.tsx
      const pathParts = relativePath.split("/");
      if (pathParts.length > 1) {
        // 移除根目录部分，获取实际的文件路径
        const actualPath = pathParts.slice(1).join("/");

        // 检查文件是否在指定目录下
        if (
          actualPath.startsWith(targetDirectory + "/") ||
          actualPath === targetDirectory
        ) {
          foundFiles = true;
          // 计算相对于指定目录的路径
          const relativeToDirPath =
            actualPath === targetDirectory
              ? pathParts[pathParts.length - 1] // 如果是目录本身的文件
              : actualPath.substring(targetDirectory.length + 1); // 移除目录前缀

          if (!file.dir && relativeToDirPath) {
            filteredZip.file(relativeToDirPath, file.async("arraybuffer"));
          }
        }
      }
    });

    if (!foundFiles) {
      return NextResponse.json(
        { error: "指定目录不存在或为空" },
        { status: 404 },
      );
    }

    // 生成过滤后的ZIP文件
    const filteredZipBuffer = await filteredZip.generateAsync({
      type: "arraybuffer",
    });

    // 生成文件名
    const fileName = `${cleanRepo}-${targetDirectory.replace(/\//g, "-")}.zip`;

    // 返回ZIP文件
    return new NextResponse(filteredZipBuffer, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": `attachment; filename="${fileName}"`,
        "Content-Length": filteredZipBuffer.byteLength.toString(),
      },
    });
  } catch (error) {
    console.error("Git下载错误:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "下载失败" },
      { status: 500 },
    );
  }
}
