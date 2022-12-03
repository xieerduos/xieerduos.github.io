const {app, Menu, Tray} = require('electron');
const path = require('path');
let tray = null;

// 有退出按钮
module.exports = function useTray(mainWindow) {
  tray = new Tray(path.join(__dirname, '../icons/win/icon.ico'));
  const contextMenu = Menu.buildFromTemplate([
    {
      label: '重新启动',
      click: () => {
        // 打完包后生效
        app.relaunch();
      }
    },
    {
      label: '退出',
      click: () => {
        // 退出的时候
        // 如果还有其他行为
        // 可以在这个方法里面执行
      },
      role: 'quit'
    }
  ]);
  tray.setToolTip('码上翻译');
  tray.setContextMenu(contextMenu);

  tray.on('click', () => {
    mainWindow.show(); // 打开窗口
  });
};
