import { fork } from 'redux-saga/effects';
import { all } from 'redux-saga/effects';
import productSaga from './product.saga';
import categorySaga from './category.saga';
import productDetailSaga from './productDetail.saga';
import accountSaga from './account.saga';
import cartSaga from './cart.saga';
import paymentSaga from './payment.saga';
import discountSaga from './discount.saga';
import contactSaga from './contact.saga';
import dashboardSaga from './dashboard.saga';

export default function* mySaga() {
  yield all([
    fork(productSaga),
    fork(categorySaga),
    fork(accountSaga),
    fork(productDetailSaga),
    fork(cartSaga),
    fork(paymentSaga),
    fork(discountSaga),
    fork(contactSaga),
    fork(dashboardSaga),
  ]);
}
