import { createApp } from 'vue'
import App from './App.vue'
import './style.css'

// 滚动渐显指令：元素进入视口时加上 .is-in
const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const reveal = {
  mounted(el, binding) {
    const delay = typeof binding.value === 'string' ? binding.value : '0s'
    if (prefersReduced || typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-in')
      return
    }
    el.style.transitionDelay = delay
    el.classList.add('rv')
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-in')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    )
    io.observe(el)
    el._io = io
  },
  unmounted(el) {
    if (el._io) el._io.disconnect()
  }
}

createApp(App).directive('reveal', reveal).mount('#app')
