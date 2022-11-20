// 实现网络请求并发限制的管理类 NetManager(concurrency)，构造函数传入一个number，是并发的限制数，提供 request(url, data) => Promise<res> 方法
// Const obj = new NetManager(5)
// obj.request(“/xxx/sss”, {a: 1})

// net-manager.js
class NetManager {
  constructor(number) {
    if (!(typeof number === 'number' && !Number.isNaN(number))) {
      console.error(`NetManager params typeof number === '${typeof number}', value: ${number}`);
    }
    // 限制并发数量
    this.number = number;
    // 正在执行的请求
    this.queues = [];
    // 等待执行的请求
    this.caches = [];
  }

  trigger = () => {
    const hits = this.queues.filter((i) => i.isFetch === false);
    hits.forEach((item) => {
      item.isFetch = true;

      item
        .task()
        .then(item.resolve)
        .catch(item.reject)
        .finally(() => {
          const deleteIndex = this.queues.findIndex((del) => del.key === item.key);

          if (deleteIndex !== -1) {
            this.queues.splice(deleteIndex, 1);
          }

          if (this.caches.length > 0) {
            this.queues.push(this.caches.shift());
            this.trigger();
          }
        });
    });
  };

  request = (...reset) => {
    return new Promise((resolve, reject) => {
      // 绑定一个函数并传参
      const task = window.fetch.bind(null, ...reset);

      // 生成一个key值，用于删除队列任务
      const key = Math.random();

      const newItem = {key, isFetch: false, task, resolve, reject};
      if (this.queues.length >= this.number || this.caches.length > 0) {
        this.caches.push(newItem);
      } else {
        this.queues.push(newItem);
        this.trigger();
      }
    });
  };
}
const JSON_PLACEHOLDER = 'https://jsonplaceholder.typicode.com/todos/';

const obj = new NetManager(5);

for (let i = 1; i <= 20; i++) {
  obj
    .request(`${JSON_PLACEHOLDER}${i}`, {credentials: 'include'})
    .then((res) => res.json())
    .then((result) => {
      console.log('[result.id]', result.id);
    });
}
