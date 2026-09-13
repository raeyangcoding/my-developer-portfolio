# ☕ 个人开发者作品集（焦糖棕 + 奶咖白 · 极简）

单页个人作品集网站，复刻自 [anniebombanie.com](https://anniebombanie.com/) 的版式结构，
按你的要求定制：**中文文案 · 焦糖棕 + 奶咖白双色主题 · 极简风 · Vue 3 + Vite**。

已按需求移除：客户评价、Contact 发邮件表单（改为 mailto 按钮）、固定顶部导航栏、
About 头像板块——**第一屏直接用自我介绍文案**。

## 🚀 怎么启动（每次都看这里）

**最省事**：双击项目根目录的 **`启动.cmd`**，会自动起服务并打开浏览器
→ 地址 **http://127.0.0.1:5173**（改代码保存后页面自动刷新）

**手动敲命令**：

```bash
npm install     # 首次使用才需要：安装依赖
npm run dev     # 启动开发服务器（热更新）→ http://127.0.0.1:5173
npm run build   # 构建生产版本到 dist/
npm run serve   # 用本地静态服务预览 dist/ 构建产物 → http://127.0.0.1:4173
```

> 注意：`http://127.0.0.1:4173` 跑的是**构建产物**，改完源码要重新 `npm run build` 才会变；
> 想边改边看就用 **5173**（热更新）。

构建完成后 `dist/` 可直接部署到 **GitHub Pages / Netlify / Vercel**（无需后端）。

## ✏️ 如何改成你自己的内容？

所有文字、链接、项目都集中在 **`src/content.js`** 这一个文件里，按字段替换即可：

| 想改什么 | 改哪里 |
| --- | --- |
| 名字 + 第一屏自我介绍 | `site.name` + `hero`（`lines` 数组里**每一行都会单独换行**，按原文填即可） |
| 技能标签 | `skills.groups` |
| 作品项目（含截图） | `work.projects`：`layout` 三选一 `desktop-mobile` / `two-pages` / `desktop`，截图放 `public/screens/` |
| 邮箱 / 社交链接 | `contact` |
| 页脚署名 | `footer` |

## 🎨 想调配色 / 字体？

- 全部颜色在 **`src/style.css`** 顶部的 `:root` 设计令牌里，改一个值全局生效。
- 页面字体（Manrope 等）在 `index.html` 的 Google Fonts 链接里更换。
- 页面尺寸、圆角、间距等也都在 `style.css` 里，用 CSS 变量集中管理。
