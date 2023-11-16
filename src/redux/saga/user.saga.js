import { takeEvery, put } from "redux-saga/effects";
import axios from "axios";
import history from "../../utils/history";

import { message } from 'antd';

function* loginSaga(action) {

  try {
    const { email, password } = action.payload;
    const result = yield axios({
      method: "GET",
      url: "https://book-shop-eeuz.onrender.com/users",
      params: {
        email,
        password,
      },
    });
    if (result.data.length > 0) {
      localStorage.setItem("userInfo", JSON.stringify(result.data[0]));
      message.success('Đăng nhập thành công!', [2.5])
      yield put({
        type: "LOGIN_SUCCESS",
        payload: {
          data: result.data[0],
        },
      });
      if (result.data[0].role === "admin") {
        yield history.push("/admin/products");
      } else {
        yield history.push("/");
      }
    } else {
      message.error('Tài khoản hoặc mật khẩu không đúng!');
      yield put({
        type: "LOGIN_FAIL",
        payload: {
          error: "Email hoặc mật khẩu không đúng",
        },
      });
    }
  } catch (e) {
    yield put({
      type: "LOGIN_FAIL",
      payload: {
        error: e.error,
      },
    });
  }
}

function* registerSaga(action) {
  try {
    const { email, password, name, phone } = action.payload;
    const getUser = yield axios.get("https://book-shop-eeuz.onrender.com/users");
    const checkUser = getUser.data.find((getUser) => getUser.email === email);
    if (checkUser) {
      message.warning('Email đã tồn tại hoặc đã từng được đăng ký!');
    } else {
      const result = yield axios.post("https://book-shop-eeuz.onrender.com/users", {
        email,
        password,
        name,
        phone,
        role: "user",
        carts: [],
      });
      // console.log("function*registerSaga -> result", result)

      yield put({
        type: "REGISTER_SUCCESS",
        payload: {
          data: result.data,
        },
      });
      message.success('Đăng ký thành công!')
      yield history.push("/login");
    }
  } catch (e) {
    yield put({
      type: "REGISTER_FAIL",
      payload: {
        error: e.error,
      },
    });
  }
}

function* getUserInfoSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios.get(`https://book-shop-eeuz.onrender.com/${id}`);
    yield put({
      type: "GET_USER_INFO_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_USER_INFO_FAIL",
      payload: {
        error: e.error,
      },
    });
  }
}

// profile
function* updateUserSaga(action) {
  try {
    const { id, name, email, phone, address, gender, birthday } = action.payload;
    const result = yield axios({
      method: "PATCH",
      url: `https://book-shop-eeuz.onrender.com/${id}`,
      data: {
        name, email, phone, address, gender, birthday
      }
    })
    yield put({
      type: "UPDATE_USER_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "UPDATE_USER_FAIL",
      payload: {
        error: e.error,
      },
    });
  }
}

function* changePasswordSaga(action) {
  try {
    const { id, password } = action.payload;
    const result = yield axios({
      method: "PATCH",
      url: `https://book-shop-eeuz.onrender.com/${id}`,
      data: {
        password
      }
    })
    yield put({
      type: "CHANGE_PASSWORD_SUCCESS",
      payload: {
        data: result.data,
      },
    });
    yield message.success("thay đổi mật khẩu thành công")
    yield localStorage.removeItem('userInfo')
    yield history.push("/login")
  } catch (e) {
    yield put({
      type: "CHANGE_PASSWORD_FAIL",
      payload: {
        error: e.error,
      },
    });
  }
}

function* getOrderListUserSaga(action) {
  try {
    const { id, } = action.payload;
    const result = yield axios({
      method: "GET",
      url: `https://book-shop-eeuz.onrender.com/orders?userId=${id}`,

    })
    yield put({
      type: "ORDER_LIST_USER_SUCCESS",
      payload: {
        data: result.data,
      },
    });

  } catch (e) {
    yield put({
      type: "ORDER_LIST_USER_FAIL",
      payload: {
        error: e.error,
      },
    });
  }
}

export default function* userSaga() {
  yield takeEvery("LOGIN_REQUEST", loginSaga);
  yield takeEvery("REGISTER_REQUEST", registerSaga);
  yield takeEvery("GET_USER_INFO_REQUEST", getUserInfoSaga);
  yield takeEvery("UPDATE_USER_REQUEST", updateUserSaga)
  yield takeEvery("CHANGE_PASSWORD_REQUEST", changePasswordSaga)
  yield takeEvery("ORDER_LIST_USER_REQUEST", getOrderListUserSaga)
}
