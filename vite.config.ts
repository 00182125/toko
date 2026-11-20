import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ command, isPreview }) => ({
  // En GitHub Pages la app vive en https://00182125.github.io/toko/, no en la raíz.
  // npm run build y npm run preview usan /toko/ (igual que GitHub);
  // en desarrollo (npm run dev) sigue siendo http://localhost:5173/.
  base: command === 'build' || isPreview ? '/toko/' : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    // "@/ui/Button" significa "src/ui/Button": así los imports no se llenan de ../../
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
}))
