<script setup>
import content from '../content.js'

const skills = content.skills
</script>

<template>
  <section id="skills" class="section">
    <div class="container">
      <div class="section__head">
        <!-- 眉标已注释：需要时在 content.js 取消 skills.eyebrow 注释并恢复下行 -->
        <!-- <p v-reveal class="eyebrow">{{ skills.eyebrow }}</p> -->
        <h2 v-reveal="'0.06s'" class="section__title">{{ skills.title }}</h2>
      </div>

      <div class="skills__layout">
        <!-- 技能标签：没有“最近在忙”时自动占满整行 -->
        <div class="skills__stack" :class="{ 'skills__stack--wide': !skills.now }">
          <div
            v-for="(group, i) in skills.groups"
            :key="group.label"
            class="skills-group"
            v-reveal="String(0.05 + i * 0.08) + 's'"
          >
            <h3 class="skills-group__label">{{ group.label }}</h3>
            <ul class="tag-cloud">
              <li v-for="item in group.items" :key="item">
                <span class="tag-pill">{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- 最近在忙（在 content.js 里注释掉 skills.now 就会整卡隐藏） -->
        <aside
          v-if="skills.now"
          v-reveal="'0.18s'"
          class="now-card"
          aria-label="最近在忙"
        >
          <div>
            <span class="now-card__label">{{ skills.now.label }}</span>
            <p>{{ skills.now.text }}</p>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>
