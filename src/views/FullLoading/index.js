import React from 'react';
import { Mask, SpinLoading } from 'antd-mobile';
import './style/index.scss';

function FullLoading(props) {
  return (
    <>
      <div className="full-loading">
        <Mask visible={true} className="loading-wrapper">
          <SpinLoading color="white" style={{ '--size': '48px' }}/>
        </Mask>
      </div>
    </>
  );
}

export default FullLoading;
