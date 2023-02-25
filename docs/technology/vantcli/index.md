# Vant-CLI使用文档

## 命令

Vant CLI 中内置了一系列的命令，可以将命令添加到 npm scripts 中进行使用。

```json
// package.json
{
  "scripts": {
    "dev": "vant-cli dev",
    "test": "vant-cli test",
    "lint": "vant-cli lint",
    "release": "vant-cli release",
    "build-site": "vant-cli build-site"
  }
}
```

也可以通过 npm 自带的 [npx](https://github.com/npm/npx) 直接执行某个命令：

```powershell
npx vant-cli dev
```

### dev

运行本地开发环境。

运行 dev 命令时，Vant CLI 会通过启动一个本地服务器，用于在开发过程中对文档和示例进行预览。

### build

构建组件库。

运行 build 命令会在 `es` 和 `lib` 目录下生成可用于生产环境的组件代码，详见 [目录结构](https://github.com/vant-ui/vant/tree/main/packages/vant-cli/docs/directory.zh-CN.md)。

发布 npm 时，请将以下配置加入到 `package.json` 中，使 npm 包能被正确识别:

```json
// package.json
{
  "main": "lib/index.js",
  "module": "es/index.js",
  "files": ["es", "lib"]
}
```

### build-site

构建文档站点，在 `site` 目录生成可用于生产环境的文档站点代码。

### release

发布组件库，发布前会自动执行 build 和 changelog 命令，并通过 [release-it](https://github.com/release-it/release-it) 发布 npm 包。

### changelog

基于 commit 记录生成更新日志，基于 [conventional-changelog](https://github.com/conventional-changelog/conventional-changelog) 实现。

### commit-lint

校验 commit message 的格式是否符合规范，需要配合 `husky` 在提交 commit 时触发。

```
npx husky add .husky/commit-msg 'npx --no-install vant-cli commit-lint $1'
```

## 配置指南

### vant.config.mjs

`vant.config.mjs` 中包含了 `vant-cli` 的打包配置和文档站点配置，请创建此文件并置于项目根目录下。下面是一份基本配置的示例：

```ts
export default {
  // 组件库名称
  name: 'demo-ui',
  // 构建配置
  build: {
    site: {
      publicPath: '/demo-ui/',
    },
  },
  // 文档站点配置
  site: {
    // 标题
    title: 'Demo UI',
    // 图标
    logo: 'https://fastly.jsdelivr.net/npm/@vant/assets/logo.png',
    // 描述
    description: '示例组件库',
    // 左侧导航
    nav: [
      {
        title: '开发指南',
        items: [
          {
            path: 'home',
            title: '介绍',
          },
        ],
      },
      {
        title: '基础组件',
        items: [
          {
            path: 'my-button',
            title: 'MyButton 按钮',
          },
        ],
      },
    ],
  },
};
```

#### name

- Type: `string`
- Default: `''`

组件库名称，建议使用中划线分割，如 `demo-ui`。

## build

#### build.css.base

- Type: `string`
- Default: `'style/base.less'`

全局样式文件的路径，可以为相对路径或绝对路径。

相对路径基于 `src` 目录计算。

```ts
module.exports = {
  build: {
    css: {
      base: 'style/global.scss',
    },
  },
};
```

#### build.css.preprocessor

- Type: `string`
- Default: `'less'`

CSS 预处理器配置，目前支持 `less` 和 `sass` 两种预处理器，默认使用 `less`。

```js
module.exports = {
  build: {
    css: {
      preprocessor: 'sass',
    },
  },
};
```

#### build.css.removeSourceFile

- Type: `boolean`
- Default: `'false'`

是否在构建后移除样式文件的源代码。

```js
module.exports = {
  build: {
    css: {
      removeSourceFile: true,
    },
  },
};
```

#### build.site.publicPath

- Type: `string`
- Default: `/`

等价于 vite 的 `build.outDir` 配置。

一般来说，我们的文档网站会部署在一个域名的子路径上，如 `https://my.github.io/demo-ui/`，这时候 `publicPath` 需要跟子路径保持一致，即 `/demo-ui/`。

```js
module.exports = {
  build: {
    site: {
      publicPath: '/demo-ui/',
    },
  },
};
```

#### build.srcDir

- Type: `string`
- Default: `src`

```js
module.exports = {
  build: {
    srcDir: 'myDir',
  },
};
```

#### build.namedExport

- Type: `boolean`
- Default: `false`

是否通过 Named Export 对组件进行导出。

未开启此选项时，会通过 `export default from 'xxx'` 导出组件内部的默认模块。

开启此选项后，会通过 `export * from 'xxx'` 导出组件内部的所有模块、类型定义。

#### build.configureVite

- Type: `(config: InlineConfig): InlineConfig | undefined`
- Default: `undefined`

vant-cli 使用 vite 来构建组件库和文档站点，通过 `configureVite` 选项可以自定义 [vite 配置](https://vitejs.dev/config/)（从 4.0.0 版本开始支持）。

```js
module.exports = {
  build: {
    configureVite(config) {
      config.server.port = 3000;
      return config;
    },
  },
};
```

在自定义配置时，可以通过 `process.env.BUILD_TARGET` 对构建目标进行区分：

```js
module.exports = {
  build: {
    configureVite(config) {
      const { BUILD_TARGET } = process.env;

      if (BUILD_TARGET === 'package') {
        // 修改组件库构建配置
      }

      if (BUILD_TARGET === 'site') {
        // 修改文档站点构建配置
      }

      return config;
    },
  },
};
```

注意，由于 `vant.config.mjs` 文件会被打包到文档网站的代码中，因此 `configureVite` 中不允许引用 vite 插件。

如果需要配置 vite 插件，可以在 `vant.config.mjs` 的同级目录下创建 `vite.config.ts` 文件，在该文件中你可以添加任意的 vite 配置（该特性从 @vant/cli 5.1.0 版本开始支持）。

#### build.packageManager

- Type: `'npm' | 'yarn' | 'pnpm'`
- Default: `undefined`

指定使用的包管理器。

#### build.bundleOptions

- Type: `BundleOptions[]`

指定打包后产物的格式。

产物格式由三个配置项控制：

```ts
type BundleOption = {
  // 是否压缩代码（注意 es 产物无法被 vite 压缩）
  minify?: boolean;
  // 产物类型，可选值为 'es' | 'cjs' | 'umd' | 'iife'
  formats: LibraryFormats[];
  // 需要 external 的依赖（Vue 默认会被 external）
  external?: string[];
};
```

该选项的默认值为：

```ts
const DEFAULT_OPTIONS: BundleOption[] = [
  {
    minify: false,
    formats: ['umd'],
  },
  {
    minify: true,
    formats: ['umd'],
  },
  {
    minify: false,
    formats: ['es', 'cjs'],
    external: allDependencies,
  },
];
```

## site

#### site.title

- Type: `string`
- Default: `''`

文档站点的标题。

#### site.logo

- Type: `string`
- Default: `''`

文档站点的 Logo。

#### site.description

- Type: `string`
- Default: `''`

标题下方的描述文案。

#### site.nav

- Type: `object[]`
- Default: `undefined`

文档站点的左侧导航，数组中的每个对象表示一个导航分组。

```ts
module.exports = {
  site: {
    nav: [
      {
        // 分组标题
        title: '开发指南',
        // 导航项
        items: [
          {
            // 导航项路由
            path: 'home',
            // 导航项文案
            title: '介绍',
            // 是否隐藏当前页右侧的手机模拟器（默认不隐藏）
            hideSimulator: true,
          },
        ],
      },
    ],
  },
};
```

#### site.versions

- Type: `object[]`
- Default: `undefined`

文档站点多版本配置，当组件库存在多个版本的文档时，可以通过`site.versions`在顶部导航配置一个版本切换按钮。

```ts
module.exports = {
  site: {
    versions: [
      {
        label: 'v1',
        link: 'https://vant-ui.github.io/vant/v1/',
      },
    ],
  },
};
```

#### site.baiduAnalytics

- Type: `object`
- Default: `undefined`

文档网站的百度统计配置，添加这项配置后，会自动在构建文档网站时加载百度统计的脚本。

```ts
module.exports = {
  site: {
    baiduAnalytics: {
      // 打开百度统计 ->『管理』->『代码获取』
      // 找到下面这串 URL: "https://hm.baidu.com/hm.js?xxxxx"
      // 将 `xxxxx` 填写在 seed 中即可
      seed: 'xxxxx',
    },
  },
};
```

#### site.hideSimulator

- Type: `boolean`
- Default: `false`

是否隐藏所有页面右侧的手机模拟器，默认不隐藏

#### site.simulator.url

- Type: `string`
- Default: -

自定义手机模拟器的 iframe URL 地址。

#### site.htmlMeta

- Type: `Record`
- Default: `undefined`

配置 HTML 中的 meta 标签，对象的 key 为 name，value 为 content。

#### site.headHtml

- Type: `string`
- Default: `undefined`

在 `` 标签中插入一段自定义的 HTML 内容。

#### site.enableVConsole

- Type: `boolean`
- Default: `false`

是否在 dev 时开启 [vConsole](https://github.com/Tencent/vConsole) 调试，用于移动端 debug。

#### PostCSS

通过根目录下的`postcss.config.js`文件可以对 PostCSS 进行配置。

##### 默认配置

`vant-cli` 中默认的 PostCSS 配置如下：

```ts
module.exports = {
  plugins: {
    autoprefixer: {},
  },
};
```

#### browserslist

推荐在 `package.json` 文件里添加 browserslist 字段，这个值会被 `autoprefixer` 用来确定目标浏览器的版本，保证编译后代码的兼容性。

在移动端浏览器中使用，可以添加如下配置：

```ts
{
  "browserslist": ["Chrome >= 51", "iOS >= 10"]
}
```

## 目录结构

## 源代码目录

基于 Vant CLI 搭建的组件库的基本目录结构如下所示：

```
project
├─ src                # 组件源代码
│   ├─ button        # button 组件源代码
│   └─ dialog        # dialog 组件源代码
│
├─ docs               # 静态文档目录
│   ├─ home.md       # 文档首页
│   └─ changelog.md  # 更新日志
│
├─ vant.config.mjs    # Vant CLI 配置文件
├─ package.json
└─ README.md
```

单个组件的目录如下：

```
button
├─ demo             # 示例目录
│   └─ index.vue   # 组件示例
├─ index.vue        # 组件源码
└─ README.md        # 组件文档
```

使用 .vue 文件编写组件时，编译后会生成对应的 JS 和 CSS 文件，且 JS 文件中会自动引入 CSS 文件。

如果需要将 JS 和 CSS 解耦，实现主题定制等功能，在编写代码时就要使用独立的 JS 和 CSS 文件，如下所示：

```
button
├─ demo             # 组件示例
│   └─ index.vue   # 组件示例入口
├─ index.js         # 组件入口
├─ index.less       # 组件样式，可以为 less 或 scss
└─ README.md        # 组件文档
```

采用这种目录结构时，组件的使用者需要分别引入 JS 和 CSS 文件。

通过引入样式源文件（less 或 scss）并修改样式变量，可以实现主题定制功能。

## 构建结果目录

运行 build 命令会在 `es` 和 `lib` 目录下生成可用于生产环境的组件代码，结构如下：

```
project
├─ es                   # es 目录下的代码遵循 esmodule 规范
│   ├─ button          # button 组件编译后的代码目录
│   ├─ dialog          # dialog 组件编译后的代码目录
│   └─ index.js        # 引入所有组件的入口 (ESModule)
│
└─ lib                  # lib 目录下的代码遵循 commonjs 规范
    ├─ button           # button 组件编译后的代码目录
    ├─ dialog           # dialog 组件编译后的代码目录
    ├─ index.js         # 引入所有组件的入口
    ├─ index.less       # 所有组件未编译的样式入口
    ├─ index.css        # 打包后的组件样式，用于 CDN 引入
    ├─ [name].js        # 打包后的组件脚本，UMD 格式
    ├─ [name].es.js     # 打包后的组件脚本，ESModule 格式
    ├─ [name].min.js    # 打包和压缩后的组件脚本，UMD 格式
    └─ [name].es.min.js # 打包和压缩后的组件脚本，ESModule 格式
```

单个组件编译后的目录如下：

```
button
├─ index.js         # 组件编译后的 JS 文件
├─ index.css        # 组件编译后的 CSS 文件
├─ index.less       # 组件编译前的 CSS 文件，可以为 less 或 scss
└─ style            # 按需引入样式的入口
    ├─ index.js     # 按需引入编译后的样式
    └─ less.js      # 按需引入未编译的样式，可用于主题定制
```

## 生成类型声明

当组件库使用 TS 编写，且根目录下存在 `tsconfig.declaration.json` 文件，Vant CLI 会自动生成 `.d.ts` 类型声明文件。

`tsconfig.declaration.json` 的参考格式如下：

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "declaration": true,
    "declarationDir": ".",
    "emitDeclarationOnly": true
  },
  "include": ["es/**/*", "lib/**/*"],
  "exclude": ["node_modules", "**/test/**/*", "**/demo/**/*"]
}
```

成功生成类型声明后，请在 `package.json` 中添加类型入口声明：

```json
{
  "typings": "lib/index.d.ts"
}
```


