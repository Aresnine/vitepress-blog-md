# TypeScript


## 关于TypeScript的一些讨论

1. TypeScript的本质

   类型约束

2. 基于现状TypeScript的使用场景

   > 使用

   ```
   中大型项目，需要长期维护的项目，底层库or框架
   好处：
   	1. 工程质量
   	2. 工作效率
   ```

   > 不使用

   ```
   小千行的代码项目，不需要长期维护的项目
   ```

3. 使用TypeScript的感受

   1. 功能维度
   2. 类型维度

## vscode配置与插件

### 插件

1. [TypeScript Importer](https://link.juejin.cn/?target=https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Dpmneo.tsimporter)
2. [Move TS](https://link.juejin.cn/?target=https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3Dstringham.move-ts)
3. [ErrorLens](https://link.juejin.cn/?target=https%3A%2F%2Fmarketplace.visualstudio.com%2Fitems%3FitemName%3DPhilHindle.errorlens)

### 配置

TypeScript的扩展设置

1. Function Like Return Types，显示推导得到的函数返回值类型；
2. Parameter Names，显示函数入参的名称；
3. Parameter Types，显示函数入参的类型；
4. Variable Types，显示变量的类型。

## TypeScript的使用

### 1、类型是什么？

1. 不同的类型占据的内存大小不同
2. 不同的类型变量可做的操作不同

**如果能保证对某种类型只做该类型允许的操作，这就叫做`类型安全`**

**类型检查是为了保证类型安全**

### 2、类型检查

- 动态类型检查（js）:运行时做类型检查
- 静态类型检查（ts）:编译时做类型检查

### 3、类型系统

1. 简单类型系统
2. 支持泛型的类型系统（类型参数）
3. 支持类型编程的类型系统（**对传入的类型参数（泛型）做各种逻辑运算，产生新的类型，这就是类型编程。**）

> 类型编程案例： 获取对象中的属性

```
function getPropValue<T extends object,Key extends keyof T>(obj: T, key: Key): T[Key] {
    return obj[key];
}
```

### 4、类型

JS类型：

- 基础类型：number、boolean、string、object、bigint、symbol、undefined、null


- 包装类型：Number、Boolean、String、Object、Symbol


- 复合类型：class、Array


TS类型：

- **元组（Tuple）**就是元素个数和类型固定的数组类型
- **接口（Interface）**接口可以用来描述函数、构造器、索引类型（对象、class、数组）等复合类型
- **枚举（Enum）**是一系列值的复合

- **never** 代表不可达，比如函数抛异常的时候，返回值就是 never。
- **void** 代表空，可以是 undefined 或 never。
- **any** 是任意类型，任何类型都可以赋值给它，它也可以赋值给任何类型（除了 never）。
- **unknown** 是未知类型，任何类型都 可以赋值给它，但是它不可以赋值给别的类型。

此外，typescript还支持字面量类型，类似数字可以使用`11`，字符串可以使用`'aa'`,对象可以使用`{}`

> 字符串字面量

- 普通的字符串字面量： `'aa'`
- 模板字面量：`'aa${string}'` 表示以aa开头的字符串

#### 4.1 元组

```typescript
type Tuple = [number, string];
```

#### 4.2 枚举

> 普通枚举

```
enum color {
  red, // 0
  green, // 1
  blue, // 2
}
```

> 设置初始值得枚举

```
// 设置初始值的枚举

enum Week {
  d1 = "星期一",
  d2 = "星期二",
  d3 = "星期三",
  d4,
  d5,
  d6,
  d7,
}
```

<b style="color:red;">Enum member must have initializer</b>

> 正确的方式：

```
// 设置初始值的枚举

enum Week {
  d1 = "星期一",
  d2 = "星期二",
  d3 = "星期三",
  d4 = 2,
  d5, // 3
  d6, // 4
  d7, // 5
}
```

注意点：对于枚举，当使用普通定义方式，没有给任何一个成员赋值的时候，此时默认值从0开始依次递增，当使用全部字符串可以，当使用部分字符串的时候，必须确保最后一个值为数字，方便后面的依次递增

#### 4.3 接口

> 对象

```ts
interface IPerson {
    name: string;
    age: number;
}

class Person implements IPerson {
    name: string;
    age: number;
}

const obj: IPerson = {
    name: 'guang',
    age: 18
}
```

> 函数

```ts
interface SayHello {
    (name: string): string;
}

const func: SayHello = (name: string) => {
    return 'hello,' + name
}
```

> 构造器

```ts
interface PersonConstructor {
    new (name: string, age: number): IPerson;
}

function createPerson(ctor: PersonConstructor):IPerson {
    return new ctor('guang', 18);
}
```



### 7、number和Number的区别

Number是number的包装类型，经验：建议使用number

- 在 `ts` 中，以 `number` 与 `Number` 举例，前者是 `ts` 中的类型，后者是 `js` 中的对象，其他类型也一个意思。

  ```
  let a:Number = new Number(1)
  let b = a + 1
  ```

  <b style="color:red;">error TS2365: Operator '+' cannot be applied to types 'Number' and 'number'.</b>

### 8、关于enum枚举类型的定义

> 普通枚举

```
enum color {
  red, // 0
  green, // 1
  blue, // 2
}
```

> 设置初始值得枚举

```

// 设置初始值的枚举

enum Week {
  d1 = "星期一",
  d2 = "星期二",
  d3 = "星期三",
  d4,
  d5,
  d6,
  d7,
}
```

**Enum member must have initializer**

> 正确的方式：

```

// 设置初始值的枚举

enum Week {
  d1 = "星期一",
  d2 = "星期二",
  d3 = "星期三",
  d4 = 2,
  d5, // 3
  d6, // 4
  d7, // 5
}
```

注意点：对于枚举，当使用普通定义方式，没有给任何一个成员赋值的时候，此时默认值从0开始依次递增，当使用全部字符串可以，当使用部分字符串的时候，必须确保最后一个值为数字，方便后面的依次递增

### 9、数组

```
// 数组的定义方式
const arr: number[] = [1, 2, 3];
const arr2: Array<number> = [2, 3, 4];
```

### 10、元组 

元素类型和个数确定的数组 tuple

```
// 元组
const t1: [number, string, boolean] = [1, "1", true];
t1.push(2222);
console.log(t1);
```

元组是可以调用push的方法的，因为TS是JS的超集，所以元组能够使用数组的方法，即我们可以通过数组的方法让该元组不再固定大小。(这里说实在有点迷，赋值的时候元组大小固定，调方法又能让元组大小不固定)

### 11、undefined  和 null

默认情况下 null 和 undefined 是所有类型的子类型。 也就是说你可以把 null 和 undefined 赋值给其他类型。前提是strick为false即非严格模式

**但是 undefined 可以给 void 赋值**

### 12、void类型

无效的，用于函数的返回值，表示没有返回值

### 13、never

永不存在的值

```
1、抛出异常的返回值
2、死循环的返回值
```

与void应用种类类似，但是表示改程序不会有任何返回，其中报错中间抛出错误或者死循环

### 14、unknown

any代表任意类型

unknown与any一样，所有类型都可以分配给unknown

> unknown和any的区别

任何类型的值都可以赋值给any，同时any类型的值也可以赋值给任何类型。

unknown任何类型值都可以赋给它，但它只能赋值给unknown和any

> 应用的不同点：

unknown类型的数据在使用之前需要你对类型做一个检查或者缩小其范围，更推荐使用unknown而非any

```
// function decom(callback: any) {
//   // 类型为any，可以对any进行任何操作
//   callback();
// }

// decom(1);

function decom(callback: unknown) {
  // 类型为any，可以对any进行任何操作、
  if (typeof callback == "function") {
    callback();
  }
}
function demo(): void {
  console.log(2222);
}
decom(demo);

```

### 15、object、Object和 {}类型

- object代表所有非原始类型
- Object代表拥有toString、hasOwnProperty方法的类型
- {}和Object一样，表示原始类型和非原始类型的集合

object和Object的区别：

1. object不支持原始类型
2. Object支持string、number、noolean等原始类型，非严格模式下，支持undefined和null

### 16、类

```
class Person {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  sayHi(): void {
    console.log(`Hi, ${this.name}`);
  }
}
```

### 17、数组（这个需要删除处理）

```
const flag1: number[] = [1, 2, 3];
const flag2: Array<number> = [1, 2, 3];
```

### 18、函数

#### 18.1 函数声明

```

function sum(num1: number, num2: number): number {
  return num1 + num2;
}

```

#### 18.2 函数表达式

```
const sum = function (num1: number, num2: number): number {
  return num1 + num2;
};

```

```
const sum = (num1: number, num2: number): number => num1 + num2;

```

#### 18.3 接口定义参数

```
interface sum {
  (num1: number, num2: number): number;
}

```

#### 18.4 可选参数

```
function sum(x: number, y?: number): number {
  if (y) {
    return x + y;
  }
  return x;
}
sum(1, 2);

```

#### 18.5 默认参数

```
function sum1(x: number, y: number = 2): number {
  return x + y;
}
sum1(1)
```

#### 18.6 剩余参数

```
function add(...numbers: number[]): number {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) {
    sum += numbers[i];
  }
  return sum;
}
```

#### 18.7 函数重载

说明：跟js本身的处理方式还是一样的，依旧使用typeof判断参数的类型进行处理

```
function add(x: number, y: number): number;
function add(x: string, y: string): string;
function add(x: any, y: any): any {
  return x + y;
}
```

函数重载真正执行的是同名函数最后定义的函数体 在最后一个函数体定义之前全都属于函数类型定义 不能写具体的函数实现方法 只能定义类型

### 19、类型推论

当没有设置类型约束时，默认会以初始值的类型作为该变量的类型，当没有值时则为any， undefined 和 null等于没有值

```
// 类型推论
// let x = 1;
// x = true; // error TS2322: Type 'boolean' is not assignable to type 'number'.

// 初始值没有赋值，则为any
let x;
x = 1;
x = true;
```

### 20、类型断言

类型断言可以用来手动指定一个值的类型
语法 ：值 as 类型 或者<类型>值
在tsx中必须使用 前者

> 类型断言的用途：

将一个一个联合类型断言为其中一个类型

将父类断言成子类

可以将任意类型断言成any类型

> 总结

- 联合类型可以被断言成其中一个类型
- 父类可以断言成子类
- 任何类型可以断言成any
- any可以断言成任何类型

类型断言只是欺骗编译器，让编译器可以编译通过，但是如果强制类型转换，在执行的过程中回报错

> 例子：

```ts
interface Cat {
  name: string;
  run(): void;
}

interface Fish {
  name: string;
  swim(): void;
}

function isFish(animal: Cat | Fish): boolean {
  if (animal.swim) { // error TS2339: Property 'swim' does not exist on type 'Cat | Fish'
    return true;
  }
  return false;
}

```

```ts
interface Cat {
  name: string;
  run(): void;
}

interface Fish {
  name: string;
  swim(): void;
}

function isFish(animal: Cat | Fish): boolean {
  if ((<Fish>animal).swim) {
    return true;
  }
  return false;
}
```

```typescript
interface Cat {
  name: string;
  run(): void;
}

interface Fish {
  name: string;
  swim(): void;
}

function isFish(animal: Cat | Fish): boolean {
  if ((animal as Fish).swim) {
    return true;
  }
  return false;
}
```

数的参数为接口类型的时候，有点特殊情况，函数的参数支持协变。协变不用关注对象的类型，只需要关心对象的参数。比如下面例子

```
interface a {
  a: number;
  c: number;
}
interface b {
  a: number;
}
function fnc(params1: a): void {
  console.log(params1.a);
}
let A: a = {
  a: 10,
  c: 20,
};
let B: b = {
  a: 10,
};
fnc(B as a);
```

### 21、非空断言

```
let user: string | null | undefined;
// console.log(user.toUpperCase()); //  Object is possibly 'null' or 'undefined'.
// console.log(user?.toUpperCase()); // ES新语法
console.log(user!.toUpperCase()); // 编译过了，但是执行的时候会报js执行错误 TypeError: Cannot read property 'toUpperCase' of undefined
```

### 22、确定值断言

声明可以不会报错，但是在使用之前必须进行赋值

```
let x: number;
console.log(x); // error TS2454: Variable 'x' is used before being assigned.
```

### 23、联合类型(多个类型取其一)

联合类型用`|`分隔，表示取值可以为多种类型中的一种

```
let a:number| string
```

### 24、类型别名

简化联合类型的属性

```
type ns = number | string
let a:ns
```

### 25、交叉类型

跟联合类型对应，多个类型都必须存在 并且的关系

```ts
interface A {
  name: string;
  age: number;
}

interface B {
  name: string;
  sex: string;
}

let person: A & B = {
  name: "xiaoming",
  age: 18,
  sex: "男",
};

```

注意：交叉类型取的多个类型的并集，但是如果key相同但是类型不同，则该key为never类型

其实就是相同的key类型你必须给成一样，否则没有办法调用

### 26、类型守卫

**类型保护是可执行运行时检查的一种表达式，用于确保该类型在一定的范围内**

简而言之就是js中书写代码根据类型不同执行不同操作的一种变种展示，但是ts的写法可以防止程序在书写代码的时候就将所有的情况写全

关键字：switch、typeof、 ===、instanceof、in、 还有一个类型谓词`is`

```ts
interface Dog {
  wang: string;
}
interface Cat {
  miao: string;
}
const isDog = function (animal: Dog | Cat) {
  return "wang" in animal;
};

const getName = (animal: Dog | Cat) => {
  if (isDog(animal)) {
    return (animal as Dog).wang;
  }
};

```

```ts
interface Dog {
  wang: string;
}
interface Cat {
  miao: string;
}
const isDog = function (animal: Dog | Cat): animal is Dog {
  return "wang" in animal;
};

const getName = (animal: Dog | Cat) => {
  if (isDog(animal)) {
    return animal.wang;
  }
};

let mm: Cat = { miao: "miaomiao" };
console.log(getName(mm));

```

### 27、接口

为我们的代码提供一种约定

?: 可选函数或者属性

readonly 属性名  只读属性  只读属性用于限制只能在对象刚刚创建的时候修改其值

ReadonlyArray 类型，它与 Array 相似，只是把所有可变方法去掉了，因此可以确保数组创建后再也不能被修改。

TypeScript 的核心原则之一是对值所具有的结构进行类型检查。 而接口的作用就是为这些类型命名和为你的代码或第三方代码定义数据模型。

> 接口和类型别名

type(类型别名)会给一个类型起个新名字。 type 有时和 interface 很像，但是可以作用于原始值（基本类型），联合类型，元组以及其它任何你需要手写的类型。起别名不会新建一个类型 - 它创建了一个新名字来引用那个类型。给基本类型起别名通常没什么用，尽管可以做为文档的一种形式使用。



### 28、泛型

#### 28.1 基本使用

泛型是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性

```
function getValue<T>(arg:T):T  {
  return arg;
}
```

泛型的语法是尖括号 `<>` 里面写类型参数，一般用 `T` 来表示第一个类型变量名称，其实它可以用任何有效名称来代替

我们有两种方式来使用：

```
getValue<string>('hello'); // 定义 T 为 string 类型
```

```
getValue('hello') // 自动推导类型为 string
```

> 多个参数

```
function getValue<T, U>(arg:[T,U]):[T,U] {
  return arg;
}

// 使用
const str = getValue(['hello', 18]);
```

#### 28.2 泛型约束

```
interface lengthwise {
  length: number;
}

function demo<T extends lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
```

#### 28.3 泛型接口

```
interface KeyValue<T,U> {
  key: T;
  value: U;
}

const person1:KeyValue<string,number> = {
  key: '树哥',
  value: 18
}
const person2:KeyValue<number,string> = {
  key: 20,
  value: '张麻子'
}
```

#### 28.4 泛型类

```
class Test<T> {
  value: T;
  add: (x: T, y: T) => T;
}

let myTest = new Test<number>();
myTest.value = 0;
myTest.add = function (x, y) {
  return x + y;
};

```

这个代码是不能够运行的

#### 28.5 泛型类型别名

```
type Cart<T> = { list: T[] } | T[];
let c1: Cart<string> = { list: ["1"] };
let c2: Cart<number> = [1];
```

#### 28.6 泛型参数的默认类型

```
function createArray<T = string>(length: number, value: T): Array<T> {
  let result: T[] = [];
  for (let i = 0; i < length; i++) {
    result[i] = value;
  }
  return result;
}
```

我们可以为泛型中的类型参数指定默认类型。当使用泛型时没有在代码中直接指定类型参数，从实际值参数中也无法推测出时，这个默认类型就会起作用。有点 js 里函数默认参数的意思。

#### 28.7 泛型工具类型

- typeof

关键词除了做类型保护，还可以从实现推出类型，

```
//先定义变量，再定义类型
let p1 = {
  name: "树哥",
  age: 18,
  gender: "male",
};
type People = typeof p1;
function getName(p: People): string {
  return p.name;
}
getName(p1);
```

- keyof

可以用来获取一个对象接口中的所有 key 值

```
interface Person {
  name: string;
  age: number;
  gender: "male" | "female";
}

type PersonKey = keyof Person; //type PersonKey = 'name'|'age'|'gender';

function getValueByKey(p: Person, key: PersonKey) {
  return p[key];
}
let val = getValueByKey({ name: "树哥", age: 18, gender: "male" }, "name");
console.log(val); // 树哥
```

- in

用来遍历枚举类型：

```
type Keys = "a" | "b" | "c"

type Obj =  {
  [p in Keys]: any
} // -> { a: any, b: any, c: any }
```

- infer

在条件类型语句中，可以用 infer 声明一个类型变量并且对它进行使用。

```
type ReturnType<T> = T extends (
  ...args: any[]
) => infer R ? R : any;
```

infer R 就是声明一个变量来承载传入函数签名的返回值类型，简单说就是用它取到函数返回值的类型方便之后使用。

- extends

有时候我们定义的泛型不想过于灵活或者说想继承某些类等，可以通过 extends 关键字添加泛型约束。

```ts
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
```

现在这个泛型函数被定义了约束，因此它不再是适用于任意类型：

```ts
loggingIdentity(3);  // Error, number doesn't have a .length property
```

当我们传入合法的类型的值，即包含 length 属性的值时：

```ts
loggingIdentity({length: 10, name: '张麻子'}); // 编译正确

```

- 索引访问操作符

使用 `[]` 操作符可以进行索引访问：

```ts
interface Person {
  name: string;
  age: number;
}

type x = Person["name"]; // x is string
```



### 29、内置工具类

#### 29.1 Required

将类型的属性变成必选

```
interface Person {
    name?: string,
    age?: number,
    hobby?: string[]
}

const user: Required<Person> = {
    name: "树哥",
    age: 18,
    hobby: ["code"]
}
```

#### 29.2 Partial

与 Required 相反，将所有属性转换为可选属性

```
interface Person {
    name: string,
    age: number,
}

const shuge:Person = {
  name:'树哥'
} // error  Property 'age' is missing in type '{ name: string; }' but required in type 'Person'.
```

从上面知道，如果必传而我们少穿传了的话，就会报错

我们使用 Partial 将其变为可选

```
type User = Partial<Person>

const shuge: User={
  name:'树哥'
} // 编译正确
```

#### 29.3 Exclude

`Exclude<T, U>` 的作用是将某个类型中属于另一个的类型移除掉,剩余的属性构成新的类型

```
type T0 = Exclude<"a" | "b" | "c", "a">; // "b" | "c"
type T1 = Exclude<"a" | "b" | "c", "a" | "b">; // "c"
type T2 = Exclude<string | number | (() => void), Function>; // string | number
```

#### 29.4 Extract

和 Exclude 相反，`Extract<T,U>` 从 T 中提取出 U

```
type T0 = Extract<"a" | "b" | "c", "a" | "f">; // "a"
type T1 = Extract<string | number | (() => void), Function>; // () =>void
```

#### 29.5 Readonly

把数组或对象的所有属性值转换为只读的，这就意味着这些属性不能被重新赋值。

```
interface Person {
  name: string;
  age: number;
  gender?: "male" | "female";
}

let p: Readonly<Person> = {
  name: "hello",
  age: 10,
  gender: "male",
};
p.age = 11; // error  Cannot assign to 'age' because it is a read-only property.
```

#### 29.6 Record

Record<K extends keyof any, T> 的作用是将 K 中所有的属性的值转化为 T 类型。

```
type Property = 'key1'|'key2'
type Person = Record<Property, string>;

const p: Person = {
  key1: "hello 啊",
  key2: "树哥",
};
```

#### 29.7 Pick（交集）

从某个类型中挑出一些属性出来

```
type Person = {
  name: string;
  age:number;
  gender:string
}

type P1 = Pick<Person, "name" | "age">; // { name: string; age: number; }

const user:P1={
  name:'树哥',
  age:18
}
```

#### 29.8 Omit（去除交集部分）

与Pick相反，`Omit<T,K>` 从T中取出除去K的其他所有属性。

```
interface Person {
  name: string,
  age: number,
  gender: string
}
type P1 = Omit<Person, "age" | "gender">
const user:P1  = {
  name: '树哥'
}
```

#### 29.9 NonNullable

去除类型中的 `null` 和 `undefined`

```
type P1 = NonNullable<string | number | undefined>; // string | number
type P2 = NonNullable<string[] | null | undefined>; // string[]
```

#### 29.10 Parameters

用于获得函数的参数类型所组成的元组类型。

```
type P1 = Parameters<(a: number, b: string) => void>; // [number, string]
```

#### 29.11 ReturnType

用来得到一个函数的返回值类型

```
type Func = (value: string) => string;
const test: ReturnType<Func> = "1";
```

#### 29.12 InstanceType

返回构造函数类型T的实例类型

```
class C {
  x = 0;
  y = 0;
}

type D = InstanceType<typeof C>;  // C
```

### 30、tsconfig.json

#### 30.1 重要字段

- files - 设置要编译的文件的名称；
- include - 设置需要进行编译的文件，支持路径模式匹配；
- exclude - 设置无需进行编译的文件，支持路径模式匹配；
- compilerOptions - 设置与编译流程相关的选项。

#### 30.2 compilerOptions 选项

```json
{
  "compilerOptions": {

    /* 基本选项 */
    "target": "es5",                       // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES6'/'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "module": "commonjs",                  // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": [],                             // 指定要包含在编译中的库文件
    "allowJs": true,                       // 允许编译 javascript 文件
    "checkJs": true,                       // 报告 javascript 文件中的错误
    "jsx": "preserve",                     // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "declaration": true,                   // 生成相应的 '.d.ts' 文件
    "sourceMap": true,                     // 生成相应的 '.map' 文件
    "outFile": "./",                       // 将输出文件合并为一个文件
    "outDir": "./",                        // 指定输出目录
    "rootDir": "./",                       // 用来控制输出目录结构 --outDir.
    "removeComments": true,                // 删除编译后的所有的注释
    "noEmit": true,                        // 不生成输出文件
    "importHelpers": true,                 // 从 tslib 导入辅助工具函数
    "isolatedModules": true,               // 将每个文件做为单独的模块 （与 'ts.transpileModule' 类似）.

    /* 严格的类型检查选项 */
    "strict": true,                        // 启用所有严格类型检查选项
    "noImplicitAny": true,                 // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true,              // 启用严格的 null 检查
    "noImplicitThis": true,                // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true,                  // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

    /* 额外的检查 */
    "noUnusedLocals": true,                // 有未使用的变量时，抛出错误
    "noUnusedParameters": true,            // 有未使用的参数时，抛出错误
    "noImplicitReturns": true,             // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true,    // 报告 switch 语句的 fallthrough 错误。（即，不允许 switch 的 case 语句贯穿）

    /* 模块解析选项 */
    "moduleResolution": "node",            // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "baseUrl": "./",                       // 用于解析非相对模块名称的基目录
    "paths": {},                           // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [],                        // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [],                       // 包含类型声明的文件列表
    "types": [],                           // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true,  // 允许从没有设置默认导出的模块中默认导入。

    /* Source Map Options */
    "sourceRoot": "./",                    // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./",                       // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true,               // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true,                 // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

    /* 其他选项 */
    "experimentalDecorators": true,        // 启用装饰器
    "emitDecoratorMetadata": true          // 为装饰器提供元数据的支持
  }
}
```

