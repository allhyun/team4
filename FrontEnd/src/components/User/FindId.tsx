import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import Modal from './Modal';
import useOnClickOutside from '../../Hooks/useOnClickOutside';

interface FindIdForm {
  userEmail: string;
  result: null | boolean;
}

interface FindId {
  data: {
    userid: string | null;
  };
}

const FindId = () => {
  const [userEmail, setUserEmail] = useState<string>('');
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [findUserid, setFindUserid] = useState<string>('');

  const ref: React.LegacyRef<HTMLDivElement | null | undefined> | any =
    useRef();
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

    const response: FindId = await axios.post(
      'http://localhost:8000/user/findId',
      data
    );
    if (response.data.userid !== null) {
      await setFindUserid(`찾는 ID는 ${response.data.userid}입니다.`);
      await setIsOpenModal(true);
    } else {
      setFindUserid('일치하는 ID가 없습니다');
    }
    // console.log('response', response.data.userid);
  };

  useOnClickOutside(ref, () => setIsOpenModal(false));

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

      {isOpenModal && (
        <div ref={ref}>
          <Modal text={findUserid} />
        </div>
      )}
    </>
  );
};

export default FindId;
