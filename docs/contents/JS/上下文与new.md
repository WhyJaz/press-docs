## 上下文


<br/> 

## new
一个 <code>new</code> 的调用会发生下面四个过程：
* 生成一个新对象
* 将新对象的 <code>_\_proto__</code> 绑定到构造函数的 <code>prototype</code>
* 绑定 this 为新对象
* 返回这个新对象

模拟实现一个 new
```js
function myNew(con, ...args) {
  const obj = new Object()
  obj.__proto__ = con.prototype
  // 以上两句代码也可以直接换成 const obj = Object.create(con.prototype)
  con.apply(obj, args)
  // 因为构造函数可以直接返回一个对象来重写掉默认的object，所以需要判断
  return result instanceof Object ? result : obj
}
```

对于 new 来说，还需要注意下运算符优先级。
```js
function Foo() {
  console.log('Foo')
}
Foo.getName = function () {
  console.log('1');
};
Foo.prototype.getName = function () {
  console.log('2');
};

new Foo.getName();   // -> 1
new Foo().getName(); // -> 'Foo', 2
```
