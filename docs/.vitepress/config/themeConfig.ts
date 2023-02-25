
const sidebar = {
  // 这个是需要和nav选项对应上，这样才在指定页面显示左边栏  
  "/components/index": [
    { text: "快速开始", link: "/" },
    {
      text: "通用",
      items: [{ text: "Button 按钮", link: "/components/button/" }],
    },
    { text: "导航" },
    { text: "反馈" },
    { text: "数据录入" },
    { text: "数据展示" },
    { text: "布局" },
  ],
}
// 主题的整体配置
const themeConfig:object = {
    nav: [
        {text: 'vue🐴',link: '/vue3/index'},
        {text: '技术总结',link: '/技术总结/index'},
        {text: 'technology',
          items:[
            {text:'待整理', link:'/technology/待整理/index.md'},
            {text:'博客搭建', link:'/technology/blog/index.md'},
          ]
      },
        {text: '组件库', link: '/components/index'}
    ],
    sidebar
}


export default themeConfig