module.exports  = {
  title: 'Nzpress Demo',
  locales: {
    // 作为特例，默认语言可以使用 '/' 作为其路径。
    '/': {
      lang: 'en-US', // 将会被设置为 <html> 的 lang 属性
      title: 'NzPress',
      description: 'angular-powered Static Site Generator',
      sidebar: [
        {
          link: '/getting-started',
          title: 'Start'
        },
        {
          link: '/contributing',
          title: 'Contributing'
        },
        {
        title: 'Change Content',
          children: [
            {
              link: '/changelog/changelog',
              title: 'Change Log',
            }
          ]
        }
      ]
    },
    '/zh/': {
      lang: 'zh-CN',
      title: 'NzPress',
      description: 'angular 驱动的静态网站生成器',
      sidebar: [
        {
          link: '/zh/getting-started',
          title: '快速上手'
        },
        {
          link: '/zh/contributing',
          title: '贡献'
        },
        {
        title: '更新内容',
          children: [
            {
              link: '/zh/changelog/changelog',
              title: '更新日志'
            }
          ]
        }
      ]
    }
  }
};

// export default config;