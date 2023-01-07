# 前端学 python

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

## 技术实现

1. python 实现播放语音，根据传入的参数
2. 使用 electron 开发桌面端应用 （html css js nodejs electron 原生模块）
3. 使用 nodejs 调用 python 代码，并传入参数
4. 使用 nodejs 子进程执行 python 命令的方式
5. electron-quick-start

## 代码例子

### Nodejs 代码

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

### Python 代码

```py
import pyttsx3
import sys
# import pyautogui
import pyperclip

# 获取命令行参数
text = sys.argv[1]


# 获取鼠标选中的文本
# text = pyperclip.paste()


# 获取鼠标选中的文本
# text = pyautogui.getSelection()
# text = pyautogui.clipboard

# 输出文本的值
print(text)

# 创建文本到语音合成引擎
engine = pyttsx3.init()

# 设置语速
engine.setProperty('rate', 150)

engine.setProperty('language', 'zh')
engine.setProperty('voice', 'zh-CN')

# 将文本转换为语音并播放
engine.say(text)
engine.runAndWait()

```

## 开发日志

### 1. 获取 electron-quick-start demo

下载地址

https://github.com/electron/electron-quick-start

2. 修改逻辑代码，主进程
3. 注册快捷键
4. 快捷键方法调用 python 代码播放语音

---

一学就会

```bash
python speech.py "欢迎大家，大家晚上好"
```

```bash
pip install pyttsx3

```

把选中的文本作为 say 函数的参数输入

```
pip install pyperclip
```
