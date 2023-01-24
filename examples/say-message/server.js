const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const dayjs = require('dayjs');
const path = require('path');

app.use(cors());

app.get('/', function (req, res) {
  const data = req.query.data;

  if (data) {
    log(data);
  } else {
    console.error('data :>> ', data);
  }
  // 把 data 写入到文件中，按行写入
  res.json({message: 'ok'});
});

app.listen(3300);

// 如何使用 get 请求
// http://localhost:3300/?data=hello%20worl

function log(...reset) {
  // 日志内容
  const data = `[${dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss.SSS')}] [${reset.join(',')}]\n`;

  // 写入日志的路径
  const logPath = path.join(__dirname, 'server.log');

  console.log(data);

  // 以后面追加的方式写入文件
  fs.writeFileSync(logPath, data, {encoding: 'utf8', flag: 'a+'});

  // #region 文件超出一定大小 重新写文件

  // 查看日志的文件信息
  const fileInfo = fs.statSync(logPath);

  // 判断是否大于 10M
  if (fileInfo.size >= 1024 * 1024 * 10) {
    // 大于10M重写文件
    fs.renameSync(
      logPath,
      `${path.basename(logPath, '.log')}.${dayjs(new Date()).format('YYYY-MM-DD_HH-mm-ss.SSS')}.log`
    );
  }
  // #endregion
}
