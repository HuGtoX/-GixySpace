import React from 'react';
import { Form, Select, Slider, Switch, Card, Typography, Space } from 'antd';
import { useDeviceDetect } from '@/hooks/useDeviceDetect';
import { ImageFormat, ConversionSettings as SettingsType } from '../type';

const { Option } = Select;
const { Title } = Typography;

interface ConversionSettingsProps {
	settings: SettingsType;
	onSettingsChange: (settings: SettingsType) => void;
	currentFormat?: ImageFormat;
}

const ConversionSettings: React.FC<ConversionSettingsProps> = ({
	settings,
	onSettingsChange,
	currentFormat
}) => {
	const { isMobile } = useDeviceDetect();

	const handleFormatChange = (format: ImageFormat) => {
		onSettingsChange({ ...settings, format });
	};

	const handleQualityChange = (quality: number) => {
		onSettingsChange({ ...settings, quality });
	};

	const handleRemoveBackgroundChange = (removeBackground: boolean) => {
		onSettingsChange({ ...settings, removeBackground });
	};

	const handlePreserveExifChange = (preserveExif: boolean) => {
		onSettingsChange({ ...settings, preserveExif });
	};

	// 格式是否支持质量设置
	const supportsQuality =
		settings.format === 'jpg' ||
		settings.format === 'jpeg' ||
		settings.format === 'webp';

	// 格式是否支持背景移除
	const supportsBackgroundRemoval = settings.format === 'png';

	return (
		<Card
			title={<Title level={isMobile ? 4 : 3}>转换设置</Title>}
			bordered={false}
			style={{ width: '100%' }}
		>
			<Form
				layout={isMobile ? 'vertical' : 'horizontal'}
				labelCol={isMobile ? undefined : { span: 6 }}
			>
				<Form.Item label="目标格式" style={{ marginBottom: '16px' }}>
					<Select
						value={settings.format}
						onChange={handleFormatChange}
						style={{ width: '100%' }}
					>
						<Option value="jpg">JPG</Option>
						<Option value="png">PNG</Option>
						<Option value="webp">WEBP</Option>
						<Option value="gif">GIF</Option>
						<Option value="svg">SVG</Option>
					</Select>
					{currentFormat && settings.format !== currentFormat && (
						<Typography.Text type="success">
							从 {currentFormat.toUpperCase()} 转换为{' '}
							{settings.format.toUpperCase()}
						</Typography.Text>
					)}
				</Form.Item>

				{supportsQuality && (
					<Form.Item label="图片质量" style={{ marginBottom: '16px' }}>
						<Space direction="vertical" style={{ width: '100%' }}>
							<Slider
								min={1}
								max={100}
								value={settings.quality}
								onChange={handleQualityChange}
								marks={{
									1: '低',
									50: '中',
									100: '高'
								}}
							/>
							<Typography.Text type="secondary">
								质量: {settings.quality}%
								{settings.quality < 70 && ' (低质量可减小文件大小)'}
							</Typography.Text>
						</Space>
					</Form.Item>
				)}

				{supportsBackgroundRemoval && (
					<Form.Item
						label="移除背景"
						valuePropName="checked"
						style={{ marginBottom: '16px' }}
					>
						<Switch
							checked={settings.removeBackground}
							onChange={handleRemoveBackgroundChange}
						/>
						<Typography.Text type="secondary" style={{ marginLeft: '8px' }}>
							尝试移除白色背景
						</Typography.Text>
					</Form.Item>
				)}

				<Form.Item
					label="保留EXIF信息"
					valuePropName="checked"
					style={{ marginBottom: '16px' }}
				>
					<Switch
						checked={settings.preserveExif}
						onChange={handlePreserveExifChange}
					/>
					<Typography.Text type="secondary" style={{ marginLeft: '8px' }}>
						保留图片的元数据信息
					</Typography.Text>
				</Form.Item>
			</Form>
		</Card>
	);
};

export default ConversionSettings;
