<script setup>
import SiteHeader from './components/SiteHeader.vue'
import HeroSection from './components/HeroSection.vue'
import SkillsSection from './components/SkillsSection.vue'
import WorkSection from './components/WorkSection.vue'
import ContactSection from './components/ContactSection.vue'
import SiteFooter from './components/SiteFooter.vue'

// 说明：浏览器标签页标题统一由 index.html 的 <title> 决定（静态输出，不会闪烁）。
// 之前这里用 JS 再改一次标题，导致「先闪旧标题再变新标题」，已移除。
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
