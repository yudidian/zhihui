import React from 'react';
import {Avatar} from "antd-mobile";

function Header(props) {
  const {time} = props
  const numMonth = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二']
  const month = numMonth[time.getMonth()]
  const day = time.getDay()
  return (
      <>
        <div className="home-header-wrapper">
          <div className="time">
            <span className="day">{day}</span>
            <span className="month">{month}月</span>
          </div>
          <div className="title">早安</div>
          <div className="avatar">
            <Avatar src="" style={{"--border-radius": "50%"}}/>
          </div>
        </div>
      </>
  );
}
Header.defaultProps = {
  time: new Date()
}
export default Header;
