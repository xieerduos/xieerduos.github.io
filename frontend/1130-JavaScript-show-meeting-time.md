# JavaScript 显示会议时长代码拆解实现

我们在使用在线会议的时候，比如使用腾讯会议、zoom 开会时，有一个会议时长的显示

如果让你使用 JavaScript 代码实现，你怎么做呢

## 需求描述

| 序号 | 需求描述                                                                     |
| :--: | :--------------------------------------------------------------------------- |
|  1   | 已知开始时间                                                                 |
|  2   | 动态显示开会时长                                                             |
|  3   | 时间格式 `HH:mm:ss` 时分秒（允许超出 24 小时，比如 `28:10:00`、`213:10:00`） |

## 最终效果

在线查看 <a href="/examples/meeting-time/index.html" target="_blank">/examples/meeting-time/index.html</a><br/>

```
开始时间：2022/11/30 00:00:00
现在时间：2022/11/30 03:03:23
会议时长：03:03:23
```

## 先写 html 模板和引入 dayjs

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>会议时长</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="https://cdn.bootcdn.net/ajax/libs/dayjs/1.11.6/dayjs.min.js"></script>
    <script>
      main();
      // 程序入口
      function main() {}
    </script>
  </body>
</html>
```

## 算出会议时长毫秒数

根据已知情况，

首先我们可以得出会议时长等于当前时间 减去开始时间

```HTML
<script>
    main();
    // 程序入口
    function main() {
        // 开始时间
        const meetingTime = new Date("2022/11/30 02:00");
        // 当前时间
        const currentTime = new Date();
        // 会议时长
        const duration = currentTime - meetingTime;
        // 输出会议时长毫秒数
        console.log('[duration]', duration); // 毫秒数
    }
</script>
```

## 算出小时格式化这里显示的数值

```js
main();
// 程序入口
function main() {
  // 开始时间
  const meetingTime = new Date('2022/11/30 02:00');
  // 当前时间
  const currentTime = new Date();
  // 会议时长
  const duration = currentTime - meetingTime;
  // 输出会议时长毫秒数
  console.log('[duration]', duration); // 毫秒数

  // 英语单词：
  // 小时 hour
  // 分钟 minute
  // 秒 second
  // 余数 remainder

  // 算出小时格式化这里显示的数值
  // 1 hour === 1000 * 60 * 60 毫秒
  // duration / 1000 * 60 * 60 === hourCount 此时会有余数
  // (duration - remainder) / 1000 * 60 * 60 是不是就是被整除了
  // 如果duration 小于 1000 * 60 * 60 ，那么余数是duration本身，那么hourCount将会是0
  const hourRemainder = (duration % 1000) * 60 * 60;
  // 小时的地方显示的数值
  const hourCount = (duration - hourRemainder) / (1000 * 60 * 60);
  console.log('[hourCount]', hourCount);
}
```

## 同理，那么分钟、秒所在的位置也可以算出来

```js
function main() {
  // 开始时间
  const meetingTime = new Date('2022/11/30 02:00');
  // 当前时间
  const currentTime = new Date();
  // 会议时长
  const duration = currentTime - meetingTime;
  // 输出会议时长毫秒数
  console.log('[duration]', duration); // 毫秒数

  // 英语单词：
  // 小时 hour
  // 分钟 minute
  // 秒 second
  // 余数 remainder

  // 算出小时格式化这里显示的数值
  // 1 hour === 1000 * 60 * 60 毫秒
  // duration / 1000 * 60 * 60 === hourCount 此时会有余数
  // (duration - remainder) / 1000 * 60 * 60 是不是就是被整除了
  // 如果duration 小于 1000 * 60 * 60 ，那么余数是duration本身，那么hourCount将会是0
  const hourRemainder = duration % (1000 * 60 * 60);
  // 小时的地方显示的数值
  const hourCount = (duration - hourRemainder) / (1000 * 60 * 60);
  console.log('[minuteCount]', minuteCount);

  // 余数
  const minuteRemainder = hourRemainder % (1000 * 60);
  // 分钟的地方显示的数值
  const minuteCount = (hourRemainder - minuteRemainder) / (1000 * 60);
  // 余数
  const secondRemainder = minuteRemainder % (1000 * 60);
  // 秒的地方显示的数值
  const secondCount = (minuteRemainder - secondRemainder) / (1000 * 60);

  console.log('[minuteCount]', minuteCount);
  console.log('[secondRemainder]', secondRemainder);
}
```

## main 函数里面代码进行调整抽离

独立方法 getMeetingDuration

```js
function main() {
  getMeetingDuration();
}

