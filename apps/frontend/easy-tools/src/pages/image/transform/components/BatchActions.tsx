import React from 'react';
import { Button, Space, Typography, Progress, Row, Col, Card } from 'antd';
import {
	SyncOutlined,
	DownloadOutlined,
	ClearOutlined
} from '@ant-design/icons';
import { useDeviceDetect } from '@/hooks/useDeviceDetect';
import { ImageFile } from '../type';

const { Title, Text } = Typography;

interface BatchActionsProps {
	imageFiles: ImageFile[];
	onConvertAll: () => void;
	onConvertRemaining: () => void; // 新增转换剩余文件方法
	onDownloadAll: () => void;
	onClearAll: () => void;
	isProcessing: boolean;
	progress: number;
}

const BatchActions: React.FC<BatchActionsProps> = ({
	imageFiles,
	onConvertAll,
	onConvertRemaining,
	onDownloadAll,
	onClearAll,
	isProcessing,
	progress
}) => {
	const { isMobile } = useDeviceDetect();

	const completedFiles = imageFiles.filter(
		(file) => file.status === 'completed'
	).length;
	const totalFiles = imageFiles.length;
	const pendingFiles = imageFiles.filter(
		(file) => file.status === 'idle' || file.status === 'error'
	).length;
	const hasCompletedFiles = completedFiles > 0;
	const hasPendingFiles = pendingFiles > 0;
	const hasFiles = totalFiles > 0;
	const hasCompletedAndPending = hasCompletedFiles && hasPendingFiles;

	if (!hasFiles) {
		return null;
	}

	return (
		<Card
			style={{ width: '100%', marginBottom: '16px' }}
			bodyStyle={{ padding: isMobile ? '12px' : '16px' }}
		>
			<Row gutter={[16, 16]} align="middle">
				<Col xs={24} sm={24} md={12} lg={12} xl={12}>
					<Space direction="vertical" style={{ width: '100%' }}>
						<Title level={isMobile ? 5 : 4} style={{ marginBottom: '8px' }}>
							批量操作
						</Title>

						<Text type="secondary">
							选择的文件: {totalFiles} 个
							{hasCompletedFiles &&
								` (已完成: ${completedFiles}/${totalFiles})`}
						</Text>

						{isProcessing && <Progress percent={progress} status="active" />}
					</Space>
				</Col>

				<Col xs={24} sm={24} md={12} lg={12} xl={12}>
					<Space
						wrap
						style={{
							width: '100%',
							justifyContent: isMobile ? 'center' : 'flex-end'
						}}
					>
						<Button
							type="primary"
							icon={<SyncOutlined />}
							onClick={onConvertAll}
							disabled={isProcessing || !hasFiles}
							loading={isProcessing}
							size={isMobile ? 'middle' : 'large'}
						>
							全部转换
						</Button>

						{/* 添加转换剩余文件按钮，仅当同时有已转换和未转换的文件时显示 */}
						{hasCompletedAndPending && (
							<Button
								type="default"
								icon={<SyncOutlined />}
								onClick={onConvertRemaining}
								disabled={isProcessing || !hasPendingFiles}
								loading={isProcessing}
								size={isMobile ? 'middle' : 'large'}
							>
								转换剩余
							</Button>
						)}

						<Button
							icon={<DownloadOutlined />}
							onClick={onDownloadAll}
							disabled={!hasCompletedFiles}
							size={isMobile ? 'middle' : 'large'}
						>
							下载全部
						</Button>

						<Button
							danger
							icon={<ClearOutlined />}
							onClick={onClearAll}
							disabled={!hasFiles}
							size={isMobile ? 'middle' : 'large'}
						>
							清空全部
						</Button>
					</Space>
				</Col>
			</Row>
		</Card>
	);
};

export default BatchActions;
