import { Button } from 'antd';
import {
	FaCalculator,
	FaQrcode,
	FaExchangeAlt,
	FaRegClock,
	FaRegStickyNote,
	FaLanguage,
	FaPalette
} from 'react-icons/fa';
import IconWrapper from '@/components/IconWrapper';

interface ToolItemProps {
	name: string;
	icon: React.ReactNode;
	link?: string;
	background?: string;
	description: string;
}
const ToolItem = ({
	name,
	icon,
	background = 'bg-primary/10'
}: ToolItemProps) => {
	return (
		<div
			className="tool-icon bg-white dark:bg-gray-800 rounded-xl p-4 text-center shadow-md hover:shadow-lg ripple cursor-pointer pixel-grow"
			draggable="true"
		>
			<IconWrapper size={12} background={background} icon={icon} />
			<span className="text-sm font-medium">{name}</span>
		</div>
	);
};

export default function Tools() {
	return (
		<section className="lg:col-span-3 space-y-6">
			<div className="flex justify-between items-center">
				<h2 className="text-xl font-semibold">常用工具</h2>
				<Button
					type="text"
					className="text-sm text-primary dark:text-dark-primary hover:underline"
				>
					编辑
				</Button>
			</div>

			<div id="tool-grid" className="grid grid-cols-2 gap-4">
				{/* 工具1：计算器 */}
				<ToolItem
					name="计算器"
					icon={
						<FaCalculator className="text-primary dark:text-dark-primary" />
					}
					link="/tools/calculator"
					description="计算器"
				/>

				{/* 工具2：二维码生成器 */}
				<ToolItem
					name="二维码生成器"
					icon={
						<FaQrcode className="text-secondary dark:text-dark-secondary" />
					}
					background="bg-secondary/10"
					link="/tools/qrcode"
					description="二维码生成器"
				/>

				{/* 工具3：单位转换 */}
				<ToolItem
					name="单位转换"
					background=" bg-green-500/10 dark:bg-green-500/10"
					icon={
						<FaExchangeAlt className="text-green-500 dark:text-green-400" />
					}
					link="/tools/unit"
					description="单位转换"
				/>

				{/* 工具4：时间戳转换 */}
				<ToolItem
					name="时间戳转换"
					background=" bg-blue-500/10 dark:bg-blue-500/10"
					icon={<FaRegClock className="text-blue-500 dark:text-blue-400" />}
					link="/tools/time"
					description="时间戳转换"
				/>

				{/* 工具5：颜色选择器 */}
				<ToolItem
					name="颜色选择器"
					background=" bg-purple-500/10 dark:bg-purple-500/10"
					icon={<FaPalette className="text-purple-500 dark:text-purple-400" />}
					link="/tools/color"
					description="颜色选择器"
				/>

				{/* 工具6：JSON格式化 */}
				<ToolItem
					name="便签"
					background=" bg-pink-500/10 dark:bg-pink-500/10"
					icon={
						<FaRegStickyNote className="text-pink-500 dark:text-pink-400" />
					}
					link="/tools/json"
					description="便签"
				/>

				<ToolItem
					name="翻译"
					background=" bg-yellow-500/10 dark:bg-yellow-500/10"
					icon={<FaLanguage className="text-yellow-500 dark:text-yellow-400" />}
					link="/tools/regex"
					description="翻译"
				/>
			</div>

			<div>
				<div className="flex items-center mb-3">
					<div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
						<span className="text-white font-bold">AI</span>
					</div>
					<h2 className="text-xl font-semibold ml-3">AI助手</h2>
				</div>

				<div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md mb-4 hover:shadow-lg transition-shadow">
					<div className="flex items-start">
						<div className="w-10 h-10 rounded-lg bg-indigo-500/10 dark:bg-indigo-500/10 flex items-center justify-center mr-3">
							<i className="fa fa-comment text-indigo-500"></i>
						</div>
						<div>
							<h3 className="font-medium mb-1">智能问答</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
								获取问题的智能答案和建议
							</p>
							<button className="text-xs bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 px-3 py-1 rounded-full">
								打开会话
							</button>
						</div>
					</div>
				</div>

				<div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow-md border border-dashed border-gray-300 dark:border-gray-600">
					<div className="flex items-start">
						<div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-3">
							<i className="fa fa-image text-gray-400"></i>
						</div>
						<div>
							<h3 className="font-medium mb-1">图像生成</h3>
							<p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
								根据文本描述创建高质量图像
							</p>
							<div className="flex items-center">
								<span className="text-xs bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded-full mr-2">
									开发中
								</span>
								<span className="text-xs text-gray-500 dark:text-gray-400">
									预计2025年Q3上线
								</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
