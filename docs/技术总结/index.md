# 技术总结

## 1、微信环境下，网页不受微信字体影响
> 安卓:

```js
// 强制禁止用户修改微信客户端的字体大小
<script>
       (function() {
           if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
               handleFontSize();
           } else {
               if (document.addEventListener) {
                   document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
               } else if (document.attachEvent) {
                   document.attachEvent("WeixinJSBridgeReady", handleFontSize);
                   document.attachEvent("onWeixinJSBridgeReady", handleFontSize);  }
           }
           function handleFontSize() {
               // 设置网页字体为默认大小
               WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
               // 重写设置网页字体大小的事件
               WeixinJSBridge.on('menu:setfont', function() {
                   WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
               });
           }
       })();
</script>
```

> 苹果：

```css
/* iOS禁止微信调整字体大小 */
body {
    -webkit-text-size-adjust: 100% !important;
    text-size-adjust: 100% !important;
    -moz-text-size-adjust: 100% !important;
}
```



## 2、git报PRC或者网络如error:PRC failed

```

1.  使用"git config --list"查看"http.postBuffer"参数的目前值，如果没有设置，默认值是1兆，确认目前值确实较小。 
2.  使用"git config --global http.postBuffer <xxx>"其中xxx单位为Byte，比如设置524288000（512MB） 
3.  重新运行git远程命令，命令可以成功 

```

## 3、全球低代码平台

低代码是一种通过简化应用程序的创建、维护和更新过程来提高开发效率的开发模式。它可以让非技术人员或小规模开发团队快速构建应用程序，降低开发成本和时间。

现在在业界内，低代码的方案有很多，比如以下几个：

1. Microsoft Power Platform

Power Platform是由微软推出的一套低代码开发平台，包括Power Apps、Power BI和Power Automate。Power Apps可以让用户使用低代码来快速构建自定义的业务应用，Power BI可以帮助用户从各种数据源中汇总和分析数据，并将其可视化呈现，Power Automate支持自动化业务流程以提高生产效率。

2. Google App Maker

App Maker是由谷歌提供的一套简单易用的低代码开发平台，用户可以通过拖放绑定数据等方式，构建自定义的业务应用程序。App Maker提供了很多预定义的应用程序模板和组件，包括报告、表单、工作流等。

3. Mendix

Mendix是一款强大的低代码开发平台，用户可以使用Mendix提供的图形化开发工具来自定义应用程序，并使用Mendix提供的一系列功能和组件，如数据集成、安全性、扩展性、可维护性等，来简化应用程序开发和维护流程。

4. OutSystems

OutSystems是一家葡萄牙的低代码开发平台提供商，他们提供了一套完整的低代码开发平台，用户可以从OutSystems平台中获取集成、安全、用户体验、测试和部署等方面的支持，排除开发中的各种麻烦，提高开发效率。

5. Appian

Appian是一款简单易用的低代码开发平台，用户可以简单地构建自定义的业务应用程序，包括报告、表单、工作流等，并使用Appian的一系列功能和组件来简化开发过程。Appian还支持跨多个设备和平台部署。

总的来说，低代码方案使应用程序开发变得更加容易和快捷，因为用户无需编写大量的代码，也不需要具备高深的编程技能。低代码方案通过提供基础架构、组件和集成支持等，使得应用程序开发过程更加轻松和高效。



## 4、JSON反射生成vue文件

通过json数据生成vue文件是一个比较复杂的过程，需要进行大量的数据处理和模板操作。以下是一些大致的思路和操作流程。

1. 解析json数据，分析数据结构和内容，并提取所需信息，如组件名称、数据、方法等。

2. 根据提取的信息，生成vue组件的模板代码。可以使用类似ejs、handlebars等模板引擎，或者直接使用字符串拼接，将生成的代码转化为字符串形式。

3. 使用文件系统API（如fs等），创建文件并将vue组件的模板代码写入到文件中。

4. 如果需要，可以使用脚本或其他工具，将Vue组件中使用的依赖包进行自动引入，或者执行其他一些自动化操作。

以下给出简单的代码示例，来演示如何基于json数据，生成vue组件的过程：

```javascript
const fs = require('fs')
const ejs = require('ejs')

// 读取json文件并解析
const data = fs.readFileSync('./data.json', 'utf8')
const jsonData = JSON.parse(data)

// 解析数据，获取所需信息
const componentName = jsonData.name
const dataStr = JSON.stringify(jsonData.data, null, 2)
const methods = jsonData.methods || []

// 生成vue组件的模板代码
const template = ejs.render(`
<template>
  <div>
    <!-- TODO: Add component content here -->
  </div>
</template>

<script>
export default {
  name: '<%= componentName %>',
  data() {
    return <%= dataStr %>
  },
  methods: {
    <% methods.forEach(method => { %>
    <%= method %>() {
      // TODO: Add method implementation here
    },
    <% }); %>
  }
}
</script>

