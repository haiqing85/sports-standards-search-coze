# 体育行业标准查询系统 - 部署指南

## 快速部署到 GitHub Pages

### 方法一：自动部署（推荐）

1. **Fork 或克隆此仓库**
   ```bash
   git clone https://github.com/你的用户名/你的仓库名.git
   cd 你的仓库名
   ```

2. **推送到 GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **启用 GitHub Pages**
   - 进入仓库的 `Settings` → `Pages`
   - 在 `Source` 下拉菜单中选择 `GitHub Actions`
   - GitHub Actions 会自动构建和部署

4. **访问你的网站**
   - 部署完成后，访问 `https://你的用户名.github.io/你的仓库名/`
   - 首次部署可能需要几分钟时间

### 方法二：手动部署

1. **本地构建**
   ```bash
   pnpm install
   pnpm run build
   ```

2. **上传 dist 目录**
   - 将 `dist` 目录中的所有文件上传到你的 web 服务器

## 重要配置说明

### 1. Vite 配置 (`vite.config.ts`)

项目已配置自动检测 GitHub Pages 的仓库名称作为 base 路径：

```typescript
function getBase() {
  if (process.env.NODE_ENV === 'development') {
    return '/';
  }
  const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || '';
  return repoName ? `/${repoName}/` : '/';
}
```

### 2. SPA 路由支持

项目包含完整的 GitHub Pages SPA 路由修复：

- `index.html` - 包含路由重定向脚本
- `public/404.html` - 处理直接访问子路径的情况
- `src/main.tsx` - 处理重定向后的路径解析

### 3. GitHub Actions 工作流

`.github/workflows/deploy.yml` 配置了自动构建和部署：

- 推送到 main/master 分支时自动触发
- 使用 pnpm 作为包管理器
- 自动检测仓库名称配置 base 路径
- 支持手动触发部署

## 功能说明

### 1. 标准搜索

- **本地搜索**：从预置的标准数据库中搜索
- **网络搜索**：自动从国家标准信息公共服务平台获取标准信息
- **智能匹配**：根据关键词智能推荐相关标准

### 2. PDF 下载

- 使用 jsPDF 生成真实的 PDF 文件
- 包含标准完整信息：标题、编号、摘要、内容等
- 自动添加页脚和生成时间
- 支持中文内容

### 3. 响应式设计

- 支持桌面端和移动端
- 深色/浅色主题切换
- 平滑的动画效果

## 常见问题

### Q: 页面显示空白或 404？

A: 检查以下配置：
1. 确认 GitHub Pages 已启用并选择 GitHub Actions 作为源
2. 等待 Actions 构建完成（通常 1-3 分钟）
3. 检查 `vite.config.ts` 中的 base 路径配置

### Q: 路由跳转后刷新页面显示 404？

A: 项目已包含完整的 SPA 路由修复：
- `404.html` 会自动重定向到首页
- `index.html` 会处理重定向参数并恢复正确的路由

### Q: PDF 下载失败？

A: PDF 下载功能使用 jsPDF 库：
1. 检查浏览器是否阻止了弹出窗口
2. 确认有足够的磁盘空间
3. 尝试使用不同的浏览器

## 技术栈

- **框架**: React 18 + TypeScript
- **构建工具**: Vite 7
- **样式**: Tailwind CSS
- **路由**: React Router v7
- **PDF 生成**: jsPDF + jspdf-autotable
- **UI 组件**: 自定义组件（基于 Tailwind）
- **通知**: Sonner

## 开发

```bash
# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev

# 构建生产版本
pnpm build

# 预览生产版本
pnpm preview
```

## 许可证

MIT License
