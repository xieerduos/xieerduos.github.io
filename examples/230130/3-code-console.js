let a = {
  b: function () {
    console.log(this);
  },
  c: () => {
    console.log(this);
  }
};
a.b(); // a
a.c(); // window
