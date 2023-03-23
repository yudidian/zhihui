import React from 'react';
import {ErrorBlock} from "antd-mobile"
import "./style/index.scss"

function NotFund(){
  return (
      <>
        <div className="not-find-wrapper">
          <ErrorBlock status='empty' />
        </div>
      </>
  );
}

export default NotFund;
