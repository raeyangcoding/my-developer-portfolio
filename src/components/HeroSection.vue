<script setup>
import content from '../content.js'

const hero = content.hero
</script>

<template>
  <!-- 第一屏 = 自我介绍：左对齐、无头像、无多余按钮、逐行换行 -->
  <section id="home" class="hero--intro">
    <div class="container">
      <div class="intro">
        <h1 class="intro__greeting" v-reveal>
          {{ hero.greeting }}<span class="intro__name">{{ hero.name }}</span>{{ hero.suffix }}
        </h1>

        <p
          v-for="(line, i) in hero.lines"
          :key="i"
          class="intro__line"
          :class="{
            'intro__line--punch': hero.punchline && i === hero.lines.length - 1
          }"
          v-reveal="String(0.12 + i * 0.08) + 's'"
        >
          {{ line }}
        </p>
      </div>
    </div>
  </section>
</template>
