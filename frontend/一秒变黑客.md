# 一秒变黑客

抖音视频地址 https://www.douyin.com/video/7161640971799678220

## 项目介绍

是一个屏幕保护窗口，全屏显示并置顶，使用 electronjs 开发，支持 Windows 和 MacOS 系统

## 快速启动

```bash
# 克隆仓库
git clone git@github.com:xieerduos/elecctron-schedule.git

# 获取远程hacker分支映射到本地分支hacker
git fetch origin hacker:hacker

# 切换分支到hacker
git checkout hacker

# 安装模块依赖
npm install

# 启动项目
npm start
```

## 代码地址

视频中代码地址：https://github.com/xieerduos/elecctron-schedule/tree/hacker

注意是：hacker 分支

引用代码 electron quick start：

https://github.com/electron/electron-quick-start

## 注意事项

快捷键 ctrl + shift + i 打开控制台

输入 window.close() 才可以关闭窗口

## 主进程

main.js

主进程代码

```JS
// Modules to control application life and create native browser window
const {app, screen, BrowserWindow, ipcMain} = require('electron');
const path = require('path');
let windwos = [];

function createTransparentWindow() {
    screen.getAllDisplays().forEach((display) => {
        // console.log('display :>> ', display);
        // Create the browser window.
        const mainWindow = new BrowserWindow({
            x: display.bounds.x,
            y: display.bounds.y,
            width: display.bounds.width,
            height: display.bounds.height,
            transparent: true,
            frame: false,
            fullscreen: false,
            show: false,
            skipTaskbar: true,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        });

        mainWindow.on('closed', () => {
            app.quit();
        });

        // and load the index.html of the app.
        mainWindow.loadFile('hacker.html');

        windwos.push(mainWindow);
        mainWindow.setAlwaysOnTop(true, 'screen-saver');
        mainWindow.on('ready-to-show', () => {
            mainWindow.show();

            setTimeout(() => {
                mainWindow.setFullScreen(true);

                mainWindow.blur();
                setTimeout(() => {
                    mainWindow.focus();
                }, 100);
            }, 100);

            // 下面三行代码别删
            // 不然只能来评论区发送666解锁屏幕
            // setTimeout(() => {
            //     mainWindow.close();
            // }, 10 * 1000);
        });
    });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createTransparentWindow();

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0)
            createTransparentWindow();
    });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

```

## 渲染进程

hacker.html 代码

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <title>抖音@程序员李钟意 代码雨</title>
        <style>
            html,
            body,
            canvas {
                display: block;
                margin: 0;
                padding: 0;
                height: 100vh;
                width: 100vw;
            }
        </style>
    </head>

    <body>
        <canvas id="canvas"></canvas>
        <script>
            const width = (document.getElementById('canvas').width =
                window.innerWidth);
            const height = (document.getElementById('canvas').height =
                window.innerHeight);
            const ctx = document.getElementById('canvas').getContext('2d');
            const arr = Array(Math.ceil(width / 10)).fill(0);
            const str = '抖音@程序员李钟意'.split('');

            function rain() {
                ctx.fillStyle = 'rgba(0,0,0,0.06)';
                ctx.fillRect(0, 0, width, height);
                ctx.fillStyle = '#0f0';
                ctx.font = '16px Arial';
                arr.forEach(function (value, index) {
                    ctx.fillText(
                        str[Math.floor(Math.random() * str.length)],
                        index * 10,
                        value + 18
                    );
                    arr[index] =
                        value >= height || value > 66666 * Math.random()
                            ? 0
                            : value + 18;
                });
            }
            setInterval(rain, 30);
        </script>
    </body>
</html>
```
