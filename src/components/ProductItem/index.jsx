import React, { useEffect, useState } from 'react';
import { IoEyeSharp } from 'react-icons/io5';
import { HiShoppingBag, HiHeart } from 'react-icons/hi';
import history from '../../until/history';
import { Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { addCart, getCartData } from '../../redux/actions';
import Star from '../Star';
import './styles.scss';
import { toastSuccess } from '../../until/toast';

const ProductItem = ({ data, addCart, getCartData }) => {
  const { t } = useTranslation();
  const { id, name, rate, price, sale, status, imgs } = data;

  const [authData, setAuthData] = useState();
  useEffect(() => {
    setAuthData(() => JSON.parse(localStorage.getItem('profile')));
  }, []);

  const handleAddToCart = ({ id }) => {
    if (!authData) {
      history.push('/login');
    } else {
      addCart({ productId: id, quantity: 1 });
    }
  };

  const priceSale = () => {
    return Math.ceil((price * sale) / 100);
  };

  return (
    <div className="product-item">
      <div className="product-item__img">
        <a href="#" className="rotate-img">
          {imgs && (
            <>
              <img src={imgs[0]} alt="anh" />
              <img src={imgs[1]} alt="ANH" />
            </>
          )}
        </a>
        <div className="product-item__widget">
          <span className="icon icon-round product-item__widget-icon">
            <Tooltip placement="top" title="WISHLIST">
              <HiHeart />
            </Tooltip>
          </span>
          <span
            className="icon icon-round product-item__widget-icon"
            onClick={() => handleAddToCart(data)}
          >
            <Tooltip placement="top" title="ADD TO CART">
              <HiShoppingBag />
            </Tooltip>
          </span>
          <span
            onClick={() => history.push(`/product/${id}`)}
            className="icon icon-round product-item__widget-icon"
          >
            <Tooltip placement="top" title="QUICKVIEW">
              <IoEyeSharp />
            </Tooltip>
          </span>
        </div>
        {status.new && <span className="product-item--new ">New</span>}
        {sale > 0 && <span className="product-item--sale">{sale} %</span>}
      </div>
      <div className="product-item__content">
        <Tooltip placement="topLeft" title={name}>
          <h3 className="product-item__name text-clamp text-clamp--1">{name}</h3>
        </Tooltip>
        <div className="product-item__rate">
          <Star rate={rate}></Star>
        </div>
        <div className="product-item__price">
          <span className="product-item__price--new">{`$${price.toLocaleString()} USD`}</span>
          {sale > 0 && (
            <span className="product-item__price--old">{` $${priceSale().toLocaleString()} USD`}</span>
          )}
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCart: (params) => dispatch(addCart(params)),
    getCartData: (params) => dispatch(getCartData(params)),
  };
};
export default connect(null, mapDispatchToProps)(ProductItem);
