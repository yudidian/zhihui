import React from 'react';
import ReactDOM from 'react-dom/client';
import "@/assets/reset.min.css"
import App from './App';
import reportWebVitals from './reportWebVitals';
import "lib-flexible"
import {ConfigProvider} from "antd-mobile";
import zhCN from "antd-mobile/es/locales/zh-CN";
import {Provider} from "react-redux"
import store from "@/store/store";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ConfigProvider locale={zhCN}>
      <Provider store={store}>
        <App/>
      </Provider>
    </ConfigProvider>
);

reportWebVitals();