function getMeetingDuration() {
  // 开始时间
  const meetingTime = new Date('2022/11/30 02:00');
  // 当前时间
  const currentTime = new Date();
  // 会议时长
  const duration = currentTime - meetingTime;
  // 输出会议时长毫秒数
  console.log('[duration]', duration); // 毫秒数

  // 英语单词：
  // 小时 hour
  // 分钟 minute
  // 秒 second
  // 余数 remainder

  // 算出小时格式化这里显示的数值
  // 1 hour === 1000 * 60 * 60 毫秒
  // duration / 1000 * 60 * 60 === hourCount 此时会有余数
  // (duration - remainder) / 1000 * 60 * 60 是不是就是被整除了
  // 如果duration 小于 1000 * 60 * 60 ，那么余数是duration本身，那么hourCount将会是0
  const hourRemainder = duration % (1000 * 60 * 60);
  // 小时的地方显示的数值
  const hourCount = (duration - hourRemainder) / (1000 * 60 * 60);
  console.log('[minuteCount]', minuteCount);

  // 余数
  const minuteRemainder = hourRemainder % (1000 * 60);
  // 分钟的地方显示的数值
  const minuteCount = (hourRemainder - minuteRemainder) / (1000 * 60);
  // 余数
  const secondRemainder = minuteRemainder % (1000 * 60);
  // 秒的地方显示的数值
  const secondCount = (minuteRemainder - secondRemainder) / (1000 * 60);

  console.log('[minuteCount]', minuteCount);
  console.log('[secondRemainder]', secondRemainder);
}
```

## 继续调整 getMeetingDuration

会议时间和当作参数传入进去并返回一个时分秒对象

```js
function main() {
  // 开始时间
  const meetingTime = new Date('2022/11/30 02:00');
  // 当前时间
  const currentTime = new Date();
  const dateObj = getMeetingDuration(meetingTime, currentTime);

  console.log('[dateObj]', dateObj);
}

