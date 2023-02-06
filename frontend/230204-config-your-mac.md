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
SHA256:1UlYMi...JeXDYI shaohai.li@192.168.2.5
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
ssh-rsa AAAAB3NzaC1yc2EAAAADA....f1+zPzDvrYQ== shaohai.li@192.168.2.5
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
ED25519 key fingerprint is SHA256:+ULzij2....6PAUCoV88.
This key is not known by any other names
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes # 这里输入yes
```

## 安装 Nodejs

https://nodejs.org/zh-cn/download/

## zsh: command not found: brew

```bash
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
```

报错解决方案 https://blog.csdn.net/gggg989898/article/details/109175707

## docker

参考文章 https://www.runoob.com/docker/macos-docker-install.html

brew install --cask --appdir=/Applications docker

安装报错解决方案 https://www.cnblogs.com/MoKinLi/p/17064734.html

```bash
shaohai.li@shaohailideMacBook-Pro gitee.io % brew install --cask --appdir=/Applications docker
fatal: not in a git directory
Warning: No remote 'origin' in /opt/homebrew/Library/Taps/homebrew/homebrew-cask, skipping update!
fatal: not in a git directory
Warning: No remote 'origin' in /opt/homebrew/Library/Taps/homebrew/homebrew-core, skipping update!
fatal: not in a git directory
Warning: No remote 'origin' in /opt/homebrew/Library/Taps/homebrew/homebrew-services, skipping update!
==> Homebrew has enabled anonymous aggregate formula and cask analytics.
Read the analytics documentation (and how to opt-out) here:
  https://docs.brew.sh/Analytics
No analytics have been recorded yet (nor will be during this `brew` run).

==> Homebrew is run entirely by unpaid volunteers. Please consider donating:
  https://github.com/Homebrew/brew#donations

==> Downloading https://desktop.docker.com/mac/main/arm64/95914/Docker.dmg
######################################################################## 100.0%
==> Installing Cask docker
==> Moving App 'Docker.app' to '/Applications/Docker.app'
==> Linking Binary 'docker-compose.bash-completion' to '/opt/homebrew/etc/bash_completion.d/docker-compose'
==> Linking Binary 'docker.zsh-completion' to '/opt/homebrew/share/zsh/site-functions/_docker'
==> Linking Binary 'docker.fish-completion' to '/opt/homebrew/share/fish/vendor_completions.d/docker.fish'
==> Linking Binary 'docker-compose.fish-completion' to '/opt/homebrew/share/fish/vendor_completions.d/docker-compose.fish'
==> Linking Binary 'docker-compose.zsh-completion' to '/opt/homebrew/share/zsh/site-functions/_docker_compose'
==> Linking Binary 'docker.bash-completion' to '/opt/homebrew/etc/bash_completion.d/docker'
fatal: not in a git directory
Error: Command failed with exit 128: git
shaohai.li@shaohailideMacBook-Pro gitee.io % docker
zsh: command not found: docker
shaohai.li@shaohailideMacBook-Pro gitee.io % cd /opt/homebrew/Library/Taps/homebrew/homebrew-cask
shaohai.li@shaohailideMacBook-Pro homebrew-cask % git remote -v
fatal: detected dubious ownership in repository at '/opt/homebrew/Library/Taps/homebrew/homebrew-cask'
To add an exception for this directory, call:

        git config --global --add safe.directory /opt/homebrew/Library/Taps/homebrew/homebrew-cask
shaohai.li@shaohailideMacBook-Pro homebrew-cask %         git config --global --add safe.directory /opt/homebrew/Library/Taps/homebrew/homebrew-cask
shaohai.li@shaohailideMacBook-Pro homebrew-cask % cd /opt/homebrew/Library/Taps/homebrew/homebrew-core
shaohai.li@shaohailideMacBook-Pro homebrew-core % git remote -v
fatal: detected dubious ownership in repository at '/opt/homebrew/Library/Taps/homebrew/homebrew-core'
To add an exception for this directory, call:

        git config --global --add safe.directory /opt/homebrew/Library/Taps/homebrew/homebrew-core
shaohai.li@shaohailideMacBook-Pro homebrew-core %         git config --global --add safe.directory /opt/homebrew/Library/Taps/homebrew/homebrew-core
shaohai.li@shaohailideMacBook-Pro homebrew-core % cd /opt/homebrew/Library/Taps/homebrew/homebrew-services
shaohai.li@shaohailideMacBook-Pro homebrew-services % git remote -v
fatal: detected dubious ownership in repository at '/opt/homebrew/Library/Taps/homebrew/homebrew-services'
To add an exception for this directory, call:

        git config --global --add safe.directory /opt/homebrew/Library/Taps/homebrew/homebrew-services
shaohai.li@shaohailideMacBook-Pro homebrew-services %         git config --global --add safe.directory /opt/homebrew/Library/Taps/homebrew/homebrew-services
shaohai.li@shaohailideMacBook-Pro homebrew-services % git remote -v
origin  https://gitee.com/cunkai/homebrew-services.git (fetch)
origin  https://gitee.com/cunkai/homebrew-services.git (push)
shaohai.li@shaohailideMacBook-Pro homebrew-services %
```

到启动台点击鲸鱼图标就可以了。

---

## 解决 python2.7 环境

安装 python2
你可以从官方下载网站获得任何 Python 版本，包括最后一个版本的 Python2：
https://www.python.org/downloads/release/python-2718/ → macOS64-bit 安装程序
：
直接在官方下载网站（如上下载网址：https://www.python.org/downloads/release/python-2718/）找到，然后运行安装即可。这个比Homebrew一键安装还要方便快捷。

https://www.jianshu.com/p/859fea5437b9

https://www.python.org/downloads/release/python-2718/

## 录制屏幕没有声音

Command + 空格 - 输入 “quickTime Player” - 回车

下载 `filmage screen` 会让下载一个驱动 - 点击确认下载驱动

退出 filemage screen 不要付费 - `quickTime Player` - 左上角新建录制 - 选项 - 麦克风选择 Filmage Screen Audio Device

Filmage 需要打开才可以
