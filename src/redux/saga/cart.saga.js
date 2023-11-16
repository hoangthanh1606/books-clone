import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* addToCartSaga(action) {
  try {
    const { userId, carts } = action.payload;
    const result = yield axios({
      method: "PATCH",
      url: `https://book-shop-eeuz.onrender.com/users/${userId}`,
      data: {
        carts: carts,
      },
    });
    yield put({
      type: "ADD_TO_CART_SUCCESS",
      payload: {
        data: result.data.carts,
      },
    });
  } catch (e) {
    yield put({
      type: "ADD_TO_CART_FAIL",
      payload: {
        error: e.error,
      },
    });
  }
}

function* deleteItemCartSaga(action) {
  try {
    const { userId, carts } = action.payload;
    const result = yield axios({
      method: "PATCH",
      url: `https://book-shop-eeuz.onrender.com/users/${userId}`,
      data: {
        carts: carts,
      },
    });
    yield put({
      type: "DELETE_ITEM_CART_SUCCESS",
      payload: {
        data: result.data.carts,
      },
    });
  } catch (e) {
    yield put({
      type: "DELETE_ITEM_CART_FAIL",
      payload: {
        error: e.error,
      },
    });
  }
}

export default function* cartSaga() {
  yield takeEvery("ADD_TO_CART_REQUEST", addToCartSaga);
  yield takeEvery("DELETE_ITEM_CART_REQUEST", deleteItemCartSaga);
}
