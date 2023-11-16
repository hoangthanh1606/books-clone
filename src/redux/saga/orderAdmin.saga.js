import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";


function* getOrderListAdminSaga(action) {
  try {
    const { status } = action.payload
    const result = yield axios({
      method: 'GET',
      url: "https://book-shop-eeuz.onrender.com/orders",
      params: {
        // ...status && { status },
        status

      }
    })
    yield put({
      type: "GET_ORDER_LIST_ADMIN_SUCCESS",
      payload: {
        data: result.data
      }
    })
  } catch (e) {
    yield put({
      type: "GET_ORDER_LIST_ADMIN_FAIL",
      payload: {
        error: e.error
      }
    })
  }
}
function* updateOrderAdminSaga(action) {
  try {
    const { id, status } = action.payload
    const result = yield axios({
      method: 'PATCH',
      url: `https://book-shop-eeuz.onrender.com/orders/${id}`,
      data: {
        status
      }
    })
    yield put({
      type: "UPDATE_ORDER_ADMIN_SUCCESS",
      payload: {
        id: id,
        data: result.data
      }
    })
  } catch (e) {
    yield put({
      type: "UPDATE_ORDER_ADMIN_FAIL",
      payload: {
        error: e.error
      }
    })
  }
}
export default function* orderAdminSaga() {
  yield takeEvery("GET_ORDER_LIST_ADMIN_REQUEST", getOrderListAdminSaga)
  yield takeEvery("UPDATE_ORDER_ADMIN_REQUEST", updateOrderAdminSaga)


}