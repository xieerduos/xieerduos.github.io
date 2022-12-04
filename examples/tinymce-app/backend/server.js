const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();
const path = require('path');
const md5 = require('md5');

const PORT = 8000;

// 允许跨域
app.use(cors());

// 静态资源目录设置
app.use('/', express.static(path.join(__dirname, 'public')));

app.use(
  fileUpload({
    limits: {fileSize: 50 * 1024 * 1024}, // 限制最大文件大小为50m
    createParentPath: true, //  是否自动创建文件路径
    useTempFiles: true, // 使用临时文件
    tempFileDir: '/tmp/', // 使用临时文件
    uriDecodeFileNames: true, // 解码文件名
    safeFileNames: true, // 安全文件名
    abortOnLimit: true // 大小超出直接返回413
  })
);

// 测试
app.get('/ping', function (req, res) {
  res.send('pong');
});

// https://github.com/richardgirges/express-fileupload/blob/master/example/server.js
// 文件上传
app.post('/upload', function (req, res) {
  try {
    let tinymceFile;
    let uploadPath;
    let fileMd5;

    if (!req.files || Object.keys(req.files).length === 0) {
      res.status(400).send('No files were uploaded.');
      return;
    }

    tinymceFile = req.files.tinymceFile;

    fileMd5 = tinymceFile && tinymceFile.md5;

    if (!fileMd5) {
      fileMd5 = md5(tinymceFile.data);
    }
    // console.log('fileMd5', fileMd5);

    const fileName = `${fileMd5}${path.extname(tinymceFile.name)}`;

    uploadPath = path.join(__dirname, '/public/uploads/', fileName);

    tinymceFile.mv(uploadPath, function (err) {
      if (err) {
        return res.status(500).send(err);
      }
      res.json({location: 'http://localhost:8000/uploads/' + fileName});
    });
  } catch (error) {
    console.error('[error]', error);
    res.status(500).json({message: 'Server error'});
  }
});

app.listen(PORT, function () {
  console.log('Express server listening on port ', PORT); // eslint-disable-line
});
