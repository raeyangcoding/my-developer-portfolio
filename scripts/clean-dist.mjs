// 构建前清理 dist：带重试，规避 Windows 上文件被短暂占用导致的 EPERM
import { rm } from 'node:fs/promises'

const dist = new URL('../dist', import.meta.url)

for (let attempt = 1; attempt <= 5; attempt++) {
  try {
    await rm(dist, { recursive: true, force: true, maxRetries: 3, retryDelay: 200 })
    break
  } catch (err) {
    if (attempt === 5) {
      console.warn('[clean-dist] 清理失败，交给 vite 自行处理：', err.message)
      break
    }
    await new Promise((r) => setTimeout(r, 300))
  }
}
