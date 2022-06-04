import { Button, Input, Modal, Pagination, Select, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { cancelOrderUser, getBillDetailUser, getOrderUser } from '../../../redux/actions';
import { internationalDateTime } from '../../../util/dateTime';
import history from '../../../util/history';
import './style.scss';

function CartManage(prop) {
  const { t } = useTranslation();
  const { Search } = Input;
  const { Option } = Select;
  const { getOrderUser, orderUser, cancelOrderUser, tabValue, orderCancel } = prop;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [current, setCurrent] = useState(1);
  const [searchKey, setSearchKey] = useState('');
  const [filterSelect, setFilterSelect] = useState('all');
  const [idProductCancel, isIdProductCancel] = useState();

  useEffect(() => {
    document.title = 'Vegist | Trang Thông tin cá nhân';
  }, []);

  useEffect(() => {
    getOrderUser({
      search: searchKey,
      page: current,
      status: filterSelect,
      limit: 5,
    });

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, searchKey, filterSelect, orderCancel]);

  useEffect(() => {
    tabValue !== '2' &&
      getOrderUser({
        page: current,
        limit: 5,
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tabValue]);

  function handleChange(value) {
    setFilterSelect(value);
    setCurrent(1);
  }

  const handleSearchOrder = (key) => {
    setSearchKey(key);
    setCurrent(1);
  };

  const handleCancelPayment = (id) => {
    isIdProductCancel(id);
    setIsModalVisible(true);
  };

  const handleCancelBill = async () => {
    await cancelOrderUser({ billId: idProductCancel, status: 'Đã hủy' });
    setCurrent(1);
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const openBillDetail = (id) => {
    history.push(`/success/${id}`);
  };

  return (
    <>
      {orderUser.load ? (
        <div className="loading">
          <Spin />
        </div>
      ) : (
        <section className="profile fadeIn">
          <div className="container">
            <div className="profile__order">
              <p className="profile__order--title">{t('orderHistory.title')}</p>
              <div className="profile__order-content">
                <div className="profile__order-content-action">
                  <div>{t('Sort by')}:</div>
                  <div className="action-select">
                    <Select value={filterSelect} onChange={handleChange}>
                      <Option value="all">Tất cả</Option>
                      <Option value="Đợi xác nhận">Đợi xác nhận</Option>
                      <Option value="Đã xác nhận">Đã xác nhận</Option>
                      <Option value="Đang vận chuyển">Đang vận chuyển</Option>
                      <Option value="Đã giao hàng">Đã giao hàng</Option>
                      <Option value="Đã hủy">Đã hủy</Option>
                    </Select>
                  </div>
                  <div>
                    <Search
                      placeholder={t('input search text')}
                      onSearch={handleSearchOrder}
                      enterButton
                    />
                  </div>
                </div>
                <table className="bill-table">
                  <thead>
                    <tr>
                      <td>STT</td>
                      <td>{t('PRODUCT')}</td>
                      <td>{t('DATE')}</td>
                      <td>{t('TOTAL')}</td>
                      <td>{t('STATUS')}</td>
                      <td>{t('ACTION')}</td>
                    </tr>
                  </thead>
                  {orderUser.data.length !== 0 && (
                    <tbody>
                      <>
                        {orderUser.data?.map((item, index) => (
                          <tr>
                            <td>{index + 1}</td>
                            <td id="order-detail-products">
                              <div>
                                {item.billDetails.map((item, index) => (
                                  <div>
                                    <div>{item.productId.name}</div>
                                    <div>
                                      <img src={item.productId.imgs[0]} alt="" />
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </td>
                            <td>{internationalDateTime(item.dateCreate)}</td>
                            <td>{`${item.total.toLocaleString()} VND`}</td>
                            <td>{item.status}</td>
                            <td className="action-cart-manage">
                              <Button
                                disabled={item.status !== 'Đợi xác nhận'}
                                onClick={() => handleCancelPayment(item.id)}
                              >
                                Huỷ
                              </Button>
                              <Button onClick={() => openBillDetail(item.id)}>Chi tiết</Button>
                            </td>
                          </tr>
                        ))}
                      </>
                    </tbody>
                  )}
                </table>
                {orderUser.data.length === 0 && (
                  <div className="cart__nonProduct ">
                    <div className="cart__nonProduct-img text-center">
                      <img src="https://i.imgur.com/Drj57qu.png" alt="nonProduct" />
                    </div>
                    <div className="cart__nonProduct-btn ">
                      <p>{t('orderHistory.content')}</p>
                      <button
                        className="button button-round--lg button-primary"
                        type="button"
                        onClick={() => history.push('/products')}
                      >
                        {t('cart.Continue Shopping')}
                      </button>
                    </div>
                  </div>
                )}
                {orderUser.data.length !== 0 && (
                  <div className="admin__listUser--pagination">
                    <Pagination
                      current={current}
                      onChange={(page) => {
                        window.scrollTo({
                          top: 0,
                          left: 0,
                          behavior: 'smooth',
                        });
                        setCurrent(page);
                      }}
                      total={orderUser.total}
                      defaultPageSize={5}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
      <Modal
        title={t('Cancel Bill')}
        visible={isModalVisible}
        onOk={handleCancelBill}
        onCancel={handleCancel}
      >
        <p>{t('Notice file cancel')}</p>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => {
  const { orderUser, billDetailUser, orderCancel } = state.paymentReducer;

  return {
    orderUser,
    billDetailUser,
    orderCancel,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getOrderUser: (params) => dispatch(getOrderUser(params)),
    cancelOrderUser: (params) => dispatch(cancelOrderUser(params)),
    getBillDetailUser: (params) => dispatch(getBillDetailUser(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartManage);
