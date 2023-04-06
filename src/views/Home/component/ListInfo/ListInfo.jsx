import React, { forwardRef } from 'react';
import { Divider, Image, Space, SpinLoading } from 'antd-mobile';
import propTypes from 'prop-types';
import NewsListSkeleton from '@/views/Home/component/ListInfo/NewsListSkeleton';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';

const ListInfo = forwardRef((props, ref) => {
  const { isShowSkeleton, bottomLoading, newListInfo } = props;
  const formatDate = function (date) {
    return dayjs(date).format('MM月DD');
  };
  return (
    <>
      <div className="home-list-wrapper" ref={ref}>
        {
          newListInfo.map((list, index) => {
            const { date, newList } = list;
            return (
              <div key={date ? date : index}>
                <Divider contentPosition='left' style={{
                  color: '#adadad'
                }}>{formatDate(date)}</Divider>
                {
                  newList && newList.map((item, index) => {
                    const { images, title, hint, id } = item;
                    return isShowSkeleton ?
                      <NewsListSkeleton key={index}></NewsListSkeleton>
                      :
                      <Link to={`/detail/${id}`} className="home-list-info" key={index}>
                        <div className="info-left">
                          <div className="title">
                            {title}
                          </div>
                          <div className="message">
                            {hint}
                          </div>
                        </div>
                        <div className="info-right">
                          <Image src={images ? images[0] : ''} fit='cover' width={60} height={60} lazy></Image>
                        </div>
                      </Link>;
                  })
                }
              </div>
            );
          })
        }
        {
          bottomLoading ?
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
});
ListInfo.defaultProps = {
  bottomLoading: true
};
ListInfo.propTypes = {
  newListInfo: propTypes.array.isRequired
};
ListInfo.displayName = 'ListInfo';
export default ListInfo;
