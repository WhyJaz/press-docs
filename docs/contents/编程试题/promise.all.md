实现一个 `promise.all`

思路：遍历 `promise`，在 `promise` 的 `then` 方法里判断，因为 `then` 表示这个 `promise` 肯定执行完毕了

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
