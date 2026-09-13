import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// base: './' 让构建产物可以直接双击打开，也方便部署到 GitHub Pages 子路径
export default defineConfig({
  plugins: [vue()],
  base: './',
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    // 用轮询代替原生文件监听：避免 Windows 上原子写入临时文件导致的 EBUSY 崩溃
    watch: {
      usePolling: true,
      interval: 200,
      ignored: [/(^|[/\\])\../, /\.tmp$/, /\.tmpdir[\\/]/]
    }
  }
})
