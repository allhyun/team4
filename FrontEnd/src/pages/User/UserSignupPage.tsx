import React, { ChangeEvent } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import '../../styles/pages/_user_login.scss';

interface SignupForm {
  userId: string;
  userPw: string;
  userNickname: string;
  userEmail: string;
}

const UserSignupPage = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string>('');
  const [userPw, setUserPw] = useState<string>('');
  const [userNickname, setUserNickname] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');

  // react-hook-form input 초기값 제공하지 않으면 undefined로 관리됨
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupForm>({
    mode: 'onBlur',
    defaultValues: {
      userId: '',
      userPw: '',
    },
  });

  const onUserIdHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserId(event.currentTarget.value);
  };
  const onUserPwHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserPw(event.currentTarget.value);
  };

  const onSubmit: SubmitHandler<SignupForm> = async (data: SignupForm) => {
    try {
      console.log('성공', data);
      const user = { userid: data.userId, password: data.userPw };
      const response = await axios.post('http://localhost:8000/user/signin', user);
      if (response.data.result === true) navigate('/');
      console.log('response.data.result', response.data.result);
    } catch (error) {
      console.log('error', error);
    }
  };

  const onInvalid: SubmitErrorHandler<SignupForm> = (err) => {
    console.log('실패', err);
  };

  const onBlurHandler = (evt: ChangeEvent<HTMLInputElement>) => {
    const userid = evt.target.value;
    const response = axios.post('http://localhost:8000/user/checkid', userid);
    console.log('response', response);
  };

  return (
    <section>
      <div className="form-wrap">
        <form className="login-form" onSubmit={handleSubmit(onSubmit, onInvalid)}>
          <h1>Sign Up</h1>
          <div className="input-wrap">
            <input
              type="text"
              placeholder="ID"
              value={userId}
              {...register('userId', {
                required: 'ID를 입력해주세요.',
                pattern: {
                  value: /^[a-zA-Z0-9-]+$/i,
                  message: '잘못된 형식입니다.',
                },
              })}
              name="userId"
              // onBlur={onBlurHandler}
              onChange={onUserIdHandler}
            />
            <p className="alert">{errors.userId?.message}</p>
          </div>
          <div className="input-wrap">
            <input
              type="password"
              placeholder="password"
              value={userPw}
              {...register('userPw', {
                required: 'password를 입력해주세요.',
                // pattern: {
                //   value: /^[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                //   message: '잘못된 형식입니다.',
                // },
              })}
              name="userPw"
              onChange={onUserPwHandler}
            />
            <p className="alert">{errors.userPw?.message}</p>
          </div>
          <div className="input-wrap">
            <button type="submit">로그인</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UserSignupPage;
