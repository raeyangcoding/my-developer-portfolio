// 轻量静态文件服务器：用于本地预览 dist/ 构建产物
// 用法: node preview.mjs [port]   (默认 4173)
import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { extname, join, normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = fileURLToPath(new URL('../dist', import.meta.url))
const port = Number(process.argv[2] || process.env.PORT || 4173)

const types = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.json': 'application/json'
}

createServer(async (req, res) => {
  try {
    let pathname = decodeURIComponent(new URL(req.url, 'http://x').pathname)
    if (pathname === '/') pathname = '/index.html'
    const filePath = normalize(join(root, pathname))
    if (!filePath.startsWith(root)) throw Object.assign(new Error('forbidden'), { code: 'FORBIDDEN' })
    const body = await readFile(filePath)
    res.writeHead(200, { 'Content-Type': types[extname(filePath)] || 'application/octet-stream' })
    res.end(body)
  } catch (err) {
    if (err.code === 'ENOENT') {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
      res.end('404 Not Found')
    } else {
      res.writeHead(500)
      res.end('500')
    }
  }
}).listen(port, '127.0.0.1', () => {
  console.log(`✅ 预览已启动: http://127.0.0.1:${port}`)
})
