module.exports = {
  base: '/vuepress-doc/', // 部署站点的基础路径
  title: '前端装逼大全',
  description: 'Just playing around',
  displayAllHeaders: true,
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    nav: [
      { text: 'Home', link: '/contents/js/基础类型.md' },
      { text: 'Guide', link: '/contents/js/基础类型.md' },
      // {
      //   text: 'Languages',
      //   items: [
      //     { text: 'Chinese', link: '/language/chinese' },
      //     { text: 'English', link: '/language/english' }
      //   ]
      // },
      { text: 'External', link: 'https://github.com/WhyJaz/vuepress-doc' },
    ],
    sidebar: [
      {
        title: 'JS',
        children: [
          ['/contents/js/基础类型.md', '基础类型'],
          ['/contents/js/闭包.md', '闭包'],
        ]
      },
    ]
  }
}