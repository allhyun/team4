import React, { ChangeEvent, SyntheticEvent, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import '../../styles/pages/_user_login.scss';

interface LoginForm {
  userId: string;
  userPw: string;
}

const UserMainPage = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState<string>('');
  const [userPw, setUserPw] = useState<string>('');

  // react-hook-form input 초기값 제공하지 않으면 undefined로 관리됨
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginForm>({
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

  const onSubmit: SubmitHandler<LoginForm> = async (data: LoginForm) => {
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
  const onInvalid = (err: any) => {
    console.log('실패', err);
  };

  return (
    <section>
      <div className="form-wrap">
        <form className="login-form" onSubmit={handleSubmit(onSubmit, onInvalid)}>
          <h1>Login</h1>
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
              onChange={onUserIdHandler}
            />
            <p className="alert">{errors.userId?.message}</p>
          </div>
          <div className="input-wrap">
            <input
              type="password"
              placeholder="password"
              value={userPw}
              autoComplete="off"
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
          <div className="user-wrap">
            <div>아이디 찾기</div>
            <div>비밀번호 찾기</div>
            <Link to={'/signup'}>
              <div>회원가입</div>
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UserMainPage;
