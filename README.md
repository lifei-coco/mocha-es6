# mocha-es6
mocha前端自动化测试es6

由于 `karma` 是不支持 `ES6` 的， 所以需要通过 `Babel` 转义成 `ES5`。然而即便是这样也还是不行，考虑到 `Babel` 是将 `ES6` 的模块系统转换为 `commonjs` 的模块系统，而 `Karma` 是直接把匹配到的脚本放在浏览器环境里跑的，浏览器环境里肯定没有 `require、module.exports` 这种东西的。

此时就需要用到 `webpack`了，`karma-webpack` 可以和 `karma` 协同工作的。

```
$ npm install --save-dev karma-webpack
```

karma-webpack 提供了两种方式加载测试文件，配置如下：

```
files: [
  'test/*_test.js',
  'test/**/*_test.js'
],
preprocessors: {
  'test/*_test.js': ['webpack'],
  'test/**/*_test.js': ['webpack']
},
webpack: {
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: "babel-loader"
            },
            exclude: /node_modules/
        }]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': "development"
        })
    ]
},
```
此时，被加入 files 配置匹配的文件都被认为是入口点（entry），并加上 webpack 的预处理配置即可（有了 webpack 结合 commonjs 的模块系统，就不需要手动加入项目源码了，仅引入测试代码就行）。
不过下面这种方式更加简单，只需要一个文件 `test.webpack.js` ：

```
// test.webpack.js
// 加载所有的测试用例
// testsContext.keys().forEach(testsContext)这种写法是webpack中的加载目录下所有文件的写法
// 匹配的是test目录，里面是存放的是测试用例
const testsContext = require.context('./test', true, /\.test.js/);
testsContext.keys().forEach(testsContext);
```

本质上就是把所有匹配到的文件都 `require` 一遍，比如我上面就把所有 `test` 文件夹下的 `.test.js` 结尾的文件都跑了一遍，`Karma` 的配置也稍微精简了点。

```
files: [
  'tests.webpack.js'
],
preprocessors: {
  'tests.webpack.js': [ 'webpack' ]
},
webpack: {
    module: {
        rules: [{
            test: /\.js$/,
            use: {
                loader: "babel-loader"
            },
            exclude: /node_modules/
        }]
    },
}
```

注意：项目如果比较大，代码量较多的时候，webpack 打包会比较慢。

## 完整 `karma.conf.js` 配置

```
// Karma configuration
// Generated on Thu Sep 27 2018 14:45:16 GMT+0800 (CST)
var webpack = require('webpack');

module.exports = function(config) {
    config.set({
        /***
         * 基础路径，用在files，exclude属性上
         */
        basePath: "",

        /**
        * 测试框架
        */
        frameworks: ['mocha'],

        /**
         * 测试页面需要加载的资源
         */
        files: [
            'test.webpack.js'
        ],

        /**
         * 排除的文件列表
         */
        exclude: [],

        /**
         * 在浏览器使用之前处理匹配的文件
         */
        preprocessors: {
            'test.webpack.js': ['webpack', 'coverage','sourcemap']
        },

        webpack: {
            module: {
                rules: [{
                    test: /\.js$/,
                    use: {
                        loader: "babel-loader"
                    },
                    exclude: /node_modules/
                }]
            },
            plugins: [
                new webpack.DefinePlugin({
                    'process.env.NODE_ENV': "development"
                })
            ]
        },

        /**
         * 安装的插件列表
         */
        plugins: [
            'karma-mocha',
            'karma-mocha-reporter',
            'karma-spec-reporter',
            'karma-sourcemap-loader',
            'karma-webpack',
            'karma-phantomjs-launcher',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-coverage'
        ],

        /**
         * 测试启动的浏览器
         */
        browsers: ['Firefox', 'Chrome'],

        /**
         * 需要生成哪些代码报告
         * 使用测试结果报告者
         * 可能的值: "dots", "progress"
         */
        reporters: ['mocha', 'coverage','progress'],

        /**
         * 覆盖率报告要如何生成，这里我们期望生成和之前一样的报告，包
         * 括覆盖率页面、lcov.info、coverage.json、以及命令行里的提示
         * 使用reporters为"coverage"时报告输出的类型和那目录
         */
        coverageReporter: {
            dir: 'coverage',
            reporters: [{
                type: 'json',
                subdir: '.',
                file: 'coverage.json',
            }, {
                type: 'lcov',
                subdir: '.'
            }, {
                type: 'text-summary'
            }]
        },

        /**
         * 服务端口号
         */
        port: 9876,

        /**
         * 启用或禁用输出报告或者日志中的颜色
         */
        colors: true,

        /**
         * 日志等级
         * 可能的值：
         * config.LOG_DISABLE //不输出信息
         * config.LOG_ERROR    //只输出错误信息
         * config.LOG_WARN //只输出警告信息
         * config.LOG_INFO //输出全部信息
         * config.LOG_DEBUG //输出调试信息
         */
        logLevel: config.LOG_ERROR,

        /**
         * 启用或禁用自动检测文件变化进行测试
         */
        autoWatch: true,

        /**
         * 开启或禁用持续集成模式
         * 设置为true, Karma将打开浏览器，执行测试并最后退出
         */
        singleRun: true,

        /**
         * 并发级别（启动的浏览器数）
         */
        concurrency: Infinity
    });
}
```

注意：经测试，不支持phantomjs环境，不知道哪里配的有问题。
