import { Radio } from 'antd';
import 'moment/locale/vi';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { AiFillHome } from 'react-icons/ai';
import { MdPayment } from 'react-icons/md';
import { TiWarningOutline } from 'react-icons/ti';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createBill, getCartData } from '../../../redux/actions';
import history from '../../../util/history';
import PaymentBreadcrumb from './component/PaymentBreadcrumb';
import './styles.scss';

const Payment = ({ createBill, getCartData }) => {
  const { t } = useTranslation();

  const infoPayment = useMemo(() => JSON.parse(localStorage.getItem('infoPayment')), []);

  const handelCreateBill = async () => {
    await createBill({
      payment: 'Trực tiếp',
      name: infoPayment.name,
      address: infoPayment.address,
      phoneNumber: infoPayment.phone,
      codeName: infoPayment.codeName,
      total: infoPayment.total,
    });
    getCartData();
    localStorage.removeItem('infoPayment');
  };

  return (
    <div className="payment-page fadeIn">
      <div className="container payment__container">
        <section className="payments">
          <div className="payment-page__title" onClick={() => history.push('/')}>
            <AiFillHome /> <h1 className="information__title">vegina-store</h1>
          </div>
          <PaymentBreadcrumb />
          <div className="shipping__info shipping__content">
            <div className=" shipping__content--item   ">
              <div className="shipping__info--inner">
                <h4>{t('Phone')}</h4>
                <p>{infoPayment.phone}</p>
              </div>
              <button className="button" onClick={() => history.push('/infoPayment')}>
                {t('payments.shipping.Change')}
              </button>
            </div>
            {infoPayment.email && (
              <div className=" shipping__content--item   ">
                <div className="shipping__info--inner">
                  <h4>{t('Email')}</h4>
                  <p>{infoPayment.email}</p>
                </div>
                <button className="button" onClick={() => history.push('/infoPayment')}>
                  {t('payments.shipping.Change')}
                </button>
              </div>
            )}
            <div className=" shipping__content--item">
              <div className="shipping__info--inner">
                <h4>{t('payments.shipping.Ship to')}</h4>
                <p>{infoPayment.address}</p>
              </div>
              <button className="button" onClick={() => history.push('/infoPayment')}>
                {t('payments.shipping.Change')}
              </button>
            </div>
            <div className=" shipping__content--item">
              <div className="shipping__info--inner">
                <h4>{t('Name')}</h4>
                <p>{infoPayment.name}</p>
              </div>
              <button className="button" onClick={() => history.push('/infoPayment')}>
                {t('payments.shipping.Change')}
              </button>
            </div>
          </div>
          <div className="shipping__title">
            <h2>{t('payments.payment.Payment')}</h2>
            <p>{t('payments.payment.All transactions are secure and encrypted')}</p>
          </div>
          <div className="payments__warning shipping__content">
            <div className="shipping__info--inner payments__warning--inner">
              <TiWarningOutline />
              <p>{t('payments.payment.This store can only pay with COD')}</p>
            </div>
          </div>
          <div className="payments__content">
            <div className="payments__item">
              <Radio disabled>{t('payments.payment.Credit card')}</Radio>
              <MdPayment />
            </div>
            <div className="payments__item">
              <Radio checked>{t('payments.payment.Cash on Delivery (COD)')}</Radio>
            </div>
          </div>
          <div className="shipping__btn">
            <button
              className="button  button-animation--1 button-round--lg "
              onClick={() => handelCreateBill()}
            >
              <span> {t('payments.payment.Complete order')}</span>
            </button>
            <button
              className="button button-round button-transparent"
              onClick={() => history.push('/shipping')}
            >
              <span> {t('payments.payment.Return to shipping')}</span>
            </button>
          </div>
        </section>
      </div>
      <ToastContainer />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    createBill: (params) => dispatch(createBill(params)),
    getCartData: (params) => dispatch(getCartData(params)),
  };
};
export default connect(null, mapDispatchToProps)(Payment);
