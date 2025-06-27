// src/file.ts
var downloadFile = (url, fileName) => {
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
};
var formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};
export {
  downloadFile,
  formatBytes
};
