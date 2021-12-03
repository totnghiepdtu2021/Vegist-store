import moment from 'moment';
import 'moment/locale/vi';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getOrderDetail } from '../../../../redux/actions';
import history from '../../../../until/history';
import './styles.scss';

const title = [
  { id: 1, title: 'STT' },
  { id: 2, title: 'Image' },
  { id: 3, title: 'Name' },
  { id: 4, title: 'Quantity' },
  { id: 5, title: 'Price' },
];

function OrderDetail({ match, orderDetail, getOrderDetail }) {
  useEffect(() => {
    document.title = 'Vegist | Trang Chi tiết đơn đặt hàng';
    getOrderDetail({ id: match.params.id });
  }, []);

  const { bill, billDetails } = orderDetail;

  const renderPaymentCode = (id) => {
    let str = id.slice(-8).toUpperCase();
    return `Vegist-${str}`;
  };

  return (
    <section className="detail">
      <div className="detail__container">
        <h1 className="detail__title">ORDER DETAIL</h1>
        {bill && (
          <>
            <div className="detail__wrapper">
              <h3 className="detail__subtitle">Payment Code</h3>
              <p>{`#${renderPaymentCode(bill.id)}`}</p>
            </div>
            <div className="detail__wrapper">
              <h3 className="detail__subtitle">Orderer's name</h3>
              <p>{bill.userId.fullName}</p>
            </div>
            <div className="detail__wrapper">
              <h3 className="detail__subtitle">Email</h3>
              <p>{bill.userId.email}</p>
            </div>
            <div className="detail__wrapper">
              <h3 className="detail__subtitle">Datetime</h3>
              <p>{moment(bill.dateCreate).format('L')}</p>
            </div>
            <div className="detail__wrapper">
              <h3 className="detail__subtitle">Recipient's name</h3>
              <p>{bill.name}</p>
            </div>
            <div className="detail__wrapper">
              <h3 className="detail__subtitle">Phone Number</h3>
              <p>{bill.phoneNumber}</p>
            </div>
            <div className="detail__wrapper">
              <h3 className="detail__subtitle">Address</h3>
              <p>{bill.address}</p>
            </div>
            <div className="detail__wrapper">
              <h3 className="detail__subtitle">Total Price</h3>
              <p>{`${bill.total.toLocaleString()} VND`}</p>
            </div>
            <div className="detail__wrapper">
              <h3 className="detail__subtitle">Order Payment</h3>
              <p>{bill.isCompleted === true ? 'Đã thanh toán' : 'Chưa thanh toán (Ship COD)'}</p>
            </div>
            <div className="detail__wrapper">
              <h3 className="detail__subtitle">Order Status</h3>
              <p>{bill.status}</p>
            </div>
          </>
        )}
        <div className="detail__wrapper">
          <h3 className="detail__subtitle">Products</h3>
          <div className="admin__listUser--tableNormal">
            <table className="detail__table">
              <thead>
                <tr>
                  {title.map((item) => (
                    <td key={item.id}>{item.title}</td>
                  ))}
                </tr>
              </thead>
              <tbody>
                {billDetails?.length &&
                  billDetails?.map((item, index) => (
                    <tr className="table__row">
                      <td>{index + 1}</td>
                      <td>
                        <img src={item.productId?.imgs[0]} alt="img" className="detail__img" />
                      </td>
                      <td>{item.productId?.name}</td>
                      <td>{item.quantity}</td>
                      <td>{`${item.productId?.price.toLocaleString()} VND`}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="detail__button">
          <button
            type="button"
            className="button button-round--lg button-primary"
            onClick={() => history.push('/admin/listOrder')}
          >
            Go to List Order
          </button>
        </div>
      </div>
    </section>
  );
}

// export default OrderDetail;
const mapStateToProps = (state) => {
  const { orderDetail } = state.paymentReducer;
  return {
    orderDetail,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getOrderDetail: (params) => dispatch(getOrderDetail(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail);
