import React, { ChangeEvent, useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { BsImage } from 'react-icons/bs';

interface SignupForm {
  userProfileImg: string;
  userId: string;
  userPw: string;
  samePwCheck: string;
  userNickname: string;
  userEmail: string;
}

const UserMyPage = () => {
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
  const [isNicknameDuplicated, setIsNicknameDuplicated] =
    useState<Boolean>(false);
  const [userInfo, setUserInfo] = useState<any>({});
  const u_idx = useSelector((state: any) => state.user.user.u_idx);
  const data: any = { u_idx };

  // 마운트 되면 유저 정보 요청해서 가져오기
  const getUserInfo = async () => {
    const response: any = await axios.post(
      `${process.env.REACT_APP_HOST}/user/mypage`,
      data,
      { withCredentials: true }
    );
    await console.log('response', response);
    if (response !== null) {
      setUserInfo(response.data.user);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  useEffect(() => {
    console.log('userInfo', userInfo);
    // const usertrue = Object.keys(userInfo).includes('nickname');
    // console.log('usertrue', usertrue);
  }, [userInfo]);

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

  const onUserInfoHandler = (event: ChangeEvent<HTMLInputElement>) => {
    switch (event.currentTarget.name) {
      case 'userProfileImg':
        if (event.currentTarget.files !== null) {
          // 유저 프로필 사진 등록과 함께 보여주는 코드
          const file = imgRef.current.files[0];
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onloadend = () => {
            setImgFile(reader.result);
          };

          const img = event.currentTarget.files[0];
          setUserProfileImg(img);
        }
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
      // formData.append('userProfileImg', userProfileImg);
      // formData.append('userid', inputData.userId);
      // formData.append('password', inputData.userPw.toString());
      // formData.append('nickname', inputData.userNickname.toString());
      // formData.append('email', inputData.userEmail.toString());
      // FormData 로깅
      // for (let key of formData.keys()) {
      //   console.log(key, formData.get(key));
      // }

      // 중복 체크를 위한 데이터
      const user = {
        userid: inputData.userId,
        nickname: inputData.userNickname,
      };

      const checkedId = await checkDuplicated('checkid', {
        userid: user.userid,
      }).then((checked: boolean) => {
        setIsUseridDuplicated(checked);
        return checked;
      });
      const checkedNickname = await checkDuplicated('checknickname', {
        nickname: user.nickname,
      }).then((checked: boolean) => {
        setIsNicknameDuplicated(checked);
        return checked;
      });

      // 결과값으로 바로 상태를 변경하고 이용하려고 했으나 서버보다 한 박자 느리게 상태가 바뀜
      if (checkedId !== true && checkedNickname !== true) {
        const data = {
          userId: inputData.userId,
          userPw: inputData.userPw,
          userNickname: inputData.userNickname,
          userEmail: inputData.userEmail,
        };
        axios
          .patch(`${process.env.REACT_APP_HOST}/user/updateUserInfo`, data, {
            // headers: { 'Content-Type': 'multipart/form-data' },
          })
          .then((res) => {
            // if (res.data.result === true)
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
    return axios
      .post(`http://localhost:8000/user/${checkUrl}`, data)
      .then((res) => {
        return res.data.duplicate;
      });
  };

  return (
    <>
      <section>
        <div className="form-wrap">
          <form
            className="myPage-form"
            onSubmit={handleSubmit(onSubmit, onInvalid)}
          >
            <div>
              <h1>{userInfo.nickname} 님의 마이페이지</h1>
            </div>
            <div className="img-info-wrap">
              <div className="input-wrap">
                <div className="img-wrap">
                  <label htmlFor="upload-img">
                    <div className="upload-img">
                      <img
                        className="uploaded-img"
                        src={`${process.env.REACT_APP_HOST}/${userInfo.image}`}
                        alt="유저 프로필 이미지"
                      />
                    </div>
                  </label>

                  <p className="alert">{errors.userProfileImg?.message}</p>
                </div>
              </div>
              <div className="input-wrap">
                <input
                  type="text"
                  placeholder="nickname"
                  value={userNickname === '' ? userInfo.nickname : userNickname}
                  {...register('userNickname', {
                    // required: '닉네임을 입력해주세요.',
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
                </p>

                <input
                  type="text"
                  placeholder="id"
                  value={userId === '' ? userInfo.userid : userId}
                  {...register('userId', {
                    // required: 'id를 입력해주세요.',
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
                  type="text"
                  placeholder="e-mail"
                  value={userEmail === '' ? userInfo.email : userEmail}
                  {...register('userEmail', {
                    // required: '이메일을 입력해주세요.',
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
            <div className="input-wrap">
              <button type="submit" disabled={isSubmitting}>
                회원정보 수정하기
              </button>
            </div>
            <div className="bottom-wrap">
              <div>비밀번호 변경</div>
              <div className="delete-user">회원탈퇴</div>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default UserMyPage;
