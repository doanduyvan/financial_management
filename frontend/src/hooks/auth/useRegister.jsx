import { useState } from 'react';
import { message } from 'antd';
import { register } from '@/services/auth';
// import authService from '@/services/authService';

export const useRegister = () => {
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      // const response = await authService.register(values);
      const res = await register(values);
      console.log('Register data:', values);
      message.success('Đăng ký thành công!');
      return true;
    } catch (error) {
      message.error(error.data?.message || 'Đăng ký thất bại');
      console.log(error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleRegister };
};
