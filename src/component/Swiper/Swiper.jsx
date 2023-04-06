import React from 'react';
import { Image, Swiper } from 'antd-mobile';
import PropTypes from 'prop-types';
import './style/index.scss';

function MySwiper(props) {
  const { urlList, height } = props;
  const items = urlList.map((item, index) => {
    const { hint, image, title } = item;
    return(
      <Swiper.Item key={index}>
        <div className="swiper-content">
          <Image src={image} fit='cover' style={{
            '--adm-image-width': '100%',
            '--adm-image-height': '100%'
          }}/>
          <p className="content-title">
            {title}
          </p>
          <p className="content-author">
            {hint}
          </p>
        </div>
      </Swiper.Item>
    );
  });
  return (
    <>
      <Swiper
        autoplay={true}
        loop={true}
        indicatorProps={{
          style: {
            '--dot-color': 'rgba(255,255,255,0.4)',
            '--active-dot-color': '#ffffff',
            '--dot-size': '10px',
            '--active-dot-size': '20px',
            '--dot-border-radius': '50%',
            '--active-dot-border-radius': '15px',
            '--dot-spacing': '8px',
          }
        }}
        style={{
          '--height': `${height}px`
        }}
      >
        {items}
      </Swiper>
    </>
  );
}
MySwiper.defaultProps = {
  height: 200
};
MySwiper.propTypes = {
  urlList: PropTypes.array.isRequired,
  height: PropTypes.number
};
export default MySwiper;
