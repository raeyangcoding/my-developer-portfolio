// 轻量语法自检：用 @vue/compiler-sfc 解析并编译所有 .vue 组件
// 用法: node scripts/check-sfc.mjs
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { parse, compileScript, compileTemplate } from '@vue/compiler-sfc'

const dir = new URL('../src/', import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, '$1')
const files = []

function walk(d) {
  for (const entry of readdirSync(d, { withFileTypes: true })) {
    const p = join(d, entry.name)
    if (entry.isDirectory()) walk(p)
    else if (entry.name.endsWith('.vue')) files.push(p)
  }
}
walk(dir)

let failed = 0
for (const file of files) {
  const source = readFileSync(file, 'utf8')
  const id = file.replace(/\\/g, '/')
  try {
    const { descriptor, errors } = parse(source, { filename: file })
    if (errors.length) throw new Error(errors.map((e) => e.message).join('; '))
    if (descriptor.scriptSetup || descriptor.script) {
      compileScript(descriptor, { id })
    }
    if (descriptor.template) {
      const res = compileTemplate({
        source: descriptor.template.content,
        filename: file,
        id,
        compilerOptions: { bindingMetadata: descriptor.scriptSetup ? compileScript(descriptor, { id }).bindings : undefined }
      })
      if (res.errors.length) throw new Error(res.errors.map((e) => e.message || e).join('; '))
    }
    console.log('OK   ' + id)
  } catch (err) {
    failed++
    console.log('FAIL ' + id + '  ->  ' + err.message)
  }
}

console.log(`\n共 ${files.length} 个组件，失败 ${failed} 个`)
process.exit(failed ? 1 : 0)
