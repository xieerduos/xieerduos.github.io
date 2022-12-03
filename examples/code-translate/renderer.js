// https://www.electronjs.org/zh/docs/latest/tutorial/ipc#2-%E9%80%9A%E8%BF%87%E9%A2%84%E5%8A%A0%E8%BD%BD%E8%84%9A%E6%9C%AC%E6%9A%B4%E9%9C%B2-ipcrendereron

const appEL = document.getElementById('app');

let lastQuery = ''; // 缓存上一次的查询内容
window.electronAPI.onShowTranslate((_event, value) => {
  if (lastQuery === value.query) {
    // 缓存上一次的查询内容
    // 和现在的一样不执行代码
    return;
  }
  lastQuery = value.query;
  console.log('value', value);

  appEL.style = 'color: #141414;';
  appEL.innerText = '正在翻译...';

  request(value)
    .then((response) => response.json())
    .then((response) => {
      console.log('response', response);
      appEL.innerText = (response.trans_result[0] || {}).dst;
    })
    .catch((error) => {
      appEL.innerText = error.message;
      appEL.style = 'color: #f00;';
      console.error('[error]', [error]);
    });
});

// 通用翻译API接入文档 https://api.fanyi.baidu.com/doc/21
function request({url, appid, query, salt, sign}) {
  // const url = "http://api.fanyi.baidu.com/api/trans/vip/translate";
  // const appid = "20221130001479050";
  // const key = "8y8QWUlo3Oz5ceX3ClPI";
  // const salt = uuidv4();
  // const sign = md5(`${appid}${query}${salt}${key}`);

  return window.fetch(
    // `${url}?q=${query}&from=en&to=zh&appid=${appid}&salt=${salt}&sign=${sign}`
    `${url}?q=${query}&from=auto&to=auto&appid=${appid}&salt=${salt}&sign=${sign}`
  );
}
