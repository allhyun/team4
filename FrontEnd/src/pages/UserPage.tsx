import React, { ChangeEvent, SyntheticEvent, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import '../styles/LoginPage.scss';

interface LoginForm {
  userId: string;
  userPw: string;
}

const LoginPage = () => {
  const [userId, setUserId] = useState<string>('');
  const [userPw, setUserPw] = useState<string>('');

  // react-hook-form input 초기값 제공하지 않으면 undefined로 관리됨
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginForm>();
  // {
  // mode: 'onSubmit',
  // defaultValues: {
  //   userId: '',
  //   userPw: '',
  // },}

  const onUserIdHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserId(event.currentTarget.value);
  };
  const onUserPwHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserPw(event.currentTarget.value);
  };
  // const onSubmitHandler = (event: SyntheticEvent) => {
  //   event.preventDefault();
  // };

  const onValid: SubmitHandler<{ userId: string; userPw: string }> = (data) => {
    console.log('성공', data);
    // 여기에서 필요한 로직을 수행하십시오.
  };

  const onInvalid = (err: any) => {
    console.log('실패', err);
  };

  console.log(watch('userId'));

  // 로그인 여부 테스트
  let isLogin: boolean = false;

  return (
    <section>
      <div>UserPage</div>
      {isLogin && true}
      <div className="form-wrap">
        <form className="login-form" onSubmit={handleSubmit(onValid, onInvalid)}>
          <label htmlFor="">ID</label>
          <input
            type="text"
            placeholder="ID를 입력해주세요."
            value={userId}
            {...register('userId', { required: 'ID를 입력하지 않았습니다.' })}
            onChange={onUserIdHandler}
          />
          {errors.userId?.message}
          <label htmlFor="">PW</label>
          <input
            type="password"
            placeholder="Password를 입력해주세요."
            value={userPw}
            {...register('userPw', { required: 'Password를 입력해주세요.' })}
            onChange={onUserPwHandler}
          />
          <button type="submit">로그인</button>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
