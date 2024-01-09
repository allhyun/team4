import React, { useRef, useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { upload } from '@testing-library/user-event/dist/upload';
import { useSelector } from 'react-redux';

interface DataType {
  u_idx: number;
  st_title: string;
  st_intro: string;
  st_now_mem: number;
  st_limit: number;
  st_fe: number;
  st_be: number;
  st_pub: number;
}

const StudyToastEditor = () => {
  const navigate = useNavigate();
  const editorRef = useRef<any>();
  const userData = useSelector((state: any) => state.user.user);
  //이미지관련 훅 새로 생성
  type HookCallback = (url: string, text?: string) => void;

  const onUploadImage = async (blob: Blob | File, callback: HookCallback) => {
    let imageUrl = '';
    // blob 자체가 file 임,
    if (blob instanceof File) {
      const formData = new FormData();
      formData.append('image', blob);
      try {
        const response = await axios.post(
          // 'http://localhost:8000/study/upload'
          `${process.env.REACT_APP_HOST}/study/upload`,
          formData,
          {
            withCredentials: true,
          }
        );

        console.log(response.data.imageUrl);
        imageUrl = response.data.imageUrl;
      } catch (error) {
        console.error('Error uploading image:', error);
      }
      //                    'http://localhost:8000/'
      const url: string = `${process.env.REACT_APP_HOST}/` + imageUrl;
      //이런이미지로 이름이 정해짐

      callback(url, blob.name);
      //미리보기에서 보여줄 url
    }
  };

  const [data, setData] = useState<DataType>({
    u_idx: userData.u_idx,
    st_title: '',
    st_intro: '',
    st_now_mem: 0,
    st_limit: 0,
    st_fe: 0,
    st_be: 0,
    st_pub: 0,
  });

  const [inputErrorMessage, setInputErrorMessage] = useState<string>('');

  const handleEditorChange = () => {
    setData((prevData) => ({
      ...prevData,
      st_intro: editorRef.current.getInstance().getHTML(),
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // 정규식을 사용하여 숫자만 허용
    if (name === 'st_limit' && !/^\d*$/.test(value)) {
      setInputErrorMessage('숫자만 입력하세요.');
    } else {
      setInputErrorMessage('');
      setData((prevData) => ({
        ...prevData,
        [name]:
          name === 'st_limit'
            ? value !== ''
              ? parseInt(value, 10)
              : ''
            : value,
      }));
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: parseInt(value, 10),
    }));
  };

  const handleSubmit = async () => {
    if (!data.st_title || !data.st_limit) {
      // 필수 입력 필드가 비어있다면 포커스
      if (!data.st_title) {
        document.getElementsByName('st_title')[0].focus();
      } else if (!data.st_limit) {
        document.getElementsByName('st_limit')[0].focus();
      }

      // 메시지를 통해 사용자에게 알림
      setInputErrorMessage('필수 입력 항목을 모두 입력하세요.');
      return; // 데이터가 비어 있으면 함수 종료
    }

    // 필수 입력 필드가 모두 입력되었다면 메시지 초기화
    setInputErrorMessage('');

    try {
      const response = await axios.post(
        // 'http://localhost:8000/study/regist'
        `${process.env.REACT_APP_HOST}/study/regist`,
        data
      );
      console.log('Server response:', response.data);
      //성공시 스터디메인페이지로 리다이렉트
      navigate('/study', { state: { key: 'study-page' } });
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  const options: number[] = Array.from({ length: 11 }, (_, index) => index);

  return (
    <>
      <p>프로젝트 이름</p>
      <input
        type="text"
        onChange={handleInputChange}
        name="st_title"
        value={data.st_title}
      />
      <p>기간</p>
      <input
        type="text"
        onChange={handleInputChange}
        name="st_limit"
        value={data.st_limit}
      />
      주{inputErrorMessage && <span>{inputErrorMessage}</span>}
      <p>포지션</p>
      퍼블리셔
      <select name="st_pub" onChange={handleSelectChange} value={data.st_pub}>
        {options.map((optionValue) => (
          <option key={optionValue} value={optionValue}>
            {optionValue}
          </option>
        ))}
      </select>
      프론트엔드
      <select name="st_fe" onChange={handleSelectChange} value={data.st_fe}>
        {options.map((optionValue) => (
          <option key={optionValue} value={optionValue}>
            {optionValue}
          </option>
        ))}
      </select>
      백엔드
      <select name="st_be" onChange={handleSelectChange} value={data.st_be}>
        {options.map((optionValue) => (
          <option key={optionValue} value={optionValue}>
            {optionValue}
          </option>
        ))}
      </select>
      <hr />
      <Editor
        previewStyle="vertical"
        initialEditType="wysiwyg"
        useCommandShortcut={false}
        language="ko-KR"
        plugins={[colorSyntax]}
        ref={editorRef}
        onChange={handleEditorChange}
        hooks={{
          addImageBlobHook: onUploadImage,
        }}
        height="1000px"
      />
      <button onClick={handleSubmit} className="study-button">
        제출
      </button>
    </>
  );
};

export default StudyToastEditor;
