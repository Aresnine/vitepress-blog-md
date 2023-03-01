// 这个vitepress的总配置文件
import themeConfig from './config/themeConfig'
import { demoBlockPlugin } from "vitepress-theme-demoblock"

const config = {
  title: "  👉Aresnine 👈",
  description: "Aresnine的个人博客,web,vue,组件库,js",
  themeConfig,
  markdown: {
    config: (md) => {
      // 这里可以使用 markdown-it 插件，vitepress-theme-demoblock就是基于此开发的
      md.use(demoBlockPlugin)
    },
  },
}
export default config
