import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* getReviewListSaga(action) {
  try {
    const {productId} = action.payload
    const result = yield axios({
      method: "GET",
      url: 'https://book-shop-eeuz.onrender.com/reviews',
      params: {
        productId,
        _sort: 'id',
        _order: 'desc'
      },
    });
    yield put({
      type: "GET_REVIEW_LIST_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_REVIEW_LIST_FAIL",
      payload: {
        error: e.error,
      },
    });
  }
}

function* addToReviewSaga(action) {
  try {
    const { newReview, userId, productId} = action.payload;
    const result = yield axios({
      method: "POST",
      url: 'https://book-shop-eeuz.onrender.com/reviews',
      data: {
        ...newReview,
        productId,
        userId,
      },
    });
    yield put({
      type: "ADD_TO_REVIEW_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "ADD_TO_REVIEW_FAIL",
      payload: {
        error: e.error,
      },
    });
  }
}

function* getAllReviewListSaga(action) {
  try {
    const result = yield axios({
      method: 'GET',
      url: `https://book-shop-eeuz.onrender.com/reviews`,
      params: {
        _sort: "id",
        _order: "desc"
      }
    });
    yield put({
      type: "GET_ALL_REVIEW_LIST_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_ALL_REVIEW_LIST_FAIL",
      payload: {
        error: e.error
      },
    });
  }
}

export default function* reviewSaga() {
  yield takeEvery("GET_REVIEW_LIST_REQUEST", getReviewListSaga);
  yield takeEvery("ADD_TO_REVIEW_REQUEST", addToReviewSaga);
  yield takeEvery("GET_ALL_REVIEW_LIST_REQUEST", getAllReviewListSaga);
}
