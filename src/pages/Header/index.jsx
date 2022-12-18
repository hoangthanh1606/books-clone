import { Link } from "react-router-dom";
import React from 'react';
import { connect } from "react-redux";
import {
  ShoppingOutlined,
  UserOutlined,
  LoginOutlined,
  LogoutOutlined,
  ProfileOutlined,
  BookOutlined
} from "@ant-design/icons";
import "./styles.css";

import { Input, Avatar, Menu, Dropdown } from "antd";

import history from "../../utils/history";
import { addSearchProductAction } from "../../redux/actions";

const { Search } = Input;

function Header(props) {
  const { userInfo, cartList, addSearchProduct } = props;

  const onSearch = (value) => {
    addSearchProduct({ searchValue: value }, history.push("/products"));
  };

  function onLogout() {
    localStorage.removeItem("userInfo");
    history.push('/')
    window.location.reload();
  }
  const menu = (
    <Menu>
      <Menu.Item key="profile" icon={<ProfileOutlined />}>
        <Link to="/profile" style={{ color: "black" }}>
          Thông tin cá nhân
        </Link>
      </Menu.Item>
      {userInfo.data.role === 'admin' && (
        <Menu.Item key="adminBooks" icon={<BookOutlined />}>
          <Link to="admin/products" style={{ color: "black" }}>
            Books Manager
          </Link>
      </Menu.Item>
      )}
      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        <Link to='' onClick={onLogout} style={{ color: "black" }}>
          Đăng xuất
        </Link>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <div className="header-container ">
        <div className="heading">
          <input type="checkbox" id="check" />
          <label htmlFor="check" className="checkbtn">
            <i className="fas fa-bars" />
          </label>
          <div className="header-logo">
            <Link to="/">
              <img
                src="https://cdn0.fahasa.com/skin/frontend/ma_vanese/fahasa/images/fahasa-logo.png"
                alt=""
                style={{ width: "200px" }}
              />
            </Link>
          </div>
          <div className="header-nav">
            <Link className="header-nav-link" to="/">
              Home
            </Link>
            <Link className="header-nav-link" to="/products">
              Bookstore
            </Link>
            <div style={{ marginLeft: "20px", width: "300px" }}>
              <Search
                placeholder="Nhập để tìm kiếm"
                allowClear
                enterButton
                size="middle"
                onSearch={onSearch}
              />
            </div>
          </div>
          <div className="header-user">
          {userInfo.data.id && cartList.data.length ? (
            <Link className="header-user-link" to="/carts">
              <ShoppingOutlined />
                <small className="count d-flex">{cartList.data.length}</small>
            </Link>
            ) : (
            <Link className="header-user-link" to="/carts">
                <ShoppingOutlined />
            </Link>
          )}
            <div className="header-user-icon">
              {userInfo.data.id ? (
                <Dropdown overlay={menu} placement="bottomLeft" arrow>
                  <p>
                    <Avatar size="small" icon={<UserOutlined />} /> {""}
                    {userInfo.data.name}
                  </p>
                </Dropdown>
              ) : (
                // <Button onClick={() => history.push("/login")}>
                //   <LoginOutlined />
                //     Đăng nhập
                // </Button>
                <Menu>
                  <Menu.Item key='login' icon={<LoginOutlined />}>
                    <Link to='/login'>Đăng nhập</Link>
                  </Menu.Item>
                </Menu>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}
const mapStateToProps = (state) => {
  const { userInfo } = state.userReducer;
  const { cartList } = state.cartReducer;
  const { searchValue } = state.productReducer;
  return {
    userInfo,
    cartList,
    searchValue,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addSearchProduct: (params) => dispatch(addSearchProductAction(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
