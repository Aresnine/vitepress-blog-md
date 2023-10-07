
const sidebar = {
  // 这个是需要和nav选项对应上，这样才在指定页面显示左边栏  
  "/components/index": [
    { text: "快速开始", link: "/" },
    {
      text: "通用",
      items: [{ text: "Button 按钮", link: "/components/button/" }],
    },
  ],
  "/面试题": [
    {text:"vue",link:'/面试题/vue/'},
    {text:"js",link:'/面试题/js/'},
    {text:"html",link:'/面试题/html/'},
    {text:"待整理",link:'/面试题/待整理/'},
    // 这里也是支持二级目录的
    {text:"测试",
       items:[
          {text:'待整理', link:'/technology/待整理/'},
          {text:'typescript', link:'/technology/typescript/'},
          {text:'博客搭建', link:'/technology/blog/'},
          {text:'vantcli文档', link:'/technology/vantcli/'},

        ]
    },

    


  ],
}
// 主题的整体配置
const themeConfig:object = {
    nav: [
      {text:'面试题',link:'/面试题/'},
      {text: 'vitePress',link:'/vitepress/'},
      {text: '网站搭建',link:'/www/'},
      {text: 'vue🐴',link: '/vue3/'},
      {text: '每日任务',link: '/每日任务/'},
      {text: '技术总结',link: '/技术总结/'},
      {text: 'technology',
        items:[
          {text:'待整理', link:'/technology/待整理/'},
          {text:'typescript', link:'/technology/typescript/'},
          {text:'博客搭建', link:'/technology/blog/'},
          {text:'vantcli文档', link:'/technology/vantcli/'},

        ]
      },
      {text: '组件库', link: '/components/index'}
    ],
    sidebar
}


export default themeConfig