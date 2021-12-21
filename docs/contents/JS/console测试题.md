## 变量提升
```js
var a = window.a = 'iyunxiao.com'

function hello() {
  console.log(a) //undefined
  var a = 'soho'
  console.log(a) //soho
  console.log(b) // 报错
  let b = 'haofenshu'
}
hello()
```

```js
var a = 1
console.log(b); // b的函数体

(function() {
  console.log(a) // undefined
  var c
  var a = c = { key: 2 }
  a.key = 3
  console.log(c.key) // 3
})()

function b() {}
```
<br/> 


## 普通函数和构造函数的变量访问
```js
function person(name) {
  if(name) {
    // 此处this在无new的情况下指向window，相当于在window上绑定了
    //一个name属性,可以在全局访问这个name
    this.name = name
  }
  console.log(this.name)
}
person.prototype.name = 'Tom'

var human = {
  person: person,
  name: 'Cat'
}
// "" 这里是空字符是因为name是JavaScript的关键字，如果是age等其他变量那么就会age is not defined
person() 
person('Jack') // Jack
new person() // Tom
new person('Rose') // Rose
human.person() // Cat
person.call(window) // Jack
```
<br/> 


## 全局、局部、与原型变量
```js
function sjk() {
  // 当sjk函数被调用时，覆盖了全局getVal变量，所以函数被替换了
  // 在函数内部不用var、let等关键字定义的变量会被挂载到全局window上
  getVal = function(){
    console.log(1)
  }
  return this
}

sjk.getVal = function(){
  console.log(2)
}

sjk.prototype.getVal = function(){
  console.log(3)
}

// 这里覆盖了下面的函数提升
var getVal = function() {
  console.log(4)
}

function getVal(){
  console.log(5)
}

sjk.getVal() // 2
getVal() // 4
sjk().getVal() // 1
getVal() // 1
new sjk().getVal() // 3
```
<br/> 


## this 的作用域
首先你需要了解两个知识点：
* `this` 的缺点
* 词法作用域

### 1、this 的缺点
`this` 的一个缺点，那就是嵌套函数中，里层函数的 `this` 不会从外层函数中继承。

比如下面这个例子：
```js
var myObj = {
  name : " 无限时间 ", 
  showThis: function(){
    console.log(this)
    function bar(){
      console.log(this) // window
    }
    bar()
  }
}
myObj.showThis()
// bar 函数的this并没有继承 showThis 函数中的this
```
要想解决这种不能继承的问题，可以在外层函数中用一个变量保存 `this` 

### 2、词法作用域
`JavaScript` 中函数的作用域采用的是词法作用域，即函数和块的作用域在声明他们的时候就已经决定了，而不是由调用他们的位置来决定
```js
var a = 'global'

function foo() {
  console.log(a);
}

function bar() {
  var a = 'bar'
  foo()
}

bar()  // global
```

```js
function bar() {
    console.log(myName)
}
function foo() {
    var myName = "天堂"
    bar()
}
var myName = "地狱"
foo() // 地狱
```


### 测试题
```js
var name = "The Window"; 
var object = {     
   name : "My Object", 
   getNameFunc : function() {
      console.log(this.name);  // My Object      
      return function() {             
         return this.name;        
      }  
   } 
}
console.log(object.getNameFunc()()); 	// The Window
```

```js
var obj = {
   fn:function() {
      console.log(this);  // obj
      function A(){
         console.log(this);  // window
      }
      A();
      return function() {
         console.log(this);  // window
      }     
   }
}
obj.fn()();
```
<br/> 


## let、const与var的区别
* `let、const` 声明的全局变量不会挂在顶层对象（`window`）下面
* 存在块级作用域
* 不存在变量提升
* 存在暂时性死区
* 不可重复声明
```js
let name = '天堂'
const obj = {
  name: '人间',
  son: {
    name: '地狱',
    getName: function() {
      console.log(this.name)
    }
  }
}

function getName() {
  console.log(window.name, 'this')
  console.log(this.name)
}

let { name: n } = obj
console.log(name, n) // 天堂，人间
obj.son.getName() // 地狱
getName() // 空
// 为什么是空而不是undefined呢？因为name是js中的一个关键字
// let、const声明的全局变量不会挂在顶层对象（window）下面
```

暂时性死区：只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量
```js
var a = 1
function fn() {
  console.log(a)
  let a = 2
}
fn()
// Uncaught ReferenceError: Cannot access 'a' before initialization
console.log(a) 
```

```js
var tmp = 123
if (true) {
  // Uncaught ReferenceError: Cannot access 'tmp' before initialization
  tmp = 'abc' 
  let tmp
}
let myname= '极客时间'
{
  // Uncaught ReferenceError: Cannot access 'myname' before initialization
  console.log(myname) 
  let myname= '极客邦'
}
```