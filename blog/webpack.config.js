const HtmlWebpackPlugin = require('html-webpack-plugin')
new HtmlWebpackPlugin() //在插件中配置
module.exports = {
  /*entry: './src/app.js', //项目入口，根据入口文件查询依赖关系
  output: {
    path: path.resolve(__dirname, 'dist'), //文件放在当前目录下的dist文件下
    filename: 'my-first-webpack.bundle.js' //由webpack打包后生成的文件名称
  },*/
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Webpack Vue',
      template:'./public/index.html'
    })
  ]
};
