import { mergeConfig } from 'vite';
import baseConfig from './vite.config.base';

export default mergeConfig(
  {
    mode: 'development',
    server: {
      open: true,
      proxy: {
        "^/v1/.*": { target: 'http://127.0.0.1:9080', changeOrigin: true },
      },
      fs: { strict: true },
    },
    plugins: [
    ],
  },
  baseConfig
);
