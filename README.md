# Rae Yang · Portfolio

A single-page personal portfolio built with **Vue 3 + Vite** — 一个纯静态的个人作品集站点：
首屏自我介绍 → 技能 → 作品 → 联系方式，采用**焦糖棕 + 奶咖白**双色主题，无后端依赖，可直接部署到任意静态托管。

## ✨ 特性

- **单页滚动布局**：自我介绍 / 技能 / 作品 / 联系，四段式信息结构
- **双色主题**：焦糖棕作为唯一强调色，奶咖白 + 纯白作为表面色，不引入多余色阶
- **设计令牌集中管理**：颜色、字号、间距、容器宽度全部在 `src/style.css` 顶部的 CSS 变量里，改一行全站生效
- **卡片用阴影而非描边**，hover 轻微上浮，视觉更干净
- **项目卡片可点击**：标题即链接，新标签页打开，支持「体验地址 + 源码仓库」双入口（只填一个也能正常工作）
- **滚动渐显动画**，并遵循 `prefers-reduced-motion`
- **响应式**：900px / 640px 两个断点，移动端优先保证可读性与点击区域（≥44px）
- **基础可访问性**：语义化标签、`aria-label`、键盘焦点反馈、文字对比度全部达到 WCAG AA（正文 13:1）
- **轻量**：生产产物约 10 KB CSS + 74 KB JS，无 UI 框架、无路由、无状态管理库

## 🚀 快速开始

需要 Node.js 18 或更高版本。

```bash
npm install      # 安装依赖
npm run dev      # 启动开发服务器（自动打开浏览器，默认 5173，被占用则自动切换 5174）
npm run build    # 构建生产版本，输出到 dist/
npm run serve    # 本地预览 dist/ 构建产物 → http://127.0.0.1:4173
npm run check    # 组件语法自检（无需浏览器）
```

Windows 用户也可以直接双击项目根目录的 **`启动.cmd`**。

> `npm start` 与 `npm run dev` 等价。

## 🧱 技术栈

| 用途 | 选择 |
| --- | --- |
| 视图层 | Vue 3（`<script setup>` 单文件组件） |
| 构建工具 | Vite 6 |
| 样式 | 原生 CSS + 设计令牌，无预处理器、无 UI 组件库 |
| 字体 | Manrope（拉丁字母）+ 系统中文字体栈（PingFang SC / 微软雅黑 等） |
| 部署 | 任意静态托管（Vercel / Netlify / GitHub Pages） |

## 📁 目录结构

```
.
├── index.html              # 页面模板：<title> / meta / 字体引入都在这里
├── vite.config.js          # Vite 配置（base './'、自动开浏览器、轮询监听）
├── vercel.json             # Vercel 部署配置（Vite + dist）
├── netlify.toml            # Netlify 部署配置
├── 启动.cmd                # Windows 一键启动开发服务器
├── public/
│   ├── favicon.svg         # 站点图标（纯色底 + 居中字母）
│   ├── icons/              # 图片型社交图标
│   └── screens/            # 作品截图（项目卡片封面）
├── scripts/
│   ├── preview.mjs         # 本地静态服务器（预览构建产物）
│   ├── clean-dist.mjs      # 构建前清理 dist（带重试，规避 Windows 文件锁）
│   └── check-sfc.mjs       # Vue 单文件组件语法自检
└── src/
    ├── main.js             # 应用入口 + 滚动渐显指令
    ├── App.vue             # 页面结构组装
    ├── content.js          # ✏️ 全站文案与链接（改内容只需要动这个文件）
    ├── style.css           # 🎨 设计令牌 + 全站样式
    └── components/         # 各板块组件
        ├── SiteHeader.vue      # 顶部导航
        ├── HeroSection.vue     # 第一屏自我介绍
        ├── SkillsSection.vue   # 技能与工具
        ├── WorkSection.vue     # 作品集
        ├── ContactSection.vue  # 联系方式
        └── SiteFooter.vue      # 页脚
```

