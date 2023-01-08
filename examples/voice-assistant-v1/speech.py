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
