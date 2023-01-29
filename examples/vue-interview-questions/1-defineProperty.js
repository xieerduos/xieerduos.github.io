const data = {
  name: 'John Doe'
};

Object.keys(data).forEach((key) => {
  let internalValue = data[key];
  Object.defineProperty(data, key, {
    get() {
      console.log(`Getting ${key}: ${internalValue}`);
      return internalValue;
    },
    set(newValue) {
      console.log(`Setting ${key} to ${newValue}`);
      internalValue = newValue;
    }
  });
});

data.name = 'Jane Doe';
// Setting name to Jane Doe
console.log(data.name);
// Getting name: Jane Doe
