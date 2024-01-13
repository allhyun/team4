import React, {
  ChangeEvent,
  useRef,
  useEffect,
  useState,
  MutableRefObject,
} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { ReactReduxContextValue, useSelector } from 'react-redux';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { BsImage } from 'react-icons/bs';
import Modal from '../../components/common/Modal';
import useOnClickOutside from '../../Hooks/useOnClickOutside';
import { UnknownAction } from 'redux';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [msg, setMsg] = useState<string>('');
  const [userProfileImg, setUserProfileImg] = useState<any>();
  const [imgFile, setImgFile] = useState<any>('');
  const imgRef: any = useRef();
  const [userId, setUserId] = useState<string>('');
  const [userPw, setUserPw] = useState<string>('');
  const [samePwCheck, setSamePwCheck] = useState<string>('');
  const [userInfo, setUserInfo] = useState<any>({});
  const [userNickname, setUserNickname] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [isUseridDuplicated, setIsUseridDuplicated] = useState<Boolean>(false);
  const [isNicknameDuplicated, setIsNicknameDuplicated] =
    useState<Boolean>(false);

  const u_idx = useSelector((state: any) => state.user.user.u_idx);
  const data: any = { u_idx };

  const ref: MutableRefObject<HTMLDivElement | null> = useRef(null);
  useOnClickOutside(ref, () => setIsModalOpen(false));

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

  // redux에 u_idx 없이 접근하면 로그인 화면으로 이동
  useEffect(() => {
    if (u_idx === null) navigate('/login');
    else {
      getUserInfo();
      setUserNickname(`${userInfo.nickname}`);
      setUserEmail(`${userInfo.email}`);
    }
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<SignupForm>({
    mode: 'onSubmit',
    defaultValues: {},
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
      // const formData = new FormData();
      // formData.append('userProfileImg', userProfileImg);
      // formData.append('userid', inputData.userId);
      // formData.append('password', inputData.userPw.toString());
      // formData.append('nickname', inputData.userNickname.toString());
      // formData.append('email', inputData.userEmail.toString());
      // FormData 로깅
      // for (let key of formData.keys()) {
      //   console.log(key, formData.get(key));
      // }

      // 중복 체크
      let checkNickname: null | boolean = null;
      // 입력 데이터가 리덕스의 유저 닉네임과 다를 때 중복 검사
      // 같다면 checkNickame에 null로 요청 패스
      if (userInfo.nickname !== inputData.userNickname) {
        checkNickname = await checkDuplicated('checknickname', {
          nickname: inputData.userNickname,
        }).then((checked: boolean) => {
          setIsNicknameDuplicated(checked);
          return checked;
        });
      }

      // 중복 검사가 끝나거나 null이어야 데이터 담기
      if (checkNickname !== true) {
        let changeData = {
          chageUserU_idx: u_idx,
          changeNickname:
            inputData.userNickname === ''
              ? userInfo.nickname
              : inputData.userNickname,
          changeEmail:
            inputData.userEmail === '' ? userInfo.email : inputData.userEmail,
          changePassword: inputData.userPw,
        };

        axios
          .patch(
            `${process.env.REACT_APP_HOST}/user/updateUserInfo`,
            changeData,
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            if (res.data.result) {
              getUserInfo();
              setIsModalOpen(true);
              setMsg(res.data.msg);
            } else {
              setIsModalOpen(true);
              setMsg(res.data.msg);
            }
          });
      }
    } catch (error: any) {
      console.log('onSubmit error', error);
    }
  };

  const onInvalid: SubmitErrorHandler<SignupForm> = (err) => {
    console.log('실패', err);
  };

  const checkDuplicated = (checkUrl: string, data: {}): any => {
    return axios
      .post(`${process.env.REACT_APP_HOST}/user/${checkUrl}`, data)
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
              <h1>{userInfo.userid}의 마이페이지</h1>
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
                  value={
                    userNickname === 'undefined'
                      ? userInfo.nickname
                      : userNickname
                  }
                  // value={userNickname === '' ? userInfo.nickname : userNickname}
                  {...register('userNickname', {
                    pattern: {
                      value: /^[가-힣a-zA-Z0-9-]+$/i,
                      message: '특수문자를 허용하지 않습니다.',
                    },
                    minLength: {
                      value: 3,
                      message: '3글자 이상 입력해주세요.',
                    },
                    maxLength: {
                      value: 12,
                      message: '12글자 이하로 입력해주세요.',
                    },
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
                  placeholder="e-mail"
                  value={userEmail === 'undefined' ? userInfo.email : userEmail}
                  {...register('userEmail', {
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                      message: '잘못된 형식입니다.',
                    },
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
                  pattern: {
                    value: /^[A-Za-z0-9!@#$%^&*]+$/i,
                    message: '잘못된 형식입니다.',
                  },
                  minLength: {
                    value: 8,
                    message: '8글자 이상 입력해주세요.',
                  },
                  maxLength: {
                    value: 15,
                    message: '15글자 이하로 입력해주세요.',
                  },
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
                  pattern: {
                    value: /^[A-Za-z0-9!@#$%^&*]+$/i,
                    message: '잘못된 형식입니다.',
                  },
                  minLength: {
                    value: 8,
                    message: '8글자 이상 입력해주세요.',
                  },
                  maxLength: {
                    value: 15,
                    message: '15글자 이하로 입력해주세요.',
                  },
                  validate: (fieldValue: string) => {
                    console.log('fieldValue', fieldValue !== userPw);
                    console.log('userPw', userPw);
                    return (
                      samePwCheck === userPw || '같은 password를 입력해주세요.'
                    );
                  },
                })}
                autoComplete="off"
                name="samePwCheck"
                onChange={onUserInfoHandler}
              />
              <p className="alert">{errors.userPw?.message}</p>
              {/* {isNicknameDuplicated ? `비밀번호가 같지 않습니다.` : ''} */}
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
        <div ref={ref}>
          {isModalOpen && <Modal msg={msg} setIsModalOpen={setIsModalOpen} />}
        </div>
      </section>
    </>
  );
};

export default UserMyPage;
