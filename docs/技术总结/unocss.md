# UnoCSS

> 文章目录

1. unocss的使用
2. 新字体的引用
3. vscode的插件
4. 使用中的注意事项

## 一、unocss的安装使用

1、安装UnoCSS

```bash
pnpm i -D unocss
```

2、在vite中添加UnoCSS插件

```js
import { presetUno, presetAttributify, presetIcons } from "unocss";
import Unocss from "unocss/vite";
export default defineConfig({
  plugins: [
    ...
    // 添加UnoCSS插件
    Unocss({
        presets: [presetUno(), presetAttributify(), presetIcons()],
    })
  ],
});
```

