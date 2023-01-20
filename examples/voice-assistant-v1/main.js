// Modules to control application life and create native browser window
const {app, clipboard, screen, globalShortcut, BrowserWindow} = require('electron');
const path = require('path');
const {exec} = require('child_process');

// const {spawn} = require('child_process');

let mainWindow;

function createWindow() {
  // 获取屏幕宽度
  const display = screen.getPrimaryDisplay();

  mainWindow = new BrowserWindow({
    x: display.bounds.width / 2 - 150,
    y: -100,
    width: 300,
    height: 40,
    frame: false,
    skipTaskbar: true, // 窗口图标，不显示在任务栏
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  });

  // and load the index.html of the app.
  mainWindow.loadFile('index.html');
}
let assistant;
function createAssistant() {
  assistant = new BrowserWindow({
    width: 800,
    height: 600,
    show: true,
    frame: true,
    skipTaskbar: false,
    webPreferences: {}
  });

  // and load the index.html of the app.
  assistant.loadURL('https://ffffee.com/examples/voice-assistant-v2/index.html');
}

let intervalId = null;
let timeoutId = null;

const sayText = (text) => () => {
  try {
    // spawn('python', ['speech.py', text]);

    mainWindow.webContents.send('show-say-text', text);

    mainWindow.setAlwaysOnTop(true);
    mainWindow.show();

    let y = -40;

    clearTimeout(intervalId);
    clearTimeout(timeoutId);

    intervalId = setInterval(() => {
      y++;
      mainWindow.setBounds({y, width: 300, height: 40});
      if (y >= 100) {
        clearInterval(intervalId);
        timeoutId = setTimeout(() => {
          mainWindow.setAlwaysOnTop(false);
          mainWindow.hide();
          mainWindow.setBounds({y: -40});
        }, 2000);
      }
    }, 2);
  } catch (error) {
    console.error('[sayText error]', error);
  }
};

const sayPaste = async () => {
  // const robot = require("robotjs");

  // robot.keyToggle("control", "down");
  // robot.keyToggle("c", "down");
  // robot.keyToggle("c", "up");
  // robot.keyToggle("control", "up");

  const text = clipboard.readText();
  console.log('text', text);
  // 获取剪切板内容
  // spawn('python', ['speech.py', text]);
  mainWindow.webContents.send('show-say-text', text);
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // 注册快捷键
  // globalShortcut.register('F3', sayText('欢迎来到直播间'));
  globalShortcut.register('F4', sayText('感谢你的关注'));
  globalShortcut.register('F5', sayText('欢迎来到直播间'));
  globalShortcut.register('F6', sayText('需要文档地址，百度搜索“程序员李钟意”'));
  globalShortcut.register('F7', sayText('大家好欢迎你来到直播间这里是语音识别助理'));
  globalShortcut.register('F8', sayText('点关注 私聊我 进学习群'));
  globalShortcut.register('alt+1', sayPaste);

  createWindow();

  createAssistant();

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
