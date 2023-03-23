import React from 'react';
import {Image, Swiper} from "antd-mobile";
import PropTypes from "prop-types"

function MySwiper(props) {
  const {urlList, height} = props
  const items = urlList.map((item, index) => {
    return(
        <Swiper.Item key={index}>
          <Image src={item} fit='cover' style={{
            "--adm-image-width": "100%",
            "--adm-image-height": "100%"
          }}/>
        </Swiper.Item>
    )
  })
  return (
      <>
        <Swiper
            autoplay={true}
            loop={true}
            indicatorProps={{
              style: {
                marginLeft: "280px"
              }
            }}
            style={{
              "--height": `${height}px`
            }}
        >
          {items}
        </Swiper>
      </>
  );
}
MySwiper.defaultProps = {
  height: 200
}
MySwiper.propTypes = {
  urlList: PropTypes.array.isRequired,
  height: PropTypes.number
}
export default MySwiper;
