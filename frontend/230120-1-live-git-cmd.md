# git 命令的应用入门到精通

## 什么是 git

代码版本管理工具。

## 下载安装

下载地址 https://www.git-scm.com/downloads

管网文档 中文：https://www.git-scm.com/book/zh/v2

## 如何配合代码 GitHub、gitee 一起使用

1. 注册一个 gitee 账号
2. 创建 gitee 仓库 git-learn
3. 拷贝链接 https://gitee.com/fe521/git-learn.git

4. 配置全局用户信息

```bash
git config --global user.name "程序员李钟意"
git config --global user.email "168@qq.com"
```

5. 创建本地仓库并且添加远程仓库链接

创建 git 仓库:

```bash
# 创建一个文件夹为 git-learn
mkdir git-learn
# 切换到文件夹目录下
cd git-learn
# 初始化git仓库 （要求本地已经安装完成git）
git init
# 创建一个README.md 文件
# Windows 使用 ni README.md
# 下面命令是 Mac Os系统
touch README.md
# 把README.md 文件添加到暂存区
git add README.md
# 把暂存区中的文件提交到git中，-m 提交描述
git commit -m "first commit"
# 本地仓库绑定远程仓库
git remote add origin https://gitee.com/fe521/git-learn.git

# 提交到远程 -u 当前用户， origin （默认的远程仓库）
# git push
git push

```

```bash
PS D:\project\git-learn> git push
fatal: The current branch master has no upstream branch.
To push the current branch and set the remote as upstream, use

    git push --set-upstream origin master

PS D:\project\git-learn> git branch
* master
PS D:\project\git-learn>   git push --set-upstream origin master
Enumerating objects: 4, done.
Counting objects: 100% (4/4), done.
Delta compression using up to 16 threads
Compressing objects: 100% (4/4), done.
Writing objects: 100% (4/4), 492 bytes | 492.00 KiB/s, done.
Total 4 (delta 0), reused 0 (delta 0), pack-reused 0
remote: Powered by GITEE.COM [GNK-6.4]
To https://gitee.com/fe521/git-learn.git
 * [new branch]      master -> master
Branch 'master' set up to track remote branch 'master' from 'origin'.
```

小结：

```bash
git init
git add README.md
git commit -m "first commit"
git statsh
git push
git log --oneline
git branch
git remote add origin https://gitee.com/fe521/git-learn.git
```

## 常用的命令都有哪些

```bash
git log --date=short
git log --date=iso
git log --oneline
git log --oneline --stat

# 查看本地分支
git branch
# 基于当前分支创建一个新的分支 名称的dev
git checkout -b dev

# 切换分支到 master， git switch master
git checkout master

# 修改当前分支名称 新分支名称为main
git branch -M main

# 查看当前本地分支有哪些？
# 有dev、master ,现在所在的分支是 master
PS D:\project\git-learn> git branch
  dev
* master
# 修改当前master名称为main
PS D:\project\git-learn> git branch -M main
# 查看当前本地分支有哪些？
# 有dev、main ,现在所在的分支是 main
PS D:\project\git-learn> git branch
  dev
* main

# 查看远程分支
PS D:\project\git-learn> git branch -r
  origin/master

# 查看远程和本地代码分支
PS D:\project\git-learn> git branch -a
  dev
* main
  remotes/origin/master


PS D:\project\git-learn> git branch
  dev
* main
PS D:\project\git-learn> git merge dev
Updating e2db8f1..62a3a5b
Fast-forward
 index.html | 4 +++-
 test.txt   | 6 +++++-
 2 files changed, 8 insertions(+), 2 deletions(-)
PS D:\project\git-learn>
```

遇到的问题：本地仓库修改了分支名称，git push 的时候出现错误，处理方法

1. git push origin main

把新分支推送到远程

2. git push origin --delete master

删除远程分支

**把本地的新分支提交到远程仓库**

```bash
PS D:\project\git-learn> git push
fatal: The current branch dev has no upstream branch.
To push the current branch and set the remote as upstream, use

    git push --set-upstream origin dev

PS D:\project\git-learn>  git push --set-upstream origin dev
Total 0 (delta 0), reused 0 (delta 0), pack-reused 0
remote: Powered by GITEE.COM [GNK-6.4]
remote: Create a pull request for 'dev' on Gitee by visiting:
remote:     https://gitee.com/fe521/git-learn/pull/new/fe521:dev...fe521:main
To https://gitee.com/fe521/git-learn.git
 * [new branch]      dev -> dev
Branch 'dev' set up to track remote branch 'dev' from 'origin'.
PS D:\project\git-learn> git push
Everything up-to-date
PS D:\project\git-learn>
```

git push 出现错误`The upstream branch of your current branch does not match the name of your current branch`解决方法：

