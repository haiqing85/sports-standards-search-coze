import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import cloudIDEReactRefresh from '@coze-arch/vite-plugin-react-refresh-cloudide';


function getPlugins() {
  const plugins = [cloudIDEReactRefresh(),react(), tsconfigPaths()];
  return plugins;
}

// 获取基础路径 - 支持 GitHub Pages 部署
function getBase() {
  // 在开发环境中返回根路径
  if (process.env.NODE_ENV === 'development') {
    return '/';
  }
  
  // 从环境变量获取仓库名称（用于 GitHub Pages）
  // GitHub Actions 会自动设置 GITHUB_REPOSITORY 环境变量
  const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || '';
  
  // 如果有仓库名，使用 /repo-name/ 作为 base
  // 否则使用根路径
  return repoName ? `/${repoName}/` : '/';
}

export default defineConfig({
  plugins: getPlugins(),
  base: getBase(),
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // 确保 GitHub Pages 能正确处理 SPA 路由
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
  server: {
    port: 5000,
    host: '0.0.0.0',
    hmr: {
      overlay: true,
      path: '/hot/vite-hmr',
      port: 6000,
      clientPort: 443,
      timeout: 30000,
    },
  },
});
