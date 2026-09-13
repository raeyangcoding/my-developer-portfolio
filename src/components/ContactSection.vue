<script setup>
import content from '../content.js'

const contact = content.contact

// 社交图标（几何线稿风格）；icon 为空字符串时只显示文字
const icons = {
  github: {
    type: 'fill',
    path: 'M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.04.77 2.1 0 1.52-.01 2.74-.01 3.11 0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z'
  },
  x: {
    type: 'fill',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z'
  },
  mail: {
    type: 'fill',
    path: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z'
  },
  link: {
    type: 'stroke',
    paths: [
      'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71',
      'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'
    ]
  },
  // 图片型图标（品牌 logo 放 public/icons/ 下）
  cnblogs: {
    type: 'img',
    src: `${import.meta.env.BASE_URL}icons/cnblogs.webp`
  }
}

const mailto = `mailto:${contact.email}`
</script>

<template>
  <section id="contact" class="section">
    <div class="container">
      <div class="section__head contact__head">
        <span v-reveal class="eyebrow">{{ contact.eyebrow }}</span>
        <h2 v-reveal="'0.06s'" class="section__title">{{ contact.title }}</h2>
        <p v-reveal="'0.12s'" class="section__lead">{{ contact.intro }}</p>
      </div>

      <div v-reveal="'0.18s'" class="contact__actions">
        <!-- 用 mailto 按钮替代表单（原站的联系表单已按要求去掉） -->
        <a class="btn btn--primary" :href="mailto">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
            <path fill="currentColor" :d="icons.mail.path" />
          </svg>
          发邮件
        </a>
      </div>

      <p v-reveal="'0.26s'" class="contact__or">也可以在这些地方找到我</p>

      <ul v-reveal="'0.32s'" class="socials">
        <li v-for="social in contact.socials" :key="social.label">
          <a
            class="social-link"
            :href="social.href"
            target="_blank"
            rel="noopener"
          >
            <svg v-if="icons[social.icon]?.type === 'fill'" viewBox="0 0 24 24" aria-hidden="true">
              <path fill="currentColor" :d="icons[social.icon].path" />
            </svg>
            <img
              v-else-if="icons[social.icon]?.type === 'img'"
              class="social-link__img"
              :src="icons[social.icon].src"
              alt=""
              aria-hidden="true"
            />
            <svg
              v-else-if="icons[social.icon]?.type === 'stroke'"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <path v-for="d in icons[social.icon].paths" :key="d" :d="d" />
            </svg>
            {{ social.label }}
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>
