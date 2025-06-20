import { useState, createContext, useContext, ReactNode } from 'react';

// 定义主题上下文类型
interface ThemeContextType {
	isDarkMode: boolean;
	toggleTheme: () => void;
}

// 主题上下文，提供明确的类型定义
const ThemeContext = createContext<ThemeContextType>({
	isDarkMode: false,
	toggleTheme: () => {}
});

export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
	children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
	const [isDarkMode, setIsDarkMode] = useState(false);

	const toggleTheme = () => {
		setIsDarkMode(!isDarkMode);
		document.documentElement.classList.toggle('dark', !isDarkMode);
	};

	return (
		<ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	);
};

export default ThemeProvider;
