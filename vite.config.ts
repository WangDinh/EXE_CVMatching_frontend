import react from '@vitejs/plugin-react-swc'
import { createRequire } from 'module'
import path from 'path'
import { defineConfig, loadEnv, normalizePath } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'

const require = createRequire(import.meta.url)
const cMapsDir = normalizePath(path.join(path.dirname(require.resolve('pdfjs-dist/package.json')), 'cmaps'))
const standardFontsDir = normalizePath(
  path.join(path.dirname(require.resolve('pdfjs-dist/package.json')), 'standard_fonts')
)

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [
      react(),
      viteStaticCopy({
        targets: [
          { src: cMapsDir, dest: '' },
          { src: standardFontsDir, dest: '' }
        ]
      })
    ],
    server: {
      host: true,
      port: Number(env.VITE_PORT)
    },
    css: {
      devSourcemap: true
    },
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src'),
        pages: path.resolve(__dirname, './src/app/pages')
      }
    }
  }
})