function getMeetingDuration(meetingTime, currentTime) {
  // // 开始时间
  // const meetingTime = new Date('2022/11/30 02:00');
  // // 当前时间
  // const currentTime = new Date();
  // 会议时长
  const duration = currentTime - meetingTime;
  // 输出会议时长毫秒数
  console.log('[duration]', duration); // 毫秒数

  // 英语单词：
  // 小时 hour
  // 分钟 minute
  // 秒 second
  // 余数 remainder

  // 算出小时格式化这里显示的数值
  // 1 hour === 1000 * 60 * 60 毫秒
  // duration / 1000 * 60 * 60 === hourCount 此时会有余数
  // (duration - remainder) / 1000 * 60 * 60 是不是就是被整除了
  // 如果duration 小于 1000 * 60 * 60 ，那么余数是duration本身，那么hourCount将会是0
  const hourRemainder = duration % (1000 * 60 * 60);
  // 小时的地方显示的数值
  const hourCount = (duration - hourRemainder) / (1000 * 60 * 60);
  console.log('[hourCount]', hourCount);

  // 余数
  const minuteRemainder = hourRemainder % (1000 * 60);
  // 分钟的地方显示的数值
  const minuteCount = (hourRemainder - minuteRemainder) / (1000 * 60);
  // 余数
  const secondRemainder = minuteRemainder % 1000;
  // 秒的地方显示的数值
  const secondCount = (minuteRemainder - secondRemainder) / 1000;

  console.log('[minuteCount]', minuteCount);
  console.log('[secondRemainder]', secondRemainder);
  return {
    hour: hourCount,
    minute: minuteCount,
    second: secondCount
  };
}
```

## 把时分秒显示到页面

```js
function main() {
  // 开始时间
  const meetingTime = new Date('2022/11/30 02:00');
  // 当前时间
  const currentTime = new Date();
  const dateObj = getMeetingDuration(meetingTime, currentTime);

  console.log('[dateObj]', dateObj);

  const appEl = document.getElementById('app');
  if (!appEl) {
    console.error('showMeetingTime appEl is ', appEl);
    return;
  }
  // 补全前导 0
  const hour = String(dateObj.hour).padStart(2, '0');
  const minute = String(dateObj.minute).padStart(2, '0');
  const second = String(dateObj.second).padStart(2, '0');
  appEl.innerHTML = `
        开始时间：${dayjs(meetingTime).format('YYYY/MM/DD HH:mm:ss')}<br/>
        现在时间：${dayjs(currentTime).format('YYYY/MM/DD HH:mm:ss')}<br/>
        会议时长：${hour}:${minute}:${second}
        `;
}
```

## 动态显示每隔一秒刷新一次

继续抽离逻辑代码，增加 showMeetingTime 方法

```js
function main() {
  // 周期性
  setInterval(() => {
    showMeetingTime();
  }, 1000);
}
function showMeetingTime() {
  // 开始时间
  const meetingTime = new Date('2022/11/30 02:00');
  // 当前时间
  const currentTime = new Date();
  const dateObj = getMeetingDuration(meetingTime, currentTime);

  console.log('[dateObj]', dateObj);

  const appEl = document.getElementById('app');
  if (!appEl) {
    console.error('showMeetingTime appEl is ', appEl);
    return;
  }
  // 补全前导 0
  const hour = String(dateObj.hour).padStart(2, '0');
  const minute = String(dateObj.minute).padStart(2, '0');
  const second = String(dateObj.second).padStart(2, '0');
  appEl.innerHTML = `
        开始时间：${dayjs(meetingTime).format('YYYY/MM/DD HH:mm:ss')}<br/>
        现在时间：${dayjs(currentTime).format('YYYY/MM/DD HH:mm:ss')}<br/>
        会议时长：${hour}:${minute}:${second}
        `;
}
```

## bug

如果会议开始时间比现在时间大那么会显示错误

```
开始时间：2022/11/30 08:00:00
现在时间：2022/11/30 03:14:16
会议时长：-4:-45:-43
```

条件判断，如果大于那么控制台报错

```js
function showMeetingTime() {
  // 开始时间
  const meetingTime = new Date('2022/11/30 02:00');
  // 当前时间
  const currentTime = new Date();
  if (meetingTime > currentTime) {
    console.error(
      '[meetingTime > currentTime]',
      dayjs(meetingTime).format('YYYY-MM-DD HH:mm:ss'),
      dayjs(currentTime).format('YYYY-MM-DD HH:mm:ss')
    );
    return;
  }
  const dateObj = getMeetingDuration(meetingTime, currentTime);

  console.log('[dateObj]', dateObj);

  const appEl = document.getElementById('app');
  if (!appEl) {
    console.error('showMeetingTime appEl is ', appEl);
    return;
  }
  // 补全前导 0
  const hour = String(dateObj.hour).padStart(2, '0');
  const minute = String(dateObj.minute).padStart(2, '0');
  const second = String(dateObj.second).padStart(2, '0');
  appEl.innerHTML = `
        开始时间：${dayjs(meetingTime).format('YYYY/MM/DD HH:mm:ss')}<br/>
        现在时间：${dayjs(currentTime).format('YYYY/MM/DD HH:mm:ss')}<br/>
        会议时长：${hour}:${minute}:${second}
        `;
}
```

## 完整代码如下

在线查看 <a href="/examples/meeting-time/index.html" target="_blank">/examples/meeting-time/index.html</a><br/>

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>会议时长</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="https://cdn.bootcdn.net/ajax/libs/dayjs/1.11.6/dayjs.min.js"></script>
    <script>
      main();
      function main() {
        // 周期性
        setInterval(() => {
          showMeetingTime();
        }, 1000);
      }
      function showMeetingTime() {
        // 开始时间
        const meetingTime = new Date('2022/11/30 02:00');
        // 当前时间
        const currentTime = new Date();
        if (meetingTime > currentTime) {
          console.error(
            '[meetingTime > currentTime]',
            dayjs(meetingTime).format('YYYY-MM-DD HH:mm:ss'),
            dayjs(currentTime).format('YYYY-MM-DD HH:mm:ss')
          );
          return;
        }
        const dateObj = getMeetingDuration(meetingTime, currentTime);

        // console.log('[dateObj]', dateObj);

        const appEl = document.getElementById('app');
        if (!appEl) {
          console.error('showMeetingTime appEl is ', appEl);
          return;
        }
        // 补全前导 0
        const hour = String(dateObj.hour).padStart(2, '0');
        const minute = String(dateObj.minute).padStart(2, '0');
        const second = String(dateObj.second).padStart(2, '0');
        appEl.innerHTML = `
        开始时间：${dayjs(meetingTime).format('YYYY/MM/DD HH:mm:ss')}<br/>
        现在时间：${dayjs(currentTime).format('YYYY/MM/DD HH:mm:ss')}<br/>
        会议时长：${hour}:${minute}:${second}
        `;
      }

      function getMeetingDuration(meetingTime, currentTime) {
        // // 开始时间
        // const meetingTime = new Date('2022/11/30 02:00');
        // // 当前时间
        // const currentTime = new Date();
        // 会议时长
        const duration = currentTime - meetingTime;
        // 输出会议时长毫秒数
        console.log('[duration]', duration); // 毫秒数

        // 英语单词：
        // 小时 hour
        // 分钟 minute
        // 秒 second
        // 余数 remainder

        // 算出小时格式化这里显示的数值
        // 1 hour === 1000 * 60 * 60 毫秒
        // duration / 1000 * 60 * 60 === hourCount 此时会有余数
        // (duration - remainder) / 1000 * 60 * 60 是不是就是被整除了
        // 如果duration 小于 1000 * 60 * 60 ，那么余数是duration本身，那么hourCount将会是0
        const hourRemainder = duration % (1000 * 60 * 60);
        // 小时的地方显示的数值
        const hourCount = (duration - hourRemainder) / (1000 * 60 * 60);
        // console.log('[hourCount]', hourCount);

        // 余数
        const minuteRemainder = hourRemainder % (1000 * 60);
        // 分钟的地方显示的数值
        const minuteCount = (hourRemainder - minuteRemainder) / (1000 * 60);
        // 余数
        const secondRemainder = minuteRemainder % 1000;
        // 秒的地方显示的数值
        const secondCount = (minuteRemainder - secondRemainder) / 1000;

        // console.log('[minuteCount]', minuteCount);
        // console.log('[secondRemainder]', secondRemainder);
        return {
          hour: hourCount,
          minute: minuteCount,
          second: secondCount
        };
      }
    </script>
  </body>
</html>
```
