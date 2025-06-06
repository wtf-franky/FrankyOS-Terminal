// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/FrankyOS-Terminal/', // ← troca pelo nome do teu repositório!
  plugins: [react()],
})
