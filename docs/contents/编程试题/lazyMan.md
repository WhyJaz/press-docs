实现一个lazyMan

考察知识点：链式调用，队列、eventLoop、闭包、轮询
```js
// 实现一个LazyMan，可以按照以下方式调用:
LazyMan(“Hank”)输出:
Hi! This is Hank!

LazyMan(“Hank”).sleep(10).eat(“dinner”)输出
Hi! This is Hank!
//等待10秒..
Wake up after 10
Eat dinner~

LazyMan(“Hank”).eat(“dinner”).eat(“supper”)输出
Hi This is Hank!
Eat dinner~
Eat supper~

LazyMan(“Hank”).sleepFirst(5).eat(“supper”)输出
//等待5秒

// Wake up after 5
// Hi This is Hank!
// Eat supper
// 以此类推。..
```

具体实现
```js
// 懒汉 类
class LazyManClass {
  constructor (name) {
      this.name = name
      this.queue = [] // 队列
      const task = () => {
        console.log('my name is ' + this.name)
      }
      this.queue.push(task)
      setTimeout(() => {
        this.next()
      }, 0);
  }
  next() {
    const task = this.queue.shift()
    task && task()
  }

  sleep(t) {
    const task = () => {
      setTimeout(() => {
        console.log('sleep')
        this.next()
      }, t * 1000);
    }
    this.queue.push(task)
    return this
  }

  sleepFirst(t) {
    const task = () => {
      setTimeout(() => {
        console.log('sleep first')
        this.next()
      }, t * 1000);
    }
    this.queue.unshift(task)
    return this
  }

  eat() {
    const task = () => {
      console.log('eating')
      this.next()
    }
    this.queue.push(task)
    return this
  }


}

// 懒汉 返回一个懒汉实例
function LazyMan (name) {
  return new LazyManClass(name)
}

LazyMan('小明').eat('午餐').sleep(2).eat('晚餐').sleepFirst(3);
```
