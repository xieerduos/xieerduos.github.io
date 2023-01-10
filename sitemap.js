var fs = require('fs');
var file = '_sidebar.md';

fs.readFile(file, 'utf8', function (err, data) {
  if (err) {
    console.log('Error: ' + err);
    return;
  }
  var xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  let urls = data.split('\n');
  for (var i = 0; i < urls.length; i++) {
    let match = urls[i].match(/\(([^()]+)\)/);
    console.log('match', match);

    if (match) {
      let clearUrl = match[1].replace('.md', '');
      xml += '  <url>\n    <loc>https://ffffee.com/#' + clearUrl + '</loc>\n  </url>\n';
    }
  }
  xml += '</urlset>';

  fs.writeFile('sitemap.xml', xml, function (err) {
    if (err) {
      console.log('Error: ' + err);
    } else {
      console.log('sitemap.xml was generated!');
    }
  });
});
