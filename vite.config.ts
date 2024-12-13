import { reactRouter } from '@react-router/dev/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vite';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';

export default defineConfig(({ isSsrBuild ,command}) => ({
	plugins: [reactRouter(), tsconfigPaths()],
	css: {
		postcss: {
			plugins: [tailwindcss(), autoprefixer()],
		},
	},
	build: {
		rollupOptions: isSsrBuild
			? {
					input: './server/app.ts',
				}
			: undefined,
	},
	ssr:{
		 noExternal: command === "build" ? true : undefined,
	}
}));
