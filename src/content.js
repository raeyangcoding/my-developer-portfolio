// ============================================================
//  ✏️  站点内容配置文件 —— 所有文字都集中在这里
//     以后想改任何文案 / 链接 / 项目，只需要改这个文件！
//     每个字段后面都有 // 替换成你的... 的说明。
// ============================================================

const content = {
  // ---------- 基础信息 ----------
  site: {
    // 名字（显示在导航栏和页脚）
    name: 'Rae Yang',
    // 注：浏览器标签页标题不在这个文件里，改 index.html 的 <title>（唯一来源，避免闪烁）
    // 一句话定位（显示在 Footer 等次要位置）
    tagline: 'front-end & design · keep learning'
  },

  // ---------- 导航（锚点：技能 / 作品 / 联系） ----------
  nav: [
    { label: '技能', href: '#skills' },
    { label: '作品', href: '#work' },
    { label: '联系', href: '#contact' }
  ],

  // ---------- 第一屏：自我介绍（直接作为首页主体） ----------
  //   greeting + name + suffix 拼成第一行：👋 你好，我是Rae👩🏻‍💻
  //   lines 里的每一行会【严格单独换行】显示，逐字按你的原文排列即可
  hero: {
    greeting: '👋你好，我是',
    name: 'Rae',
    // suffix: '👩🏻‍💻',
    lines: [
      '虽然 AI coding 给产品开发插上了翅膀',
      '但是懂代码、懂编程思想才能判断代码的好坏',
      '有好的审美才能做出既好用又美的产品',
      '所以，keep learning💪'
    ],
    // 末尾一句是否强调（用焦糖棕加粗收尾）
    punchline: false
  },

  // ---------- Skills & Tools（技能与工具） ----------
  skills: {
    title: '技能',
    groups: [
      {
        label: 'AI应用, vibe coding',
        items: ['LLM API调用','RAG','Prompt Engineering','Skills','Python','JavaScript','SQL']
      },
      {
        label: '工具',
        items: ['Claude Code', 'Codex', 'DeepSeek Harness', 'Dify', 'Coze', 'WorkBuddy']
      }
    ],
    // now: {
    //   label: '最近在忙',
    //   text: '在深入学习 Vue 3 与组件设计，同时维护自己的几个小项目。'
    // }
  },

  // ---------- Work（作品集，占位项目） ----------
  work: {
    // eyebrow: '作品集',
    title: '作品集',
    note: '从 0 到 1 开发',
    // 每个项目：
    //  - layout: 'desktop-mobile'（电脑+手机双截图）/'two-pages'（两个页面）/'desktop'（单张宽屏）
    //  - screens: 截图文件名（放在 public/screens/ 下，不含 .png）
    //  - tags: 介绍标签
    //  - demo: 体验地址   |   repo: GitHub 仓库地址
    //    👉 两个都填：点整张卡片 = 去体验地址，卡片里另有「源码」入口
    //    👉 只填一个：点整张卡片 = 去填了的那个（另一个按钮自动隐藏）
    //    👉 都填 ''：卡片不可点击，也不显示按钮
    projects: [
      {
        title: 'Sleepy Randomizer',
        description:
          '睡前随手一开的随机播放器：视频 / 音乐都能随机选，下一个内容由它来定。手机与电脑都能用。',
        tags: ['随机播放', '视频 · 音乐', 'Bilibili / YouTube 聚合'],
        demo: '',
        repo: '',
        layout: 'desktop-mobile',
        screens: ['sleepy-desktop', 'sleepy-mobile'],
        alts: ['电脑端界面', '手机端界面']
      },
      {
        title: 'Real Dark',
        description:
          '告别白屏闪烁的「真·深色模式」：按固定时间或日出日落自动切换，不需要系统定位权限也能估算大致坐标。',
        tags: ['深色模式', '日出日落切换', '自动'],
        demo: '',
        repo: '',
        layout: 'two-pages',
        screens: ['realdark-page1', 'realdark-page2'],
        alts: ['设置页 · 固定时间', '设置页 · 日出日落']
      },
      {
        // 标题取自截图界面顶部（如果不对，直接改这里）
        title: '知识库问答助手（RAG)',
        description:
          '一个基于知识库检索的 RAG 问答助手：支持文档 / 网页检索、知识库与模型配置。',
        tags: ['RAG', 'Obsidian 知识库'],
        demo: '',
        repo: '',
        layout: 'desktop',
        screens: ['rag-assistant'],
        alts: ['主界面']
      },
      {
        // 占位卡片：暂时没有截图，只显示文字
        title: '更多项目敬请期待',
        description: '新的作品还在路上✨',
        tags: [],
        demo: '',
        repo: '',
        placeholder: true
      }
    ]
  },

  // ---------- Contact（联系我） ----------
  contact: {
    eyebrow: '联系我',
    title: '一起做点好玩的东西吧',
    intro:
      '如果对我的作品感兴趣，或者想聊聊合作、机会，欢迎发邮件给我——我会尽快回复。',
    // 替换成你的真实邮箱（“发邮件给我”按钮会用这个值）
    email: 'rayyang1024@foxmail.com',
    socials: [
      { label: 'GitHub', href: 'https://github.com/raeyangcoding', icon: 'github' },
      // { label: 'X / Twitter', href: 'https://x.com/', icon: 'x' },
      // { label: '邮箱', href: 'mailto:hello@example.com', icon: 'mail' },
      { label: '博客园', href: 'https://www.cnblogs.com/bornToBeWeird', icon: 'cnblogs' }
    ]
  },

  // ---------- 页脚 ----------
  footer: {
    credit: 'Rae',
    note: 'Made with Passion'
  }
}

export default content
