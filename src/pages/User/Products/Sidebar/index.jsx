import { Checkbox, Menu } from 'antd';
import React, { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import './styles.scss';
import SubMenu from 'antd/lib/menu/SubMenu';
import useWindowDimensions from '../../../../until/width';
import { RiCloseLine } from 'react-icons/ri';
import { getSidebar } from '../../../../redux/actions';
import { useTranslation } from 'react-i18next';

const arrPrice = ['0-100', '100-200', '200-400'];

const Sidebar = ({
  getSidebar,
  sidebarData,
  filterProducts,
  setFilterProducts,
  setCurrentPage,
  products,
  setBannerData,
}) => {
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const [isFilter, setIsFilter] = useState(false);
  const [arrFilter, setArrFilter] = useState([]);
  const [priceValue, setPriceValue] = useState([]);

  useEffect(() => {
    getSidebar();
  }, []);

  const handelChangePrice = (value) => {
    switch (value[0]) {
      case 1:
        setFilterProducts({
          ...filterProducts,
          price: [0, 100000],
        });
        break;
      case 2:
        setFilterProducts({
          ...filterProducts,
          price: [100001, 200000],
        });
        break;
      case 3:
        setFilterProducts({
          ...filterProducts,
          price: [200001, 400000],
        });
        break;
      default:
        break;
    }

    const tempFilter = arrPrice.filter((item, index) => value.indexOf(index + 1) > -1);
    setPriceValue([...value]);
    setArrFilter({
      ...arrFilter,
      price: [...tempFilter],
    });
    setIsFilter(true);
    setCurrentPage(1);
  };

  const handelChangeCategory = (value) => {
    const tempFilter = [];
    const arr = sidebarData.categoryData.filter((item) => value.indexOf(item.id) > -1);
    setBannerData({ ...arr[0] });
    arr.forEach((element) => {
      tempFilter.push(element.name);
    });

    setArrFilter({
      ...arrFilter,
      category: [...tempFilter],
    });
    setFilterProducts({
      ...filterProducts,
      category: value,
    });
    setIsFilter(true);
    setCurrentPage(1);
  };

  const handelClickTag = ({ id, name }) => {
    setArrFilter({
      ...arrFilter,
      tag: [name],
    });
    setFilterProducts({
      ...filterProducts,
      tag: id,
    });
    setIsFilter(true);
    setCurrentPage(1);
  };

  const handelClearFilter = () => {
    setIsFilter(false);
    setFilterProducts({
      category: [],
      price: [],
      tag: null,
      bestSelling: false,
      priceLowToHigh: false,
      priceHighToLow: false,
      date: false,
    });
    setArrFilter([]);
    setPriceValue([]);
    setCurrentPage(1);
  };

  const renderFilterCategory = () => {
    return sidebarData?.categoryData?.map((item) => (
      <Checkbox
        value={item.id}
        className="sidebar__categories--item"
        key={`sidebar__categories-${item.id}`}
      >
        <div className="sidebar__categories--item-content">
          <span>{t(`category.${item.name}`)}</span>
          <span>({item.totalProducts})</span>
        </div>
      </Checkbox>
    ));
  };

  const renderFilterPrice = () => {
    return arrPrice.map((item, index) => (
      <Checkbox value={index + 1} className="sidebar__price--item" key={`sidebar__price-${index}`}>
        {item}
      </Checkbox>
    ));
  };

  const renderFilterTag = () => {
    return sidebarData?.tagsData?.map((item) => (
      <span
        className={`sidebar__tags--item ${
          filterProducts.tag === item.id ? 'sidebar__tags--item-active' : ''
        }`}
        key={`sidebar__tags-${item.id}`}
        onClick={() => handelClickTag(item)}
      >
        {t(`tags.${item.name}`)}
      </span>
    ));
  };

  return (
    <article className="sidebar">
      <div className="sidebar__container">
        {isFilter && (
          <section className="sidebar__filter">
            <div className="sidebar__filter--title">
              <h2>Filter:</h2>
              <button className="button" onClick={handelClearFilter}>
                Clear All
              </button>
            </div>
            <div className="sidebar__filter--content">
              {arrFilter.category &&
                arrFilter.category.map((item, index) => (
                  <span className="sidebar__filter--item" key={`sidebar__filter-${index}`}>
                    {item}
                    <RiCloseLine />
                  </span>
                ))}
              {arrFilter.price &&
                arrFilter.price.map((item, index) => (
                  <span className="sidebar__filter--item" key={`sidebar__filter-${index}`}>
                    {item}
                    <RiCloseLine />
                  </span>
                ))}
              {arrFilter.tag &&
                arrFilter.tag.map((item, index) => (
                  <span className="sidebar__filter--item" key={`sidebar__filter-${index}`}>
                    {item}
                    <RiCloseLine />
                  </span>
                ))}
            </div>
          </section>
        )}
        <section className="sidebar__categories">
          <Menu defaultOpenKeys={[`${width > 768 ? 'sub1' : 'sub2'}`]} mode="inline">
            <SubMenu
              key="sub1"
              title={<h2 className="sidebar__title">{t('products.Categories')}</h2>}
            >
              <Menu.ItemGroup key="g1">
                <div className="sidebar__categories--content">
                  <Checkbox.Group value={filterProducts.category} onChange={handelChangeCategory}>
                    {renderFilterCategory()}
                  </Checkbox.Group>
                </div>
              </Menu.ItemGroup>
            </SubMenu>
          </Menu>
        </section>
        <section className="sidebar__price">
          <Menu defaultOpenKeys={[`${width > 768 ? 'sub2' : ''}`]} mode="inline">
            <SubMenu
              key="sub2"
              title={<h2 className="sidebar__title">{t('products.Filter by Price')}</h2>}
            >
              <Menu.ItemGroup key="g1">
                <div className="sidebar__price--content">
                  <Checkbox.Group onChange={handelChangePrice} value={priceValue}>
                    {renderFilterPrice()}
                  </Checkbox.Group>
                </div>
              </Menu.ItemGroup>
            </SubMenu>
          </Menu>
        </section>
        <section className="sidebar__tags">
          <Menu defaultOpenKeys={[`${width > 768 ? 'sub3' : ''}`]} mode="inline">
            <SubMenu
              key="sub3"
              title={<h2 className="sidebar__title">{t('products.Filter by Tags')}</h2>}
            >
              <Menu.ItemGroup key="g1">
                <div className="sidebar__tags--content">{renderFilterTag()}</div>
              </Menu.ItemGroup>
            </SubMenu>
          </Menu>
        </section>
        <section className="sidebar__banner">
          <a href="#" className="sidebar__banner--img">
            <img
              src="https://cdn.shopify.com/s/files/1/0412/8151/9765/files/banner10-min.jpg?v=1593256899"
              alt="sidebar__banner--img"
            ></img>
          </a>
        </section>
      </div>
    </article>
  );
};

const mapStateToProps = (state) => {
  const { sidebarData } = state.categoryReducer;
  return {
    sidebarData,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getSidebar: (params) => dispatch(getSidebar(params)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
