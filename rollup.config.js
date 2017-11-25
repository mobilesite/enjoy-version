/**
 *
 * @author mobilesite
 * @email mobilesite@163.com
 * @since  2017-11-25
 */
'use strict';

console.log('building start:');
let rollup = require('rollup');
let replace = require('rollup-plugin-replace');
// Rollup的模块引用只支持 ES6 Module，其他的需要采用 npm 和 commonjs 的插件去解决
let json = require('rollup-plugin-json');// allows Rollup to import data = requirea JSON file
let nodeResolve = require('rollup-plugin-node-resolve');// teaches Rollup how to find external modules
let commonjs = require('rollup-plugin-commonjs');// the majority of packages on npm are exposed as CommonJS modules. We need to convert CommonJS to ES2015 before Rollup can process them.
let eslint = require('rollup-plugin-eslint');
let globals = require('rollup-plugin-node-globals');
let builtins = require('rollup-plugin-node-builtins');
let istanbul = require('rollup-plugin-istanbul');
let babel = require('rollup-plugin-babel');
let uglify = require('rollup-plugin-uglify');
let minify  = require('uglify-js').minify;
let babelrc = require('babelrc-rollup').default;
// let babelConfig  = require('./.babelrc.js');
let pkg = require('./package.json');
let external = Object.keys(pkg.dependencies);
let shell = require('shelljs');

const formatArr = [
    'es',
    'amd',
    'cjs',
    'iife',
    'umd'
];

shell.rm('-rf', 'dist');

// formatArr.map((item) => {
//     console.log(`building ${item} ...`);
//     rollup.rollup({
//         input: 'src/index.js',
//         plugins: [
//             json(),
//             eslint({ // https://www.npmjs.com/package/rollup-plugin-eslint
//                 throwError: true,
//                 exclude: ['package.json', 'node_modules/**']
//             }),
//             // Replace strings in files while bundling them.
//             // https://github.com/rollup/rollup-plugin-replace
//             replace({
//                 exclude: 'node_modules/**',
//                 CURRENT: JSON.stringify(process.env.NODE_ENV)
//             }),
//             istanbul({
//                 exclude: ['test/**/*', 'node_modules/**/*']
//             }),
//             nodeResolve({
//                 jsnext: true,
//                 extensions: ['.js', '.json']
//             }),
//             commonjs(),
//             babel(babelrc({ addModuleOptions: false })),// https://github.com/eventualbuddha/babelrc-rollup/issues/6
//             // https://github.com/TrySound/rollup-plugin-uglify
//             (process.env.NODE_ENV === 'production' && uglify(
//                 {
//                     output: {
//                         comments: function(node, comment) {
//                             let text = comment.value;
//                             let type = comment.type;
//                             if (type == "comment2") {
//                                 // multiline comment
//                                 return /@preserve|@license|@cc_on/i.test(text);
//                             }
//                         }
//                     }
//                 },
//                 minify
//             ))// 注意这里的minify，相应地需要在package.json中添加"uglify-js": "git+https://github.com/mishoo/UglifyJS2.git#harmony"，再重新install一下，解决uglify默认无法处理ES2015语法的问题
//         ],
//         external: external
//     }).then((bundle) => {
//         bundle.write({
//             format: item,
//             name: 'enjoy-version',// UMD、IIFE模式中需要 name
//             sourcemap: true,
//             file: item === 'es' ? `dist/enjoy-version.${item}.mjs` : `dist/enjoy-version.${item}.js`
//         });
//     }).catch(function(err){
//         // 注意下rollup的这种用catch方法捕获错误的方式，对于我们获知打包中的错误很有用。
//         // 而且，如果是自己写用 try catch 语句的方式，并不能捕获这些错误
//         console.log(err);
//     });
// });

module.exports = {
    input: 'src/index.js',
    plugins: [
        json(),
        eslint({ // https://www.npmjs.com/package/rollup-plugin-eslint
            throwError: true,
            exclude: ['package.json', 'node_modules/**']
        }),
        // Replace strings in files while bundling them.
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
        babel(babelrc({ addModuleOptions: false })),// https://github.com/eventualbuddha/babelrc-rollup/issues/6
        // https://github.com/TrySound/rollup-plugin-uglify
        (process.env.NODE_ENV === 'production' && uglify(
            {
                output: {
                    comments: function(node, comment) {
                        let text = comment.value;
                        let type = comment.type;
                        if (type == 'comment2') {
                            // multiline comment
                            return /@preserve|@license|@cc_on/i.test(text);
                        }
                    }
                }
            },
            minify
        ))// 注意这里的minify，如果用的是uglify2，相应地需要在package.json中添加"uglify-js": "git+https://github.com/mishoo/UglifyJS2.git#harmony"，再重新install一下，解决uglify默认无法处理ES2015语法的问题
    ],
    external: external,
    output: [
        {
            format: 'es',
            name: 'enjoyVersion',// UMD、IIFE模式中需要 name
            sourcemap: true,
            file: 'dist/enjoyVersion.es.mjs'
        },
        {
            format: 'amd',
            name: 'enjoyVersion',// UMD、IIFE模式中需要 name
            sourcemap: true,
            file: 'dist/enjoyVersion.amd.mjs'
        },
        {
            format: 'cjs',
            name: 'enjoyVersion',// UMD、IIFE模式中需要 name
            sourcemap: true,
            file: 'dist/enjoyVersion.cjs.mjs'
        },
        {
            format: 'iife',
            name: 'enjoyVersion',// UMD、IIFE模式中需要 name
            sourcemap: true,
            file: 'dist/enjoyVersion.iife.mjs'
        },
        {
            format: 'umd',
            name: 'enjoyVersion',// UMD、IIFE模式中需要 name
            sourcemap: true,
            file: 'dist/enjoyVersion.umd.mjs'
        }
    ]
}
