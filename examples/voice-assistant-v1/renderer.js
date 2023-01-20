const appEL = document.getElementById('app');

window.electronAPI.onShowTranslate((_event, text) => {
  // 播放文本
  const say = new window.SpeechSynthesisUtterance(text);
  // const voices = window.speechSynthesis.getVoices();

  // say.voice = window.speechSynthesis.getVoices().filter((voice) => voice.lang === 'zh-HK')[0];
  // say.voice = window.speechSynthesis.getVoices().filter((voice) => voice.name === 'Microsoft Huihui - Chinese (Simplified, PRC)')[0];
  say.voice = window.speechSynthesis
    .getVoices()
    .filter((voice) => voice.name === 'Microsoft Kangkang - Chinese (Simplified, PRC)')[0];
  // say.voice = window.speechSynthesis.getVoices().filter((voice) => voice.name === 'Microsoft Mark - English (United States)')[0];
  // say.voice = window.speechSynthesis.getVoices().filter((voice) => voice.name === 'Microsoft Yaoyao - Chinese (Simplified, PRC)')[0];

  // console.log('voices :>> ', voices);

  window.speechSynthesis.speak(say);

  // 把文本输出
  document.querySelector('#app').innerHTML = text;
});
