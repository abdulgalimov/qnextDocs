module.exports = {
  title: 'QNext',
  description: '📦 Документация для бота.',
  theme: 'api',
  base: '/',
  locales: {
    '/': {
      lang: 'ru-RU',
      title: '',
      text: 'Русский',
      description: '📦 Документация для бота.',
    },
  },
  themeConfig: {
    // Optional options for generating "Edit this page" link

    // if your docs are in a different repo from your main project:
    docsRepo: 'sqrthree/vuepress-theme-api',
    // if your docs are not at the root of the repo:
    docsDir: '../../docs',
    // if your docs are in a specific branch (defaults to 'master'):
    docsBranch: 'master',
    // defaults to false, set to true to enable
    editLinks: false,
    // custom text for edit link. Defaults to "Edit this page"
    // editLinkText: 'Help us improve this page',
    // lastUpdated: 'Last Updated', // string | boolean
    lastUpdated: true, // string | boolean

    // sidebarGroupOrder: [
    //   'getting-started',
    //   'configurations',
    // ],
  },
}
