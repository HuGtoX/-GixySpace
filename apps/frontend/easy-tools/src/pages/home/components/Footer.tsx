import { FaCog } from 'react-icons/fa';
function Footer() {
	return (
		<footer className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 z-40">
			<div className="container mx-auto flex justify-between items-center">
				<div className="flex items-center space-x-4">
					<button
						id="bg-toggle"
						className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
					>
						<i className="fa fa-picture-o text-gray-700 dark:text-gray-300"></i>
					</button>
					<button
						id="settings"
						className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
					>
						<FaCog className="fa fa-cog text-gray-700 dark:text-gray-300"></FaCog>
					</button>
				</div>
				<div>
					<span className="text-xs text-gray-500 dark:text-gray-400">
						© 2025 番茄工具. 保留所有权利。
					</span>
				</div>
			</div>
		</footer>
	);
}

export default Footer;
