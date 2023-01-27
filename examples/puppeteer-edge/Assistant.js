/**
 * @file 语音助理
 * @author 抖音@程序员李钟意
 */

class Assistant {
  name = '';
  recognition = {};
  textContent = ''; // 当前的识别内容
  constructor({name}) {
    this.name = name;

    this.recognition = this.createRecognition((textContent) => {
      this.setTextContent(textContent);
    });
  }
  start() {
    this.recognition && this.recognition.start();
  }
  createRecognition(callback = () => {}) {
    try {
      if (typeof callback !== 'function') {
        console.error('createRecognition callback is not function!');
        callback = () => {};
      }
      /*如果浏览器支持 Web Speech API*/
      if (!('webkitSpeechRecognition' in window)) {
        console.error('浏览器不支持 Web Speech API');
        return;
      }
      /*创建一个新的 SpeechRecognition 对象*/
      const recognition = new webkitSpeechRecognition();

      /*设置连续识别模式*/
      recognition.continuous = false;
      /*设置为输出临时结果*/
      recognition.interimResults = true;

      /*当有识别结果时调用的回调函数*/
      recognition.onresult = (event) => {
        /*临时识别结果*/
        let interimTranscript = '';
        /*最终识别结果*/
        let finalTranscript = '';

        /*  console.log("event.results :>> ", event.results);*/

        /*遍历所有的识别结果*/
        for (let i = event.resultIndex; i < event.results.length; i++) {
          /*获取当前的识别结果*/
          const transcript = event.results[i][0].transcript;

          /*console.log("transcript", transcript);*/
          /*如果当前的识别结果是最终结果*/
          if (event.results[i].isFinal) {
            /*将当前结果添加到最终识别结果中*/
            finalTranscript += transcript;
          } else {
            /*否则，将当前结果添加到临时识别结果中*/
            interimTranscript += transcript;
          }
        }

        /*如果有最终识别结果，则输出最终识别结果；否则，输出临时识别结果*/
        const textContent = finalTranscript || interimTranscript;

        callback(textContent);
      };

      return recognition;
    } catch (error) {
      console.error('error', error);
    }
  }
  setTextContent(textContent) {
    this.textContent = textContent;
  }
  getTextContent() {
    return this.textContent;
  }
}
