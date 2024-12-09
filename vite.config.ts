import { reactRouter } from "@react-router/dev/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vite";
import tailwindcss from 'tailwindcss';

export default defineConfig({
  plugins: [reactRouter(), tsconfigPaths()],
   css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
});