```bash
PS D:\project\git-learn> git push
fatal: The upstream branch of your current branch does not match
the name of your current branch.  To push to the upstream branch
on the remote, use

    git push origin HEAD:master

To push to the branch of the same name on the remote, use

    git push origin HEAD

To choose either option permanently, see push.default in 'git help config'.
PS D:\project\git-learn>     git push --set-upstream origin main
Everything up-to-date
Branch 'main' set up to track remote branch 'main' from 'origin'.
PS D:\project\git-learn>

PS D:\project\git-learn> git push
Everything up-to-date
```

```bash
git clone [远程地址] 本地地址

git remote add
git remote -v

git status

git checkout -b

git branch
git branch -M
git branch -r
git branch -a

git log --oneline --stat

git reflog

git reset --hard

# 添加文件到暂存区
git add .

# 提交代码
git commit -m 'feat: 提交一个文件更新'

git commit --amend

# 把代码推动到远程
git push

# 把main分支代码合并到当前分支
git merge main

git fetch

# git fetch 和 git merge
git pull

git statsh

git rebase
```

## 如何配合 Vscode 代码 管理你的代码

## 拉取远程仓库代码到本地

1. 本地生成 ssh key
2. 把本地的公钥上传到代码仓库中 gitlab，github 这些
3. git clone git@gitee.com:fe521/git-learn.git
4. 拉取远程分支到本地

```BASH
# git fetch origin 远程分支的名称:本地分支的名称
git fetch origin dev:dev

PS D:\project\demo\git-learn> git branch
* main
PS D:\project\demo\git-learn> git fetch origin dev:dev
From gitee.com:fe521/git-learn
 * [new branch]      dev        -> dev
PS D:\project\demo\git-learn> git branch
  dev
* main
PS D:\project\demo\git-learn>
```

## 把本地仓库代码提交到一个新的仓库，github

1. 要有 github 账号，注册账号
2. github 创建一个和本地仓库一样的名称的仓库
3. 拷贝上面的代码
4. 修改 origin 为 github (正常不用改，如果你是多仓库管理，比如 gitee 和 github 都同时管理，那么你需要改)
5. git push

```bash
git remote add github git@github.com:xieerduos/git-learn.git
git branch -M main
git push -u github main
```

```bash
PS D:\project\demo\git-learn> git push -u github main
git@github.com: Permission denied (publickey).
fatal: Could not read from remote repository.

Please make sure you have the correct access rights
and the repository exists.
PS D:\project\demo\git-learn>
```

解决方案：

```bash
PS C:\Users\lizhongyi> cd ~
PS C:\Users\lizhongyi> ls .\.ssh\


    目录: C:\Users\lizhongyi\.ssh


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
-a----         2021/9/20     17:47           2610 id_rsa
-a----         2021/9/20     17:47            578 id_rsa.pub
-a----         2023/1/21     11:05            843 known_hosts
-a----         2023/1/20     23:49            184 known_hosts.old


PS C:\Users\lizhongyi> cat .\.ssh\id_rsa.pub
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABgQC6aB650WZ1Igxxw2KTOgCj8xDocZ1GRzkQRyopFhsuMl5eQ6MyfKJCH/I6J09vLE/+E3trWnPJUJFnVaOfGL/IJ0y9sPHXNWqp056Uo/MW8mPCJ/PkhC170Dci+j5Xi4uf9lRwrN9+xTIOvar6UMRtyU3B2Ln4LQyzD0fQqd4/uiGIpmvDol69Jf0T62GZVy9Hmyv5OOcLnzhu+zUGy1ZKdbs7AgGpdoWuo/VWS/XpopFz9B481DGcxp8h9vH+nhePXfop17SfCv/a63Yz4lgtsZNeDeBbaZNap7x7Lq7Lqc/qx7PUthc6fc7WyhjI0b+4PywCGVOsyJZXpKvohqXXn4NzRktWIDelme3+6sFUfxyqftcq2T3S2GjToBZlrDI8uNnH4RM2A7a/JYXtmfCYTtQCG7Yia42iugazM7vY9geQ2brTthIoweHG6/b03hx1e9o9RTCKAMgVfEilWVQNcOfZH8NWdwTIX20tVdYfFlarsPJvtZSbe+G6iR1hotc= lizhongyi@DESKTOP-1B3NPNM
PS C:\Users\lizhongyi>

# 重新pust 成功

PS D:\project\demo\git-learn> git push -u github main
Enumerating objects: 14, done.
Counting objects: 100% (14/14), done.
Delta compression using up to 16 threads
Compressing objects: 100% (11/11), done.
Writing objects: 100% (14/14), 1.90 KiB | 1.90 MiB/s, done.
Total 14 (delta 3), reused 14 (delta 3), pack-reused 0
remote: Resolving deltas: 100% (3/3), done.
To github.com:xieerduos/git-learn.git
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'github'.
PS D:\project\demo\git-learn>

```

