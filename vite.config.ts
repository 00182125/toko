import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    // "@/ui/Button" significa "src/ui/Button": así los imports no se llenan de ../../
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
})
