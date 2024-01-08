import React from 'react';
import ReactDOM from 'react-dom';

interface Props {
  text: string;
}

const Modal = ({ text }: Props) => {
  return ReactDOM.createPortal(
    <>
      <div className="modal-wrap">
        <div className="modal">
          <span>{text}</span>
        </div>
      </div>
    </>,
    document.getElementById('portal') as HTMLElement
  );
};

export default Modal;
