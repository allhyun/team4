import React, { ChangeEvent, useEffect } from 'react';
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
  const [isUseridDuplicated, setIsUseridDuplicated] = useState<Boolean>(false);
  const [isNicknameDuplicated, setIsNicknameDuplicated] = useState<Boolean>(false);

  // react-hook-form input 초기값 제공하지 않으면 undefined로 관리됨
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupForm>({
    mode: 'onSubmit',
    defaultValues: {
      userId: '',
      userPw: '',
    },
  });

  const onUserInfoHandler = (event: ChangeEvent<HTMLInputElement>) => {
    switch (event.currentTarget.name) {
      case 'userId':
        setUserId(event.currentTarget.value);
        break;
      case 'userPw':
        setUserPw(event.currentTarget.value);
        break;
      case 'userNickname':
        setUserNickname(event.currentTarget.value);
        break;
      case 'userEmail':
        setUserEmail(event.currentTarget.value);
        break;
      default:
        break;
    }
  };

  const onSubmit: SubmitHandler<SignupForm> = async (data: SignupForm) => {
    try {
      console.log('useForm 성공', data);
      const user = {
        userid: data.userId,
        password: data.userPw,
        nickname: data.userNickname,
        email: data.userEmail,
      };

      const checkedId = await checkDuplicated('checkid', { userid: user.userid }).then(
        (checked: boolean) => {
          setIsUseridDuplicated(checked);
          return checked;
        }
      );

      const checkedNickname = await checkDuplicated('checknickname', {
        nickname: user.nickname,
      }).then((checked: boolean) => {
        setIsNicknameDuplicated(checked);
        return checked;
      });

      // 결과값으로 바로 상태를 변경하고 이용하려고 했으나 서버보다 한 박자 느리게 상태가 바뀜
      // 비동기 문제 같은데 일단 조건문에는 다른 변수를 사용함
      // if (isUseridDuplicated !== true && isNicknameDuplicated !== true) {
      if (checkedId !== true && checkedNickname !== true) {
        // console.log('post 요청');
        axios.post('http://localhost:8000/user/signup', user).then((res) => {
          if (res.data.result === true) navigate('/login');
        });
      }
    } catch (error: any) {
      console.log('useForm error', error);
    }
  };
  const onInvalid: SubmitErrorHandler<SignupForm> = (err) => {
    console.log('실패', err);
  };

  const checkDuplicated = (checkUrl: string, data: {}): any => {
    return axios.post(`http://localhost:8000/user/${checkUrl}`, data).then((res) => {
      return res.data.duplicate;
    });
  };

  return (
    <section>
      <div className="form-wrap">
        <form className="login-form" onSubmit={handleSubmit(onSubmit, onInvalid)}>
          <h1>Sign Up</h1>
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
              })}
              name="userId"
              onChange={onUserInfoHandler}
              // onBlur={onBlurHandler}
              // onBlur={checkDuplicate}
            />
            <p className="alert">
              {errors.userId?.message}
              {isUseridDuplicated ? `중복된 id입니다.` : ''}
            </p>
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
              autoComplete="off"
              name="userPw"
              onChange={onUserInfoHandler}
            />
            <p className="alert">{errors.userPw?.message}</p>
          </div>
          <div className="input-wrap">
            <input
              type="text"
              placeholder="nickname"
              value={userNickname}
              {...register('userNickname', {
                required: '닉네임을 입력해주세요.',
                // pattern: {
                //   value: /^[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                //   message: '잘못된 형식입니다.',
                // },
              })}
              onChange={onUserInfoHandler}
              name="userNickname"
            />
            <p className="alert">
              {errors.userNickname?.message}
              {isNicknameDuplicated ? `중복된 nickname입니다.` : ''}
              {}
            </p>
          </div>
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
              onChange={onUserInfoHandler}
              name="userEmail"
            />
            <p className="alert">{errors.userEmail?.message}</p>
          </div>
          <div className="input-wrap">
            <button type="submit">회원가입</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UserSignupPage;
