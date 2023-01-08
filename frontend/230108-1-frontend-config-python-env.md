# 前端配置 Python 环境

Windows 电脑

## 一. 安装 python 和 python 库

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

## 二、编写 Python 代码

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
