import React from 'react';
import {NavBar} from "antd-mobile";

function MyCollect(props) {
  const {navigate} = props
  const back = () => {
    navigate(-1)
  }
  return (
      <>
        <div className="collect-wrapper">
          <NavBar onBack={back}>我的收藏</NavBar>
        </div>
      </>
  );
}

export default MyCollect;
