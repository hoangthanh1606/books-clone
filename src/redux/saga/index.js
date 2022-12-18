import { fork } from 'redux-saga/effects'


import userSaga from './user.saga';
import productSaga from './product.saga';
import cartSaga from './cart.saga';
import orderSaga from './order.saga';
import reviewSaga from './review.saga';
import productAdminSaga from './productAdmin.saga'
import userAdminSaga from './userAdmin.saga'
import categoryAdminSaga from './categoryAdmin.saga'
import orderAdminSaga from './orderAdmin.saga'

export default function* mySaga() {
  yield fork(userSaga);
  yield fork(productSaga);
  yield fork(cartSaga);
  yield fork(orderSaga);
  yield fork(reviewSaga);
  yield fork(productAdminSaga)
  yield fork(userAdminSaga)
  yield fork(categoryAdminSaga)
  yield fork(orderAdminSaga)
}