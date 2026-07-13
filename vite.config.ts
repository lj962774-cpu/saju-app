import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// GitHub Pages는 /saju-app/ 하위 경로로 서비스되므로 base 설정 필요
export default defineConfig({
  base: '/saju-app/',
  plugins: [react()],
})
