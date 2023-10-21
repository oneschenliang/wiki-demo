import { defineConfig, mergeConfig } from 'vite';

export default defineConfig(({ mode }) => {
  const baseConfig = {
    server: {
      host: '0.0.0.0',
      port: 4001,
    },
    base: './',
    build: {
      rollupOptions: {
        input: {
          main: './index.html',
        },
      },
    },
    define: {
      // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
    },
  };

  if (mode === 'e2e') {
    return mergeConfig(baseConfig);
  }

  return baseConfig;
});
