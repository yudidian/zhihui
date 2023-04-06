import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import {Button, Card, Form, ImageUploader, Input, NavBar, Toast} from 'antd-mobile';
import {updateUserInfo, uploadImage} from '@/api';

const UpdateWrapper = styled.div`


`;
function UpdateInfo(props) {
  const {navigate, state} = props;
  const [fileList, setFileList] = useState([]);
  const [formInfo, setFormInfo] = useState({
    pic: '',
    username: ''
  });
  const [loadingFlag, setLoadingFlag] = useState(false);
  const [updateForm] = Form.useForm();
  useEffect(() => {
    setFileList([{
      url: state.url
    }]);
    setFormInfo({
      pic: state.url,
      username: state.username
    });
  }, []);
  const onFinish = async (values) => {
    setLoadingFlag(true);
    const res = await updateUserInfo({
      username: values.username,
      pic: values.pic[0].url
    });
    setLoadingFlag(false);
    if (res.code === 0) {
      Toast.show({
        icon: 'success',
        content: '修改成功'
      });
    } else {
      Toast.show({
        icon: 'fail',
        content: res.codeText
      });
    }
  };
  const uploadHandler = async (file) => {
    const form = new FormData();
    form.append('file', file);
    const res = await uploadImage(form);
    if (res.code === 0) {
      const userInfo = {...formInfo};
      userInfo.pic = res.pic;
      setFormInfo(userInfo);
      return {
        url: res.pic
      };
    }
    return {
      url: ''
    };
  };
  return (
    <>
      <UpdateWrapper>
        <NavBar onBack={() => navigate(-1)}>修改用户信息</NavBar>
        <Card>
          <Form form={updateForm} layout='vertical' mode='card'
            onFinish={onFinish} footer={
              <div style={{
                display: 'flex',
                justifyContent: 'space-around'
              }}>
                <Button
                  loading={loadingFlag}
                  block
                  type='submit'
                  color='primary'
                  size='middle'
                  style={{ '--border-radius': '8px', width: 120 }}
                >
                确定
                </Button>
              </div>
            }>
            <Form.Item
              label='头像'
              name="pic"
              validateFirst={true}
              rules={[{ required: true, message: '请上传头像' }]}
            >
              <ImageUploader
                value={fileList}
                onChange={setFileList}
                maxCount={1}
                upload={uploadHandler}
              />
            </Form.Item>
            <Form.Item
              validateFirst={true}
              label='新昵称'
              name="username"
              rules={[{ required: true, message: '请输入新昵称' }]}
            >
              <Input placeholder='请输入'/>
            </Form.Item>
          </Form>
        </Card>
      </UpdateWrapper>
    </>
  );
}

export default UpdateInfo;
