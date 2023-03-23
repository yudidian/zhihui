import React from 'react';
import {Avatar} from "antd-mobile";

function Header(props) {
  return (
      <>
        <div className="home-header-wrapper">
          <div className="time">
            <span className="day">25</span>
            <span className="month">十月</span>
          </div>
          <div className="title">早安</div>
          <div className="avatar">
            <Avatar src="" style={{"--border-radius": "50%"}}/>
          </div>
        </div>
      </>
  );
}

export default Header;
