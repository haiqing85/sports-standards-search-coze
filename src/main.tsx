import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from 'sonner';
import App from "./App.tsx";
import "./index.css";

// 修复GitHub Pages路由问题 - 完全版
function setupGitHubPagesRouting() {
  // 检查当前环境是否为GitHub Pages
  if (window.location.hostname.includes('github.io')) {
    // 获取URL查询参数
    const urlParams = new URLSearchParams(window.location.search);
    const pathParam = urlParams.get('path');
    const redirectParam = urlParams.get('redirect');
    
    // 如果URL中包含path或redirect参数，使用它来设置正确的路由
    const targetPathParam = pathParam || redirectParam;
    
    if (targetPathParam) {
      // 确保路径以/开头
      const targetPath = targetPathParam.startsWith('/') ? targetPathParam : `/${targetPathParam}`;
      
      // 使用replaceState更新URL而不触发页面刷新
      window.history.replaceState(null, '', targetPath);
      
      // 确保React Router能正确处理更新后的路径
      window.dispatchEvent(new Event('popstate'));
    }
    
    // 处理浏览器后退/前进按钮
    window.addEventListener('popstate', function() {
      const newUrlParams = new URLSearchParams(window.location.search);
      const newPathParam = newUrlParams.get('path') || newUrlParams.get('redirect');
      
      if (newPathParam) {
        const targetPath = newPathParam.startsWith('/') ? newPathParam : `/${newPathParam}`;
        window.history.replaceState(null, '', targetPath);
      }
    });
  }
}

// 在应用启动时设置GitHub Pages路由
setupGitHubPagesRouting();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  </StrictMode>
);