<style scoped>
/* TODO: Add component styles here */
</style>
`, {componentName, dataStr, methods})

// 创建vue文件并写入模板代码
fs.writeFile(`./${componentName}.vue`, template, (err) => {
  if (err) throw err
  console.log(`File '${componentName}.vue' created successfully!`)
})
```

需要注意的是，此示例只是基于json数据简单生成了一个最基础的Vue单文件组件代码。在实际应用中，还需要进行更多的处理和判断，以确保生成的代码符合Vue的基本要求和最佳实践，能够正常运行和使用。

## 5、全屏展示功能

1、安装插件

```
pnpm add screenfull --save
```

2、在vue文件中使用

```html
<template>
  <div style="width: 100%;height: 100%;">
    <div style="float: right;height: 100%;position: relative;display: flex;align-items: center;">
      <el-button type="success" @click="screenfullClick">{{ isFullscreen ? '退出全屏' : '全屏展示' }}</el-button>
    </div>
  </div>
</template>
 
<script setup>
  //  按需引入 screenfull
  import screenfull from 'screenfull'
  import { ref, onMounted, onUnmounted } from 'vue'
 
  const isFullscreen = ref(false)
 
  onMounted(() => {
    window.addEventListener('resize', currentScreen)
  })
 
  onUnmounted(() => {
    window.removeEventListener('resize', currentScreen)
  })
 
  // 浏览器改变触发
  const currentScreen = () => {
    if(screenfull.isFullscreen !== isFullscreen.value) isFullscreen.value = screenfull.isFullscreen
  }
  //  点击切换全屏
  const screenfullClick = () => {
    if (screenfull.isEnabled) screenfull.toggle()
  }
</script>
<style scoped>
  .top-right {
    float: right;
    height: 100%;
    position: relative;
  }
</style>
```

## 6、sass在vite中的使用

1、安装，vite现在只需要安装就可以，已经内置解析支持

```
pnpm add -D sass
```

## 7、elementPlus的自动引入

1、安装elementPlus

```
pnpm i element-plus
```

2、安装自动导入插件

```
pnpm install -D unplugin-vue-components unplugin-auto-import
```

3、vite配置

```js
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
})
```

## 8、v-model

```
1、父组件 v-model:name="变量"
2、子组件
	a、接收属性： const props = defineProps['name']
	b、接收事件： const emit = defineEmits(['update:name'])
3、子组件修改
	emit('update:name',值)
```

## 9、pnpm 忽略 lock文件

```bash
pnpm install --no-frozen-lockfile
```

## 10、ts中常用Event事件类型

```js
ClipboardEvent<T = Element> 剪贴板事件对象

DragEvent<T = Element> 拖拽事件对象

ChangeEvent<T = Element> Change 事件对象

KeyboardEvent<T = Element> 键盘事件对象

MouseEvent<T = Element> 鼠标事件对象

TouchEvent<T = Element> 触摸事件对象

WheelEvent<T = Element> 滚轮事件对象

AnimationEvent<T = Element> 动画事件对象

TransitionEvent<T = Element> 过渡事件对象
```

## 11、namespaced:true

这个是为了解决不同模块命名冲突的问题，将不同模块的namespaced:true，之后在不同页面中引入getter、actions、mutations时，需要加上所属的模块名

## 12、pinia两种写法

optionStore和setupStore两种写法

function相当于actions、computed相当于getter、ref相当于state

> optionStore

```js
const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    }
  }
})
```

> setupStore

```js
export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }

  return { count, increment }
})

```

## 13、lodash的使用

```
pnpm i lodash-es -S
pnpm i -D @types/lodash
```

## 其他待整理

1、工具函数导出：https://zhuanlan.zhihu.com/p/443175985

2、https://zhuanlan.zhihu.com/p/443175985

3、ref、torefs、reative

https://juejin.cn/post/7013326406444646407

4、jsonschema

https://juejin.cn/post/7209698674905350205

https://juejin.cn/post/6844903829947826189

https://juejin.cn/post/7205773311606554679

https://juejin.cn/post/6844903576729305096

https://juejin.cn/post/7071174879778242568

5、ts中引入库的正确姿势

https://juejin.cn/post/7052528116345864228

https://cloud.tencent.com/developer/article/2039066

https://juejin.cn/post/7211437215336333372

https://juejin.cn/post/7081628820188430344

https://blog.battlefy.com/tree-shaking-lodash-with-vite

6、chatgpt

https://blog.csdn.net/JakeMa1024/article/details/129030002

https://zhuanlan.zhihu.com/p/612351471

7、

- v-text 支持`?:;`但是不支持`??`
- http://note.q123q.cn/my/work_2021hy/2nodelib/typeorm-date.html
- https://xugaoyi.com/

8、

