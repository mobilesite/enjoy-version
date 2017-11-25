/**
 *
 * @author paian
 * @email  pai_an@qq.com
 * @since  17/3/31
 */

'use strict';

var babel = require('rollup-plugin-babel');
var babelrc = require('babelrc-rollup').default;
var globals = require('rollup-plugin-node-globals');
var builtins = require('rollup-plugin-node-builtins');
var nodeResolve = require('rollup-plugin-node-resolve');
var istanbul = require('rollup-plugin-istanbul');
var eslint = require('rollup-plugin-eslint');
var replace = require('rollup-plugin-replace');
// Rollup的模块引用只支持 ES6 Module，其他的需要采用 npm 和 commonjs 的插件去解决
var json = require('rollup-plugin-json');// allows Rollup to import data = requirea JSON file
var commonjs = require('rollup-plugin-commonjs');// the majority of packages on npm are exposed as CommonJS modules. We need to convert CommonJS to ES2015 before Rollup can process them.

var pkg = require('../package.json');
var external = Object.keys(pkg.dependencies);
var testFiles = [
    'test/**/*_test.js',
    {
        pattern: 'src/**/*.js',
        included: false // false 表示初始化的时候不会使用 script 标签直接将相关 js 引入到浏览器，需要自己写代码加载
    }
];

module.exports = function(config) {
    config.set({
        // 基础路径，将会用在解析所有patterns (eg. files, exclude)
        basePath: '',

        // 使用到的框架
        // 目前支持的框架: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['mocha'],

        // 将会在浏览器中执行的代码 list of files / patterns to load in the browser
        files: testFiles,

        // 需要从files中排除掉的文件
        exclude: [],

        // 在提供给浏览器之前需要做预处理的文件，以及这些文件对应的预处理器。
        // 对于ES6、typescript、coffee 等的编译都在这里进行
        // 目前支持的预处理器: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'test/**/*_test.js': ['rollup']
        },

        // rollup与处理器的配置
        rollupPreprocessor: {
            plugins: [
                json(),
                // https://www.npmjs.com/package/rollup-plugin-eslint
                eslint({
                    throwError: true,
                    exclude: ['package.json', 'node_modules/**']
                }),
                // 打包的时候将被打包文件中的指定字符串替换为指定的值
                // https://github.com/rollup/rollup-plugin-replace
                replace({
                    exclude: 'node_modules/**',
                    CURRENT: JSON.stringify(process.env.NODE_ENV)
                }),
                istanbul({
                    exclude: ['test/**/*', 'node_modules/**/*']
                }),
                globals(),
                builtins(),
                nodeResolve({
                    jsnext: true,
                    extensions: ['.js', '.json']
                }),
                commonjs(),
                babel(babelrc({ addModuleOptions: false }))
            ],
            external: external,
            format: 'iife',
            moduleName: 'enjoy-version',// UMD、IIFE模式中需要 moduleName
            sourceMap: 'inline'
        },

        // 所用的测试结果报告器（reporter）
        // possible values: 'dots', 'progress'
        // 当前可用的报告器: https://npmjs.org/browse/keyword/karma-reporter
        reporters: [
            'progress',
            'coverage' // 这里使用karma-coverage这个报告器来生成覆盖率报告
        ],

        // 配置karma-coverage这个报告器，可选
        // coverageReporter: {
        //     type : 'html',
        //     dir : 'coverage/',
        //     // 仪表化器配置
        //     instrumenterOptions: {
        //         istanbul: { noCompact: true } // 不压缩
        //     }
        // },

        // 服务器端口
        port: 9876,

        // 控制输出的报告和log是否带有颜色
        colors: true,

        // 日志级别
        // 可选的值: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,

        // 是否允许监听文件变化并在文件变化时自动执行测试
        autoWatch: true,

        // 要测试的目标环境
        // 可用的浏览器启动器（launcher）: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'], // 'PhantomJS', 'Firefox', 'Chrome', 'ChromeCanary', 'Safari', 'Opera', 'IE'等

        // 持续集成模式
        // 如果设置singleRun: true，则测试完成后将关闭浏览器
        singleRun: false,

        // 并发级别
        // 需要同时打开多少个浏览器，infinity－无穷大
        concurrency: Infinity
    })
}
