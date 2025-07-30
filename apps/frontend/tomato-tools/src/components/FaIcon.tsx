import * as Fa from 'react-icons/fa';
import React from 'react';

type FaIconProps = {
	icon: string; // 示例值：'FaHome'
	[key: string]: unknown;
};

export default function FaIcon({ icon, ...props }: FaIconProps) {
	const IconComponent = Fa[icon as keyof typeof Fa] as React.ComponentType<React.SVGProps<SVGSVGElement>>;
	return IconComponent ? React.createElement(IconComponent, props) : null;
}