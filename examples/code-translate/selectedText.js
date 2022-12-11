const ffi = require('ffi');
const ref = require('ref');
const Struct = require('ref-struct');

const POINT = Struct({
  x: 'long',
  y: 'long'
});

const USER32 = ffi.Library('user32', {
  GetCursorPos: ['bool', [POINT.ref]],
  GetWindowTextA: ['int', ['int', 'string', 'int']]
});

const getSelectedText = () => {
  const point = new POINT();
  USER32.GetCursorPos(point);
  const hwnd = USER32.WindowFromPoint(point.x, point.y);

  const title = Buffer.alloc(1024);
  USER32.GetWindowTextA(hwnd, title, 1024);

  const text = Buffer.alloc(256);
  USER32.SendMessageA(hwnd, 0x000d, 256, text);

  return text.toString('ascii').trim();
};

module.exports = getSelectedText;

console.log(getSelectedText());

// 使用前端的技术 Electron 开发 Window 应用（4年 ）
