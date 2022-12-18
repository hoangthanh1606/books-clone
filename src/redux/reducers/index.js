import { combineReducers } from 'redux'
import productReducer from './product.reducer';
import userReducer from './user.reducer';
import cartReducer from './cart.reducer';
import orderReducer from './order.reducer';
import reviewReducer from './review.reducer';
import productAdminReducer from './productAdmin.reducer'
import userAdminReducer from './userAdmin.reducer'
import categoryAdminReducer from './categoryAdmin.reducer'
import orderAdminReducer from './orderAdmin.reducer'


export default combineReducers({
  userReducer,
  productReducer,
  cartReducer,
  orderReducer,
  reviewReducer,
  productAdminReducer,
  userAdminReducer,
  categoryAdminReducer,
  orderAdminReducer
})