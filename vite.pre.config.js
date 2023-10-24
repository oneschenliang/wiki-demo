import path from 'path';
import { defineConfig } from 'vite';
// eslint-disable-next-line import/no-extraneous-dependencies
// import { createHtmlPlugin } from 'vite-plugin-html'

export default defineConfig({
  build: {
    minify: false,
    sourcemap: false,
    outDir: path.resolve(__dirname, './dist'),
  },
  base: '/wiki-demo/',
  plugins: [
    // createHtmlPlugin({

    //   entry: 'src/index.ts',
    //   template: 'public/index.html',
    // })
  ],
  define: {},
});
