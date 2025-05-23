import React from 'react';

type FooterNavProps = {
	links: Array<{ text: string; href: string }>;
};

const FooterNav: React.FC<FooterNavProps> = ({ links }) => {
	return (
		<footer className="bg-darkGray py-8 mt-12">
			<div className="max-w-6xl mx-auto px-6">
				<div className="flex flex-col md:flex-row justify-between items-center">
					<div className="font-['Pacifico'] text-2xl text-lightGray mb-4 md:mb-0">
						CodeLog
					</div>
					<div className="flex space-x-6">
						{links.map((link, index) => (
							<a
								key={index}
								href={link.href}
								className="text-secondary hover:text-primary"
							>
								{link.text}
							</a>
						))}
					</div>
				</div>
				<div className="border-t border-dark mt-6 pt-6 text-center text-secondary">
					<p>© 2023 CodeLog 博客. 保留所有权利.</p>
					<p className="mt-2">京ICP备12345678号</p>
				</div>
			</div>
		</footer>
	);
};

export default FooterNav;
