import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { getVoucherUser } from '../../redux/actions';
import { Button, Input, Pagination, Spin, Row, Col,message } from 'antd';
import { dateTime } from './../../until/dateTime';

import {
    FieldTimeOutlined
  } from '@ant-design/icons';
import './style.scss';
import moment from 'moment';
function ListDiscount(prop) {
  const { getVoucherUser, tabValue, listVoucherUser } = prop;
  const [current, setCurrent] = useState(1);
  const [searchKey, setSearchKey] = useState('');
  const { Search } = Input;
  const { t } = useTranslation();
  document.title = 'Vegist | Trang Thông tin cá nhân';

  useEffect(() => {
    getVoucherUser({
      search: searchKey,
      page: current,
      limit: 10,
    });
  }, [current,searchKey]);

  useEffect(() => {
    tabValue !=='3' && getVoucherUser({
      search: searchKey,
      page: current,
      limit: 10,
    });
  }, [tabValue]);

  function onSearch(value) {
    setSearchKey(value);
    setCurrent(1);
  }

  const handleCopyCode =(id)=>{
    navigator.clipboard.writeText(id)
    message.info('Copied');
  }

  return (
    <>
      {listVoucherUser?.load ? (
        <div className="loading">
          <Spin />
        </div>
      ) : (
        <section className="voucher fadeIn">
          <div className="container">
            <p className="voucher-title">{t('Danh sách mã giảm giá của bạn')}</p>
            <div className="voucher-container">
              <div className="voucher-search">
                <div>
                  <Search placeholder="input search text" onSearch={onSearch} enterButton />
                </div>
              </div>
              <div className="voucher-list">
                <div></div>
                <Row gutter={[16, 16]}>
                    {listVoucherUser?.data?.length !==0 ? listVoucherUser?.data?.map((item,index)=>(
                        <Col sm={24}  md={24} lg={12}>
                            <div className="voucher-list__item">
                                <div className="voucher-img">
                                    <img src="https://content.accesstrade.vn/adv/1639583427_avatar_1639583427.gif" alt="" />
                                </div>
                                <div className="voucher-list__item-content">
                                    <div className="content-top">
                                        <p className="code">{`[${item.name}] - Nhập mã ${item.code} giảm ngay ${item.percent} %`}</p>
                                        <p className="percent">Còn lại {item.quantity} mã</p>
                                    </div>
                                    <div className="content-bottom">
                                        <div className="item-time">
                                        <FieldTimeOutlined />
                                        Hết hạn: {dateTime(item.endDate)}
                                        </div>
                                        <Button onClick={() => handleCopyCode(item.code)} type="primary"> Copy</Button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    )) : <p className="voucher-empty"> Bạn chưa có mã giảm giá nào ! </p>
                    }
                </Row>
              </div>
                  {listVoucherUser?.data?.length !==0 && (
                    <div className="pagination">
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
                        total={listVoucherUser?.total}
                        defaultPageSize={10}
                        />
                    </div>
                    )}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  const {  listVoucherUser } = state.accountReducer;

  return {
    listVoucherUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getVoucherUser: (params) => dispatch(getVoucherUser(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ListDiscount);
