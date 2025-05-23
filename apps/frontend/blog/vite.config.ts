import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'src'), // @ 指向 src 目录
			'@components': path.resolve(__dirname, 'src/components'), // 组件目录别名
			'@pages': path.resolve(__dirname, 'src/pages') // 页面目录别名
		}
	}
});
