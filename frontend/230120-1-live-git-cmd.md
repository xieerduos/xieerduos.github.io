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

## 有未完成的代码，如何把代码添加到另外的分支？

git statsh save

git checkout

git merge（建议新手）

git rebase （不建议新手使用，除非公司强迫你使用）

版本相差不大，而且可以直接合并代码，如果版本不一样不能直接合并的。

dev 未完成。
main (线上分支)。 git statsh。

---

题有 bug，为什么？如果 git 版本相差较大，怎么办。
