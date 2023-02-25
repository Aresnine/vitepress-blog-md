// 这个vitepress的总配置文件
import themeConfig from './config/themeConfig'
import { demoBlockPlugin } from "vitepress-theme-demoblock"

const config = {
  title: "🔨XXOO-UI",
  description: "组件库搭建",
  themeConfig,
  // themeConfig: {
  //   sidebar,
  // },
  markdown: {
    config: (md) => {
      // 这里可以使用 markdown-it 插件，vitepress-theme-demoblock就是基于此开发的
      md.use(demoBlockPlugin)
    },
  },
}
export default config
