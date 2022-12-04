import './App.css';
import TinymceEditor from './components/TinymceEditor/index';

function App() {
  return (
    <div className="App">
      <div className="example">
        <h1 className="title">富文本 tinymce 技术调研（React + Node express）</h1>
        <TinymceEditor></TinymceEditor>
      </div>
    </div>
  );
}

export default App;
