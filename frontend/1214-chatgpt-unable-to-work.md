# ChatGPT 无法使用解决方案

https://cn.techbriefly.com/openai-chatgpt-%E4%B8%8D%E5%B7%A5%E4%BD%9C%EF%BC%9A4-%E4%B8%AA%E7%AE%80%E5%8D%95%E7%9A%84%E6%BD%9C%E5%9C%A8%E8%A7%A3%E5%86%B3%E6%96%B9%E6%B3%95-tech-76027/

## 清除 ssl 状态，

Windows 电脑

该命令会清除系统中所有缓存的 SSL 证书，从而清除 SSL 状态

`Windows 键 + R 键` - 弹出`运行`窗口 - 输入 `cmd` - 回车

输入下面命令 回车

```bash
certutil -urlcache * delete
```
