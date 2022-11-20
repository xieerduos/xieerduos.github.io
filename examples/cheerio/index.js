const cheerio = require('cheerio'); // 可以理解为 node 版本的jquery
const request = require('request'); // 请求页面
request(
  'https://www.douyin.com/user/MS4wLjABAAAAkiur2fK3qQYKHtdnwzT2_ysUpdIbGRMJ_2l3cA_l_3A',
  (error, response, body) => {
    if (!error && response && response.statusCode === 200) {
      const $ = cheerio.load(body);
      const dataSource = []; // {title: string, tags: string[]}
      $('.Eie04v01').each((i, el) => {
        const title = $(el).find($('.iQKjW6dr')).text().trim();
        const tags = title.match(/#\S{1,}/gi) || [];
        dataSource.push({
          title,
          tags: tags
            .join('')
            .split('#')
            .filter((item) => item.trim())
        });
      });

      console.log('dataSource', dataSource);
    } else {
      console.log('error', error);
    }
  }
);
