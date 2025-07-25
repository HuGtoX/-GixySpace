import React from 'react';
import { Button } from 'antd';

interface TagSelectProps {
  options: string[];
  selectedTags: string[];
  onSelect: (tags: string[]) => void;
  style?: React.CSSProperties;
}

const TagSelect = ({ 
  options, 
  selectedTags, 
  onSelect, 
  style 
}: TagSelectProps) => {
  const handleTagClick = (tag: string) => {
    if (tag === '全部') {
      onSelect([]);
    } else {
      const newTags = selectedTags.includes(tag)
        ? selectedTags.filter(t => t !== tag)
        : [...selectedTags, tag];
      onSelect(newTags);
    }
  };

  return (
    <div style={style} className="flex gap-2">
      {options.map(option => (
        <Button
          key={option}
          size="small"
          type={selectedTags.includes(option) || (option === '全部' && selectedTags.length === 0) ? 'primary' : 'default'}
          onClick={() => handleTagClick(option)}
        >
          {option}
        </Button>
      ))}
    </div>
  );
};

export default TagSelect;