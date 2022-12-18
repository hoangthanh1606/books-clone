import React from 'react';
import { Router, Switch, Route } from "react-router-dom";
// utils
import history from "./utils/history";
import { ROUTERS } from "./constants/router";
// components
import DefaultLayout from "./components/DefaultLayout";
import LoginLayout from "./components/LoginLayout";
import PrivateLayout from './components/PrivateLayout'
import Home from "./pages/Home";
import OrderPage from './pages/Order';
import OrderSuccess from './pages/OrderSuccess';
import ProductPage from './pages/Products';
import ProductDetailPage from './pages/ProductDetail';
import CartPage from './pages/Cart';
import Profile from './pages/Profile';
import FormLogin from './pages/FormLogin';
import FormSignup from './pages/FormSignup';
import AdminProductListPage from './pages/Admin/ProductAdmin'
import AdminUserListPage from './pages/Admin/UserAdmin'
import AdminCategoryPage from './pages/Admin/CategoryAdmin'
import AdminPublisherPage from './pages/Admin/PublisherAdmin'
import OderAdmin from './pages/Admin/OderAdmin'
import SettingAdmin from './pages/Admin/SettingAdmin'
// import SearchPage from './pages/Search'
import Dashboard from './pages/Admin/Dashboard'

function BrowserRouter() {
  return (
    <Router history={history}>
      <Switch>
        <DefaultLayout exact path={ROUTERS.HOME} component={Home} />
        <DefaultLayout exact path={ROUTERS.PRODUCT} component={ProductPage} />
        <DefaultLayout exact path={ROUTERS.PROD_DETAIL} component={ProductDetailPage} />
        <DefaultLayout exact path={ROUTERS.CART} component={CartPage} />
        <DefaultLayout exact path='/order' component={OrderPage} />
        <DefaultLayout exact path='/ordersuccess' component={OrderSuccess} />
        {/* <DefaultLayout exact path='/search' component={SearchPage} /> */}
        <LoginLayout exact path={ROUTERS.LOGIN} component={FormLogin} />
        <DefaultLayout exact path='/profile' component={Profile} />
        <Route exact path='/register' component={FormSignup} />
        <PrivateLayout exact path='/admin/products' component={AdminProductListPage} />
        <PrivateLayout exact path='/admin/users' component={AdminUserListPage} />
        <PrivateLayout exact path='/admin/categories' component={AdminCategoryPage} />
        <PrivateLayout exact path='/admin/publishers' component={AdminPublisherPage} />
        <PrivateLayout exact path='/admin/oders' component={OderAdmin} />
        <PrivateLayout exact path='/admin/setting' component={SettingAdmin} />
        <PrivateLayout exact path='/admin/dashboard' component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default BrowserRouter;
