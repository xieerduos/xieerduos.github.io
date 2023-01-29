const sqlite3 = require('sqlite3').verbose();

main();

function main() {
  // 创建一个数据库连接
  const db = new sqlite3.Database(':memory:');

  // 创建一个消息表
  db.run('CREATE TABLE messages (id INTEGER PRIMARY KEY, content TEXT)');

  // 插入消息数据
  db.run("INSERT INTO messages (content) VALUES ('hello, world')");
  db.run("INSERT INTO messages (content) VALUES ('foo bar')");
  db.run("INSERT INTO messages (content) VALUES ('baz qux')");

  // 使用全文检索查询消息
  const searchTerm = 'foo';
  db.all(`SELECT * FROM messages WHERE content MATCH '${searchTerm}'`, (err, rows) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(rows);
  });

  // 关闭数据库连接
  db.close();
}
