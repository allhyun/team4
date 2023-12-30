import React, { ChangeEvent, SyntheticEvent } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import '../styles/LoginPage.scss';

interface LoginForm {
  userEmail: string;
  userPw: string;
}

const LoginPage = () => {
  const [userEmail, setUserEmail] = useState<string>('');
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
      userEmail: '',
      userPw: '',
    },
  });

  const onUserEmailHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserEmail(event.currentTarget.value);
  };
  const onUserPwHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUserPw(event.currentTarget.value);
  };
  // const onSubmitHandler = (event: SyntheticEvent) => {
  //   event.preventDefault();
  // };

  const onSubmit: SubmitHandler<LoginForm> = (data: LoginForm) => {
    console.log('성공', data);
    // axios.get();
    // 여기에서 필요한 로직을 수행하십시오.
  };

  const onInvalid = (err: any) => {
    console.log('실패', err);
  };

  // 로그인 여부 테스트
  let isLogin: boolean = true;
  let needLogin: boolean = true;

  return (
    <section>
      <div>UserPage</div>
      {needLogin && true}
      <div className="form-wrap">
        <form className="login-form" onSubmit={handleSubmit(onSubmit, onInvalid)}>
          <label htmlFor="">E-mail</label>
          <input
            type="text"
            placeholder="e-mail"
            value={userEmail}
            {...register('userEmail', { required: 'e-mail을 입력해주세요.' })}
            name="userEmail"
            onChange={onUserEmailHandler}
          />
          {errors.userEmail?.message}
          <label htmlFor="">PW</label>
          <input
            type="password"
            placeholder="password"
            value={userPw}
            {...register('userPw', { required: 'password를 입력해주세요.' })}
            name="userPw"
            onChange={onUserPwHandler}
          />
          {errors.userPw?.message}

          <button type="submit">로그인</button>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