## ✏️ 自定义内容

所有文案、链接、项目都集中在 **`src/content.js`**，无需改动组件：

| 想改什么 | 改哪里 |
| --- | --- |
| 名字 | `site.name` |
| 第一屏自我介绍 | `hero.lines` —— 数组里**每一项单独成行**，按原文排列即可 |
| 技能标签 | `skills.groups` |
| 作品项目 | `work.projects`（见下方说明） |
| 邮箱 / 社交链接 | `contact` |
| 页脚署名 | `footer` |
| 导航项 | `nav` |

**作品项目的字段**

```js
{
  title: '项目名',            // 卡片标题，也是点击跳转的入口
  description: '一句话简介',
  tags: ['标签一', '标签二'],
  demo: 'https://…',          // 体验地址（优先作为标题跳转目标）
  repo: 'https://…',          // GitHub 仓库地址
  layout: 'desktop-mobile',   // 封面布局：desktop-mobile | two-pages | desktop
  screens: ['文件名1', '文件名2'], // 放在 public/screens/ 下，不写 .png
  alts: ['图片描述1', '图片描述2'] // 无障碍替代文本
}
```

- 只填 `demo` 或只填 `repo`：标题跳转到填了的那个
- 两个都填：标题跳「体验地址」，卡片底部额外出现「查看源码」
- 两个都留空：卡片不可点击
- 暂缺截图的卡片：设置 `placeholder: true`，会显示为占位卡

**其它细节**

- 浏览器标签页标题：改 `index.html` 的 `<title>`（唯一来源，避免挂载后二次改写导致闪烁）
- 社交图标：内置 GitHub / X / 信封的 inline SVG；如需图片型图标，放进 `public/icons/`，并在 `ContactSection.vue` 的 `icons` 映射里登记

## 🎨 主题与排版

打开 `src/style.css`，顶部的 `:root` 就是全站设计令牌：

```css
--cream: #f5f1e9;   /* 奶咖白：页面底色 */
--white: #ffffff;   /* 纯白：卡片底色 */
--caramel: #8c5a42; /* 焦糖棕：唯一强调色 */
--ink: #32261f;     /* 正文文字 */

--title-size: clamp(1.4rem, 2.2vw, 1.85rem);  /* 板块大标题字号 */
--section-gap: clamp(48px, 4.5vw, 72px);      /* 板块上下间距 */
--section-head-gap: clamp(22px, 2.5vw, 30px); /* 标题到内容的距离 */
--container: 1360px;                          /* 内容最大宽度 */
```

交换 `--cream` 与 `--white` 的用法即可得到「白底 + 奶咖白卡片」的反色方案。

## ☁️ 部署

仓库已包含部署配置，导入后无需手动设置构建参数：

| 平台 | 做法 |
| --- | --- |
| **Vercel** | 导入仓库即可（`vercel.json` 已声明 Vite / `npm run build` / `dist`） |
| **Netlify** | 导入仓库（读取 `netlify.toml`），或把 `dist/` 目录拖到 [Netlify Drop](https://app.netlify.com/drop) |
| **GitHub Pages** | `vite.config.js` 中 `base: './'` 已适配子路径，用 Actions 构建并发布 `dist/` |

> 如果主要面向中国大陆访客：Vercel / Netlify 的默认域名解析不稳定，建议绑定自有域名并接入 Cloudflare 等 CDN 后再放到简历上。

## ✅ 质量检查

```bash
npm run check    # 组件语法自检
```

人工检查清单：

- 键盘 Tab 走一遍导航、卡片标题、作品链接、社交入口，确认焦点可见
- 手机宽度下检查导航换行、截图比例、点击区域
- 系统开启「减少动态效果」后确认渐显动画被关闭
- 上线前替换所有占位内容（邮箱、社交链接、项目地址）

## 📄 License

[GPL-3.0](./LICENSE)

---

版式结构参考了 [anniebombanie.com](https://anniebombanie.com/) 的组织思路，配色、文案与实现均为本项目自有内容。
