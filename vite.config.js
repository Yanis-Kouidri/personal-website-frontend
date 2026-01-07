import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // allow using of 'describe', 'it', 'expect' without import
    environment: 'jsdom',
  },
})
