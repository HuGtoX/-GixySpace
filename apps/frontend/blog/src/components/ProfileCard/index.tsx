import React from 'react';
import { Card } from 'antd';

type ProfileCardProps = {
	avatar: string;
	name: string;
	title: string;
	socialLinks: Array<{ icon: React.ReactNode; href: string }>;
};

const ProfileCard: React.FC<ProfileCardProps> = ({
	avatar,
	name,
	title,
	socialLinks
}) => {
	return (
		<Card className="bg-darkGray rounded-xl mb-8">
			<div className="flex flex-col md:flex-row items-center p-6">
				<div className="w-32 h-32 rounded-full border-3 border-primary overflow-hidden mb-4 md:mb-0 md:mr-8">
					<img src={avatar} alt="头像" className="w-full h-full object-cover" />
				</div>
				<div className="text-center md:text-left">
					<h1 className="text-3xl font-bold text-lightGray mb-2">{name}</h1>
					<p className="text-secondary mb-4">{title}</p>
					<div className="flex justify-center md:justify-start space-x-4">
						{socialLinks.map((link, index) => (
							<a
								key={index}
								href={link.href}
								className="social-icon text-lightGray hover:text-primary"
							>
								{link.icon}
							</a>
						))}
					</div>
				</div>
			</div>
		</Card>
	);
};

export default ProfileCard;
