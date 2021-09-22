实现一个promise.all

思路：遍历promise，在promise的then方法里判断，因为then表示这个promise肯定执行完毕了

```js
function myAll(promises) {
  return new Promise((resolove, reject) => {
    const results = []
    promises.forEach(item => {
      item.then(res => {
        results.push(res)
        if (results.length === promises.length) {
          resolove(results)
        }
      }).catch(err => {
        reject(err)
      })
    })
  })
}
```
