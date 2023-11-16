import { put, takeEvery } from "redux-saga/effects";
import axios from "axios";

function* getProductListSaga(action) {
  try {
    const { page, limit, categoryId, publisherId, loadMore,  searchValue, sort, order  } = action.payload;
    const result = yield axios({
      method: "GET",
      url: "https://book-shop-eeuz.onrender.com/products",
      params: {
        _page: page,
        _limit: limit,
        ...(categoryId && { categoryId }),
        ...(publisherId && { publisherId }),
        ...searchValue && { q: searchValue },
        _sort: sort,
        _order: order,
      },
    });
    yield put({
      type: "GET_PRODUCT_LIST_SUCCESS",
      payload: {
        data: result.data,
        loadMore,
        page,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_PRODUCT_LIST_FAIL",
      payload: {
        error: e.error,
      },
    });
  }
}

function* getProductDetailSaga(action) {
  try {
    const { id } = action.payload;
    const result = yield axios({
      method: "GET",
      url: `https://book-shop-eeuz.onrender.com/products/${id}?_expand=category&_expand=publisher`, 
    });
    yield put({
      type: "GET_PRODUCT_DETAIL_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({ type: "GET_PRODUCT_DETAIL_FAIL", message: e.message });
  }
}

function* getCategoryListSaga(action) {
  try {
    const result = yield axios({
      method: "GET",
      url: "https://book-shop-eeuz.onrender.com/categories",
    });
    yield put({
      type: "GET_CATEGORY_LIST_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_CATEGORY_LIST_FAIL",
      payload: {
        error: e.error,
      },
    });
  }
}

function* getPublisherListSaga(action) {
  try {
    const result = yield axios({
      method: "GET",
      url: "https://book-shop-eeuz.onrender.com/publishers",
    });
    yield put({
      type: "GET_PUBLISHER_LIST_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_PUBLISHER_LIST_FAIL",
      payload: {
        error: e.error,
      },
    });
  }
}

function* getProductSameSaga(action) {
  try {
    const { categoryId } = action.payload;
    // console.log("function*getProductSameSaga -> categoryId", categoryId)
    // bên này lấy key categoryId
    const result = yield axios({
      method: "GET",
      url: `https://book-shop-eeuz.onrender.com/products?categoryId=${categoryId}`,
    });
    // console.log("function*getProductSameSaga -> result", result)
    yield put({
      type: "GET_PRODUCT_SAME_SUCCESS",
      payload: {
        data: result.data,
      },
    });
  } catch (e) {
    yield put({
      type: "GET_PRODUCT_SAME_FAIL",
      payload: {
        error: e.error,
      },
    });
  }
}

export default function* productSaga() {
  yield takeEvery("GET_PRODUCT_LIST_REQUEST", getProductListSaga);
  yield takeEvery("GET_PRODUCT_DETAIL_REQUEST", getProductDetailSaga);
  yield takeEvery("GET_CATEGORY_LIST_REQUEST", getCategoryListSaga);
  yield takeEvery("GET_PUBLISHER_LIST_REQUEST", getPublisherListSaga);
  yield takeEvery("GET_PRODUCT_SAME_REQUEST", getProductSameSaga);
}
