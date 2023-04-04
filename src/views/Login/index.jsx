import React, {useState} from 'react'
import {Form, Input, Button, Card, Toast} from 'antd-mobile'
import {connect} from 'react-redux'
import './style/index.scss'
import {getPhoneCode, login} from '@/api'
import actions from '@/store/actions'

function Code(props) {
  const {form} = props
  let count = 59
  const [str, setStr] = useState('发送验证码')
  const [sendFlag, setSendFlag] = useState(false)

  const sendCode = async () => {
    const phone = form.getFieldValue('phone')
    const reg = /0?(13|14|15|17|18|19)[0-9]{9}/
    if (!phone || !reg.test(phone)) {
      form.validateFields(['phone'])
      return
    }

    const res = await getPhoneCode({
      phone
    })
    if (res.code === 0) {
      setSendFlag(true)
      Toast.show({
        icon: 'success',
        content: '发送成功'
      })
      const timer = setInterval(() => {
        if (count >= 0) {
          setStr(`${count}s`)
          count--
        } else {
          clearInterval(timer)
          setSendFlag(false)
          setStr('发送验证码')
          count = 59
        }
      }, 1000)
    } else {
      Toast.show({
        icon: 'fail',
        content: '发送失败'
      })
    }
  }
  return (
    <>
      <Button
        color="default"
        size='middle'
        disabled={sendFlag}
        onClick={() => sendCode()}
      >{str}</Button>
    </>
  )
}

function Login(props) {
  console.log(props)
  const {navigate, saveToken, saveUserInfo} = props
  const [loadingFlag, setLoadingFlag] = useState(false)
  const [loginForm] = Form.useForm()
  const onFinish = async (values) => {
    setLoadingFlag(true)
    const res = await login({
      phone: values.phone,
      code: values.code
    })
    setLoadingFlag(false)
    if (res.code === 0) {
      saveToken(res.token)
      await saveUserInfo()
      Toast.show({
        icon: 'success',
        content: '登录成功'
      })
      navigate('/home')
    } else {
      Toast.show({
        icon: 'fail',
        content: '登录失败'
      })
    }
  }
  const checkMobile = (_, value) => {
    const reg = /0?(13|14|15|17|18|19)[0-9]{9}/
    if (reg.test(value)) {
      return Promise.resolve()
    }
    return Promise.reject(new Error('手机号格式错误'))
  }
  const checkCode = (_, value) => {
    const reg = /^[a-zA-Z0-9]{6}$/
    if (reg.test(value)) {
      return Promise.resolve()
    }
    return Promise.reject(new Error('验证码格式错误'))
  }
  return (
    <>
      <div className="login_wrapper">
        <Card>
          <div className="form-title">用户登录</div>
          <Form form={loginForm} layout='vertical' mode='card' onFinish={onFinish} footer={
            <div style={{
              display: 'flex',
              justifyContent: 'space-around'
            }}>
              <Button block type='reset' color='default' size='middle'
                style={{'--border-radius': '8px', width: 120}}>
                  重置
              </Button>
              <Button
                loading={loadingFlag}
                block
                type='submit'
                color='primary'
                size='middle'
                style={{'--border-radius': '8px', width: 120}}
              >
                  登录
              </Button>
            </div>
          }>
            <Form.Item
              label='手机号'
              name="phone"
              validateFirst={true}
              rules={[{required: true, message: '请输入手机号'}, {validator: checkMobile}]}
            >
              <Input placeholder='请输入'/>
            </Form.Item>
            <Form.Item
              validateFirst={true}
              label='短信验证码'
              extra={<Code form={loginForm}/>}
              name="code"
              rules={[{required: true, message: '请输入验证码'}, {validator: checkCode}]}
            >
              <Input placeholder='请输入'/>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </>
  )
}

export default connect(null,dispatch => {
  return {
    saveToken: (token) => {
      dispatch(actions.baseActions.baseInfo(token))
    },
    saveUserInfo: () => {
      dispatch(actions.baseActions.userInfo())
    }
  }
})(Login)
