// test.webpack.js
// 加载所有的测试用例
// testsContext.keys().forEach(testsContext)这种写法是webpack中的加载目录下所有文件的写法
// 匹配的是test目录，里面是存放的是测试用例
const testsContext = require.context('./test', true, /\.test.js/);
testsContext.keys().forEach(testsContext);
