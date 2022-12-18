import { Route } from "react-router-dom";
import Header from "../../pages/Header";
import Footer from '../../pages/Footer';
import React from 'react';


function DefaultLayout(props) {
  const { exact, path, component: Component, ...other } = props;
  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => {
        return (
          <>
            <Header />
            <Component {...other} {...routeProps} />
            <Footer />
          </>
        );
      }}
    />
  );
}

export default DefaultLayout;
