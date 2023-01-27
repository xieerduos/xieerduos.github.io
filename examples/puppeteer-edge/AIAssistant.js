class AIAssistant {
  name = '人工智能助理';
  intervalCommentsId = null; /*定时器id*/
  intervalWelId = null; /*定时器id*/

  running = 0; /*0等在开始 1运行中*/

  constructor({name}) {
    this.name = name || this.name;
  }
  start() {
    this.running = 1;
    this.intervalCommentsId = this.playCommentMessage();
    this.intervalWelId = this.palyWelcome();
  }

  clear() {
    this.running = 0;
    window.clearInterval(this.intervalWelId);
    window.clearInterval(this.intervalCommentsId);
  }

  playCommentMessage() {
    return setInterval(() => {
      const giftElements = document.querySelectorAll('.webcast-chatroom___item.webcast-chatroom___enter-done');
      const currentGiftElement = giftElements[giftElements.length - 1];

      const lastMessage = sessionStorage.getItem('MESSAGE_GIFT');
      let currentMessage = currentGiftElement && currentGiftElement.innerText;

      if (!currentMessage || (currentMessage && currentMessage.indexOf('来了') !== -1)) {
        console.error('currentMessage', currentMessage);
        return;
      }

      if (currentMessage === lastMessage || currentMessage.includes('欢迎来到直播间！')) {
        /*console.log("重复");*/
        return;
      }
      sessionStorage.setItem('MESSAGE_GIFT', currentMessage);

      currentMessage = currentMessage.replace(/(.+?)\1{2}/g, '$1');

      if (/送出了/gi.test(currentMessage)) {
        let name = currentMessage.slice(0, currentMessage.indexOf('送出了'));

        const match = currentMessage.match(/\d{1,}$/);
        if (match) {
          const number = Number(match[0]);
          currentMessage = `感谢${name}送${number}个礼物`;
        } else {
          currentMessage = `感谢${name}送的礼物`;
        }
      }

      this.sayMessage(currentMessage);

      /* 
        1. 弹幕点歌
        2. 列表的方式 （展示一个排行榜 礼物从大到小排序）
        3. 如果没有人点歌，没有刷礼物也可以点
      */
      if (/播放/gi.test(currentMessage)) {
        window?.handleKugou(currentMessage);
      }
      if (/关闭音乐/gi.test(currentMessage)) {
        window?.handleCloseKugou(currentMessage);
      }

      if (/删除代码|关闭电源/gi.test(currentMessage)) {
        const index = currentMessage.indexOf('：');
        if (index !== -1) {
          this.sayMessage(currentMessage.slice(0, index) + '不可以哦');
        }
      }

      if (/(谁|你是|你是什么|这是|这是啥|这个是啥|这是什么|啥玩意|干什么|干啥|啥意思|干嘛)/gi.test(currentMessage)) {
        this.sayMessage('我是你的人工智能助理');
      }
      if (
        /(教|领|这用啥写的|怎么做的|什么语言|识别|代码|源码|如何学习|想要|开源|源代码|api|js|py|python|接口|实现|插件|库)/gi.test(
          currentMessage
        )
      ) {
        this.sayMessage('点关注 亮灯排 送代码');
      }
      if (/(怎么进群|进群|粉丝群)/.test(currentMessage)) {
        this.sayMessage('点关注 私聊我 进粉丝群');
      }
      if (/(没有欢迎|不欢迎|没有我|我呢|欢迎|不读|bug|读我|咋没有)/gi.test(currentMessage)) {
        const index = currentMessage.indexOf('：');
        if (index !== -1) {
          this.sayMessage(currentMessage.slice(0, index) + '欢迎你');
        }
      }
      if (/(夸|谢谢)/.test(currentMessage)) {
        const index = currentMessage.indexOf('：');
        if (index !== -1) {
          this.sayMessage('夸夸你' + currentMessage.slice(0, index) + '你说话真好听');
        }
      }
      if (/(关注)/gi.test(currentMessage)) {
        const index = currentMessage.indexOf('：');
        if (index !== -1) {
          this.sayMessage(currentMessage.slice(0, index) + '私聊我发你源码');
        }
      }
      if (/(卧槽|尼玛|我去|翻墙)/gi.test(currentMessage)) {
        const index = currentMessage.indexOf('：');
        if (index !== -1) {
          this.sayMessage(currentMessage.slice(0, index) + '请文明用语');
        }
      }
      if (/(6|牛|厉害|棒|实力|稀缺|真不错|大哥|六|liu|nb|大佬|火|不错|加油|智能|秀)/gi.test(currentMessage)) {
        this.sayMessage('谢谢你夸我');
      }
    }, 300);
  }
  palyWelcome() {
    return setInterval(() => {
      const bottomElements = document.querySelectorAll('.webcast-chatroom___bottom-message');
      const currentElement = bottomElements[bottomElements.length - 1];

      const lastMessage = sessionStorage.getItem('MESSAGE_BOTTOM');
      const currentMessage = currentElement && currentElement.innerText;

      if (currentMessage === lastMessage) {
        console.log('重复');
        return;
      }
      sessionStorage.setItem('MESSAGE_BOTTOM', currentMessage);
      /*console.log("欢迎 ", currentMessage);*/
      let sayText = currentMessage;
      if (sayText.indexOf('来了') !== -1) {
        sayText = currentMessage.replace(/来了$/gi, '');
        sayText = '欢迎 ' + sayText;
      }

      this.sayMessage(sayText);
    }, 350);
  }

  sayMessage(currentMessage = '') {
    if (typeof window.handleCallback === 'function') {
      window.handleCallback(currentMessage);
    }
    console.log(currentMessage);

    /*把数据存储在服务端*/
    // window.fetch(`http://localhost:3300/?data=${currentMessage}`).catch((error) => {
    //   console.log('window.fetch error', error);
    // });

    currentMessage = currentMessage.replace(/[^\u4e00-\u9fa5a-zA-Z0-9]/gi, '');

    const say = new window.SpeechSynthesisUtterance(currentMessage || '');

    say.volume = window.volume || 0.2;
    say.voice = window.speechSynthesis.getVoices().filter((voice) => voice.lang === 'zh-CN')[3];

    window.speechSynthesis.speak(say);
  }
}
