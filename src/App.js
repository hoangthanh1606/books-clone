/* eslint-disable react-hooks/exhaustive-deps */
import Router from './Router';
import React from 'react';
import { useEffect } from 'react'
import { connect } from 'react-redux'
import './App.css'

import { getUserInfoAction } from './redux/actions'

function App({ getUserInfo }) {

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    if (userInfo && userInfo.id) {
      getUserInfo({ id: userInfo.id });
    }
  }, [])


  return (
    <div className='App'>
      <Router />
    </div>
  );
}
const mapDisPatchToProps = (dispatch) => {
  return {
    getUserInfo: (params) => dispatch(getUserInfoAction(params)),
  }
}

export default connect(null, mapDisPatchToProps)(App);
