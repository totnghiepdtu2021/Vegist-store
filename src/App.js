import React from 'react';

import { Router, Switch } from 'react-router-dom';
import history from './until/history';

import 'antd/dist/antd.css';
import './scss/styles.scss';

import Home from './pages/User/Home';
import DefaultLayout from './layouts/DefaultLayout';
import PrivateLayout from './layouts/PrivateLayout';
import PaymentLayout from './layouts/PaymentLayout';

import ProductDetail from './pages/User/ProductDetail';
import Login from './pages/User/Login';
import Register from './pages/User/Register';
import Products from './pages/User/Products';
import Cart from './pages/User/Cart';
import Information from './pages/User/Payment/Information';
import Profile from './pages/User/Profile';
import Shipping from './pages/User/Payment/Shipping';
import Payment from './pages/User/Payment/Payment';
import Success from './pages/User/Success';

import ListUser from './pages/Admin/ListUser';
import HomeAdmin from './pages/Admin/HomeAdmin';
import ProductsAdmin from './pages/Admin/ProductsAdmin';
import AddProductAdmin from './pages/Admin/ProductsAdmin/components/AddProduct';
import About from './pages/User/About/index';

function App() {
  return (
    <div className="App">
      <Router history={history}>
        <Switch>
          {/* USER */}
          <DefaultLayout exact path="/" component={Home} />
          <DefaultLayout exact path="/products" component={Products} />
          <DefaultLayout exact path="/cart" component={Cart} />
          <DefaultLayout exact path="/login" component={Login} />
          <DefaultLayout exact path="/register" component={Register} />
          <DefaultLayout exact path="/product/:id" component={ProductDetail} />
          <DefaultLayout exact path="/profile" component={Profile} />
          <DefaultLayout exact path="/success/:id" component={Success} />
          <DefaultLayout exact path="/about" component={About} />

          <PaymentLayout exact path="/infoPayment" component={Information} />
          <PaymentLayout exact path="/shipping" component={Shipping} />
          <PaymentLayout exact path="/payment" component={Payment} />

          {/* ADMIN */}
          <PrivateLayout exact path="/admin" component={HomeAdmin} />
          <PrivateLayout exact path="/admin/listUser" component={ListUser} />
          <PrivateLayout exact path="/admin/products" component={ProductsAdmin}></PrivateLayout>
          <PrivateLayout
            exact
            path="/admin/products/add"
            component={AddProductAdmin}
          ></PrivateLayout>
          <PrivateLayout
            exact
            path="/admin/products/edit/:id"
            component={AddProductAdmin}
          ></PrivateLayout>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
