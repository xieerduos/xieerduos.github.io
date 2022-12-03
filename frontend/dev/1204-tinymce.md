# 富文本 tinymce 技术调研

富文本前后端从 0 到 100 拆解实现

https://www.yerenwz.com/5421.html

https://juejin.cn/post/7055164243624067080

中文文档 http://tinymce.ax-z.cn/quick-start.php

https://blog.csdn.net/qq_42881737/article/details/121328799

## Nextjs 引入 tinymce 富文本

### 官方例子稍加修改

```tsx
import React, {useRef} from 'react';
// @ts-ignore
import {Editor as EditorApp} from '@tinymce/tinymce-react';

function EditorTinymce(): any {
  const editorRef: any = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };
  return (
    <>
      <EditorApp
        onInit={(evt: any, editor: any) => (editorRef.current = editor)}
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          language: 'zh_CN',
          menubar: false,
          plugins: [
            'a11ychecker',
            'advlist',
            'advcode',
            'advtable',
            'autolink',
            'checklist',
            'export',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'powerpaste',
            'fullscreen',
            'formatpainter',
            'insertdatetime',
            'media',
            'table',
            'help',
            'wordcount'
          ],
          toolbar:
            'undo redo | casechange blocks | bold italic backcolor | ' +
            'alignleft aligncenter alignright alignjustify | ' +
            'bullist numlist checklist outdent indent | removeformat | a11ycheck code table help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
}

export default EditorTinymce;
```

### tinymce 本地化

拷贝 node_modules/tinymce 目录到 public 目录下

## 删掉付费右下角 logo

全文检索下面关键字

```
tox-statusbar__branding
```

图片文件上传

```bash
https://www.tiny.cloud/docs/configure/file-image-upload/
```
