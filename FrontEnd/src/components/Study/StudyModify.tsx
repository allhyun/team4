import React, { useRef, useState, useEffect } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import StudyHeader from './StudyHeader';

//프롭스로 받은 값을 가져와서 표시

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

const StudyModify = () => {
  const imData = useSelector((state: any) => state.study.study.studyDetail); //여유되면 타입 고치기
  //imData.st_title같은 형식으로 사용
  console.log(imData);
  const navigate = useNavigate();
  const editorRef = useRef<any>();

  const [data, setData] = useState<DataType>({
    u_idx: 1,
    st_title: `${imData.st_title}`,
    st_intro: `${imData.st_intro}`,
    st_now_mem: imData.st_now_mem,
    st_limit: imData.st_limit,
    st_fe: imData.st_fe,
    st_be: imData.st_be,
    st_pub: imData.st_pub,
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
      // const response = await axios.put(`http://localhost:8000/study/detail/${imData.st_idx}`, data);
      const response = await axios.put(
        `${process.env.REACT_APP_HOST}/study/detail/${imData.st_idx}`,
        data
      );
      console.log('Server response:', response.data);
      //성공시 스터디메인페이지로 리다이렉트
      navigate('/study');
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };
  const options: number[] = Array.from({ length: 11 }, (_, index) => index);
  useEffect(() => {
    const htmlString = imData.st_intro;

    // 2. Editor DOM 내용에 HTML 주입
    editorRef.current?.getInstance().setHTML(htmlString);
  }, []);

  return (
    <>
      <StudyHeader />
      <div className="study-modify-container">
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
        />
        <button onClick={handleSubmit} className="study-button">
          수정
        </button>
        <button
          onClick={() => {
            navigate('/study');
          }}
          className="study-button"
        >
          취소
        </button>
      </div>
    </>
  );
};

export default StudyModify;
