# Jenkins 部署项目演示

Jenkins 是一款开源的 CI&CD 软件，用于自动化各种任务，包括构建、测试和部署软件。

## 流程

1. 搭建 Jenkins 平台

2. 配置 ssh 登录阿里云服务流水线

3. 配置获取代码仓库和 webhook，自动检出项目根目录下的 Jenkinsfile

4. gitee 代码仓库配置 push 触发 webhook

5. 编写 Jenkins 脚本，Dockerfile 和 docker-compose 部署项目脚本

6. Jenkinsfile 配置登录阿里云并且触发命令执行构建任务

7. 构建完成，执行 docker-compose up -d 启动服务

8. 完成部署
