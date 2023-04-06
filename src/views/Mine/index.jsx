import React, { useEffect, useState } from 'react';
import { Dialog, Image, List, NavBar } from 'antd-mobile';
import './style/index.scss';
import { CloseOutline, StarOutline } from 'antd-mobile-icons';
import { getUserinfo } from '@/api';

function Mine(props) {
  const { navigate } = props;
  const [userInfo, setUserInfo] = useState({
    name: '',
    pic: ''
  });
  useEffect(() => {
    (async () => {
      const res = await getUserinfo();
      if (res.code === 0) {
        setUserInfo(res.data);
      }
    })();
  }, []);
  const loginOutHandle = () => {
    Dialog.confirm({
      title: '是否要退出登录',
      onConfirm: () => {
        navigate('/login', {
          replace: true
        });
        localStorage.clear();
      }
    });
  };
  return (
    <>
      <div className="mine-wrapper">
        <NavBar onBack={() => {
          navigate(-1);
        }}>个人中心</NavBar>
        <div className="user-info">
          <div
            className="user-avatar"
            onClick={() => {
              navigate('/update', {
                state: {
                  url: userInfo.pic,
                  username: userInfo.name
                }
              });
            }}
          >
            <Image
              fit="cover"
              src={userInfo.pic}
              style={{
                '--adm-image-width': '100%',
                '--adm-image-height': '100%'
              }}/>
          </div>
          <div className="user-name">
            {userInfo.name}
          </div>
        </div>
      </div>
      <div className="user-list">
        <List>
          <List.Item
            onClick={() => {
              navigate('/collect');
            }}
            prefix={<StarOutline/>}>
              我的收藏
          </List.Item>
          <List.Item
            onClick={() => {
              loginOutHandle();
            }}
            prefix={<CloseOutline/>}>
              退出登录
          </List.Item>
        </List>
      </div>
    </>
  );
}

export default Mine;
