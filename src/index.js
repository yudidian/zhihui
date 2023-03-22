import React from 'react';
import ReactDOM from 'react-dom/client';
import "@/assets/reset.min.css"
import App from './App';
import reportWebVitals from './reportWebVitals';
import "lib-flexible"
import {ConfigProvider} from "antd-mobile";
import zhCN from "antd-mobile/es/locales/zh-CN";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ConfigProvider locale={zhCN}>
      <App/>
    </ConfigProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
