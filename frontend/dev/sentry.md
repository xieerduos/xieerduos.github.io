# Sentry

埋点系统与错误监控结合，6 爆了 https://www.jianshu.com/p/f3349a0c4bb1

## 什么是 Sentry？

Sentry 是一个开发人员优先的错误跟踪和性能监控平台，可帮助开发人员了解实际问题，更快地解决问题，并不断了解他们的应用程序。

> Sentry is a developer-first error tracking and performance monitoring platform that helps developers see what actually matters, solve quicker, and learn continuously about their applications.

github 官网开源库 https://github.com/getsentry/sentry

sentry-JavaScript https://github.com/getsentry/sentry-javascript

## Docker 安装部署 Sentry 后台

```bash
Docker 19.03.6+
Compose 1.28.0+
4 CPU Cores
8 GB RAM
20 GB Free Disk Space
```

查看 docker docker-compose 版本

```bash
docker version

docker-compose version
```

github 地址 https://github.com/getsentry/self-hosted

```bash
git clone git@github.com:getsentry/self-hosted.git

./install.sh
```

[反向代理 sentry 服务 - Sentry 之 Nginx 使用](https://github.com/moooofly/MarkSomethingDownLLS/blob/master/Sentry%20%E4%B9%8B%20Nginx%20%E4%BD%BF%E7%94%A8.md)

数据清理 http://www.manongjc.com/detail/25-rzysvzafnguncta.html

## Sentry 语言修改为简体中文

https://blog.csdn.net/socct_yj/article/details/105506710
