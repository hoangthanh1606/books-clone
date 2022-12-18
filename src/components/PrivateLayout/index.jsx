import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import HeaderAdmin from '../../pages/Admin/HeaderAdmin'
import NavAdmin from '../../pages/Admin/NavAdmin'

import * as Style from './style';

function PrivateLayout(props) {
  const { exact, path, component: Component, ...other } = props;
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (userInfo && userInfo.id) {
    if (userInfo.role !== 'admin') {
      return <Redirect to="/" />;
    }
  } else {
    return <Redirect to="/login" />;
  }
  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => {
        return (
          <>
            <HeaderAdmin {...routeProps} />
            <NavAdmin  {...routeProps} />

            <Style.MainContainer>
              <Component {...other} {...routeProps} />
            </Style.MainContainer>


          </>
        )
      }}
    />
  );
}

export default PrivateLayout;
