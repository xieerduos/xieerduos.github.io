// Modules to control application life and create native browser window
const {app, BrowserWindow, globalShortcut, screen, clipboard} = require('electron');
const path = require('path');
const {v4: uuidv4} = require('uuid');
const md5 = require('md5');
const config = require('./config.js');

const useTray = require('./src/tray/index.js');

// Single Instance
const gotTheLock = app.requestSingleInstanceLock();

// 单例运行
if (!gotTheLock) {
  // 当第二个实例启动时直接退出
  app.quit();
} else {
  let mainWindow;
  function createWindow() {
    // 获取鼠标在当前屏幕上的位置
    const point = screen.getCursorScreenPoint();

    // 如果窗口存在，那么直接展示
    // https://www.electronjs.org/zh/docs/latest/api/browser-window#winisdestroyed
    if (mainWindow && !mainWindow.isDestroyed()) {
      // console.log('point', point); // {x: number; y:  number}

      // 设置当前窗口展示的位置
      mainWindow.setBounds({x: point.x, y: point.y, width: 300, height: 100});

      // 获取剪切板内容 Get clipboard content
      const text = clipboard.readText();
      // console.log('text', text);

      if (!text) {
        // console.log('text is empty', text);
        return;
      }
      // \s匹配任何空白字符，包括空格、制表符、换页符等等
      // fix 签名错误
      const query = text.replace(/\s/gi, '');
      const url = 'http://api.fanyi.baidu.com/api/trans/vip/translate';
      const appid = config.appid; // 需要获取
      const key = config.key; // 需要获取
      const salt = uuidv4();
      const sign = md5(`${appid}${query}${salt}${key}`);

      // 给渲染进程发送 消息
      mainWindow.webContents.send('show-translate', {
        query,
        url,
        appid,
        key,
        salt,
        sign
      });

      // 打开窗口
      mainWindow.show();
      return;
    }

    // Create the browser window.
    mainWindow = new BrowserWindow({
      width: 300, // 窗口大小宽度
      height: 100, // 窗口大小高度
      frame: false, // 无边框窗口
      show: false, // 默认不展示
      webPreferences: {
        preload: path.join(__dirname, 'preload.js')
      }
    });

    // and load the index.html of the app.
    mainWindow.loadFile('index.html');

    mainWindow.webContents.on('blur', () => {
      mainWindow.hide();
    });

    // Open the DevTools.
    // mainWindow.webContents.openDevTools();
  }

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.whenReady().then(() => {
    createWindow();

    // 系统托盘菜单
    useTray(mainWindow);

    // 写死 开机自启动
    // 打包后生效
    app.getLoginItemSettings();

    // 注册一个 'CommandOrControl+Y' 快捷键监听器.
    globalShortcut.register('CommandOrControl+Space', createWindow);

    app.on('activate', function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
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
}
