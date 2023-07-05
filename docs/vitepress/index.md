# vitePress

vitePress官网地址：https://vitepress.dev/

配置文件：`.vitepress/config.js`

```js
// .vitepress/config.js
export default {
  // site-level options
  title: 'VitePress',
  description: 'Just playing around.',

  themeConfig: {
    // theme-level options
  }
}
```
这里我们可以通过 `themeConfig` 选项配置主题的行为

## 源文件
docs 目录被认为是文档的根目录，其中的 `.vitepress`目录作为配置目录

## 目录

目录里面分为两类，分别是左侧的导航目录，代表的是不同的文件；还有右侧的目录，右侧的目录是当前文件的不同区块

### 左侧导航目录

参考我的设置
```js
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


```

### 右侧目录

这里就是一个文件的不同区块，这里强调的是 `vitepress` 只识别 `##`二级目录


## 语法

### 标题
```html
 #      一级标题
 ##     二级标题
 ###    三级标题
 ####   四级标题
 #####  五级标题
 ###### 六级标题
```

### 斜体
```html 
*斜体文字*
_斜体文字_
```

### 粗体文字
```html
**粗体文字**
__粗体文字__
***粗体文字***
___粗体文字___
```

### 分割线
```html
***
* * *
******
- - -
------
```
### 删除线
```html
~~删除线~~
```
### 有序列表和无序列表
无序列表 `*`
有序列表 `-` 或者 `+` 或者 `1. 2. 3. `符号和文字之间需要有一个空格


### 列表的嵌套
```html
1. 第一项：
    - 第一项嵌套的第一个元素
    - 第一项嵌套的第二个元素
2. 第二项：
    - 第二项嵌套的第一个元素
    - 第二项嵌套的第二个元素
```

### 区块
```html
> 
```
另外区块是可以嵌套的，一个>符号是最外层，两个符号是第一层嵌套，以此类推：

```html
> 最外层
>> 第一层嵌套
>>> 第二层嵌套
```
### 列表中使用区块
```html
* 第一项
    > Markdown教程
    > 学的不仅是技术更是梦想
* 第二项
```

### 代码
简短的使用
```html
``
```

### 自定义容器

```html
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger 自定义标题
This is a dangerous warning.
:::

::: details 
This is a details block.
:::
```
::: info
This is an info box.
:::

::: tip
This is a tip.
:::

::: warning
This is a warning.
:::

::: danger 自定义标题
This is a dangerous warning.
:::

::: details
This is a details block.
:::


