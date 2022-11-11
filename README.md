# [抖音@程序员李钟意-首页](https://www.douyin.com/search/%E7%A8%8B%E5%BA%8F%E5%91%98%E6%9D%8E%E9%92%9F%E6%84%8F?source=normal_search&aid=4d36350f-3096-4c80-a221-3960a029e968&enter_from=personal_homepage&focus_method=)

面向搜索引擎编程

程序员李钟意 抖音主页 https://www.douyin.com/user/MS4wLjABAAAAkiur2fK3qQYKHtdnwzT2_ysUpdIbGRMJ_2l3cA_l_3A <br>

程序员李钟意 掘金主页 https://juejin.cn/user/4459274893805927 <br>

---

在线预览 https://xieerduos.github.io/

本地运行

```bash
# install docsify-cli
npm install

# 本地启动服务
# Listening at http://localhost:3000
npm start
```

---

构建部署

```bash
# 构建镜像
docker-compose -f docker-compose.dev.yml build
# 启动服务 后台运行
docker-compose -f docker-compose.dev.yml up -d
```

本地访问地址 http://localhost:3300/

---

多个 docker-compose.yml 通信

构建部署 使用下面的命令执行

```bash
# 创建share_aly_nginx共享网络
# 用于多个docker-compose之间的通信
docker network create -d bridge share_aly_nginx
# 构建镜像
docker-compose build
# 启动服务 后台运行
docker-compose up -d

```

本地访问地址 http://localhost:3300/

---

- [抖音视频更新记录](/douyin/README.md)

- [Docsify 文档网站搭建过程](/docsify/README.md)

- [移动端适配 vw+rem 解决方案](/frontend/移动端适配vw+rem解决方案.md)

- [代码折叠小技巧 region 适用于任何编程语言](/frontend/代码块收起region)
