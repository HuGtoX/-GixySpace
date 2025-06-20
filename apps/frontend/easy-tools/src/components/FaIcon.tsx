import * as Fa from 'react-icons/fa';
import type { ComponentType } from 'react';

type FaIconProps = {
	icon: string; // 示例值：'FaHome'
	[key: string]: any;
};

export default function FaIcon({ icon, ...props }: FaIconProps) {
	const IconComponent: ComponentType = Fa[icon as keyof typeof Fa];
	return IconComponent ? <IconComponent {...props} /> : null;
}
