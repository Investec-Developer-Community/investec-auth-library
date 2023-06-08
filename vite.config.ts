import { resolve } from 'node:path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import tsConfigPaths from 'vite-tsconfig-paths'
import * as packageJson from './package.json'

export default defineConfig(() => ({
  plugins: [
    react(),
    tsConfigPaths(),
    dts({
      include: ['src/components/'],
    }),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://openapi.investec.com/identity',
        rewrite: path => path.replace('/api', ''),
        changeOrigin: true,
        secure: false,
        ws: true,
      }
    }
  },
  build: {
    lib: {
      entry: resolve('src', 'components/index.ts'),
      name: 'InvestecAuthLibrary',
      formats: ['es', 'umd'],
      fileName: (format) => `investec-auth-library.${format}.js`,
    },
    rollupOptions: {
      external: [...Object.keys(packageJson.peerDependencies)],
    },
  },
}))
