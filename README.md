# keywordweb
本项目为包含前后端页面的关键词提取项目。

前端界面使用Vue+部分elementUI完成，主要包含注册登陆页面、关键词提取页面。

关键词提取功能使用python完成，主要使用了python的jieba工具，另外添加了一些词典、提取权重的配置。

springboot主要完成注册登陆内容，并作为中间API通过接口与python交互获得提取的关键词。

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