## git 冲突以及解决方案

1. git pull 出现冲突
2. git status (是否要取消 pull) git merge --abort
3. 利用 vscode 修改代码，传入更改还是当前更改
4. git add . 把修改后的文件添加到暂存区
5. git commit 把修改后的内容 commit 到合并更改中
6. 此时会出现一个命令行编辑器

   - （1）ESC 键按一下
   - （2）按住 Shift 不放+分号键 底部会出现: 输入框
   - （3）wq 保存写入并退出。

## 有未完成的代码，如何把代码添加到另外的分支？

详细一点：

有 main 分支和 dev 分支，如果在 dev 分支上修改了内容，但是还没有 commit，如何把刚刚更改的代码 commit 到 main 分支

如果在 dev 分支上修改了内容，但是还没有 commit，你可以使用下面的步骤将更改的代码提交到 main 分支上:

- 首先确保你已经在 dev 分支上，使用 "git branch" 命令可以查看当前的分支。在命令行中如果显示 \* dev 表示当前在 dev 分支上。

- 使用 "git stash" 命令将未提交的更改保存到 stash 中。这条命令会把当前分支上的所有未提交的更改保存到 stash 中。

- 使用 "git checkout main" 命令切换到 main 分支。这样会切换到 main 分支，确保你在 main 分支上，可以使用 git branch 查看当前分支。

- 使用 "git stash apply" 命令将 stash 中的更改应用到 main 分支上。这条命令会把 stash 中保存的未提交的更改应用到当前分支上。

- 使用 "git commit -m 'message'" 命令将更改提交到 main 分支上。其中'message'是你自己给提交记录打的标签，方便查看。

- 使用 "git push" 命令将更改推送到远程主机上。这样就把你在 dev 分支上的更改推送到 main 分支上了。

值得注意的是，在使用 git stash apply 之前，如果 main 分支有新的更改，会导致冲突，需要手动解决。

另外，在使用 git stash apply 之后，最好使用 git stash drop 来删除已经用过的 stash，避免之后混淆。

### 为什么使用 git stash apply 而不是 git stash pop

使用 git stash apply 和 git stash pop 都可以将 stash 中的更改应用到当前分支上。但是它们之间有一些区别:

- git stash apply: 这条命令会将 stash 中的更改应用到当前分支上，但是不会删除 stash。这样你可以在需要的时候再次应用这些更改。

- git stash pop: 这条命令会将 stash 中的更改应用到当前分支上，并且会删除 stash。这样你就不能再次应用这些更改了。

在你想要把 dev 分支上的更改提交到 main 分支上时，使用 git stash apply 更保险一些，因为如果发现有问题，你可以再次应用 stash 中的更改来解决问题，而如果使用 git stash pop 会删除 stash 中的更改，不能再次应用。

除非你确定没有问题可以直接删除 stash，否则最好使用 git stash apply 来应用 stash 中的更改

### 如果 stash 里面有多个内容，git stash apply 如何指定某一个

如果 stash 中有多个内容，你可以使用 git stash list 命令来查看 stash 列表。这条命令会显示所有 stash 的信息，包括 stash 的名称和描述。

如果你想要指定应用某一个 stash，可以使用 git stash apply `<stash_name>` 命令，其中 `<stash_name>` 是 stash 列表中的名称，如:

```bash
git stash apply stash@{0}
```

这样就会应用 stash 列表中第 0 个 stash 中的更改。

如果你想应用最新的一个 stash，可以使用 git stash apply 命令，而不需要指定具体的 stash 名称。

如果你想删除已经应用过的 stash，可以使用 git stash drop `<stash_name>` 命令，其中 `<stash_name>` 是 stash 列表中的名称。

另外还有一条 git stash apply --index `<stash_name>` 可以指定 stash 且尝试把已经被修改的文件的更改合并到当前更改里面。

## “git commit” 中的 commit 是什么意思

"git commit" 是 Git 中的一个重要命令，它的作用是将更改提交到本地仓库中。"commit" 这个词在这里是指将更改永久性地保存到代码仓库中。

在 Git 中，每次提交都会生成一个唯一的提交记录，称为 "commit"。每个 commit 都有一个唯一的标识符（SHA-1 哈希值），并且每个 commit 都包含了一些信息，如提交时间、提交者、提交说明等。

使用 git commit 命令后，Git 会将你的更改打包成一个新的 commit，并将这个 commit 添加到当前分支上，之后就可以在 git log 中看到这次的提交记录。

每次提交时都会提示输入提交信息，也可以使用 -m "message" 来简化这个过程，在命令行中直接输入提交信息。

在项目开发过程中，commit 的频率越高越好，这样可以使得回滚更加简单，也能更好的维护项目的版本历史。