```ts

/*
 * axios封装
 * 接口请求统一处理，返回Promise对象
 * 可根据项目需要，进一步封装添加拦截器等
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

// 定义接口返回数据类型
interface ResponseData {
  code: number;
  message: string;
  data: any;
}

// 创建axios实例
const request: AxiosInstance = axios.create({
  // 接口统一的请求路径前缀
  baseURL: process.env.VUE_APP_BASE_API,
  // 允许跨域请求携带cookies等凭证
  withCredentials: true,
  // 设置请求超时时间
  timeout: 10000
})

// 请求拦截器
request.interceptors.request.use((config: AxiosRequestConfig) => {
  // const token = localStorage.getItem('token')
  // if (token) {
  //   config.headers.Authorization = token
  // }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    // 根据实际返回自定义统一处理
    const res = response.data as ResponseData
    if (res.code !== 200) {
      console.log(res.message || 'Error')
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res.data
    }
  },
  (error) => {
    console.log('err' + error)
    return Promise.reject(error)
  }
)

export default request

// 使用方法
import request from '@/utils/request'

// GET请求，url参数传递
request.get('/user?ID=12345').then(res=> {
  console.log(res)
})

// GET请求，params参数传递
request.get('/user', {
  params: {
    ID: 12345
  }
}).then(res=> {
  console.log(res)
})

// POST请求，data参数传递
request.post('/user', {
  firstName: 'Fred',
  lastName: 'Flintstone'
}).then(res=> {
  console.log(res)
})

// PUT请求
request.put('/user', {
  firstName: 'Barney',
  lastName: 'Rubble'
}).then(res=> {
  console.log(res)
})

// DELETE请求
request.delete('/user', {
  params: {
    ID: 12345
  }
}).then(res=> {
  console.log(res)
})
```





````js

Vue 3引入了一整套新的API，用于替换Vue 2中的选项和mixins，包括了一些新的Hooks API，可用于处理逻辑和数据的复用。

1. useState

作用：在组件中声明响应式状态。
语法: const [state, setState] = useState(initialState)

示例：

​```javascript
import { defineComponent, onMounted, useState } from 'vue'

export default defineComponent({
  setup() {
    const [count, setCount] = useState(0)

    const increment = () => {
      setCount(count.value + 1)
    }

    onMounted(() => {
      console.log('Mounted')
    })

    return {
      count,
      increment
    }
  }
})
```

2. useEffect

作用：在组件生命周期的特定时间调用副作用，比如API请求、订阅等。
语法: useEffect(callback: () => void, deps?: any[])

示例：

```javascript
import { defineComponent, onMounted, useState, useEffect } from 'vue'
import axios from 'axios'

export default defineComponent({
  setup() {
    const [users, setUsers] = useState([])

    useEffect(() => {
      axios.get('https://jsonplaceholder.typicode.com/users').then(res => {
        setUsers(res.data)
      })
    }, [])

    return {
      users
    }
  }
})
```

3. useRef

作用：在组件之间共享可变值。
语法: const refContainer = useRef(initialValue)

示例：

```javascript
import { defineComponent, onMounted, useRef } from 'vue'
import Child from './Child.vue'

export default defineComponent({
  setup() {
    const nameInput = useRef('')

    const handleFocus = () => {
      nameInput.value.focus()
    }

    return {
      nameInput,
      handleFocus
    }
  },
  components: {
    Child
  }
})
```

```vue
<template>
  <div>
    <input type="text" ref="nameInput" />
    <button @click="handleFocus">Focus</button>
    <Child ref="child" />
  </div>
</template>
```

4. useContext

作用：在组件树中获取全局状态或方法。
语法: const contextValue = useContext(context)

示例：

```javascript
import { createContext, defineComponent, useContext } from 'vue'

const UserContext = createContext()

const Parent = defineComponent({
  setup() {
    return {
      user: {
        name: 'Tom',
        age: 18
      }
    }
  },
  provide() {
    return {
      user: this.user
    }
  },
  components: {
    Child
  }
})

const Child = defineComponent({
  setup() {
    const user = useContext(UserContext)

    return {
      user
    }
  }
})

export default defineComponent({
  setup() {
    return {
      UserContext
    }
  },
  components: {
    Parent
  }
})
```

```vue
<template>
  <UserContext.Provider :value="user">
    <Parent />
  </UserContext.Provider>
</template>
```

5. useWatch

作用：监听变量或prop的变化。
语法: useWatch(source: Ref | () => any | (() => any)[], cb: (newVal: any, oldVal: any) => void, options?: WatchOptions)

示例：

```javascript
import { defineComponent, useWatch } from 'vue'

export default defineComponent({
  props: {
    name: String
  },
  setup(props) {
    useWatch(() => props.name, (newVal, oldVal) => {
      console.log('Name changed:', newVal, oldVal)
    })

    return {
      props
    }
  }
})
```



