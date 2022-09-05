# vue3-webportal
基于vue3、vite2、element-plus等插件封装的前端开发框架，实现通过配置加载资源，通过mock快速调试。

## 前端开发说明

```bash
# 克隆项目
git clone https://github.com/wenso/vue3-webportal.git

# 进入项目目录
cd vue3-webportal

# 安装依赖
npm install
或
yarn install

# 建议不要直接使用 cnpm 安装依赖，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 http://localhost:80

## 发布

```bash
# 运行本地开发环境  配置文件.env.dev
npm run dev

# 构建测试环境  配置文件.env.sit
npm run sit

# 构建预生产环境   配置文件.env.uat
npm run uat
```

## 代码结构

```bash
# 系统模块

base-webportal                       
├── core                                 // 通用模块
│       └── base                         // 基础模块，包含页面结构、异常页面、登录、个人信息等基础代码
│       └── mock                         // 通用模块相关接口mock
│       └── plugins                      // 第三方插件引用代码
│       └── router                       // router路由基础模块
│       └── store                        // store基础模块
│       └── system                       // 系统管理模块，包含用户、权限、角色、字典、组织等基础代码
│       └── theme                        // 前端主体目录，包含基础样式
│       └── utils                        // 前端基础工具类
│       └── App.vue                      // 前端根组件
│       └── index.js                     // 基础模块入口文件
├── src                                  // 业务模块
│       └── apis                         // 服务接口文件，放置对应服务接口的配置
│       └── assets                       // 文件资源目录
│       └── components                   // 公共vue组件目录
│       └── config                       // 模块配置目录
│       └── icons                        // svg图标目录
│       └── lang                         // 国际化语言配置目录
│       └── mock                         // 接口mock文件目录
│       └── store                        // 业务store目录
│       └── theme                        // 业务主体样式目录
│       └── utils                        // 业务定义工具类目录
│       └── views                        // 业务vue视图目录
│       └── main.js                      // 系统入口文件
├── public                               // 非打包目录
│       └── config.js                    // 私有化配置文件
│       └── favicon.ico                  // 系统图标
│       └── index.html                   // 主页面
├──.env.dev                              // 开发环境配置文件
├──.env.sit                              // 测试环境配置文件
├──.env.uat                              // 预生产环境配置文件
├──.eslintrc.js                          // 代码检测配置文件
├──package.json                          // 包配置文件
├──vite.config                           // 构建配置文件
```
## 配置说明
```bash
#集成方法

#接口配置
#mock配置
#路由配置
#构建配置

```

## 组件使用
```bash
#Form表单
#Table表格
#Dialog弹窗
#Tree树形
#Menu菜单


```
