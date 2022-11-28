// postcss.config.js
module.exports = {
    plugins: {
      // css插件 把px转换为rem
      'postcss-pxtorem': {
        // lib-flexible的rem适配方案：把一行分为10分，每份为十分之一
        // 所以 rootValue 应该设置为设计稿宽度的十分之一
        // vant的设计稿是375，但是如果我们的设计稿是750，需要配置函数
        // rootValue: 37.5,
        rootValue({ file }) {
            return file.indexOf('vant') !== -1 ? 37.5 : 75 
        },
        // 设置要转换的css属性，*表示所有属性
        propList: ['*'],
      },
    },
  };
  