const {spawn} = require('child_process');

function main() {
  const pythonScript = 'speech.py';
  const text = '欢迎来到程序员李钟意的直播间';

  // 启动 Python 解释器并执行 Python 脚本
  const pythonProcess = spawn('python', [pythonScript, text]);

  // 输出 Python 脚本的标准输出
  pythonProcess.stdout.on('data', (data) => {
    console.log(data.toString());
  });

  // 输出 Python 脚本的标准错误
  pythonProcess.stderr.on('data', (data) => {
    console.error(data.toString());
  });

  // 监听 Python 脚本的退出事件
  pythonProcess.on('close', (code) => {
    console.log(`Python 脚本退出，代码 ${code}`);
  });
}

setInterval(() => {
  main();
}, 5 * 1000);
