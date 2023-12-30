import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import { useRef } from 'react';
import axios from 'axios';
import { useState } from 'react';
interface DataType {
  u_idx: string;
  st_title: string;
  st_intro: string;
  st_now_mem: string;
  st_limit: string;
  st_fe: string;
  st_be: string;
  st_pub: string;
}
const StudyToastEditor = () => {
  const editorRef = useRef<any>(); //시간남으면 any해결하기
  const [data, setData] = useState<DataType>({
    u_idx: '',
    st_title: '',
    st_intro: '',
    st_now_mem: '',
    st_limit: '',
    st_fe: '',
    st_be: '',
    st_pub: '',
  });
  const onChange = () => {
    setData({
      u_idx: '',
      st_title: '',
      st_intro: editorRef.current.getInstance().getHTML(),
      st_now_mem: '',
      st_limit: '',
      st_fe: '',
      st_be: '',
      st_pub: '',
    }); //html형태로 내용을 data변수에 담는다(문자열)
    console.log(data.st_intro);
    //내용에 onChange 걸어서 작성된 내용이 변경 될때마다 텍스트를 가져오게한다.
  };

  //axios로 데이터 전송

  return (
    <Editor
      previewStyle="vertical"
      height="600px"
      initialEditType="wysiwyg"
      useCommandShortcut={false}
      language="ko-KR"
      plugins={[colorSyntax]}
      ref={editorRef}
      onChange={onChange}
    />
  );
};

export default StudyToastEditor;
