import React, { useEffect, useRef, useState } from 'react';
import { Image, Space, SpinLoading, Toast } from 'antd-mobile';
import propTypes from 'prop-types';

function ListInfo(props) {
  const { getNewList, navigator } = props;
  const [isShowLoading, setLoading] = useState(false);
  const [newList, setNewList] = useState([1,2,3,4]);
  const homeList = useRef();
  useEffect(() => {
    const el = homeList.current;
    el.addEventListener('scroll', (e) => {
      if (el.clientHeight + el.scrollTop === el.scrollHeight) {
        setLoading(true);
      }
    });
    getNewList().then(
      res => {
        if (res.code === 0) {
          newList.push(...res.list);
          setNewList(newList);
        } else {
          Toast({
            icon: 'fail',
            content: res.codeText
          });
        }
      }
    );
  }, []);
  useEffect(() => {
    if (isShowLoading) {
      newList.push(...[5,6,7,8,9]);
      setNewList(newList);
      setLoading(false);
    }
  }, [isShowLoading, newList]);

  const toDetail = (id) => {
    navigator(`/detail/${id}`);
  };
  return (
    <>
      <div className="home-list-wrapper" ref={homeList}>
        {
          newList.map((item, index) => {
            const { imageUrl, title } = item;
            return (
              <div className="home-list-info" key={index} onClick={() => toDetail(item.id)}>
                <div className="info-left">
                  <div className="title">
                    {title}
                  </div>
                  <div className="message">
                        用户阅读
                  </div>
                </div>
                <div className="info-right">
                  <Image src={imageUrl} fit='cover' width={60} height={60}></Image>
                </div>
              </div>
            );
          })
        }
        {
          isShowLoading ?
            <Space justify="center" align="center" block>
              <span style={{ marginRight: '10px', fontSize: '16px' }}>加载中</span>
              <SpinLoading color='default' style={{ '--size': '18px' }}/>
            </Space>
            :
            <Space justify="center" align="center" block>
              <span style={{ fontSize: '16px' }}>没有更多了</span>
            </Space>
        }
      </div>
    </>
  );
}

ListInfo.propTypes = {
  newList: propTypes.array.isRequired,
  getNewList: propTypes.func.isRequired
};
export default ListInfo;
