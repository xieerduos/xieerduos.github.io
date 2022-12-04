import React, {useRef} from 'react';
import {Editor} from '@tinymce/tinymce-react';
import {uploadFile} from '../../api/upload';
export default function TinymceEditor() {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const example_image_upload_handler = (blobInfo, progress) =>
    new Promise((resolve, reject) => {
      const formData = new FormData();
      formData.append('tinymceFile', blobInfo.blob(), blobInfo.filename());

      uploadFile(formData, progress)
        .then((response) => {
          resolve(response.data.location);
        })
        .catch(reject);

      // const xhr = new XMLHttpRequest();
      // xhr.withCredentials = false;
      // xhr.open('POST', 'http://localhost:8000/upload');

      // xhr.upload.onprogress = (e) => {
      //   progress((e.loaded / e.total) * 100);
      // };

      // xhr.onload = () => {
      //   if (xhr.status === 403) {
      //     reject({message: 'HTTP Error: ' + xhr.status, remove: true});
      //     return;
      //   }

      //   if (xhr.status < 200 || xhr.status >= 300) {
      //     reject('HTTP Error: ' + xhr.status);
      //     return;
      //   }

      //   const json = JSON.parse(xhr.responseText);

      //   if (!json || typeof json.location != 'string') {
      //     reject('Invalid JSON: ' + xhr.responseText);
      //     return;
      //   }

      //   resolve(json.location);
      // };

      // xhr.onerror = (error) => {
      //   console.log('error', error);
      //   reject('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
      // };

      // const formData = new FormData();
      // formData.append('tinymceFile', blobInfo.blob(), blobInfo.filename());

      // xhr.send(formData);
    });

  const file_picker_callback = (callback, value, meta) => {
    // Provide alternative source and posted for the media dialog
    if (meta.filetype === 'media') {
      // callback('movie.mp4', {source2: 'alt.ogg', poster: 'image.jpg'});
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'video/mp4');

      // https://www.tiny.cloud/docs/configure/file-image-upload/#interactiveexample
      input.addEventListener('change', function (event) {
        const file = this.files[0];

        const formData = new FormData();

        formData.append('tinymceFile', file);

        // todo uploading file
        // todo uploading file
        // todo uploading file
        // todo uploading file

        uploadFile(formData)
          .then((response) => {
            // poster 视频封面
            callback(response.data.location, {title: '视频title'});
          })
          .catch((error) => {
            console.error('[uploadFile media error]', error);
            callback('', {title: '视频title'});
          });
      });

      input.click();
    }
  };

  return (
    <>
      <Editor
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        init={{
          height: 500,
          menubar: false,
          image_title: true,
          automatic_uploads: true,
          images_upload_handler: example_image_upload_handler,
          /*
            URL of our upload handler (for more details check: https://www.tiny.cloud/docs/configure/file-image-upload/#images_upload_url)
            images_upload_url: 'postAcceptor.php',
            here we add custom filepicker only to Image dialog
          */
          file_picker_types: 'media',
          /* and here's our custom image picker*/
          file_picker_callback,
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'help',
            'wordcount'
          ],
          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help |' +
            'link image media | code',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
      />
      <button onClick={log}>Log editor content</button>
    </>
  );
}
