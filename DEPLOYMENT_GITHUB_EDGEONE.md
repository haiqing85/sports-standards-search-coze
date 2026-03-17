# 体育行业标准查询系统 - GitHub + 腾讯EdgeOne部署教程

本教程将详细指导您如何将体育行业标准查询系统的代码先部署到GitHub，然后通过GitHub部署到腾讯EdgeOne平台。

## 快速部署指南：直接使用下载的代码

关于您的问题"将上述内容下载下来，直接拖到GitHub仓库就可以了吗"，**答案是：不可以直接拖拽，需要使用Git工具进行操作**。以下是简单步骤：

1. 下载项目代码并解压
2. 使用Git命令行或GitHub桌面客户端将代码上传到GitHub
3. 按照本教程后续步骤配置自动部署到腾讯EdgeOne

下面是详细的操作指南：

## 前提条件

在开始之前，请确保您已经：

1. 安装了Git（[下载地址](https://git-scm.com/downloads)）
2. 拥有GitHub账号（[注册地址](https://github.com/join)）
3. 拥有腾讯云账号并开通了EdgeOne服务（可选，用于最终部署）
4. 已完成本地项目开发和测试（如有修改）

## 第一部分：将代码部署到GitHub

### 步骤1：创建GitHub仓库

1. 登录您的GitHub账号
2. 点击右上角的"+"图标，选择"New repository"
3. 填写仓库信息：
   - **Repository name**: 例如 `sports-standards-search`
   - **Description**: 可选，描述您的项目
   - **Visibility**: 选择"Public"或"Private"
   - 勾选"Add a README file"（可选）
   - 点击"Create repository"按钮

### 步骤2：将本地代码推送到GitHub

**方法一：使用Git命令行（推荐）**

1. 打开终端或命令提示符，导航到您下载并解压的项目目录
   ```bash
   cd /path/to/your/project  # 替换为您的项目路径
   ```

2. 初始化Git仓库（如果尚未初始化）：
   ```bash
   git init
   ```

3. 将所有文件添加到暂存区：
   ```bash
   git add .
   ```

4. 提交更改：
   ```bash
   git commit -m "Initial commit"
   ```

5. 关联本地仓库与GitHub远程仓库：
   ```bash
   git remote add origin https://github.com/[您的用户名]/[仓库名称].git
   ```
   （请替换`[您的用户名]`和`[仓库名称]`为实际值）

6. 将代码推送到GitHub：
   ```bash
   git push -u origin master
   ```
   （如果默认分支是`main`而不是`master`，请使用`git push -u origin main`）

**方法二：使用GitHub桌面客户端**

1. 下载并安装[GitHub桌面客户端](https://desktop.github.com/)
2. 打开GitHub桌面客户端，点击"File" -> "Add Local Repository"
3. 选择您下载并解压的项目文件夹
4. 点击"Publish repository"按钮
5. 选择您刚刚创建的GitHub仓库，点击"Publish Repository"

### 步骤3：验证GitHub仓库

打开浏览器，访问您刚刚创建的GitHub仓库，确认代码已经成功上传。

## 第二部分：通过GitHub部署到腾讯EdgeOne

### 步骤1：准备项目构建配置

确保您的项目已经配置了正确的构建命令。在`package.json`文件中，应该有类似以下的构建脚本：

```json
"scripts": {
  "build": "rm -rf dist && pnpm build:client && cp package.json dist && touch dist/build.flag"
}
```

这将确保项目能够正确构建并生成静态文件。

### 步骤2：开通并配置腾讯EdgeOne

1. 登录[腾讯云控制台](https://console.cloud.tencent.com/)
2. 在搜索栏中搜索"EdgeOne"并进入EdgeOne服务页面
3. 点击"立即开通"按钮（如果尚未开通）
4. 创建一个新的EdgeOne站点：
   - 点击"新建站点"按钮
   - 输入您的域名（如果没有域名，可以先使用临时域名或测试域名）
   - 点击"下一步"并完成站点创建

### 步骤3：配置自动部署

腾讯EdgeOne支持通过GitHub Actions自动部署代码。以下是配置步骤：

1. 在GitHub仓库中，点击"Settings" -> "Secrets and variables" -> "Actions"
2. 点击"New repository secret"，添加以下密钥：
   - `TENCENT_CLOUD_SECRET_ID`: 您的腾讯云API密钥ID
   - `TENCENT_CLOUD_SECRET_KEY`: 您的腾讯云API密钥Key
   - `EDGEONE_ZONE_ID`: 您的EdgeOne区域ID
   - `EDGEONE_SITE_ID`: 您的EdgeOne站点ID

3. 在项目根目录创建`.github/workflows/deploy.yml`文件，内容如下：

```yaml
name: Deploy to Tencent EdgeOne

on:
  push:
    branches: [ main ]  # 或 master，取决于您的默认分支

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'  # 确保与您的项目兼容

      - name: Install dependencies
        run: npm install

      - name: Build project
        run: npm run build

      - name: Deploy to EdgeOne
        uses: TencentCloud/edgeone-static-site-deploy@v1
        with:
          secret_id: ${{ secrets.TENCENT_CLOUD_SECRET_ID }}
          secret_key: ${{ secrets.TENCENT_CLOUD_SECRET_KEY }}
          zone_id: ${{ secrets.EDGEONE_ZONE_ID }}
          site_id: ${{ secrets.EDGEONE_SITE_ID }}
          local_path: './dist'  # 构建输出目录
          target_path: '/'  # 目标路径
```

### 步骤4：触发自动部署

1. 将`.github/workflows/deploy.yml`文件添加到Git：
   ```bash
   git add .github/workflows/deploy.yml
   git commit -m "Add deployment workflow"
   git push origin main
   ```

2. 进入GitHub仓库的"Actions"选项卡，您将看到正在运行的部署工作流。

3. 等待工作流完成，您可以在EdgeOne控制台查看部署状态。

### 步骤5：配置域名解析（可选）

如果您使用了自己的域名，需要配置域名解析：

1. 在EdgeOne控制台中，找到您的站点，点击"域名解析"
2. 添加一条A记录或CNAME记录，将您的域名指向EdgeOne提供的IP地址或域名
3. 根据EdgeOne的指引完成DNS配置

## 第三部分：验证部署

1. 在EdgeOne控制台中，找到您的站点的访问地址
2. 打开浏览器，访问该地址
3. 验证体育行业标准查询系统是否能够正常运行
4. 尝试进行搜索、查看详情等操作，确保所有功能正常

## 常见问题排查

### 部署失败

- 检查GitHub Actions日志，查看具体失败原因
- 确认腾讯云API密钥是否正确，并且具有足够的权限
- 检查项目构建是否成功，确保`dist`目录正确生成

### 网站无法访问

- 检查EdgeOne站点配置是否正确
- 验证域名解析是否生效
- 查看EdgeOne的访问日志和错误日志

### 功能异常

- 确认本地开发环境和部署环境的差异
- 检查浏览器控制台是否有错误信息
- 验证API请求是否正常

## 其他注意事项

### 腾讯云EdgeOne费用说明
腾讯云EdgeOne服务是需要收费的，具体费用根据您选择的套餐和使用量而定。主要收费项包括：
- 基础套餐费用：根据您选择的套餐类型（如标准版、专业版等）按月或按年收费
- 流量费用：超出套餐包含的流量部分将额外计费
- 其他增值服务费用：如WAF防护、DDoS防护等高级功能可能需要额外付费

建议在使用前访问[腾讯云EdgeOne官方价格页面](https://cloud.tencent.com/product/edgeone/pricing)了解最新的收费标准，或联系腾讯云销售获取详细报价。

### 其他部署建议
 - 定期更新GitHub仓库中的代码，触发自动部署
 - 在生产环境中，建议启用HTTPS
 - 考虑设置缓存策略，提高网站访问速度
 - 定期备份数据和配置
 - 修改网站信息：如需更改"联系我们"、"关于我们"等信息，只需编辑`src/config/siteConfig.ts`文件中的相应内容，然后重新部署网站即可。

 通过以上步骤，您应该能够成功将体育行业标准查询系统从GitHub部署到腾讯EdgeOne平台。如有任何问题，请参考腾讯云官方文档或联系技术支持。