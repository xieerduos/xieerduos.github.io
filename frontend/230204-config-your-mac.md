# 配置你的新电脑前端开发环境

## 使用终端打开你的 code .

要在终端中使用 code . 命令打开 Visual Studio Code，您需要将 Visual Studio Code 的可执行文件路径添加到系统的 PATH 环境变量中。

## 安装 vscode

1. 官网安装 vs code

https://code.visualstudio.com/download#

2. 把 vs code 拖拽到 Application 中

把你的 vs code 拖拽到 Application 里面

### 配置环境变量

对于 Bash：在用户的 ~/.bash_profile 文件中添加以下代码：

```bash
export PATH="$PATH:/Applications/Visual Studio Code.app/Contents/Resources/app/bin"
```

```bash
source ~/.bash_profile
```

对于 Zsh：在用户的 ~/.zshrc 文件中添加以下代码：

```bash
export PATH="$PATH:/Applications/Visual Studio Code.app/Contents/Resources/app/bin"
```

```bash
source ~/.zshrc
```

### 在终端使用

```bash
mkdir -p ~/project

cd ~/project

code .
```

## 安装 Homebrew

https://brew.sh/index_zh-cn

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

生成 ssh key

https://www.ssh.com/academy/ssh/keygen

```bash
shaohai.li@192 project % git --version
git version 2.37.1 (Apple Git-137.1)
shaohai.li@192 project % git config --global user.name "程序员李钟意"

shaohai.li@192 project % git config --global user.email "1454598684@qq.com"

shaohai.li@192 project % ssh-keygen -t rsa -b 4096

Generating public/private rsa key pair.
Enter file in which to save the key (/Users/shaohai.li/.ssh/id_rsa):
Created directory '/Users/shaohai.li/.ssh'.
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /Users/shaohai.li/.ssh/id_rsa
Your public key has been saved in /Users/shaohai.li/.ssh/id_rsa.pub
The key fingerprint is:
SHA256:1UlYMiMp+VhcXBH1cHsK+rjVaZbg2phUNHf+AJeXDYI shaohai.li@192.168.2.5
The key's randomart image is:
+---[RSA 4096]----+
|       o.+==B++ .|
|      o +.E* o *+|
|       =  . B +o*|
|      . .. o * =.|
|        S . o o .|
|           = o +.|
|          o + * .|
|         . B o   |
|          = .    |
+----[SHA256]-----+
shaohai.li@192 project % cat ~/.ssh/id_rsa.pub
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQCZ/9ZNnY0In6cMWXxVXcIj7a3rLdGpgbgeO53x+P80RDjhrJA1wBXB1WFOCaxV9V6yMFKcdQSIASr5OgPF2NpGWKBkiMVuPP6DSExpjzUp5xEYVlGFXEVcBAfv2Ka83s/a78FiAe62auNgMr7ygC/2dC71s1Y2BAAC8jwKZ/6QyfZwS+jjIimOjEUbbKT5qHS5hzjwDr+BJC6RXw9+1SEFh3fLgQwfjnjG6+k9Kibi/W9CvEfjE1O+SykZXxh5+ClJCbQNrIZSt2JoQFfkSf2rPhx6CMz7igF7cYnsBfB+giLzQ7cESOrKWftJArs8EdDXoNNCvOq/KNK30GcW2RqKyt9DpmOWzAJOFV3uGPdNJyGgxFw51iM1qXQ7fwCljdEqOvFlsvlX2HiAfyLHpq96pPpGDs/wTRfQlDiN5qPkErzSyOBA3ko48hhlaR+PUaPgRd0TWP/imnfTO/Cwdc24LWxVWm3YepRhTQnVLt3Y8YKZBC01Cw9eGRd7+lhwJOv5J7OWKSo4vljkasvJybyqTAvMR9Bi4/sx3yxumN0ZmHAmQeREVyMzJs0RrWEsVRkELirki6J1D7z+DcXAnykGZantwxQ5GjTrzdFD32chCG2o3WJoODjnn0/EGLuUUgWI9GzUywWh9RU/FKqPE4K4jLSZo6HS/tLf1+zPzDvrYQ== shaohai.li@192.168.2.5
shaohai.li@192 project %
```

```
登陆gitee码云 -  头像 - 设置 - ssh 公钥

- 添加公钥 -

- 标题 （随便写）
- 公钥（拷贝上面内容）
```

代码仓库 - 克隆 - 下载 （选择 ssh 拷贝地址）

Mac 电脑

```bash
git clone git@gitee.com:fe521/gitee.io.git
Cloning into 'gitee.io'...
The authenticity of host 'gitee.com (212.64.63.190)' can't be established.
ED25519 key fingerprint is SHA256:+ULzij2u99B9eWYFTw1Q4ErYG/aepHLbu96PAUCoV88.
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes # 这里输入yes
```

## 安装 Nodejs

https://nodejs.org/zh-cn/download/
