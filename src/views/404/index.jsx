import React from 'react';
import { Button, ErrorBlock } from 'antd-mobile';
import './style/index.scss';
import { useNavigate } from 'react-router-dom';

function NotFund(props){
  console.log(props);
  const navigate = useNavigate();
  return (
    <>
      <div className="not-find-wrapper">
        <ErrorBlock status='empty'>
          <Button
            size="small"
            style={{
              marginRight: '10px'
            }}
            onClick={() => {
              navigate(-1);
            }}
          >返回上一页</Button>
          <Button
            size="small"
            color="primary"
            onClick={() => {
              navigate('/home', {
                replace: true
              });
            }}
          >回到首页</Button>
        </ErrorBlock>
      </div>
    </>
  );
}

export default NotFund;
