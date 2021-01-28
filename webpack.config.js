//babel-loader 를 설정하는 webpack.config.js
const path = require('path');
module.exports = {
    entry:"./src/code.js",
    output:{
        path:path.resolve(__dirname,"dist"),
        filename:"code.bundle.js",
    },
    module:{
        rules:[{test:/\.js$/,use:'babel-loader'}],
    },
    optimization:{minimizer:[]},
}