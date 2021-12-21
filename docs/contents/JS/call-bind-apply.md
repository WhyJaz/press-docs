## call、bind、apply
这三个方法都不会改变原函数的执行环境，如果他们的第一个参数是 `undefined` 或 `null` 时，会自动替换为全局对象

## bind
基于原函数创建一个指定执行环境的函数
* 参数1：函数的执行环境（作用域）
* 参数2：参数2
* 参数3：参数3
* 参数4+....
```js
var x = 10
var y = 20
var obj = {
    x: 1,
    y: 2
}

function fn(x, y) {
    this.x = x
   this.y = y
   console.log(this.x, this.y)
}

fn() // undefined, undefined
var fn1 = fn.bind(obj, 0, 0)
fn1()  // 0, 0
```

`bind` 方法有几个特点：
* `bind` 之后的新函数不会立即执行，需要手动执行
* 箭头函数 `bind` 后，`this` 不会被改变，永远指向它的上下文
* 函数第一次被 `bind` 后，后面再次 `bind` 不会再被改变
```js
var fn1 = fn.bind(obj, 0, 0).bind(obj1, 100, 100)
fn1()  // 0, 0
```

模拟 `bind`
```js
Function.prototype.myBind = function (context) {
  if (typeof this !== 'function') {
    throw new TypeError('Error')
  }
  var _this = this
  var args = [...arguments].slice(1)
  // 返回一个函数
  return function F() {
    // 因为返回了一个函数，我们可以 new F()，所以需要判断
    // 对返回的函数进行new时会进入以下这个语句
    if (this instanceof F) {
      return new _this(...args, ...arguments)
    }
    return _this.apply(context, args.concat(...arguments))
  }
}
```

<br/> 

## call和apply

`call` 和 `apply`：基于原函数创建一个指定执行环境的函数，并立即执行
* 参数1：函数的执行环境（作用域）
* 参数2：参数，`call` 是一个一个传参，而 `apply` 传递的是一个数组

模拟 `call`
```js
// 模拟一个方法时，去分析这个方法是如何用的，有什么特性，然后再去模拟
Function.prototype.myCall = function(context) {
  if (typeof this !== 'function') {
    return undefined; // 用于防止 Function.prototype.myCall() 直接调用
  }
  // context表示要改变函数作用域的新对象，没有值则为window
  var context = context || window
  const fn = Symbol();
  // this表示调用myCall的这个函数
  context[fn] = this
  // 拿出剩余的参数
  var args = [...arguments].slice(1)
  // 执行一下这个函数
  var result = context[fn](...args)
  // 删除绑定的fn
  delete context[fn]
  // 返回执行后的结果
  return result
}
```


模拟 `apply`
```js
Function.prototype.myApply = function(context) {
  if (typeof this !== 'function') {
    return undefined; // 用于防止 Function.prototype.myCall() 直接调用
  }
  var context = context || window
  const fn = Symbol()
  context[fn] = this
  var result
  // 第二个参数是一个数组，需要判断是否存在
  if (arguments[1]) {
    result = context[fn](...arguments[1])
  } else {
    result = context[fn]()
  }
  delete context[fn]
  return result
}
```

## call、apply 和 bind 的区别？
* 前两者返回的是一个立即执行函数
* 后者会返回一个新的函数体，需要手动执行，可执行多次
* 当三者都不传第一个参数时，默认的传入一个 `this` 是 `window`