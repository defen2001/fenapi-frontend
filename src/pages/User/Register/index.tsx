import Footer from '@/components/Footer';
import { userRegisterUsingPOST } from '@/services/defengapi-backend/userController';
import { history } from '@@/core/history';
import { Link } from '@@/exports';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { LoginFormPage, ProFormText } from '@ant-design/pro-components';
import { message, Space, Tabs } from 'antd';
import React, { useState } from 'react';
import pandaBackImg from '../../../../public/background.jpg';

const Register: React.FC = () => {
  const [captchaSrc, setCaptchaSrc] = useState('/api/captcha');
  const [type, setType] = useState<string>('account');

  const handleSubmit = async (values: API.UserRegisterRequest) => {
    // Validate password confirmation
    if (values.userPassword !== values.checkPassword) {
      message.error('密码和确认密码不匹配！');
      return;
    }

    // TODO: Call registration API

    try {
      // 注册
      const id = await userRegisterUsingPOST(values);
      if (id) {
        const defaultLoginSuccessMessage = '注册成功！';
        message.success(defaultLoginSuccessMessage);

        /** 此方法会跳转到 redirect 参数所在的位置 */
        // const urlParams = new URL(window.location.href).searchParams;
        // history.push(urlParams.get('redirect') || '/');
        // return;
        if (!history) return;
        const { query } = history.location;
        history.push({
          pathname: '/user/login',
          query,
        });
        return;
      }
    } catch (error: any) {
      const defaultLoginFailureMessage = '注册失败，请重试！';
      message.error(defaultLoginFailureMessage);
    }
  };

  const refreshCaptcha = () => {
    // Refreshing the captcha by changing the URL
    setCaptchaSrc(`/api/captcha?rnd=${Math.random()}`);
  };

  // return (
  //   <div className={styles.container}>
  //     <div className={styles.content}>
  //       <h1>注册新账户</h1>
  //       <Form onFinish={handleSubmit}>
  //         <ProFormText
  //           fieldProps={{
  //             size: 'large',
  //             prefix: <UserOutlined className={styles.prefixIcon} />,
  //           }}
  //           name="username"
  //           placeholder={'请输入用户名！'}
  //           rules={[
  //             {
  //               required: true,
  //               message: '用户名是必填项！',
  //             },
  //           ]}
  //         />
  //         <ProFormText
  //           fieldProps={{
  //             size: 'large',
  //             prefix: <LockOutlined className={styles.prefixIcon} />,
  //           }}
  //           name="password"
  //           placeholder={'请输入密码！'}
  //           rules={[
  //             {
  //               required: true,
  //               message: '密码是必填项！',
  //             },
  //           ]}
  //         />
  //         <ProFormText
  //           fieldProps={{
  //             size: 'large',
  //             prefix: <LockOutlined className={styles.prefixIcon} />,
  //           }}
  //           name="confirmPassword"
  //           placeholder={'请确认密码！'}
  //           rules={[
  //             {
  //               required: true,
  //               message: '确认密码是必填项！',
  //             },
  //           ]}
  //         />
  //         <Form.Item
  //           name="captcha"
  //           rules={[
  //             {
  //               required: true,
  //               message: '验证码是必填项！',
  //             },
  //           ]}
  //         >
  //           <Input
  //             size="large"
  //             prefix={<img src={captchaSrc} alt="captcha" onClick={refreshCaptcha} />}
  //             placeholder={'请输入验证码！'}
  //           />
  //         </Form.Item>
  //         {/* <ProFormText
  //         fieldProps={{
  //           size: 'large',
  //           prefix: <MailOutlined className={styles.prefixIcon} />,
  //         }}
  //         name="email"
  //         placeholder={'请输入电子邮件！'}
  //         rules={[
  //           {
  //             required: false,
  //             message: '电子邮件是选填项！',
  //           },
  //         ]}
  //       /> */}
  //         <Form.Item>
  //           <Button type="primary" htmlType="submit" className={styles.submitButton}>
  //             注册
  //           </Button>
  //         </Form.Item>
  //       </Form>
  //       <a href="/user/login">返回登录</a>
  //     </div>
  //   </div>
  // );
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
          submitter={{
            searchConfig: {
              submitText: '注册',
            },
          }}
          backgroundImageUrl={pandaBackImg}
          logo={<img alt="logo" src="/logo.png" />}
          title="Fen接口平台"
          subTitle={'API 开放平台'}
          initialValues={{
            autoLogin: true,
          }}
          onFinish={async (values) => {
            await handleSubmit(values as API.UserRegisterRequest);
          }}
        >
          <Tabs activeKey={type} onChange={setType} centered>
            <Tabs.TabPane key="account" tab={'账号密码注册'} />
          </Tabs>
          {type === 'account' && (
            <>
              <ProFormText
                name="userAccount"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined />,
                }}
                placeholder="请输入账号"
                rules={[
                  {
                    required: true,
                    message: '账号是必填项！',
                  },
                ]}
              />
              <ProFormText.Password
                name="userPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder="请输入密码"
                rules={[
                  {
                    required: true,
                    message: '密码是必填项！',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '长度不能小于 8',
                  },
                ]}
              />
              <ProFormText.Password
                name="checkPassword"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined />,
                }}
                placeholder="请再次输入密码"
                rules={[
                  {
                    required: true,
                    message: '确认密码是必填项！',
                  },
                  {
                    min: 8,
                    type: 'string',
                    message: '长度不能小于 8',
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
              已有账号？<Link to="/user/login">登录</Link>
            </Space>
          </div>
        </LoginFormPage>
      </div>
      <Footer />
    </div>
  );
};
export default Register;
