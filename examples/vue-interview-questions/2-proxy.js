const data = {
  name: 'John Doe'
};

const handler = {
  get(target, key) {
    console.log(`Getting ${key}: ${target[key]}`);
    return target[key];
  },
  set(target, key, value) {
    console.log(`Setting ${key} to ${value}`);
    target[key] = value;
  }
};

const proxy = new Proxy(data, handler);

proxy.name = 'Jane Doe';
// Setting name to Jane Doe
console.log(proxy.name);
// Getting name: Jane Doe
