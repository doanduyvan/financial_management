import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { APP_TOKEN_KEY } from '@/utils/Consts';
import { useRegister } from '@/hooks/auth/useRegister';
const { Title, Text } = Typography;

export default function Register({ setIsPageLogin }) {
  const { loading, handleRegister } = useRegister();
  const onFinish = async (data) => {
    console.log(data);
    const check = await handleRegister(data);
    if (check) setIsPageLogin(true);
  };

  return (
    <div className="min-h-dvh grid grid-cols-1 bg-gradient-to-br from-indigo-50 via-white to-sky-50">
      {/* Cột phải: Form */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8 border">
          <div className="mb-6">
            <Title level={3} className="!m-0">
              Đăng ký tài khoản
            </Title>
            <Text className="text-gray-500">
              Sử dụng email và mật khẩu của bạn
            </Text>
          </div>

          <Form
            name="login"
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ remember: true }}
            requiredMark={false}
          >
            <Form.Item
              label="Họ Tên"
              name="name"
              rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}
            >
              <Input
                size="large"
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="name"
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Vui lòng nhập email' },
                { type: 'email', message: 'Email không hợp lệ' },
              ]}
            >
              <Input
                size="large"
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </Form.Item>

            <Form.Item
              label="Nhập lại mật khẩu"
              name="confirmpassword"
              dependencies={['password']}
              rules={[
                { required: true, message: 'Vui lòng nhập lại mật khẩu' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error('Mật khẩu không trùng khớp')
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              className="!w-full !h-11 !rounded-xl mt-5"
            >
              Đăng ký
            </Button>
          </Form>

          <div className="mt-6 text-center text-sm text-gray-600">
            Bạn đã có tài khoản?{' '}
            <button
              className="hover:text-blue-500"
              onClick={() => setIsPageLogin(true)}
            >
              Đăng nhập ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
