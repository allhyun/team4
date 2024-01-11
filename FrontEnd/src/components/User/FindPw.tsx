import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

interface FindPwForm {
  userId: string;
  userEmail: string;
}

const FindPw = () => {
  const [userEmail, setUserEmail] = useState<string>('');
  const [userId, setUserId] = useState<string>('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FindPwForm>({
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<FindPwForm> = async (inputData) => {
    const data = {
      userid: inputData.userId,
      email: inputData.userEmail,
    };

    const response = await axios.post(
      `${process.env.REACT_APP_HOST}/user/findPassword`,
      data
    );
    if (!response) return;
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrap">
          <input
            type="text"
            placeholder="id"
            value={userId}
            {...register('userId', {
              required: 'id를 입력해주세요.',
              pattern: {
                value: /^[a-zA-Z0-9-]+$/i,
                message: '잘못된 형식입니다.',
              },
              minLength: {
                value: 8,
                message: '8글자 이상 입력해주세요.',
              },
              maxLength: {
                value: 12,
                message: '12글자 이하로 입력해주세요.',
              },
            })}
            name="userId"
            onChange={(e) => setUserId(e.target.value)}
            // onBlur={onBlurHandler}
            // onBlur={checkDuplicate}
          />
          <p className="alert">
            {errors.userId?.message}
            {/* {isUseridDuplicated ? `중복된 id입니다.` : ''} */}
          </p>
        </div>
        <div className="input-wrap">
          <input
            type="text"
            placeholder="e-mail"
            value={userEmail}
            {...register('userEmail', {
              required: '이메일을 입력해주세요.',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                message: '잘못된 형식입니다.',
              },
            })}
            onChange={(e) => setUserEmail(e.target.value)}
            name="userEmail"
          />
          <p className="alert">{errors.userEmail?.message}</p>
        </div>

        <div className="input-wrap">
          <button type="submit">비밀번호 찾기</button>
        </div>
      </form>
    </>
  );
};

export default FindPw;
