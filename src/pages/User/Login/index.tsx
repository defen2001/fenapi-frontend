import Footer from '@/components/Footer';
import { userLoginUsingPOST } from '@/services/defengapi-backend/userController';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginFormPage, ProFormText } from '@ant-design/pro-components';
import { history, Link, useModel } from '@umijs/max';
import { Alert, message, Space, Tabs } from 'antd';
import React, { useState } from 'react';
import fenBackImg from '../../../../public/background.jpg';

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => {
  return (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );
};
const Login: React.FC = () => {
  const [userLoginState, setUserLoginState] = useState<API.LoginResult>({});
  const [type, setType] = useState<string>('account');
  const { initialState, setInitialState } = useModel('@@initialState');

  const handleSubmit = async (values: API.UserLoginRequest) => {
      // 登录
      const res = await userLoginUsingPOST({
        ...values,
      });
      if (res.data) {
        const defaultLoginSuccessMessage = '登录成功！';
        message.success(defaultLoginSuccessMessage);
        // 登录成功后处理
        const urlParams = new URL(window.location.href).searchParams;
        // 重定向到 redirect 参数所在的位置
        history.push(urlParams.get('redirect') || '/');
        // 保存登录状态
        setInitialState({
          loginUser: res.data,
        });
        return;
      } else {
      message.error(res.message);
    }
  };
  const { status, type: loginType } = userLoginState;
  return (
    <div>
      <div
        style={{
          // backgroundColor: 'white',
          height: 'calc(100vh - 100px)',
          margin: 0,
        }}
      >
        <LoginFormPage
          backgroundImageUrl={fenBackImg}
          // backgroundImageUrl={<img  alt="fenBackImg" src="/panda2.jpg"/>}
          logo={<img alt="logo" src="/logo.png" />}
          title="Fen接口平台"
          subTitle={'API 开放平台'}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.UserLoginRequest);
          }}
        >
          <Tabs
            activeKey={type}
            onChange={setType}
            centered
            items={[
              {
                key: 'account',
                label: '账户密码登录',
              },
            ]}
          />

          {status === 'error' && loginType === 'account' && (
            <LoginMessage content={'错误的用户名和密码(admin/ant.design)'} />
          )}
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder={'请输入用户名！'}
                rules={[
                  {
                    required: true,
                    message: '用户名是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder={'请输入密码！'}
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                ]}
              />
            </>
          )}
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <Space>
              没有账户?<Link to="/user/register">新用户注册</Link>
            </Space>
          </div>
        </LoginFormPage>
      </div>
      <Footer />
    </div>
  );
};
export default Login;
