# 抖音@程序员李钟意主页

## 搭建过程

### 创建仓库并提交到远程

```bash
# 创建目录
mkdir -p gitee.io

# 进入 gitee.io目录
cd gitee.io

# 创建 index.html & mac使用touch 命令 touch index.html
ni index.html
```

index.html

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>抖音@程序员李钟意首页</title>
  </head>

  <body>
    <h1>抖音@程序员李钟意</h1>
    <h2>Hello world</h2>
  </body>
</html>
```

```bash
# 初始化仓库
git init

git add .

git commit -m "Initial commit && add index.html file"

git branch -m master main

# 打开gitee.com 登录，后创建 gitee.io仓库
# 拷贝已有仓库代码

# 把本地仓库提交到远程
git push origin main
```

### Gitee Pages

https://gitee.com/help/articles/4136

首页 - 服务 - Gitee Pages

<img src="./images/gitee_page.jpg"  style="max-width: 600px;"/>

<img src="./images/gitee_page_2.jpg"  style="max-width: 600px;"/>

<img src="./images/gitee_page_3.jpg"  style="max-width: 600px;"/>

<img src="./images/gitee_page_4.jpg"  style="max-width: 600px;"/>

<img src="./images/gitee_page_5.jpg"  style="max-width: 600px;"/>

等待审核通过就好了呀
