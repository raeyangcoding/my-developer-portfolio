# 设计审计报告 · 暖咖个人作品集

- **项目**: MyDeveloperFolio（Vue 3 + Vite 单页作品集）
- **日期**: 2026-09-06
- **方法**: [impeccable](/audit)（技术审计 5 维度）+ [ux-audit]（UX 启发式）+ 自写对比度计算脚本（`audit/contrast.mjs`）
- **范围**: 源码审查（`src/`）、构建产物（`dist/`）；**未做浏览器实机截图/真机测试**，视觉结论基于代码推断
- **模式判定**（impeccable）：**Experience**——作品集，让作品本身说话，界面退后

---

## 一、Audit Health Score（impeccable 技术审计）

| # | 维度 | 得分 | 关键发现 |
|---|------|------|----------|
| 1 | Accessibility | 3/4 | 对比度全过、语义基本良好；触摸目标个别略小于 44px |
| 2 | Performance | 3/4 | 产物轻（JS 30.8KB gz）；`will-change` 留在静止元素上 |
| 3 | Responsive | 3/4 | 流式布局 + clamp + 断点齐全；卡片文字链接触摸区偏小 |
| 4 | Theming | 3/4 | token 体系完整；少数硬编码 rgba / 文案渐变按设计保留 |
| 5 | Implementation Integrity | 4/4 | 结构连贯、占位内容有标注、无虚假声明 |
| **Total** | | **16/20** | **Good（打磨弱项即可）** |

## 二、对比度实测（WCAG）

全部 19 组**通过** AA（≥4.5:1），最低 5.10，多数 >6：

- 正文 煤黑/奶咖白 **13.16**；小字 eyebrow 焦糖棕/奶咖 **5.10**
- 标签 松果褐/浅底 6.11~7.98；深底上的奶油字 8.77~13.16

→ 配色体系在可读性上是**健康**的，没有对比度硬伤。

## 三、问题清单（按严重度）

### P1（发布前应修）
无。审计未发现阻断级问题。

### P2（建议下一轮修）

1. **头像装饰环可能不可见（视觉 bug）**
   - 位置：`style.css` `.avatar__ring`（z-index:-1）/ `.about__media`
   - 类别：Implementation Integrity / 视觉
   - 问题：`.about__media` 未建立层叠上下文，负 z-index 的虚线圆环会画到 `.section` 背景**之下**，在多数浏览器里等于消失——设计意图是"从头像左下露出一个金色虚线圆环"
   - 影响：About 区少了唯一的非几何装饰，与 Hero/卡片装饰语言不统一
   - 修复：`.about__media { isolation: isolate }`（或 z-index:0）

2. **触摸目标略小于 44×44px（WCAG 2.5.5/2.5.8）**
   - 位置：`.nav__link` ≈43px；`.work-card__link` 文字链接仅 ≈26px 高；`.chip` 非交互元素不受限
   - 影响：手机上点按容易误触/点空，尤其顶栏导航与卡片里的"查看项目"
   - 修复：导航 padding 提到 `10px 18px`；卡片文字链接加 `padding: 6px 2px`（或 min-height）扩大热区

3. **静态标题/联系方式与 `content.js` 脱节**
   - 位置：`index.html`（`<title>`、`<meta description>`）；`content.js`（`site.pageTitle`、邮箱在 `contact.email` 与 `socials[]` 各出现一次）
   - 影响：用户改了配置文件，浏览器标签/描述/邮箱按钮不会同步，容易漏改
   - 修复：挂载时用 `content.site` 设 `document.title`；社交"邮箱"项由 `contact.email` 推导

### P3（打磨）

4. `will-change: opacity, transform` 留在所有已揭示元素上（`.rv`）——只在动画期间需要；`.is-in` 后移除
5. 项目封面数字 `01/02…` 与装饰圆为纯装饰，建议对屏幕阅读器 `aria-hidden`（避免朗读无意义编号）
6. 单页较短，`skip-link` 可选；添加成本极低
7. Hero 长名字（拉丁文/多字）在窄屏需留意 `white-space: nowrap` 换行；当前占位名无风险

## 四、正向发现（保持）

- ✅ 19 组前景/背景全部满足 AA，最弱的 eyebrow 也有 5.10:1
- ✅ 五色 token 体系贯穿全局，无散落硬编码主色
- ✅ 语义结构清晰：`header/main/section/article/aside/footer` + 每节 h2→h3 层级正确
- ✅ 交互元素 hover 反馈一致（上浮 2px + 语义色变化）
- ✅ `prefers-reduced-motion` 完整关闭滚动提示/脉冲/位移动画
- ✅ `html lang="zh-CN"`、`aria-label` 用于装饰与补充语义、`:focus-visible` 清晰可见
- ✅ 产物极轻：无外部图片/字体阻塞中文渲染（CJK 走系统字体栈）
- ✅ Experience 模式成立：Hero 大字 + 明确 CTA，作品区让卡片说话，界面克制

## 五、UX 侧快速核对（ux-audit 框架）

- **视觉层级**: 通过 —— 唯一 H1 + 每节 eyebrow 小标→h2→内容，主 CTA（实底深色）vs 次 CTA（描边）对比清晰
- **视觉风格**: 通过 —— 圆角（14/22px）、描边（--line）、悬停动效三类 token 全站一致；仅一处头像圆角异形（48%）是有意点缀
- **认知负担**: 通过 —— 单页六区、导航 4 项、作品卡片 4 张，结构可预期
- **可访问性**: 见上，主项通过
- **空白/节奏**: 优秀 —— clamp 间距、行高 1.75 对中文友好

---

*建议修复顺序：P2-1（isolation）→ P2-2（触摸目标）→ P2-3（标题/邮箱同步）→ P3 项。修复后可重跑 `npm run build` 并刷新预览。*
