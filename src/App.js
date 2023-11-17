/* eslint-disable react-hooks/exhaustive-deps */
import Router from './Router';
import React from 'react';
import { useEffect } from 'react'
import { connect } from 'react-redux'
import './App.css'

import { getUserInfoAction } from './redux/actions'

function App({ getUserInfo, userInfo }) {

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (userInfo && userInfo.id) {
      getUserInfo({ id: userInfo.id });
    }
  }, [userInfo?.data?.id])


  return (
    <div className='App'>
      <Router />
    </div>
  );
}
const mapStateToProps = (state) => {
  const { userInfo } = state.userReducer;
  return {
    userInfo
  };
};

const mapDisPatchToProps = (dispatch) => {
  return {
    getUserInfo: (params) => dispatch(getUserInfoAction(params)),
  }
}

export default connect(mapStateToProps, mapDisPatchToProps)(App);
