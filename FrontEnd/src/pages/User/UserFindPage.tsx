import React from 'react';
// components
import FindId from '../../components/User/FindId';
import FindPw from '../../components/User/FindPw';

const UserFindPage = () => {
  return (
    <section className="user-container">
      <div className="form-wrap">
        <div className="login-form">
          <h1>Find User</h1>
          <FindId />

          <br />

          <FindPw />
        </div>
      </div>
    </section>
  );
};

export default UserFindPage;
