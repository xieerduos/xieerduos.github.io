# 面试题

连八股文都不懂还指望在前端混下去么 https://juejin.cn/post/7016593221815910408

【1 月最新】前端 100 问：能搞懂 80% 的请把简历给我 https://juejin.cn/post/6844903885488783374

## 传送门

铜三铁四下，拿到前端技术专家的 offer https://juejin.cn/post/7086381206236823559

面试官：工作两年了，这么简单的算法题你都不会？ https://juejin.cn/post/7116656945624252430

抓取牛客最新前端面试题五百道 数据分析 JS 面试热点 https://juejin.cn/post/7022799579087110181

## 面试题

### HTTP 的基本概念

```
HTTP（HyperText Transfer Protocol）是一种用于从Web服务器传输超文本到本地浏览器的协议。它是建立在TCP/IP协议之上的应用层协议，是万维网（WWW）的基础。

下面是HTTP的一些基本概念：

请求：当浏览器想要访问Web服务器上的资源时，就会发出请求。请求包含了浏览器想要访问的资源的URL、请求方法（如GET或POST）和其他相关信息。

响应：当Web服务器收到请求后，就会返回响应。响应包含了服务器的状态码、响应头以及响应数据。

状态码：状态码是服务器返回的HTTP响应中的三位数字代码，用于表示请求的结果。常见的状态码有200（表示成功）、404（表示资源不存在）和500（表示服务器内部错误）等。

响应头：响应头是服务器返回的HTTP响应中的键值对，用于提供有关响应的其他信息。常见的响应头有Content-Type（表示响应数据的类型）和Content-Length（表示响应数据的长度）等。

响应数据是服务器返回的HTTP响应中的主体部分，它是浏览器请求的资源的内容。响应数据可以是HTML、CSS、JavaScript或者图像等资源。

资源：资源是Web服务器上的一个文件或者数据，浏览器可以通过URL来访问资源。

URL：URL（Uniform Resource Locator）是统一资源定位符，它描述了如何访问Web上的资源。URL包含了协议、主机名、端口号、路径和查询字符串等信息。

总之，HTTP是一种用于在Web上传输数据的基础协议，通过请求和响应来实现浏览器与服务器之间的通信。它包含了状态码、响应头和响应数据等信息，并通过URL来描述资源。
```

### GET 与 POST 的区别?

```
ET和POST是HTTP协议中两种不同的请求方法，用于从Web服务器获取数据。

下面是GET和POST的一些区别：

请求方式不同：GET是通过URL传递参数并从服务器获取数据，而POST是在HTTP消息体中传递参数并从服务器获取数据。

参数传递方式不同：GET是通过URL传递参数，而POST是通过HTTP消息体传递参数。

参数大小限制不同：GET有较短的URL长度限制，而POST没有这种限制。

安全性不同：GET请求在传输过程中不加密，因此安全性较低，而POST请求可以通过HTTPS进行加密传输，因此具有较高的安全性。

缓存性不同：GET请求可能会被浏览器或代理服务器缓存，而POST请求通常不会被缓存。

历史记录不同：浏览器通常会记录GET请求，因此用户可以使用浏览器的“后退”和“前进”按钮来浏览历史记录，而POST请求通常不会被记录在历史记录中。

总的来说，GET方法适用于从服务器获取数据，而POST方法适用于向服务器发送数据。在使用时，应根据实际情况选择合适的请求方法。

一般来说，GET方法用于获取数据，如查询搜索结果或者获取特定内容。POST方法用于向服务器发送数据，如提交表单、上传文件或者执行其他数据更新操作。

在选择请求方法时，还需要考虑数据安全性、数据大小和浏览器缓存等因素。例如，如果数据需要加密传输，则应使用POST方法；如果数据量较大，则应使用POST方法；如果不希望数据被浏览器缓存，则应使用POST方法。

总之，GET和POST是HTTP协议中两种常用的请求方法，在使用时应根据实际情况选择合适的请求方法。
```

### 简单通俗的语言介绍一下 http 三次握手和四次挥手的过程

这三次交互过程如下：

1. 客户端发送一个带有 SYN 标志的数据包给服务器，表示客户端想要建立一个连接。

2. 服务器收到客户端的请求后，会发送一个带有 SYN 和 ACK 标志的数据包给客户端，表示服务器收到了客户端的请求并愿意建立连接。

3. 客户端收到服务器的响应后，会发送一个带有 ACK 标志的数据包给服务器，表示客户端收到了服务器的响应并确认连接已建立。

这三次交互过程有助于确保连接的完整性和正确性，从而保证了数据传输的正常进行。

HTTP 四次挥手是指在关闭一个 TCP 连接时所经过的四次交互过程。

这四次交互过程如下：

1. 客户端发送一个带有 FIN 标志的数据包给服务器，表示客户端想要关闭连接。

2. 服务器收到客户端的请求后，会发送一个带有 ACK 标志的数据包给客户端，表示服务器收到了客户端的请求并确认连接关闭。

3. 服务器发送一个带有 FIN 标志的数据包给客户端，表示服务器也想要关闭连接。

4. 客户端收到服务器的请求后，会发送一个带有 ACK 标志的数据包给服务器，表示客户端收到了服务器的请求并确认连接关闭。

这四次交互过程有助于确保连接的完整性和正确性，从而保证了连接的正常关闭。

总之，HTTP 三次握手和四次挥手是为了保证 TCP 连接的建立和关闭的正常进行而设计的交互过程。它们确保了数据传输的正常进行和连接的完整性和正确性。