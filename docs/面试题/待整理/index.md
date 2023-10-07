待整理面试题

1、箭头函数和普通函数的区别

1. 箭头函数比普通函数更简洁
2. 箭头函数没有自己的this
3. 箭头函数的this指向永远不会改变
4. call、apply、bind不能改变箭头函数中的this指向
5. 不能作为构造函数
6. 没有arguments
7. 没有自己prototype
8. 箭头函数不能作为Generator函数，不能使用yeild关键字

2、let、const、var

1. var可以重复声明变量 let、const不能
2. var存在变量声明的提升，在变量声明之前使用不会报错，let和const存在暂时性死区，不能再变量声明之前使用变量
3. let和const支持块级作用域
4. const必须设置初始值
5. let和var都可以二次赋值，const称之为常量

4、object.assgn和`...`都可以进行对象的浅拷贝

5、如何实现对象的深拷贝？

6、数组的扩展运算符有什么用？

7、new操作符

1. 创建一个新的空对象
2. 设置原型，将这个对象的原型设置为函数的prototype对象
3. 让函数的this指向这个对象，执行构造函数的代码（为这个对象添加属性）
4. 返回this所指向的对象

8、map

map本质就是键值对的集合，但是普通的对象Object中的键只能是字符串，而ES6提供的map数据结构更类似与对象，但是键不限制范围，可以是任意的类型，是一种更完善的hash结构

> 方法:

- size:返回成员总数
- set：设置值（添加和修改）
- get：获得
- has：是否存在
- delete：删除
- clear：全部清除

> 遍历：

- keys
- values
- entries
- forEach

weakmap设计的目的在于，有时想在对象上面存放一些数据，但是这会形成对于这个对象的引用，一旦不再需要这两个对象，就必须手动删除，否则垃圾回收机制就不会释放是对象的内存。而weakmap的键名 所引用的对象都市弱引用。

9、js脚本延迟加载方式有哪些?

1. defer
2. async
3. 冬天创建dom
4. 使用setTimeout
5. 让js最后加载

10、类数组对象转为数组的方法

1. Array.prototype.slice.call(arrayLike)
2. Array.prototype.splice.call(arrayLike)
3. Array.prototype.concat.apply([], arrayLike)
4. Array.from(arrayLike)

11、es6模块与COmmonjs模块有什么异同？

1. Commonjs是对模块的浅拷贝，ES6 Module是对模块的引用，即ES6 Module只存只读，不能改变其值，也就是指针指向不能改变，类似const
2. import的接口是read-only只读状态，不能修改器变量值，即不能修改其变量的指针指向，但可以改变变量内部指针指向，可以对commonjs重新赋值（改变指针指向），但是对ES6 Module赋值会编译错误



nextick实现方式

缓存

浏览器渲染流程

算法： 复杂度

### 1、生命周期



beforeCreated=》created=》beforeMount=》mounted=》beforeUpdate =》updated =》 beforeDestroy =》 Destroy



keep-alive下： activated  和 deactivated

errorCaptured



### 2、父子生命周期



父beforeCreated =》 父created => 父beforeMounted =》 子 beforeCreated =》 子created =》 子beforeMounted =》 子mounted =》 父mounted



子组件先挂载，然后父组件



更新： 父 beforeUpdate =》 子beforeUpdate =》 子updated =》 父updated



销毁：父 beforeDestroy =》 子beforeDestroy=》 子Destroy =》 父Destroy



在父组件传递接口数据给子组件的时候，一定要在子组件的标签上加上v-if="接口数据"



### 3、组件间的通信

> props, $on, $emit, $parent, $children, ref，$refs, $attrs, $listeners

- 父组件向子组件传值
    - 通过props
- 子组件向父组件传值



### 4、slot



### 5、响应式原理



### 6、diff算法

- 同级比较
- 标签名不同，直接删除，不进行深层次的比较
- 标签名相同，比较key，key相同就认为是相同节点，不继续深度比较



6、虚拟DOM(vitual DOM)

vnode ={

​	tag: '标签名div'，

​	props: {

​		id: 'main'	

​	} ,

​	children: {

​			

​	}

}



7、diff算法（patch）

### 7、patch