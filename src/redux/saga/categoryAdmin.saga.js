import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { message } from 'antd';

function* getCategoryAdminSaga(action) {
  try {
    const { searchValue } = action.payload;
    const result = yield axios({
      method: "GET",
      url: "https://book-shop-eeuz.onrender.com/categories",
      params: {
        ...searchValue && { q: searchValue },
      }
    });
    yield put({
      type: "GET_CATEGORY_ADMIN_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_CATEGORY _ADMIN_FAIL",
      payload: {
        error: e.error,
      },
    });
  }
}

function* createCategoryAdminSaga(action) {
  try {
    const { name } = action.payload
    const result = yield axios({
      method: "POST",
      url: "https://book-shop-eeuz.onrender.com/categories",
      data: {
        name
      }

    })
    yield put({
      type: "CREATE_CATEGORY_ADMIN_SUCCESS",
      payload: {
        data: result.data
      }
    })
    message.success("Thêm mới thành công")
  } catch (e) {
    yield put({
      type: "CREATE_CATEGORY_ADMIN_FAIL",
      payload: {
        error: e.error
      }
    })

  }
}

function* deleteCategoryAdminSaga(action) {
  try {
    const { id } = action.payload
    const result = yield axios({
      method: "DELETE",
      url: `https://book-shop-eeuz.onrender.com/categories/${id}`
    })
    yield put({
      type: "DELETE_CATEGORY_ADMIN_SUCCESS",
      payload: {
        data: result.data
      }
    })
    message.success("Xóa thành công")
  } catch (e) {
    yield put({
      type: "DELETE_CATEGORY_ADMIN_FAIL",
      payload: {
        error: e.error
      }
    })
  }
}

function* updateCategoryAdminSaga(action) {
  try {
    const { id, name } = action.payload
    const result = yield axios({
      method: "PATCH",
      url: `https://book-shop-eeuz.onrender.com/categories/${id}`,
      data: {
        name
      }
    })
    yield put({
      type: "UPDATE_CATEGORY_ADMIN_SUCCESS",
      payload: {
        data: result.data
      }
    })
    message.success('cập nhập thành công')
  } catch (e) {
    yield put({
      type: "UPDATE_CATEGORY_ADMIN_FAIL",
      payload: {
        error: e.error
      }
    })
  }
}


function* getPublisherAdminSaga(action) {
  try {
    const { searchValue } = action.payload;
    const result = yield axios({
      method: "GET",
      url: "https://book-shop-eeuz.onrender.com/publishers",
      params: {
        ...searchValue && { q: searchValue },
      }
    });
    yield put({
      type: "GET_PUBLISHER_ADMIN_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_PUBLISHER_ADMIN_FAIL",
      payload: {
        error: e.error,
      },
    });
  }
}


function* createPublisherAdminSaga(action) {
  try {
    const { name } = action.payload
    const result = yield axios({
      method: "POST",
      url: "https://book-shop-eeuz.onrender.com/publishers",
      data: {
        name
      }

    })
    yield put({
      type: "CREATE_PUBLISHER_ADMIN_SUCCESS",
      payload: {
        data: result.data
      }
    })
    message.success("Thêm mới thành công")
  } catch (e) {
    yield put({
      type: "CREATE_PUBLISHER_ADMIN_FAIL",
      payload: {
        error: e.error
      }
    })

  }
}
function* updatePublisherAdminSaga(action) {
  try {
    const { id, name } = action.payload
    const result = yield axios({
      method: "PATCH",
      url: `https://book-shop-eeuz.onrender.com/publishers/${id}`,
      data: {
        name
      }
    })
    yield put({
      type: "UPDATE_PUBLISHER_ADMIN_SUCCESS",
      payload: {
        data: result.data
      }
    })
    message.success('cập nhập thành công')
  } catch (e) {
    yield put({
      type: "UPDATE_PUBLISHER_ADMIN_FAIL",
      payload: {
        error: e.error
      }
    })
  }
}


function* deletePublisherAdminSaga(action) {
  try {
    const { id } = action.payload
    const result = yield axios({
      method: "DELETE",
      url: `https://book-shop-eeuz.onrender.com/publishers/${id}`
    })
    yield put({
      type: "DELETE_PUBLISHER_ADMIN_SUCCESS",
      payload: {
        data: result.data
      }
    })
    message.success("Xóa thành công")
  } catch (e) {
    yield put({
      type: "DELETE_PUBLISHER_ADMIN_FAIL",
      payload: {
        error: e.error
      }
    })
  }
}

export default function* categoryAdminSaga() {
  yield takeEvery("GET_CATEGORY_ADMIN_REQUEST", getCategoryAdminSaga)
  yield takeEvery("CREATE_CATEGORY_ADMIN_REQUEST", createCategoryAdminSaga)
  yield takeEvery("DELETE_CATEGORY_ADMIN_REQUEST", deleteCategoryAdminSaga)
  yield takeEvery("UPDATE_CATEGORY_ADMIN_REQUEST", updateCategoryAdminSaga)
  yield takeEvery("GET_PUBLISHER_ADMIN_REQUEST", getPublisherAdminSaga)
  yield takeEvery("CREATE_PUBLISHER_ADMIN_REQUEST", createPublisherAdminSaga)
  yield takeEvery("UPDATE_PUBLISHER_ADMIN_REQUEST", updatePublisherAdminSaga)
  yield takeEvery("DELETE_PUBLISHER_ADMIN_REQUEST", deletePublisherAdminSaga)
}