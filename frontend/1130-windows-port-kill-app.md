# Windows 杀掉(kill)占用端口的进程

## 参考链接

Windows 杀掉(kill)占用端口的进程 https://blog.csdn.net/zha6476003/article/details/112001167

## 实施步骤

1. Win 键+R 打开运行 输入 `cmd` 打开命令行终端

2. 输入`netstat -ano |findstr 3001` 回车，具体如下

```bash
C:\Users\Administrator>netstat -ano |findstr 3001
  TCP    0.0.0.0:3001           0.0.0.0:0              LISTENING       11532
  TCP    [::]:3001              [::]:0                 LISTENING       11532

C:\Users\Administrator>taskkill /f /t /im "11532"
成功: 已终止 PID 11532 (属于 PID 13896 子进程)的进程。

C:\Users\Administrator>
```
