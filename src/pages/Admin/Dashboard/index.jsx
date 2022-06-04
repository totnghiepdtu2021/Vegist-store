import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { getMasterData } from '../../../redux/actions';
import Card from './Card';
import LineChart from './LineChart';
import './style.scss';

const Dashboard = ({ getMasterData, masterData }) => {
  const [dataCard, setDataCard] = useState();

  useEffect(() => {
    getMasterData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (masterData) handleDataCard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [masterData]);

  const handleDataCard = () => {
    if (!masterData) {
      setDataCard([]);
    } else {
      const bills = masterData?.bills?.reduce((sum, bill) => sum + bill.bills, 0);
      const users = masterData?.users?.reduce((sum, bill) => sum + bill.users, 0);
      const products = masterData?.products?.reduce((sum, bill) => sum + bill.products, 0);

      setDataCard([
        { id: 1, title: 'Sản phẩm', count: products || 0 },
        { id: 2, title: 'Người dùng', count: users || 0 },
        { id: 3, title: 'Doanh thu', count: bills || 0 },
      ]);
    }
  };

  return (
    <section className="dashboard">
      <div className="container">
        <div className="dashboard__card">
          <Card data={dataCard}></Card>
        </div>
        <LineChart data={masterData} setCartData={setDataCard} />
      </div>
    </section>
  );
};

const mapStateToProps = (state) => {
  const { masterData } = state.dashboardReducer;
  return { masterData };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getMasterData: (params) => dispatch(getMasterData(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
