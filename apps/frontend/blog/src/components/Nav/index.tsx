import React, { useState, useEffect } from 'react';
import { MoonOutlined, SunOutlined } from '@ant-design/icons';

type NavProps = {
	links?: Array<{ text: string; href: string }>;
};
const navLinks = [
	{ text: '首页', href: '#' },
	{ text: '博客', href: '#' },
	{ text: '项目', href: '#' },
	{ text: '关于我', href: '#' }
];

const Nav: React.FC<NavProps> = () => {
	const [isDarkMode, setIsDarkMode] = useState(false);

	useEffect(() => {
		const savedMode = localStorage.getItem('darkMode');
		if (savedMode) {
			setIsDarkMode(JSON.parse(savedMode));
			document.documentElement.classList.toggle('dark', JSON.parse(savedMode));
		}
	}, []);

	const toggleDarkMode = () => {
		setIsDarkMode(!isDarkMode);
		document.documentElement.classList.toggle('dark', !isDarkMode);
		localStorage.setItem('darkMode', JSON.stringify(!isDarkMode));
	};

	return (
		<nav className="bg-white sticky top-0 z-50 shadow-md dark:bg-dark dark:text-lightGray">
			<div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
				<div className="font-['Pacifico'] text-2xl dark:text-lightGray">CodeLog</div>
				<div className="hidden md:flex space-x-8">
					{navLinks.map((link, index) => (
						<a
							key={index}
							href={link.href}
							className="nav-link  hover:text-primary dark:text-lightGray"
						>
							{link.text}
						</a>
					))}
				</div>
				<button onClick={toggleDarkMode} className="ml-4">
					{isDarkMode ? (
						<SunOutlined className="text-xl" />
					) : (
						<MoonOutlined className="text-xl" />
					)}
				</button>
				<div className="md:hidden">
					<i className="fas fa-bars dark:text-lightGray text-xl cursor-pointer"></i>
				</div>
			</div>
		</nav>
	);
};

export default Nav;
