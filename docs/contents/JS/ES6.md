## 常用的 ES6 语法
* 基础用法：let、const、解构赋值、扩展运算符、箭头函数、
* 中级用法：promise、class、模块化
* 高级用法：map、set、weakMap、weakSet

<br/> 



## let、const、var的区别？
* var 没有块级作用域，可以被重复定义；不初始化访问时不会报错，会输出   undefined；在函数内部不用 var 声明时会被定义为全局变量
* let 定义的变量不能被重复定义，有块级作用域
* cosnt 定义的是常量，声明时必须初始化且不能重新被赋值

<br/> 



## 箭头函数和普通函数的区别？
箭头函数不能 bind，没有 arguments，没有 this ，所以不能 new，也不能作为构造函数，这些原因是因为箭头函数没有 prototype

<br/> 



## async 和 promise 的区别？
* async/await 是 Generator 函数的语法糖
* async/await 使得异步代码看起来像同步代码
* async/await 与 Promise 一样，是非阻塞的；使用 async 的函数，会隐式地返回一个 promise
* 在多个 then 链式调用时，async 让代码更简洁，更易于调试

<br/> 



## promise.then()与catch()
Promise.then(fn1, fn2) 与 Promise.then(fn1).catch(fn2) 的区别？

* 首先第一个不会执行 fn2，then 只执行第一个回调函数
* 第二个，当fn1错误时，catch捕获到执行fn2

Promise.then(fn1, fn2)，fn1 执行错了，fn2 还能继续执行吗？catch 能捕获到 fn1 的错误吗？

promise.then 只会执行传入的第一个回调函数，第二回调函数直接忽略；catch 能捕获到 then 里面的错误

## Set和Map、Object、Array的区别
### map和object的区别
* Map 的size 可以直接获取，Object 要手动计算
* Object 有原型链，可能与原型链上已有的 key 产生冲突

### set 和 Array 的区别
* set 是一个类似数组的结构，但是成员值都是唯一的
* 在 set 中，set 认为 NaN 等于 NaN
* 数组可以通过下标访问，但是 set 只能遍历访问

### map 和 set
* map（字典）是以 key-value 的形式存储的，set（集合）是以 key-value 的形式存储的，set 只需要提供 value，会自动生成 key
* 两者都可以存储不重复的值，map 初始设置值时需要提供一个二维数组，而 set 是一个一维数组
* set 遍历时，key 和 value 是一模一样的

### weakSet
比较适合临时存放一组对象，不用考虑手动释放引用，不会导致内存泄漏，WeakSet 的一个用处，是储存 DOM 节点，而不用担心这些节点从文档移除时，会引发内存泄漏。

WeakSet 的成员只能是对象，而不能是其他类型的值。WeakSet 中的对象都是弱引用，即垃圾回收机制不考虑 WeakSet 对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于 WeakSet 之中。

WeakSet 不能遍历，是因为成员都是弱引用，随时可能消失，遍历机制无法保证成员的存在，很可能刚刚遍历结束，成员就取不到了

### weakMap
WeakMap 的设计目的在于，有时我们想在某个对象上面存放一些数据，但是这会形成对于这个对象的引用，导致垃圾回收机制没法回收掉，所以这时使用 WeakMap 非常合适，它不需要手动删除引用，和 weakSet 一样，它也不能遍历

典型应用场景就是用 DOM 节点作为 key，WeakMap 只接受对象作为 key（null除外），不接受其他类型的值作为 key。WeakMap 的 key 所指向的对象，不计入垃圾回收机制。