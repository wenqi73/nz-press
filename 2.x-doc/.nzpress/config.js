module.exports  = {
  title: 'MatAi Document',
  lang: 'en-US',
  home: '/zh/introduce',
  locales: {
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    // '/': {
    //   lang: 'en-US',
    //   title: 'MatAi Help',
    //   description: 'an angular powered site generator',
    //   sidebar: [
    //     {
    //       link: '/introduce',
    //       title: 'Introduce'
    //     }
    //   ]
    // },
    '/zh': {
      lang: 'zh-CN',
      title: 'MatAi帮助文档',
      description: 'angular 驱动的静态网站生成器',
      sidebar: [
        {
          link: '/zh/introduce',
          title: '介绍'
        },
        {
          title: '数据分析',
          children: [
            {
              link: '/zh/analysis/join',
              title: '加入分析'
            },
          ]
        }
      ]
    }
  }
};