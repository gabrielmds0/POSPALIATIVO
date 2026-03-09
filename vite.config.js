import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  base: '/pos-graduacao-cuidados-paliativos/',
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'assets/js/[name]-[hash].js',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const name = assetInfo.name ?? ''

          if (name.endsWith('.css')) {
            return 'assets/css/[name]-[hash][extname]'
          }

          if (/\.(png|jpe?g|gif|svg|webp|avif)$/i.test(name)) {
            return 'assets/img/[name]-[hash][extname]'
          }

          if (/\.(woff2?|ttf|otf|eot)$/i.test(name)) {
            return 'assets/fonts/[name]-[hash][extname]'
          }

          return 'assets/misc/[name]-[hash][extname]'
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  preview: {
    port: parseInt(process.env.PORT) || 4173,
  },
  server: {
    port: parseInt(process.env.PORT) || 5173,
    fs: {
      // Permite importar arquivos fora de src/ (ex: /imagens/)
      allow: ['.'],
    },
  },
})
