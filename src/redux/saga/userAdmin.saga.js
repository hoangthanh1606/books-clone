import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { message } from 'antd';

// import history from '../../utils/history'

function* deleteUserAdminSaga(action) {
  try {
    const { id } = action.payload

    yield axios({
      method: "DELETE",
      url: `http://localhost:5000/users/${id}`
    })

    yield put({
      type: "DELETE_USER_ADMIN_SUCCESS",
      payload: {
        data: id
      }
    })
    yield message.success("Xóa thành công")
  } catch (e) {
    yield put({
      type: "DELETE_USER_ADMIN_FAIL",
      payload: {
        error: e.error
      }
    })
  }
}

function* editUserAdminSaga(action) {
  try {
    const { id, role } = action.payload
    const result = yield axios({
      method: "PATCH",
      url: `http://localhost:5000/users/${id}`,
      data: {
        role
      }
    })
    yield put({
      type: "EDIT_USER_ADMIN_SUCCESS",
      payload: {
        id: id,
        data: result.data
      }
    })

  } catch (e) {
    yield put({
      type: "EDIT_USER_ADMIN_FAIL",
      payload: {
        error: e.error
      }
    })
  }
}

function* getUserListAdminSaga(action) {
  try {
    const result = yield axios({
      method: "GET",
      url: "http://localhost:5000/users",

    });
    yield put({
      type: "GET_USER_LIST_ADMIN_SUCCESS",
      payload: {
        data: result.data,

      },
    });
  } catch (e) {
    yield put({
      type: "GET_USER_LIST_ADMIN_FAIL",
      payload: {
        error: e.error,
      },
    });
  }
}
function* getUserInfoAdminSaga(action) {
  try {
    const { id } = action.payload
    const result = yield axios({
      method: "GET",
      url: `http://localhost:5000/users/${id}`,

    });
    yield put({
      type: "GET_USER_INFO_ADMIN_SUCCESS",
      payload: {
        data: result.data,

      },
    });
  } catch (e) {
    yield put({
      type: "GET_USER_INFO_ADMIN_FAIL",
      payload: {
        error: e.error,
      },
    });
  }
}

function* updateUserInfoAdminSaga(action) {
  try {
    const { id, name, email, phone, address, gender, birthday } = action.payload
    const result = yield axios({
      method: "PATCH",
      url: `http://localhost:5000/users/${id}`,
      data: {
        name, email, phone, address, gender, birthday
      }
    })
    yield put({
      type: "UPDATE_USER_INFO_ADMIN_SUCCESS",
      payload: {
        data: result.data
      }
    })

  } catch (e) {
    yield put({
      type: "UPDATE_USER_INFO_ADMIN_FAIL",
      payload: {
        error: e.error
      }
    })
  }
}

// function* changePasswordAdminSaga(action) {
//   try {
//     const { id, password } = action.payload
//     const result = yield axios({
//       method: "PATCH",
//       url: `http://localhost:5000/users/${id}`,
//       data: {
//         password
//       }
//     })
//     yield put({
//       type: "CHANGE_PASSWORD_ADMIN_SUCCESS",
//       payload: {
//         data: result.data
//       }
//     })
//     yield message.success("thay đổi mật khẩu thành công")
//     yield localStorage.removeItem('userInfo')
//   } catch (e) {
//     yield put({
//       type: "CHANGE_PASSWORD_ADMIN_FAIL",
//       payload: {
//         error: e.error
//       }
//     })
//   }
// }

export default function* userAdminSaga() {
  yield takeEvery("GET_USER_LIST_ADMIN_REQUEST", getUserListAdminSaga)
  yield takeEvery("DELETE_USER_ADMIN_REQUEST", deleteUserAdminSaga)
  yield takeEvery("EDIT_USER_ADMIN_REQUEST", editUserAdminSaga)
  yield takeEvery("GET_USER_INFO_ADMIN_REQUEST", getUserInfoAdminSaga)
  yield takeEvery("UPDATE_USER_INFO_ADMIN_REQUEST", updateUserInfoAdminSaga)
  // yield takeEvery("CHANGE_PASSWORD_ADMIN_REQUEST", changePasswordAdminSaga)
}