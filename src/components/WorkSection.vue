<script setup>
import content from '../content.js'

const work = content.work
// 截图放在 public/screens/ 下，这里拼出相对路径（配合 base './' 可部署到子路径）
const img = (name) => `${import.meta.env.BASE_URL}screens/${name}.png`

// 标题点击目标：优先「体验地址 demo」，没有则用「GitHub 仓库 repo」
const primaryHref = (p) => p.demo || p.repo || ''
// 悬停原生提示（浏览器标准 tooltip）
const hoverHint = (p) =>
  primaryHref(p) ? `${primaryHref(p)}（在新标签页打开）` : ''
// 同时填了两个地址时，卡片底部额外给一个「源码」入口
const secondHref = (p) => (p.demo && p.repo ? p.repo : '')
</script>

<template>
  <section id="work" class="section">
    <div class="container">
      <div class="section__head">
        <!-- 眉标已注释：需要时在 content.js 取消 work.eyebrow 注释并恢复下行 -->
        <!-- <p v-reveal class="eyebrow">{{ work.eyebrow }}</p> -->
        <h2 v-reveal="'0.06s'" class="section__title">{{ work.title }}</h2>
        <p v-reveal="'0.12s'" class="section__lead">{{ work.note }}</p>
      </div>

      <div class="work-grid">
        <article
          v-for="(project, i) in work.projects"
          :key="project.title"
          class="work-card"
          v-reveal="String(0.05 + (i % 2) * 0.08) + 's'"
        >
          <!-- 封面：真实项目截图（电脑+手机双截图 / 双页面并排 / 单张宽屏 / 占位） -->
          <div class="work-card__cover" :class="'cover--' + (project.layout || 'placeholder')">
            <span v-if="project.placeholder" class="cover-plus" aria-hidden="true">＋</span>
            <template v-else-if="project.layout === 'desktop-mobile'">
              <img
                class="shot shot--desktop"
                :src="img(project.screens[0])"
                :alt="project.alts[0] || ''"
                loading="lazy"
              />
              <img
                class="shot shot--mobile"
                :src="img(project.screens[1])"
                :alt="project.alts[1] || ''"
                loading="lazy"
              />
            </template>
            <template v-else-if="project.layout === 'desktop'">
              <img
                class="shot shot--single"
                :src="img(project.screens[0])"
                :alt="project.alts[0] || ''"
                loading="lazy"
              />
            </template>
            <template v-else>
              <img
                v-for="(s, j) in project.screens"
                :key="s"
                class="shot shot--page"
                :src="img(s)"
                :alt="project.alts[j] || ''"
                loading="lazy"
              />
            </template>
          </div>

          <div class="work-card__body">
            <!-- 点标题跳转（新标签页打开，悬停有下划线 + 原生地址提示） -->
            <h3 class="work-card__title">
              <a
                v-if="primaryHref(project)"
                class="work-card__title-link"
                :href="primaryHref(project)"
                target="_blank"
                rel="noopener noreferrer"
                :title="hoverHint(project)"
                :aria-label="
                  (project.demo ? '访问体验地址：' : '查看 GitHub 仓库：') +
                  project.title
                "
              >
                {{ project.title }}
              </a>
              <template v-else>{{ project.title }}</template>
            </h3>
            <p class="work-card__desc">{{ project.description }}</p>
            <ul v-if="project.tags && project.tags.length" class="work-card__tags">
              <li v-for="tag in project.tags" :key="tag">
                <span class="mini-tag">{{ tag }}</span>
              </li>
            </ul>
            <!-- 只在同时填了「体验地址 + 仓库」时出现，给源码一个独立入口 -->
            <div v-if="secondHref(project)" class="work-card__links">
              <a
                class="work-card__link"
                :href="secondHref(project)"
                target="_blank"
                rel="noopener noreferrer"
                :title="hoverHint({ demo: '', repo: secondHref(project), title: project.title })"
                :aria-label="'查看 GitHub 仓库：' + project.title"
              >
                查看源码 ↗
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
