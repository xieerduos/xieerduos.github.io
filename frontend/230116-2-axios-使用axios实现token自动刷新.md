# 使用 axios 实现 token 自动刷新

## 封装 axios 请求拦截：

在请求发出之前进行拦截，可以在请求头中添加 token，并且进行 token 即将过期的判断，例如：

```js
axios.interceptors.request.use((config) => {
  const token = getToken(); // 获取 token
  if (token) {
    const exp = getTokenExpiration(token);
    if (exp && exp < new Date().getTime() / 1000 + 30) {
      // token 即将过期
      refreshToken();
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

```js
import jwt from 'jsonwebtoken';

function getTokenExpiration(token) {
  const decoded = jwt.decode(token);
  if (!decoded || !decoded.exp) {
    return null;
  }
  return decoded.exp;
}
```

## 封装 axios 响应拦截：

在响应到达之后进行拦截，可以在此处处理 token 过期问题，例如：

```js
axios.interceptors.response.use((response) => {
  if (response.data.code === '401') {
    // token 过期
    const refreshToken = getRefreshToken(); // 获取 refresh token
    if (refreshToken) {
      // 发送 refresh token 请求
      return refreshTokenRequest()
        .then((response) => {
          setToken(response.data.token); // 更新 token
          setRefreshToken(response.data.refresh_token); // 更新 refresh token
          return axios(error.config); // 重新发送请求
        })
        .catch((err) => {
          logout(); // 退出登录
        });
    } else {
      logout(); // 退出登录
    }
  }
  return response;
});
```

## 前端 token 处理：

可以使用 localStorage 或者 cookie 来存储 token 和 refresh token。

## 注意：上面的代码和方法仅供参考，具体实现可能会有差别，请根据项目需要进行调整。

getTokenExpiration(token) 这个函数是用来获取 token 的过期时间的，请根据项目需要进行实现。

refreshToken() 这个函数是用来刷新 token 的，请根据项目需要进行实现。

getToken(), getRefreshToken(), setToken(), setRefreshToken() 请根据项目需要进行实现

logout() 是登出的函数，请根据项目需要进行实现
refreshTokenRequest() 这个函数是发送 refresh token 请求，请根据后台接口自行实现。

这个大纲应该是根据你的要求重新输出的。
