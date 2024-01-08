import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';

interface FindIdForm {
  userEmail: string;
}

const FindId = () => {
  const [userEmail, setUserEmail] = useState<string>('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FindIdForm>({
    mode: 'onSubmit',
  });

  const onSubmit: SubmitHandler<FindIdForm> = async (inputData) => {
    const data = {
      email: inputData.userEmail,
    };

    const response = await axios.post(
      'http://localhost:8000/user/findId',
      data
    );
    // console.log('response', response);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrap">
          <input
            type="text"
            placeholder="e-mail"
            value={userEmail}
            {...register('userEmail', {
              required: '이메일을 입력해주세요.',
              // pattern: {
              //   value: /^[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
              //   message: '잘못된 형식입니다.',
              // },
            })}
            onChange={(e) => setUserEmail(e.target.value)}
            name="userEmail"
          />
          <p className="alert">{errors.userEmail?.message}</p>
        </div>
        <div className="input-wrap">
          <button type="submit" disabled={isSubmitting}>
            아이디 찾기
          </button>
        </div>
      </form>
    </>
  );
};

export default FindId;
