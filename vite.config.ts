import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/hopr-status-board/',
  plugins: [react()],
  build: {
    target: ['es2020']
  }
})
