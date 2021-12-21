import { combineReducers } from 'redux';
import accountReducer from './account.reducer';
import productDetailReducer from './productDetail.reducer';
import productReducer from './product.reducer';
import categoryReducer from './category.reducer';
import cartReducer from './cart.reducer';
import paymentReducer from './payment.reducer';
import discountReducer from './discount.reducer';
import contactReducer from './contact.reducer';
import dashboardReducer from './dashboard.reducer';

export default combineReducers({
  productReducer,
  categoryReducer,
  accountReducer,
  productDetailReducer,
  cartReducer,
  paymentReducer,
  discountReducer,
  contactReducer,
  dashboardReducer,
});
