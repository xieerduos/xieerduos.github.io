# Nodejs 爬虫 Jenkins+Puppeteer 定时获取数据

## Jenkins 配置定时任务

https://www.cnblogs.com/qican/p/15508250.html

## 云服务器安装 Puppeteer

我的云服务器系统 centos， 按照 GitHub 官方的步骤未能安装

这是我亲测可用的方法 [Nodejs 爬虫 Centos7 无法运行 Puppeteer 解决方案](/frontend/1125-Nodejs爬虫Centos7无法运行Puppeteer)

## 步骤

| 序号 | 步骤                                  | 备注 |
| :--: | :------------------------------------ | :--- |
|  1   | ssh 登录阿里云                        |      |
|  2   | 执行命令                              |      |
|  3   | 运行 Nodejs 代码                      |      |
|  4   | 启动 Puppeteer 无头浏览器 爬取数据    |      |
|  5   | 根据爬取到的数据生成数据统计 .md 文件 |      |
|  6   | Docsify 文档网站显示出来数据          |      |

## 流程图

```Mermaid
sequenceDiagram
    participant Jenkins
    participant 阿里云
    participant Nodejs
    participant Puppeteer
    participant 抖音
    loop Jenkins+Puppeteer定时获取抖音数据时序图
        Jenkins->>阿里云: ssh登录阿里云
        阿里云->>阿里云: 执行命令
        阿里云->>Nodejs: 运行Nodejs代码
        Nodejs->>Puppeteer: 启动Puppeteer无头浏览器
        Puppeteer->>抖音: 获取抖音页面内容
        抖音-->>Puppeteer: 返回第一页数据
        Puppeteer->>抖音: 滚动浏览器
        Note right of Puppeteer: 滚动多次，直到没有更多数据
        抖音-->>Puppeteer: 页面加载数据完成
        Puppeteer->>抖音: 插入JavaScript通过dom获取页面数据
        抖音-->>Puppeteer: 返回页面数据
        Puppeteer-->>Nodejs: 返回页面数据
        Nodejs-->>Nodejs: 数据处理，把数据写入到.md文件
        Note right of Nodejs: 当然你也可以写入到数据库中
        Note right of Nodejs: 此时Docsify可以看到网站内容
        Nodejs-->>阿里云: 代码执行完成
        阿里云-->>Jenkins: 结束本次任务
    end
```
