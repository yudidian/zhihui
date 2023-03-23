import React, {useState} from 'react';
import {Form, Input, Button, Card} from "antd-mobile";
import "./style/index.scss"

function Code() {
  let count = 59
  const [str, setStr] = useState("发送验证码")
  const [sendFlag, setSendFlag] = useState(false)
  return (
      <>
        <Button color="default" size='middle' disabled={sendFlag} onClick={() => {
          setSendFlag(true)
          const timer = setInterval(() => {
            if (count >= 0) {
              setStr(`${count}s`)
              count--
            } else {
              clearInterval(timer)
              setSendFlag(false)
              setStr("发送验证码")
              count = 59
            }
          }, 1000)
        }}>{str}</Button>
      </>
  )
}

function Login(props) {
  console.log(props)
  const onFinish = (values) => {
    console.log(values)
  }
  const checkMobile = (_, value) => {
    const reg = /0?(13|14|15|17|18|19)[0-9]{9}/
    if (reg.test(value)) {
      return Promise.resolve()
    }
    return Promise.reject(new Error('手机号格式错误'))
  }
  return (
      <>
        <div className="login_wrapper">
          <Card>
            <div className="form-title">用户登录</div>
            <Form layout='vertical' mode='card' onFinish={onFinish} footer={
              <div style={{
                display: "flex",
                justifyContent: "space-around"
              }}>
                <Button block type='reset' color='default' size='middle'
                        style={{"--border-radius": "8px", width: 120}}>
                  重置
                </Button>
                <Button block type='submit' color='primary' size='middle'
                        style={{"--border-radius": "8px", width: 120}}>
                  登录
                </Button>
              </div>
            }>
              <Form.Item label='手机号' name="phone"
                         rules={[{required: true, message: "请输入手机号"}, {validator: checkMobile}]}>
                <Input placeholder='请输入'/>
              </Form.Item>
              <Form.Item label='短信验证码' extra={<Code/>} name="code"
                         rules={[{required: true, message: "请输入验证码"}]}>
                <Input placeholder='请输入'/>
              </Form.Item>
            </Form>
          </Card>
        </div>
      </>
  );
}

export default Login;
