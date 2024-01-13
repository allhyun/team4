import React, {
  LegacyRef,
  MutableRefObject,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import Modal from '../common/Modal';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [findUserid, setFindUserid] = useState<string>('');

  const ref: MutableRefObject<HTMLDivElement | null> = useRef(null);
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
      `${process.env.REACT_APP_HOST}/user/findId`,
      data
    );
    if (response.data.userid !== null) {
      await setFindUserid(`찾는 ID는 ${response.data.userid}입니다.`);
      await setIsModalOpen(true);
    } else {
      setFindUserid('일치하는 ID가 없습니다');
      setIsModalOpen(true);
    }
    // console.log('response', response.data.userid);
  };

  useOnClickOutside(ref, () => setIsModalOpen(false));

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
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/i,
                message: '잘못된 형식입니다.',
              },
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

      {isModalOpen && (
        <div ref={ref}>
          <Modal msg={findUserid} setIsModalOpen={setIsModalOpen} />
        </div>
      )}
    </>
  );
};

export default FindId;
