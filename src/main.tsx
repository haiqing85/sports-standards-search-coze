import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from 'sonner';
import App from "./App.tsx";
import "./index.css";

// 修复GitHub Pages路由问题 - 增强版
function getGitHubPagesPath() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get('path') || '/';
}

// 检查当前环境是否为GitHub Pages
function isGitHubPages() {
  return window.location.hostname.includes('github.io');
}

// 增强的路由修复逻辑
if (isGitHubPages()) {
  const path = getGitHubPagesPath();
  
  // 检查当前路径是否需要修复
  const needsFix = path !== window.location.pathname;
  
  // 如果路径需要修复，使用replaceState更新URL
  if (needsFix) {
    window.history.replaceState(null, '', path);
  }
  
  // 确保base path正确设置
  const basePath = window.location.pathname.split('/')[1] || '';
  // 添加全局变量供其他组件使用
  (window as any).__GITHUB_PAGES_BASE_PATH = basePath;
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  </StrictMode>
);
