import { defineConfig } from 'vitepress'
import { withMermaid } from 'vitepress-plugin-mermaid'

export default withMermaid(defineConfig({
  title: 'noncanon',
  description: 'Local-first collaborative worldbuilding',
  base: '/noncanon/',
  srcExclude: ['**/CLAUDE.md'],

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'exo', link: 'https://docs.exo.place/' },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/exo-place/noncanon' }
    ],

    search: {
      provider: 'local'
    },

    editLink: {
      pattern: 'https://github.com/exo-place/noncanon/edit/master/docs/:path',
      text: 'Edit this page on GitHub'
    },
  },
}))
