<script setup>
import content from '../content.js'

const work = content.work
// 截图放在 public/screens/ 下，这里拼出相对路径（配合 base './' 可部署到子路径）
const img = (name) => `${import.meta.env.BASE_URL}screens/${name}.png`
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
            <h3 class="work-card__title">{{ project.title }}</h3>
            <p class="work-card__desc">{{ project.description }}</p>
            <ul v-if="project.tags && project.tags.length" class="work-card__tags">
              <li v-for="tag in project.tags" :key="tag">
                <span class="mini-tag">{{ tag }}</span>
              </li>
            </ul>
            <div class="work-card__links">
              <a
                v-if="project.demo"
                class="work-card__link"
                :href="project.demo"
                target="_blank"
                rel="noopener"
              >
                查看项目 ↗
              </a>
              <a
                v-if="project.repo"
                class="work-card__link"
                :href="project.repo"
                target="_blank"
                rel="noopener"
              >
                源码
              </a>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
