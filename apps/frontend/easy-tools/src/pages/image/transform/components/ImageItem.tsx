import { useDeviceDetect } from "@/hooks/useDeviceDetect";
import { formatFileSize } from "@/utils/imageProcessing";
import {
  DeleteOutlined,
  DownloadOutlined,
  ShareAltOutlined,
  SwapOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Progress,
  Row,
  Space,
  Spin,
  Tooltip,
  Typography,
} from "antd";
import React from "react";
import { ImageFile } from "../type";

const { Text, Title } = Typography;

interface ImageItemProps {
  imageFile: ImageFile;
  onDownload: (imageFile: ImageFile) => void;
  onShare?: (imageFile: ImageFile) => void;
  onDelete: (id: string) => void;
  onConvert?: (id: string) => void;
  onPreview?: (imageFile: ImageFile) => void;
}

const ImageItem: React.FC<ImageItemProps> = ({
  imageFile,
  onDownload,
  onShare,
  onDelete,
  onConvert,
  onPreview,
}) => {
  const { isMobile } = useDeviceDetect();
  const { id, name, preview, format, size, status, result } = imageFile;

  const sizeReduction = result ? Math.round((1 - result.size / size) * 100) : 0;

  return (
    <Card
      hoverable
      className="w-full mb-4 overflow-hidden"
      styles={{ body: { padding: isMobile ? "12px" : "16px" } }}
    >
      <Row gutter={[16, 16]} align="middle">
        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
          <div
            className={`relative w-full pb-[100%] overflow-hidden ${
              onPreview ? "cursor-pointer" : "cursor-default"
            }`}
            onClick={() => onPreview?.(imageFile)}
          >
            <img
              src={result?.preview || preview}
              alt={name}
              className={`absolute w-full h-full object-contain transition-all duration-300 ${
                status === "processing" ? "opacity-50" : "opacity-100"
              } ${onPreview ? "scale-100" : ""}`}
              onMouseEnter={(e) => {
                if (onPreview) {
                  e.currentTarget.classList.add("scale-[1.05]");
                }
              }}
              onMouseLeave={(e) => {
                if (onPreview) {
                  e.currentTarget.classList.remove("scale-[1.05]");
                }
              }}
            />

            {status === "processing" && (
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-10">
                <Spin size="large" />
              </div>
            )}
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Space direction="vertical" className="w-full">
            <Title level={isMobile ? 5 : 4} ellipsis className="mb-2">
              {name}
            </Title>

            <Text>格式: {format.toUpperCase()}</Text>
            <Text>大小: {formatFileSize(size)}</Text>

            {result && (
              <>
                <div className="flex items-center my-2">
                  <Text>{formatFileSize(size)}</Text>
                  <SwapOutlined className="mx-2" />
                  <Text>{formatFileSize(result.size)}</Text>
                  <Text
                    type={sizeReduction > 0 ? "success" : "danger"}
                    className="ml-2"
                  >
                    {sizeReduction > 0
                      ? `节省 ${sizeReduction}%`
                      : `增加 ${Math.abs(sizeReduction)}%`}
                  </Text>
                </div>

                <Text type="secondary">
                  新格式: {result.format.toUpperCase()}
                </Text>
              </>
            )}

            {status === "processing" && (
              <Progress percent={50} status="active" className="mt-2" />
            )}

            {status === "error" && (
              <Text type="danger" className="mt-2">
                {imageFile.error || "处理失败"}
              </Text>
            )}
          </Space>
        </Col>

        <Col xs={24} sm={24} md={6} lg={6} xl={6}>
          <Space
            direction={isMobile ? "horizontal" : "vertical"}
            className={`w-full ${isMobile ? "justify-center" : "justify-end"}`}
          >
            {onConvert && ["idle", "error"].includes(status) && (
              <Tooltip title="转换">
                <Button
                  type="primary"
                  icon={<SyncOutlined />}
                  onClick={() => onConvert(id)}
                  block={!isMobile}
                >
                  转换
                </Button>
              </Tooltip>
            )}

            {result && (
              <>
                <Tooltip title="下载">
                  <Button
                    type="primary"
                    icon={<DownloadOutlined />}
                    onClick={() => onDownload(imageFile)}
                    block={!isMobile}
                  >
                    下载
                  </Button>
                </Tooltip>

                {onShare && (
                  <Tooltip title="分享">
                    <Button
                      icon={<ShareAltOutlined />}
                      onClick={() => onShare(imageFile)}
                      block={!isMobile}
                    >
                      分享
                    </Button>
                  </Tooltip>
                )}
              </>
            )}

            <Tooltip title="删除">
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => onDelete(id)}
                block={!isMobile}
              >
                删除
              </Button>
            </Tooltip>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

export default ImageItem;
