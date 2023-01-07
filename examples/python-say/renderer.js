const appEL = document.getElementById('app');

window.electronAPI.onShowTranslate((_event, text) => {
  document.querySelector('#app').innerHTML = text;
});
