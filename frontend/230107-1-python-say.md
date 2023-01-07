# AI 迎宾 -前端学 python - 语音播放

## 版本管理

- v1.0.0 已经实现
- v1.1.0 等待实现
- v1.2.0 等待实现
- v1.3.0 等待实现

## 技术栈

- Html
- Css
- Javascript
- Nodejs
- Electron
- Python (可以不掌握)
- 配置 Python 环境变量

## 需求背景

换句话说，要解决的痛点

有同学进入直播间，
我每一次都要欢迎一下同学，
这样很容易打断我的思路

## 需求描述

1. 按快捷键，播放语音

2. 快捷键对应的播放的语音

```
F1 欢迎来到直播间
F2 （重命名高频使用）

F3 我爱程序员
F4 大家早上好

F5
F6
F7
F8
```

3. 顶部自上而下-灵动岛显示文本
4. 选中文本，按快捷键，播放选中的内容（等待实现）

## 技术实现

1. python 实现播放语音，根据传入的参数
2. 使用 electron 开发桌面端应用 （html css js nodejs electron 原生模块）
3. 使用 nodejs 调用 python 代码，并传入参数
4. 使用 nodejs 子进程执行 python 命令的方式
5. electron-quick-start

## 代码例子（调研代码）

### Nodejs 代码

创建文件 index.js

```bash
# 创建文件 index.js (Windows)
# mac 使用 `touch index.js`
ni index.js
```

```js
const {spawn} = require('child_process');

function main() {
  const pythonScript = 'speech.py';
  const text = '欢迎来到程序员李钟意的直播间';

  // 启动 Python 解释器并执行 Python 脚本
  const pythonProcess = spawn('python', [pythonScript, text]);

  // 输出 Python 脚本的标准输出
  pythonProcess.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  // 输出 Python 脚本的标准错误
  pythonProcess.stderr.on('data', (data) => {
    console.error(data.toString());
  });

  // 监听 Python 脚本的退出事件
  pythonProcess.on('close', (code) => {
    console.log(`Python 脚本退出，代码 ${code}`);
  });
}

setInterval(() => {
  main();
}, 5 * 1000);
```

运行 index.js Nodejs 代码

```bash
node index.js
```

## 开发日志

Windows 电脑

### 一. 安装 python 和 python 库

1. 官网安装 `3.9.12`
2. 配置 python 环境变量

- 此电脑 - 属性 - 高级系统设置 - 环境变量
- 环境变量窗口（你会看到用户的、系统环境变量）
- 系统环境变量 - PATH - 增加下面两条数据（`D:\tools\`为你的 Python 安装路径）

```
D:\tools\python3
D:\tools\python3\Scripts
```

3. 使用 pip 安装 python pyttsx3 库

```bash
pip install pyttsx3
```

### 二、编写 Python 代码

创建文件 speech.py

```bash
# 创建文件 speech.py (Windows)
# mac 使用 `touch speech.py`
ni speech.py
```

`speech.py` 文件内容如下

```py
import pyttsx3
import sys
# import pyperclip

# 获取命令行参数
text = sys.argv[1]

# 获取鼠标选中的文本
# text = pyperclip.paste()

# 创建文本到语音合成引擎
engine = pyttsx3.init()

# 设置语速
engine.setProperty('rate', 200)

engine.setProperty('language', 'zh')
engine.setProperty('voice', 'zh-CN')

# 将文本转换为语音并播放
engine.say(text)
engine.runAndWait()

```

如何调用上面的代码，实现播放自定义的文本

```bash
python speech.py "欢迎大家"
```

### 三. 获取 electron-quick-start demo

1. 下载地址

https://github.com/electron/electron-quick-start

2. 修改逻辑代码，主进程

3. 注册快捷键
4. 快捷键方法调用 python 代码播放语音

```JS
  globalShortcut.register('F3', sayText('欢迎来到程序员李钟意的直播间'));
  globalShortcut.register('F4', sayText('感谢你的关注'));
  globalShortcut.register('F5', sayText('没有点关注的点点关注'));
  globalShortcut.register('F6', sayText('百度搜索“程序员李钟意”'));
  globalShortcut.register('F7', sayText('主播是前端开发，可以提问前端的问题'));
  globalShortcut.register('F8', sayText('点关注 私聊我 进学习群'));
```

---

### 完整代码

Github

[/examples/python-say/](https://github.com/xieerduos/xieerduos.github.io/tree/main/examples/python-say))
