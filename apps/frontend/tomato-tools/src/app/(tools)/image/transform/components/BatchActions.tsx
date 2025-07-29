import React from 'react';
import { Button, Space, Typography, Progress, Row, Col, Card } from 'antd';
import {
	SyncOutlined,
	DownloadOutlined,
	ClearOutlined
} from '@ant-design/icons';
import { useDeviceDetect } from '@/hooks/useDeviceDetect';
import { ImageFile } from '../types';

const { Title, Text } = Typography;

interface BatchActionsProps {
	imageFiles: ImageFile[];
	onConvertAll: () => void;
	onConvertRemaining: () => void;
	onDownloadAll: () => void;
	onClearAll: () => void;
	isProcessing: boolean;
	progress: number;
}

const BatchActions = ({
	imageFiles,
	onConvertAll,
	onConvertRemaining,
	onDownloadAll,
	onClearAll,
	isProcessing,
	progress
}: BatchActionsProps) => {
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
			className="w-full mb-4"
			bodyStyle={{ padding: isMobile ? '12px' : '16px' }}
		>
			<Row gutter={[16, 16]} align="middle">
				<Col xs={24} sm={24} md={12} lg={12} xl={12}>
					<Space direction="vertical" className="w-full">
						<Title level={isMobile ? 5 : 4} className="mb-2">
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
						className={`w-full ${
							isMobile ? 'justify-center' : 'justify-end'
						}`}
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

						{hasCompletedFiles && (
							<Button
								type="default"
								icon={<DownloadOutlined />}
								onClick={onDownloadAll}
								disabled={isProcessing}
								size={isMobile ? 'middle' : 'large'}
							>
								全部下载
							</Button>
						)}

						<Button
							danger
							icon={<ClearOutlined />}
							onClick={onClearAll}
							disabled={isProcessing}
							size={isMobile ? 'middle' : 'large'}
						>
							清空
						</Button>
					</Space>
				</Col>
			</Row>
		</Card>
	);
};

export default BatchActions;