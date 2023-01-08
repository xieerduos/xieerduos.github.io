const appEL = document.getElementById('app');

window.electronAPI.onShowTranslate((_event, text) => {
  // 播放文本
  const say = new window.SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(say);

  // 把文本输出
  document.querySelector('#app').innerHTML = text;
});
