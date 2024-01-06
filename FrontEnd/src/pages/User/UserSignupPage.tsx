import React, { ChangeEvent, useRef, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import '../../styles/style.scss';
import { BsImage } from 'react-icons/bs';

interface SignupForm {
  userProfileImg: string;
  userId: string;
  userPw: string;
  samePwCheck: string;
  userNickname: string;
  userEmail: string;
}

const UserSignupPage = () => {
  const navigate = useNavigate();
  const [userProfileImg, setUserProfileImg] = useState<any>();
  const [imgFile, setImgFile] = useState<any>('');
  const imgRef = useRef<any>();
  const [userId, setUserId] = useState<string>('');
  const [userPw, setUserPw] = useState<string>('');
  const [samePwCheck, setSamePwCheck] = useState<string>('');
  const [userNickname, setUserNickname] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [isUseridDuplicated, setIsUseridDuplicated] = useState<Boolean>(false);
  const [isNicknameDuplicated, setIsNicknameDuplicated] = useState<Boolean>(false);

  const inputRef = useRef<any>();

  // react-hook-form input 초기값 제공하지 않으면 undefined로 관리됨
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>({
    mode: 'onSubmit',
    defaultValues: {
      // userId: '',
      // userPw: '',
    },
  });

  useEffect(() => {
    if (userProfileImg) {
      console.log('userProfileImg', userProfileImg);
    }
  }, [userProfileImg]);

  const onUserInfoHandler = (event: ChangeEvent<HTMLInputElement>) => {
    switch (event.currentTarget.name) {
      case 'userProfileImg':
        const file = imgRef.current.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
          setImgFile(reader.result);
        };
        const img = event.target.files;
        if (img !== null) setUserProfileImg(img);
        break;
      case 'userId':
        setUserId(event.currentTarget.value);
        break;
      case 'userPw':
        setUserPw(event.currentTarget.value);
        break;
      case 'samePwCheck':
        setSamePwCheck(event.currentTarget.value);
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
  const onSubmit: SubmitHandler<SignupForm> = async (inputData: SignupForm) => {
    try {
      console.log('useForm 성공', inputData);

      const formData = new FormData();
      formData.append('userProfileImg', userProfileImg);
      formData.append('userid', inputData.userId);
      formData.append('password', inputData.userPw.toString());
      formData.append('nickname', inputData.userNickname.toString());
      formData.append('email', inputData.userEmail.toString());

      const user = {
        userid: inputData.userId,
        nickname: inputData.userNickname,
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
        axios
          .post('http://localhost:8000/user/signup', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
          .then((res) => {
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
          <div className="img-id-pw-wrap">
            <div className="input-wrap">
              <div className="img-wrap">
                <input
                  type="file"
                  id="upload-img"
                  accept="image/tiff, image/png, image/jpg, image/jpeg, image/png, image/gif"
                  // {...register('userProfileImg', {
                  //   required: '이미지를 등록해주세요.',
                  // })}
                  ref={imgRef}
                  onChange={onUserInfoHandler}
                  name="userProfileImg"
                />
                {userProfileImg?.length > 0 ? (
                  <label htmlFor="upload-img">
                    <img
                      className="uploaded-img"
                      src={imgFile ? imgFile : `/images/icon/user.png`}
                      alt="user-profile"
                    />
                  </label>
                ) : (
                  <label htmlFor="upload-img">
                    <div className="upload-img">
                      <BsImage />
                      <div>이미지 등록</div>
                    </div>
                  </label>
                )}
                <p className="alert">{errors.userProfileImg?.message}</p>
              </div>
            </div>
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
                // ref={inputRef}
                name="userId"
                onChange={onUserInfoHandler}
                // onBlur={onBlurHandler}
                // onBlur={checkDuplicate}
              />
              <p className="alert">
                {errors.userId?.message}
                {isUseridDuplicated ? `중복된 id입니다.` : ''}
              </p>

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

              <input
                type="password"
                placeholder="check password"
                value={samePwCheck}
                {...register('samePwCheck', {
                  required: '같은 password를 입력해주세요.',
                  // pattern: {
                  //   value: /^[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                  //   message: '잘못된 형식입니다.',
                  // },
                })}
                autoComplete="off"
                name="samePwCheck"
                onChange={onUserInfoHandler}
              />
              <p className="alert">{errors.userPw?.message}</p>
            </div>
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
            <button type="submit" disabled={isSubmitting}>
              회원가입
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default UserSignupPage;
