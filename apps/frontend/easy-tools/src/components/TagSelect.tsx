import { Button } from 'antd';
import type { CSSProperties } from 'react';
import { useEffect } from 'react';

type TagSelectProps = {
	/** 标签选项列表 */
	options: string[];
	/** 当前选中的标签数组 */
	selectedTags: string[];
	/** 标签选中回调 */
	onSelect: (tag: string[]) => void;
	/** 选择模式（单选/多选） */
	mode?: 'single' | 'multiple';
	/** 自定义样式 */
	style?: CSSProperties;
};

const TagSelect = ({
	mode = 'single',
	options,
	selectedTags = [],
	onSelect,
	style
}: TagSelectProps) => {
	useEffect(() => {
		if (selectedTags.length === 0) {
			const defaultTag = options[0];
			defaultTag && onSelect([defaultTag]);
		}
	}, [selectedTags.length, options, onSelect]);

	const handleClick = (tag: string) => {
		if (mode === 'single') {
			// 单选模式直接切换选中项
			onSelect([tag]);
		} else {
			if (selectedTags.includes(tag)) {
				// 多选模式只剩一个标签时不能取消选中
				if (selectedTags.length === 1) return [tag];
			}
			onSelect([...selectedTags, tag]);
		}
	};

	return (
		<div style={style} className="flex flex-wrap gap-2">
			{options.map((tag) => (
				<Button
					key={tag}
					type="text"
					className={`px-3 py-1 rounded-full text-sm transition-colors ${selectedTags.includes(tag) ? 'bg-primary text-white dark:bg-dark-primary' : 'text-primary dark:text-dark-primary'}`}
					onClick={() => handleClick(tag)}
				>
					{tag}
				</Button>
			))}
		</div>
	);
};

export default TagSelect;
