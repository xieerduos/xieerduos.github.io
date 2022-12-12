# Nodejs 开发接口

实现用户的增删改查、token 处理

使用 Node Express Mongoose jwt passport 这些模块实现

## 源码地址

https://gitee.com/fe521/sso-app

## 启动运行项目

### 安装依赖

```bash
npm install
```

### 运行 MongoDB 服务器

#### docker 方式

构建镜像

```bash
docker-compose -f docker-compose.yml build
```

部署项目

```bash
docker-compose -f docker-compose.yml up -d
```

#### 客户端方式

命令行下运行 MongoDB 服务器

```bash
# D:\mongodb是mongodb的安装目录
D:\mongodb\bin\mongod --dbpath D:\data\db
```

如何安装 Mongodb 看这个文档 https://www.runoob.com/mongodb/mongodb-window-install.html

### 运行项目

```bash
npm start
```

## 实现功能

| 序号 | 接口               | 请求方法 | 功能                         | 备注                                                |
| :--: | :----------------- | :------- | :--------------------------- | :-------------------------------------------------- |
|  1   | /api/register      | post     | 注册                         | 邮箱密码                                            |
|  2   | /api/login         | post     | 登录                         | 邮箱密码                                            |
|  3   | /api/refreshToken  | post     | 刷新 token                   | req.body.userId                                     |
|  4   | /api/logout        | post     | 退出登录                     | req.body.userId (维护一份 token 黑名单)             |
|  5   | /api/users         | get      | 获取用户列表                 | admin 权限                                          |
|  6   | /api/users         | delete   | 批量删除用户                 | admin 权限                                          |
|  7   | /api/users/:userId | get      | 根据 userId 获取单个用户信息 | member 权限，只能获取自己的数据                     |
|  8   | /api/users/:userId | put      | 根据 userId 更新单个用户信息 | member 权限，只能更新自己的数据(不可更改邮箱和角色) |
|  9   | /api/users/:userId | delete   | 根据 userId 删除单个用户信息 | member 权限，只能删除自己的数据                     |

## 生成超级管理员方式

修改这个`seeder.js`文件里面的 register 用户名和密码

```bash
node seeder.js
```

## Postman 自动生成接口文档地址

https://www.postman.com/galactic-rocket-617965/workspace/sso-app/documentation/12310217-483885fa-7a41-49dc-8d3f-afa78bffe836?entity=&branch=&version=
