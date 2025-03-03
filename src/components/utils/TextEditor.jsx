import { useCallback, useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import storyApi, { storyUrl } from "../../api/storyApi";

const tinymceKey = process.env.REACT_APP_TINYMCE_KEY;

export default function TextEditor({ value, onChange, placeholder }) {
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const handleImageUpload = useCallback((blobInfo, progress, failure) => {
    return new Promise((resolve, reject) => {
      storyApi.uploadStoryImage(blobInfo.blob(), progress).then((response) => {
        const path = response.data.path;
        resolve(path);
      });
    });
  }, []);

  return (
    <div>
      <Editor
        onChange={(event, editor) => onChange(editor.getContent())}
        // value={value}
        apiKey={tinymceKey}
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue="<p>This is the initial content of the editor.</p>"
        init={{
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | image | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          automatic_uploads: true,
          images_upload_url: storyUrl.uploadStoryImage,
          images_reuse_filename: true,
          images_upload_handler: handleImageUpload,
        }}
      />
    </div>
  );
}
