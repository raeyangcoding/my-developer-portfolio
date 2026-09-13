// 从 GitHub 拉取 pbakaus/impeccable 的 skill 文件树（.kiro/skills/impeccable/**）
// 用法: node fetch-impeccable.mjs <目标目录> [分支]
// 说明: 使用 Node 内置 fetch（Node 自带 TLS，不依赖系统 schannel）
import { mkdir, writeFile } from 'node:fs/promises'
import { join, dirname } from 'node:path'

const destRoot = process.argv[2]
const branch = process.argv[3] || 'main'

async function getTree() {
  let url = `https://api.github.com/repos/pbakaus/impeccable/git/trees/${branch}?recursive=1`
  const res = await fetch(url, { headers: { 'User-Agent': 'skill-installer' } })
  if (res.status !== 200) {
    // 分支不存在则回退到 master
    url = url.replace(branch, 'master')
    const res2 = await fetch(url, { headers: { 'User-Agent': 'skill-installer' } })
    if (res2.status !== 200) throw new Error(`tree API ${res.status}/${res2.status}`)
    return res2.json()
  }
  return res.json()
}

const tree = await getTree()
const prefix = '.kiro/skills/impeccable/'
const entries = (tree.tree || []).filter(
  (e) => e.type === 'blob' && e.path.startsWith(prefix)
)

let written = 0
for (const e of entries) {
  const rel = e.path.slice(prefix.length)
  const out = join(destRoot, rel)
  const raw = await fetch(
    `https://raw.githubusercontent.com/pbakaus/impeccable/${tree.sha}/${e.path}`,
    { headers: { 'User-Agent': 'skill-installer' } }
  )
  if (!raw.ok) {
    console.log(`skip ${rel} (HTTP ${raw.status})`)
    continue
  }
  const buf = Buffer.from(await raw.arrayBuffer())
  await mkdir(dirname(out), { recursive: true })
  await writeFile(out, buf)
  written++
}
console.log(`impeccable skill: ${written} files written to ${destRoot} (branch ${branch})`)
