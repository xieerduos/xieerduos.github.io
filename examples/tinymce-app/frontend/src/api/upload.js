import request from '../utils/request';

// https://stackoverflow.com/questions/47630163/axios-post-request-to-send-form-data
// 上传文件
export function uploadFile(bodyFormData, progress = () => {}) {
  return request({
    url: 'http://localhost:8000/upload',
    headers: {'Content-Type': 'multipart/form-data'},
    method: 'post',
    data: bodyFormData,
    onUploadProgress: (e) => {
      progress((e.loaded / e.total) * 100);
    }
  });
}
