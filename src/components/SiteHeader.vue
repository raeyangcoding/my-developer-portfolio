<script setup>
import content from '../content.js'
</script>

<template>
  <header class="site-header">
    <div class="container site-header__bar">
      <a class="brand" href="#home" aria-label="回到顶部">
        {{ content.site.name }}
      </a>
      <nav class="nav" aria-label="主导航">
        <a
          v-for="item in content.nav"
          :key="item.href"
          class="nav__link"
          :href="item.href"
        >
          {{ item.label }}
        </a>
      </nav>
    </div>
  </header>
</template>
