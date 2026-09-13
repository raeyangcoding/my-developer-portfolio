<script setup>
import content from '../content.js'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="container site-footer__bar">
      <p>
        © {{ year }} {{ content.footer.credit }} · {{ content.footer.note }}
      </p>
      <div class="site-footer__note">
        <!-- <span>以 Vue 3 + Vite 构建</span> -->
        <a class="site-footer__top" href="#home">回到顶部</a>
      </div>
    </div>
  </footer>
</template>
