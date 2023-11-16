/* eslint-disable no-dupe-keys */
import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import { message } from 'antd';

function* getProductListAdminSaga(action) {
  try {
    const { searchValue } = action.payload;
    const result = yield axios({
      method: "GET",
      url: "https://book-shop-eeuz.onrender.com/products?_expand=publisher&_expand=category",
      params: {
        ...searchValue && { q: searchValue },
      }
    });
    yield put({
      type: "GET_PRODUCT_LIST_ADMIN_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_PRODUCT_LIST_ADMIN_FAIL",
      payload: {
        error: e.error,
      },
    });
  }
}

function* addProductAdminSaga(action) {
  try {
    const { name, description, price, countInStock, categoryId, publisherId, image, code, author, publicYear, weight, size, numberPages, formality } = action.payload
    const addResult = yield axios({
      method: "POST",
      url: "https://book-shop-eeuz.onrender.com/products",
      data: {
        name,
        description,
        price,
        countInStock,
        publisherId,
        categoryId,
        image,
        code,
        author,
        publicYear,
        weight,
        size,
        numberPages,
        formality
      }
    })

    yield put({
      type: "ADD_PRODUCT_ADMIN_SUCCESS",
      payload: {
        data: addResult.data,
      }
    }) // cai nay fail
    message.success("Thêm sản phẩm thành công")
    const result = yield axios({
      method: "GET",
      url: "https://book-shop-eeuz.onrender.com/products?_expand=publisher&_expand=category",

    });
    yield put({
      type: "GET_PRODUCT_LIST_ADMIN_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    console.log(e)
    yield put({
      type: "ADD_PRODUCT_ADMIN_FAIL",
      payload: {
        error: e.error
      }
    }) // nhay xuong day
  }
}
function* deleteProductAdminSaga(action) {
  try {
    const { id } = action.payload
    console.log("function*deleteProductAdminSaga -> action.payload", action.payload)

    yield axios({
      method: "DELETE",
      url: `https://book-shop-eeuz.onrender.com/products/${id}`
    })

    yield put({
      type: "DELETE_PRODUCT_ADMIN_SUCCESS",
      payload: {
        data: id
      }
    })
  } catch (e) {
    yield put({
      type: "DELETE_PRODUCT_ADMIN_FAIL",
      payload: {
        error: e.error
      }
    })
  }
}

function* updateProductAdminSaga(action) {
  try {
    const { id, name, price, description, countInStock, categoryId, publisherId, image, code, author, publicYear, weight, size, numberPages, formality } = action.payload
    const updateResult = yield axios({
      method: "PATCH",
      url: `https://book-shop-eeuz.onrender.com/products/${id}`,
      data: {
        name,
        price,
        description,
        categoryId,
        countInStock,
        publisherId,
        image,
        code,
        author,
        publicYear,
        weight,
        size,
        numberPages,
        formality
      }
    })
    const result = yield axios({
      method: "GET",
      url: "https://book-shop-eeuz.onrender.com/products?_expand=publisher&_expand=category",
    });
    yield put({
      type: "GET_PRODUCT_LIST_ADMIN_SUCCESS",
      payload: {
        data: result.data,
      },
    });
    yield put({
      type: "UPDATE_PRODUCT_ADMIN_SUCCESS",
      payload: {
        id: id,
        data: updateResult.data,

      }
    })
  } catch (e) {
    yield put({
      type: "UPDATE_PRODUCT_ADMIN_FAIL",
      payload: {
        error: e.error
      }
    })
  }
}






export default function* productAdminSaga() {
  yield takeEvery("GET_PRODUCT_LIST_ADMIN_REQUEST", getProductListAdminSaga);
  yield takeEvery("ADD_PRODUCT_ADMIN_REQUEST", addProductAdminSaga)
  yield takeEvery("DELETE_PRODUCT_ADMIN_REQUEST", deleteProductAdminSaga)
  yield takeEvery("UPDATE_PRODUCT_ADMIN_REQUEST", updateProductAdminSaga)
}