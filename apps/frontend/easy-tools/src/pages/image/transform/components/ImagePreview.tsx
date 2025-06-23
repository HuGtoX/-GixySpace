import React from 'react';
import {
	Card,
	Button,
	Typography,
	Spin,
	Space,
	Progress,
	Row,
	Col,
	Tooltip
} from 'antd';
import {
	DownloadOutlined,
	ShareAltOutlined,
	DeleteOutlined,
	SwapOutlined,
	SyncOutlined
} from '@ant-design/icons';
import { useDeviceDetect } from '@/hooks/useDeviceDetect';
import { formatFileSize } from '@/utils/imageProcessing';
import { ImageFile } from '../type';

const { Text, Title } = Typography;

interface ImagePreviewProps {
	imageFile: ImageFile;
	onDownload: (imageFile: ImageFile) => void;
	onShare?: (imageFile: ImageFile) => void;
	onDelete: (id: string) => void;
	onConvert?: (id: string) => void; // 新增的单独转换函数
}

const ImagePreview: React.FC<ImagePreviewProps> = ({
	imageFile,
	onDownload,
	onShare,
	onDelete,
	onConvert
}) => {
	const { isMobile } = useDeviceDetect();
	const { id, name, preview, format, size, status, result } = imageFile;

	// 计算压缩/转换比例
	const sizeReduction = result ? Math.round((1 - result.size / size) * 100) : 0;

	return (
		<Card
			hoverable
			style={{
				width: '100%',
				marginBottom: '16px',
				overflow: 'hidden'
			}}
			bodyStyle={{ padding: isMobile ? '12px' : '16px' }}
		>
			<Row gutter={[16, 16]} align="middle">
				<Col xs={24} sm={24} md={6} lg={6} xl={6}>
					<div
						style={{
							position: 'relative',
							width: '100%',
							paddingBottom: '100%',
							overflow: 'hidden'
						}}
					>
						<img
							src={result?.preview || preview}
							alt={name}
							style={{
								position: 'absolute',
								width: '100%',
								height: '100%',
								objectFit: 'contain',
								transition: 'opacity 0.3s',
								opacity: status === 'processing' ? 0.5 : 1
							}}
						/>

						{status === 'processing' && (
							<div
								style={{
									position: 'absolute',
									top: 0,
									left: 0,
									width: '100%',
									height: '100%',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center',
									background: 'rgba(0, 0, 0, 0.1)'
								}}
							>
								<Spin size="large" />
							</div>
						)}
					</div>
				</Col>

				<Col xs={24} sm={24} md={12} lg={12} xl={12}>
					<Space direction="vertical" style={{ width: '100%' }}>
						<Title
							level={isMobile ? 5 : 4}
							ellipsis
							style={{ marginBottom: '8px' }}
						>
							{name}
						</Title>

						<Text>格式: {format.toUpperCase()}</Text>
						<Text>大小: {formatFileSize(size)}</Text>

						{result && (
							<>
								<div
									style={{
										display: 'flex',
										alignItems: 'center',
										marginTop: '8px',
										marginBottom: '8px'
									}}
								>
									<Text>{formatFileSize(size)}</Text>
									<SwapOutlined style={{ margin: '0 8px' }} />
									<Text>{formatFileSize(result.size)}</Text>
									<Text
										type={sizeReduction > 0 ? 'success' : 'danger'}
										style={{ marginLeft: '8px' }}
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

						{status === 'processing' && (
							<Progress
								percent={50}
								status="active"
								style={{ marginTop: '8px' }}
							/>
						)}

						{status === 'error' && (
							<Text type="danger" style={{ marginTop: '8px' }}>
								{imageFile.error || '处理失败'}
							</Text>
						)}
					</Space>
				</Col>

				<Col xs={24} sm={24} md={6} lg={6} xl={6}>
					<Space
						direction={isMobile ? 'horizontal' : 'vertical'}
						style={{
							width: '100%',
							justifyContent: isMobile ? 'center' : 'flex-end'
						}}
					>
						{/* 对未处理的文件显示转换按钮 */}
						{onConvert && ['idle', 'error'].includes(status) && (
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

export default ImagePreview;
