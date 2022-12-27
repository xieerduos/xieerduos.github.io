// import axios from './node_modules/axios/dist/esm/axios.js';
// import uuid from './node_modules/uuid/dist/esm-browser/v4.js';

class RequestManager {
  constructor() {
    this.requestLimit = 10;
    this.requestCount = 0;
    this.requests = new Map();
    this.queue = [];
  }

  setRequestLimit(limit) {
    this.requestLimit = limit;
  }

  async sendRequest(options) {
    const requestId = options.requestId || uuid.v4();
    const controller = new AbortController();
    const signal = controller.signal;

    this.queue.push({requestId, options, controller});
    this.processQueue();

    try {
      const response = await axios({...options, signal});
      return response;
    } catch (error) {
      throw error;
    }
  }

  cancelRequest(requestId) {
    const index = this.queue.findIndex((item) => item.requestId === requestId);
    if (index >= 0) {
      const {controller} = this.queue[index];
      controller.abort();
      this.queue.splice(index, 1);
      this.requestCount--;
    }
  }

  async processQueue() {
    while (this.queue.length > 0 && this.requestCount < this.requestLimit) {
      const {requestId, options, controller} = this.queue.shift();
      this.requestCount++;
      this.requests.set(requestId, controller);

      try {
        const response = await axios(options);
        this.requestCount--;
        this.requests.delete(requestId);
      } catch (error) {
        this.requestCount--;
        this.requests.delete(requestId);
        throw error;
      }
    }
  }
}

const manager = new RequestManager();

// 设置请求限制
manager.setRequestLimit(2);

// 发起请求
const requestId1 = uuid.v4();
const request1 = manager.sendRequest({
  method: 'get',
  requestId: requestId1,
  url: 'https://jsonplaceholder.typicode.com/posts'
});

const requestId2 = uuid.v4();
const request2 = manager.sendRequest({
  method: 'get',
  requestId: requestId2,
  url: 'https://jsonplaceholder.typicode.com/comments'
});

const requestId3 = uuid.v4();
const request3 = manager.sendRequest({
  method: 'get',
  requestId: requestId3,
  url: 'https://jsonplaceholder.typicode.com/albums'
});

const requestId4 = uuid.v4();
const request4 = manager.sendRequest({
  method: 'get',
  requestId: requestId4,
  url: 'https://jsonplaceholder.typicode.com/photos'
});

const requestId5 = uuid.v4();
const request5 = manager.sendRequest({
  method: 'get',
  requestId: requestId5,
  url: 'https://jsonplaceholder.typicode.com/todos'
});

const arr = [request1, request2, request3, request4, request5];

arr.forEach((item, index) => {
  item
    .then((response) => {
      console.log('response', index, response.data);
    })
    .catch((error) => {
      console.error('error', index, error);
    });
});

// 中途取消请求
manager.cancelRequest(requestId3);
