import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  
  useEffect(() => {
    // 自动跳转到标准搜索页面
    navigate('/standards');
  }, [navigate]);
  
  return null;
}