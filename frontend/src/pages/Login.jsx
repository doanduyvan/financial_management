// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Form, Input, Button, Checkbox, Typography, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

const APP_TOKEN_KEY = "APP_TOKEN"; // đổi nếu bạn dùng key khác
const { Title, Text } = Typography;

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/dashboard";

  const onFinish = async (values) => {
    setLoading(true);
    try {
      // API URL: ưu tiên VITE_API_URL, fallback /api
      const base = import.meta.env.VITE_API_URL || "/api";
      const res = await fetch(`${base}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          remember: values.remember ?? false,
        }),
      });

      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || "Đăng nhập thất bại");
      }

      const data = await res.json();
      // Giả sử API trả { token: "..." }
      if (!data?.token) throw new Error("Thiếu token từ server");
      localStorage.setItem(APP_TOKEN_KEY, data.token);
      message.success("Đăng nhập thành công");
      navigate(redirectTo, { replace: true });
    } catch (err) {
      message.error(err.message || "Không thể đăng nhập");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-dvh grid grid-cols-1 bg-gradient-to-br from-indigo-50 via-white to-sky-50">
      {/* Cột phải: Form */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8 border">
          <div className="mb-6">
            <Title level={3} className="!m-0">Đăng nhập</Title>
            <Text className="text-gray-500">Sử dụng email và mật khẩu của bạn</Text>
          </div>

          <Form
            name="login"
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ remember: true }}
            requiredMark={false}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email" },
                { type: "email", message: "Email không hợp lệ" },
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
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
            >
              <Input.Password
                size="large"
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder="••••••••"
                autoComplete="current-password"
              />
            </Form.Item>

            <div className="flex items-center justify-between mb-4">
              <Form.Item name="remember" noStyle>
                <Checkbox checked>Ghi nhớ đăng nhập</Checkbox>
              </Form.Item>
            </div>

            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              className="!w-full !h-11 !rounded-xl"
            >
              Đăng nhập
            </Button>
          </Form>

          <div className="mt-6 text-center text-sm text-gray-600">
     
          </div>
        </div>
      </div>
    </div>
  );
}
