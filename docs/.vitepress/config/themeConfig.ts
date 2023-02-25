
const sidebar = {
  
  "/": [
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
        {text: '第一篇文章',link: '/technology/blog/index'},
    ],
    sidebar
}


export default themeConfig