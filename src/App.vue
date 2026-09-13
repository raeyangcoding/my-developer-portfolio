<script setup>
import { onMounted } from 'vue'
import content from './content.js'
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import WorkSection from './components/WorkSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'

// 让浏览器标签标题跟随配置文件（改 content.js 即生效）
onMounted(() => {
  document.title = content.site.pageTitle
    ? content.site.pageTitle
    : `${content.site.name} · 作品集`
})
</script>

<template>
  <SiteHeader />

  <main>
    <HeroSection />
    <SkillsSection />
    <WorkSection />
    <ContactSection />
  </main>

  <SiteFooter />
</template>
