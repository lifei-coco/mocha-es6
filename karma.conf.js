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
         * 覆盖率报告要如何生成，这里我们期望生成和之前一样的报告，包括覆盖率页面、lcov.info、coverage.json、以及命令行里的提示
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
