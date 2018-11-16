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
          link: '/introduce',
          title: 'Introduce'
        },
        {
          link: '/structure',
          title: 'Structure'
        },
        {
          link: '/i18n',
          title: 'Internationalization',
        }
      ]
    },
    '/zh': {
      lang: 'zh-CN',
      title: 'NzPress',
      description: 'angular 驱动的静态网站生成器',
      sidebar: [
        {
          link: '/zh/introduce',
          title: '介绍'
        },
        {
          link: '/zh/structure',
          title: '目录结构'
        },
        {
          link: '/zh/i18n',
          title: '国际化',
        }
      ]
    }
  }
};