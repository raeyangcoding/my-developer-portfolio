// 计算站点配色/透明度组合的 WCAG 对比度（审计用）
const hex2rgb = (h) => {
  h = h.replace('#', '')
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16))
}
const lum = (rgb) => {
  const f = (c) => {
    c /= 255
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * f(rgb[0]) + 0.7152 * f(rgb[1]) + 0.0722 * f(rgb[2])
}
const ratio = (a, b) => {
  const [l1, l2] = [lum(a), lum(b)].sort((x, y) => y - x)
  return (l1 + 0.05) / (l2 + 0.05)
}
const toHex = (rgb) => rgb.map((c) => c.toString(16).padStart(2, '0')).join('')
const mix = (fg, bg, p) => fg.map((c, i) => Math.round(c * p + bg[i] * (1 - p)))

const cream = '#F5F1E9'
const white = '#FFFFFF'
const coal = '#312520'
const caramel = '#8C5A42'
const pine = '#664B3A'
const gold = '#DBC684'
const pineT = '#E9E0D5'
const goldT = '#EFE5C6'

const t = (name, fg, bg) => {
  const r = ratio(hex2rgb(fg), hex2rgb(bg))
  const mark = r >= 4.5 ? 'PASS' : r >= 3 ? 'FAIL(large)' : 'FAIL'
  console.log(`${mark.padEnd(10)} ${r.toFixed(2).padStart(5)}  ${name}`)
}

t('正文 coal / cream', coal, cream)
t('intro 74%coal / cream', toHex(mix(hex2rgb(coal), hex2rgb(cream), 0.74)), cream)
t('about 80%coal / cream', toHex(mix(hex2rgb(coal), hex2rgb(cream), 0.8)), cream)
t('desc 72%coal / white 卡片内', toHex(mix(hex2rgb(coal), hex2rgb(white), 0.72)), white)
t('nav 78%coal / cream', toHex(mix(hex2rgb(coal), hex2rgb(cream), 0.78)), cream)
t('eyebrow caramel / cream', caramel, cream)
t('skill-label caramel / white', caramel, white)
t('tagline pine / cream', pine, cream)
t('tag-pill pine / pineTint', pine, pineT)
t('mini-tag pine / goldTint', pine, goldT)
t('chip pine / white', pine, white)
t('hero-kicker pine / goldTint', pine, goldT)
t('btn文字 cream / coal', cream, coal)
t('now-card 88%cream / coal', toHex(mix(hex2rgb(cream), hex2rgb(coal), 0.88)), coal)
t('footer 82%cream / coal', toHex(mix(hex2rgb(cream), hex2rgb(coal), 0.82)), coal)
t('now-label gold / coal', gold, coal)
t('footer-top gold / coal', gold, coal)
t('hover caramel / white', caramel, white)
t('accent+hl caramel / cream', caramel, cream)
