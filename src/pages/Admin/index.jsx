import { ContainerOutlined, PieChartOutlined } from '@ant-design/icons';
import { Menu, Modal } from 'antd';
import React, { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineHome } from 'react-icons/ai';
import { BiUser } from 'react-icons/bi';
import { FaRegCommentDots } from 'react-icons/fa';
import { GiJerusalemCross } from 'react-icons/gi';
import { RiBillLine, RiContactsBookLine, RiLogoutBoxRLine } from 'react-icons/ri';
import history from '../../util/history';
import './style.scss';

const Admin = () => {
  const { t } = useTranslation();
  document.title = 'Vegist | Trang Admin';
  const [isModalVisible, setIsModalVisible] = useState(false);

  const infoUser = useMemo(() => JSON.parse(localStorage.getItem('profile')), []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    history.push('/');
    localStorage.clear();
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="admin-navbar fadeIn" style={{ width: 256 }}>
        <Menu
          inlineCollapsed={false}
          defaultSelectedKeys={['3']}
          defaultOpenKeys={['3']}
          mode="inline"
          theme="dark"
        >
          {infoUser && (
            <div className="admin__account">
              <div className="admin__account--avt">
                <img src={infoUser?.avatar} alt="avatar" />
              </div>
              <p className="admin__account--name">{infoUser?.fullName}</p>
            </div>
          )}
          <Menu.Item key="2" icon={<AiOutlineHome />} onClick={() => history.push('/')}>
            {t('admin.home')}
          </Menu.Item>
          <Menu.Item onClick={() => history.push('/admin')} key="3" icon={<PieChartOutlined />}>
            {t('admin.Dashboard.title')}
          </Menu.Item>
          <Menu.Item onClick={() => history.push('/admin/listUser')} key="4" icon={<BiUser />}>
            {t('admin.listUser.title')}
          </Menu.Item>
          <Menu.Item
            key="5"
            icon={<ContainerOutlined />}
            onClick={() => history.push('/admin/products')}
          >
            {t('admin.listProduct.title')}
          </Menu.Item>
          <Menu.Item key="6" icon={<RiBillLine />} onClick={() => history.push('/admin/listOrder')}>
            {t('admin.listOrder.title')}
          </Menu.Item>
          <Menu.Item
            key="7"
            icon={<FaRegCommentDots />}
            onClick={() => history.push('/admin/listComment')}
          >
            {t('admin.listComment.title')}
          </Menu.Item>
          <Menu.Item
            key="8"
            icon={<GiJerusalemCross />}
            onClick={() => history.push('/admin/discount')}
          >
            {t('admin.discount.title')}
          </Menu.Item>
          <Menu.Item
            key="9"
            icon={<RiContactsBookLine />}
            onClick={() => history.push('/admin/listContact')}
          >
            {t('admin.listContact.title')}
          </Menu.Item>
          <Menu.Item key="10" icon={<RiLogoutBoxRLine />} onClick={showModal}>
            {t('logout')}
          </Menu.Item>
        </Menu>
      </div>
      <Modal title="Notification" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Do you want to sign out?</p>
      </Modal>
    </>
  );
};
export default Admin;
