import React from 'react';
import { Tooltip } from 'antd';
import { themeColors } from '../../config/theme';

interface ThemeSwitcherProps {
  currentColor: string;
  onThemeChange: (color: string) => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ currentColor, onThemeChange }) => {
  return (
    <div className="flex space-x-2 items-center">
      {themeColors.map((color) => (
        <Tooltip key={color} title={color}>
          <div
            style={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              backgroundColor: color,
              border: currentColor === color ? '2px solid #fff' : '2px solid transparent',
              cursor: 'pointer',
              transition: 'all 0.3s'
            }}
            onClick={() => onThemeChange(color)}
          />
        </Tooltip>
      ))}
    </div>
  );
};

export default ThemeSwitcher;