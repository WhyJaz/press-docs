编写一个函数 (parseQueryString) 将 URL 参数解析成一个对象。

正常输入：
```js
http://localhost/#api?name=wz&age=12
```

输出：
```js
{name:"wz",age=12}
```


该题的关键是要处理特殊字符 <code>'?', '&', '=', '#'</code> 。'?' 代表后面的字符串全是查询字符串 '&' 代表参数分割符 '=' 代表参数的名称和值的分隔符，第一个 = 号后面的部分全部为值 '#' 代表后面的部分不会作为请求发送到服务端

```js
function parseQueryString(str) {
  let arr = str.split('#')[0].split('?')
  // 因为可能参数也存在？，所以要用shift方法去掉前面的域名路径，不能直接用arr[1]
  arr.shift()
  var res = {}
  // 防止出现这样的{"":""}返回值
  var queryString = arr.join('?')
  if (queryString.trim().length === 0) {
    return res
  }
  arr = queryString.split('&')
  arr.forEach(item => {
    const newArr = item.split('=')
    res[newArr[0]] = newArr[1]
  })
  return res
}

var str = 'http://localhost:8000/api?name=wz=?1&age?=18#=2'
// {name: "wz", age?: "18"}
```

