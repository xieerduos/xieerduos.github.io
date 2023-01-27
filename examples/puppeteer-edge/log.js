const dayjs = require('dayjs');
const path = require('path');
const fs = require('fs');

module.exports = function log(...reset) {
  // 日志内容
  const data = `[${dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS')}] [${reset.join(',').replace(/\n/gi, ' ')}]\n`;

  // 写入日志的路径
  const logPath = path.join(__dirname, 'server.log');

  console.log(data);

  // 以后面追加的方式写入文件
  fs.writeFileSync(logPath, data, {encoding: 'utf8', flag: 'a+'});

  // #region 文件超出一定大小 重新写文件

  // 查看日志的文件信息
  const fileInfo = fs.statSync(logPath);

  // 判断是否大于 50KB
  if (fileInfo.size >= 1024 * 50) {
    // 大于50KB重写文件
    fs.renameSync(
      logPath,
      `${path.basename(logPath, '.log')}.${dayjs(new Date()).format('YYYY-MM-DD_HH-mm-ss.SSS')}.log`
    );
  }
  // #endregion
};
