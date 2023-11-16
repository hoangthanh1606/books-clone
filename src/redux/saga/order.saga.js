import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";
import history from '../../utils/history';

function* addToOrderSaga(action) {
  try {
    const {orderInfo, userId, cartList, status} = action.payload
    const result = yield axios({
      method: "POST",
      url: `https://book-shop-eeuz.onrender.com/orders`,
      data: {
        orderInfo,
        userId,
        cartList,
        status
      },
    });
    yield axios({
      method: "PATCH",
      url: `https://book-shop-eeuz.onrender.com/orders/${userId}`,
      data: {
        carts: [],
      },
    });
    yield history.push('/ordersuccess')
    yield put({
      type: "ADD_TO_ORDER_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "ADD_TO_ORDER_FAIL",
      payload: {
        error: e.error,
      },
    });
  }
}
export default function* orderSaga() {
  yield takeEvery("ADD_TO_ORDER_REQUEST", addToOrderSaga);
}