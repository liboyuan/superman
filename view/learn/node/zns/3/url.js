var urlLib=require('url');
console.log(urlLib.parse('http://www.baidu.com/index.html?lee=888&age=20'))

console.log(urlLib.parse('http://www.baidu.com/index.html?lee=888&age=20',true))
