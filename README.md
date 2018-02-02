# Koa-Vue-template

 > 一个简单的Koa-Vue脚手架，使用webpack作为打包工具。前端部署方式：将webpack打包生成的静态资源放到后端静态资源目录，没有实现前后端的解耦

### 项目结构
```
 |-- PROJECT,
   '    |-- README.md,
   '    |-- App   => 前端
   '    |   |-- index.html  => HtmlWebpackPlugin 模板文件
   '    |   |-- build  => webpack开发环境生产环境配置文件 + build配置文件(生产环境webpack打包、静态资源放置)
   '    |   |-- config  => 工程配置文件
   '    |   |-- src  => 前端源文件目录
   '    |   |-- static   => 静态资源文件目录
   '    |-- Server  => 后盾
   '        |-- common  => 初始化文件目录
   '        |-- config  => 工程配置文件
   '        |-- logs  => 日志输出文件
   '        |-- router  => 路由
   '        |-- servers  => server服务
   '        |-- static  => App 生产环境生产的静态资源(css | js)存放目录，以供部署使用
   '        |-- view  =>  App生产环境生产的静态资源(html)存放目录，以供部署使用
```

### 依赖
详见App/package.json & Server/package.json

### App
- [X] 前端开发只支持Vue（webpack打包只配置了vue-loader）
- [X] style支持 css 、less、sass、scss、stylus，使用时需要自行配置(App/config/index.js - styleLang)
- [X] 开发环境使用webpack-dev-server提供开发server，实时debug

### Server
- [X] 使用egg-logger进行日志管理
- [X] 使用koa-nunjucks-2模板引擎渲染html

### something need to be done
- [ ] 未实现前后端解耦
- [ ] Server端缺少Model部分
- [ ] 使用egg-logger处理日志，出现空error文件，核心问题在于egg-logger中对stream进行error监听，暂时未找到好的解决方案
``` JavaScript
      mkdirp.sync(path.dirname(this.options.file));
      const stream = fs.createWriteStream(this.options.file, { flags: 'a' });

      const onError = err => {
          console.error('%s ERROR %s [egg-logger] [%s] %s',
                utility.logDate(','), process.pid, this.options.file, err.stack);
          this.reload();
          console.warn('%s WARN %s [egg-logger] [%s] reloaded', utility.logDate(','), process.pid, this.options.file);
        };
      stream.on('error', onError);
      stream._onError = onError;
      return stream;
```

### Thanks
这个脚手架参考了@berwin的[koa-vue-template](https://github.com/berwin/koa-vue-template) 以及 Vue官方模板[vuejs-templates/webpack](https://github.com/vuejs-templates/webpack)

非常感谢
