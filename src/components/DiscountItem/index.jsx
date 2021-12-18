import React from 'react';
import './styles.scss';
import { AiOutlineClockCircle } from 'react-icons/ai';
import { dateTime } from './../../until/dateTime';

function DiscountItem({ code, name, percent, endDate, quantity }) {
  return (
    <section className="discount__item">
      <div className="discount__wrapper">
        <img
          src="https://content.accesstrade.vn/adv/1639583427_avatar_1639583427.gif"
          alt="img discount"
          className="discount__item--img"
        />
        <div>
          <h3 className="discount__item--name">{`[${name}] - Nhập mã ${code} giảm ngay ${percent} %`}</h3>
          <p className="discount__item--quantity">Còn lại {quantity} mã</p>
          <div className="discount__wrapper1">
            <div className="discount__wrapper2">
              <AiOutlineClockCircle className="discount__item--icon" />
              <p>Hết hạn: {dateTime(endDate)}</p>
            </div>
            <button className="discount__item--button">Lấy mã</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DiscountItem;
