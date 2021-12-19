import React, { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { Pagination, Input, Modal, Empty, Button } from 'antd';
import { getDiscount, deleteDiscount } from '../../../redux/actions';
import history from '../../../util/history';
import { BsTrashFill } from 'react-icons/bs';
import { useTranslation } from 'react-i18next';
import { dateTime } from '../../../util/dateTime';
import './style.scss';

const DiscountManagement = ({ getDiscount, discountData, totalDiscount, deleteDiscount }) => {
  const { t } = useTranslation();
  const [current, setCurrent] = useState(1);
  const [searchKey, setSearchKey] = useState();

  useEffect(() => {
    document.title = 'Vegist | Quản lý khuyến mãi';
  }, []);

  useEffect(() => {
    getDiscount({
      page: current,
      limit: 10,
      searchKey,
    });
  }, [current, searchKey]);

  const { Search } = Input;

  const handleChange = (value) => {
    setSearchKey(value);
    setCurrent(1);
  };

  function confirm(data) {
    Modal.confirm({
      title: 'Confirm',
      content: (
        <p>
          Do you want to delete discount name <span style={{ fontWeight: 600 }}>{data.title}</span>{' '}
          ?
        </p>
      ),
      okText: 'OK',
      cancelText: 'CANCEL',
      onOk() {
        deleteDiscount({ id: data.id });
      },
      onCancel() {},
    });
  }

  const handelChangePage = (page) => {
    setCurrent(page);
  };

  const renderLocationProduct = () => {
    const LIMIT = 10;
    const start = (current - 1) * LIMIT + 1;
    let end;
    if (discountData.length >= LIMIT) {
      end = (current - 1) * LIMIT + LIMIT;
    } else end = start + discountData.length - 1;
    return `${start} - ${end}`;
  };

  return (
    <>
      <section className="admin__listUser admin__products fadeIn">
        <div className="container">
          <div className="admin__listUser--btn">
            <div className="admin__listUser--btn-search">
              <Search
                placeholder={t('admin.discount.Search')}
                onSearch={handleChange}
                enterButton
              />
            </div>
            <div
              className="admin__listUser--btn-create"
              onClick={() => history.push('/admin/discount/add')}
            >
              <Button type="primary">{t('admin.discount.Add')}</Button>
            </div>
          </div>
          <div className="admin__listUser--tableNormal">
            <table>
              <thead>
                <tr>
                  <td>{t('admin.discount.key')}</td>
                  <td>{t('admin.discount.Discount name')}</td>
                  <td>{t('admin.discount.Discount code')}</td>
                  <td>{t('admin.discount.Percent / Amount')}</td>
                  <td>{t('admin.discount.Start date')}</td>
                  <td>{t('admin.discount.End date')}</td>
                  <td>{t('admin.discount.Discount type')}</td>
                  <td>{t('admin.discount.Quantity')}</td>
                  <td>{t('admin.discount.Action')}</td>
                </tr>
              </thead>
              <tbody>
                {totalDiscount > 0 ? (
                  discountData.map((item, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{item.title}</td>
                      <td>{item.codeName}</td>
                      <td>
                        {item.sale || item.amount}
                        {item.sale ? '%' : ' VNĐ'}
                      </td>
                      <td>{dateTime(item.dateCreate || new Date())}</td>
                      <td>{dateTime(item.endDate || new Date())}</td>
                      <td>{item.sale ? 'Giảm theo phần trăm' : 'Giảm theo giá trực tiếp'}</td>
                      <td>{item.total}</td>
                      <td>
                        <button className="button" onClick={() => confirm(item)}>
                          <BsTrashFill />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <Empty />
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="admin__listUser--pagination">
            {totalDiscount > 10 && (
              <section className="pagination">
                <div className="pagination__result">
                  {t('products.Showing')} {renderLocationProduct()} {t('products.of')}{' '}
                  {totalDiscount} {t('products.result')}
                </div>
                <Pagination
                  current={current}
                  onChange={handelChangePage}
                  total={totalDiscount}
                  defaultPageSize={10}
                />
              </section>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

const mapStateToProps = (state) => {
  const { discountData, totalDiscount } = state.discountReducer;
  return { discountData, totalDiscount };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDiscount: (params) => dispatch(getDiscount(params)),
    deleteDiscount: (params) => dispatch(deleteDiscount(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DiscountManagement);
