# 体育行业标准查询系统 - 网页版GitHub部署指南

本教程将详细指导您如何**仅使用GitHub网页界面**完成体育行业标准查询系统的部署，无需安装任何Git客户端或使用命令行。

## 前提条件

在开始之前，请确保您已经：

1. 拥有GitHub账号（[注册地址](https://github.com/join)）
2. 下载并解压了本项目的代码文件（如还未下载，请先下载代码）
3. 了解基本的文件操作

## 第一部分：创建GitHub仓库

### 步骤1：登录GitHub

1. 打开浏览器，访问[GitHub官网](https://github.com)
2. 点击右上角的"Sign in"按钮登录您的GitHub账号

### 步骤2：创建新仓库

1. 登录后，点击右上角的"+"图标，选择"New repository"
   ![创建仓库按钮](https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=GitHub+create+new+repository+button&sign=ffce80e56c122b404935fe32b06ba88b)

2. 在新建仓库页面，填写以下信息：
   - **Repository name**: 为您的项目命名，例如 `sports-standards-search`
   - **Description**: 可选，简单描述您的项目，例如"体育行业标准查询系统"
   - **Visibility**: 选择"Public"（公开）或"Private"（私有）
   - 不要勾选任何初始化选项（如"Add a README file"、".gitignore"或"License"）

   ![创建仓库表单](https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=GitHub+new+repository+form&sign=5896413474653805f2013e65b4095568)

3. 点击页面底部的"Create repository"按钮

### 步骤3：上传项目文件

1. 创建仓库后，您将看到一个空仓库页面，点击"uploading an existing file"链接
   ![上传文件链接](https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=GitHub+upload+existing+file+link&sign=ddd75c0bdc5eace25fe213733ed84075)

2. 在文件上传页面，您可以：
   - 直接拖拽解压后的项目文件夹到浏览器窗口中
   - 或点击"choose your files"按钮，手动选择项目文件

   ![文件上传界面](https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=GitHub+upload+files+interface&sign=6a4aedf1a65f8837181ff37a1ea1545e)

3. 文件上传完成后，在页面底部的"Commit changes"部分：
   - 在"Add a commit message"文本框中输入提交信息，例如"Initial commit"
   - 选择"Commit directly to the main branch"
   - 点击"Commit changes"按钮

   ![提交更改](https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=GitHub+commit+changes+form&sign=2b4251976b8b17e75e9b04d0c5236cf1)

4. 等待文件上传完成，这可能需要一些时间，具体取决于您的文件大小和网络速度

## 第二部分：使用GitHub Pages部署静态网站（可选）

如果您想通过GitHub直接托管您的静态网站，可以使用GitHub Pages功能。

### 步骤1：配置GitHub Pages

1. 在您的仓库页面，点击顶部导航栏中的"Settings"选项卡
   ![设置选项卡](https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=GitHub+repository+settings+tab&sign=6ce02bac86341551ac349418a98ff360)

2. 在左侧菜单中，点击"Pages"选项
   ![Pages选项](https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=GitHub+repository+pages+option&sign=68a22a913fb091f8976aeb5e7b31aa12)

3. 在GitHub Pages设置页面：
   - 在"Source"部分，点击下拉菜单，选择"main"分支（如果使用GitHub Actions自动构建，则应选择"gh-pages"分支）
   - 在"/ (root)"或"/docs"选项中，选择"/root"
   - 点击"Save"按钮

   ![GitHub Pages设置](https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=GitHub+pages+settings+interface&sign=58933ef3827f4b9d22dca62b4ed3eeff)

4. 等待10-15分钟，GitHub Pages会自动构建并部署您的网站

### 步骤2：访问您的网站

1. 配置完成后，您将在GitHub Pages设置页面看到一个绿色的提示，显示您的网站已经部署成功，并提供了一个访问链接，格式为 `https://[您的用户名].github.io/[仓库名称]`
2. 点击该链接，您就可以访问部署在GitHub Pages上的体育行业标准查询系统了
3. 注意：首次部署可能需要等待10-15分钟才能完全生效

   ![GitHub Pages部署成功](https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=GitHub+pages+deployment+success+message&sign=f61b86fcf13246352da521c435634d04)

## 第三部分：通过GitHub Actions自动部署到腾讯EdgeOne（可选）

如果您想将网站部署到腾讯EdgeOne，可以配置GitHub Actions实现自动部署。

### 步骤1：准备EdgeOne配置信息

1. 登录[腾讯云控制台](https://console.cloud.tencent.com/)
2. 进入EdgeOne服务页面，获取以下信息：
   - `TENCENT_CLOUD_SECRET_ID`: 您的腾讯云API密钥ID
   - `TENCENT_CLOUD_SECRET_KEY`: 您的腾讯云API密钥Key
   - `EDGEONE_ZONE_ID`: 您的EdgeOne区域ID
   - `EDGEONE_SITE_ID`: 您的EdgeOne站点ID

### 步骤2：在GitHub中添加密钥

1. 在您的仓库页面，点击顶部导航栏中的"Settings"选项卡
2. 在左侧菜单中，点击"Secrets and variables" -> "Actions"
3. 点击"New repository secret"按钮，依次添加以下密钥：
   - 名称: `TENCENT_CLOUD_SECRET_ID`，值: 您的腾讯云API密钥ID
   - 名称: `TENCENT_CLOUD_SECRET_KEY`，值: 您的腾讯云API密钥Key
   - 名称: `EDGEONE_ZONE_ID`，值: 您的EdgeOne区域ID
   - 名称: `EDGEONE_SITE_ID`，值: 您的EdgeOne站点ID

   ![添加GitHub密钥](https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=GitHub+repository+secrets+interface&sign=bde86a6ed001d45885abd55835444c33)

### 步骤3：创建GitHub Actions工作流文件

1. 返回您的仓库主页，点击"Add file"按钮，选择"Create new file"
   ![创建新文件](https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=GitHub+create+new+file+button&sign=3858878498e6742130164828307e599f)

2. 在文件名框中输入`.github/workflows/deploy.yml`（注意前面的点号）

3. 在文件内容区域，粘贴以下代码：
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

4. 滚动到页面底部，输入提交信息，然后点击"Commit new file"按钮

### 步骤4：触发自动部署

1. 每次您向仓库推送更改时（包括这次创建工作流文件），GitHub Actions都会自动运行部署工作流
2. 要查看部署进度，可以点击仓库页面顶部的"Actions"选项卡
3. 在这里，您可以看到正在运行或已完成的工作流，点击具体的工作流可以查看详细日志

   ![GitHub Actions页面](https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=GitHub+actions+workflows+interface&sign=e5e4a825ee5f1f973c83aa86be7b9e23)

## 第四部分：更新和维护

### 如何更新网站内容

1. 对本地项目文件进行修改
2. 按照"第一部分：创建GitHub仓库"中的"步骤3：上传项目文件"的方法，将修改后的文件上传到GitHub
3. 如果配置了GitHub Pages或GitHub Actions，网站将自动更新

### 常见问题排查

1. **文件上传失败**
   - 检查文件大小是否超过GitHub的限制（单个文件不超过25MB）
   - 尝试分批上传文件
   - 检查网络连接是否稳定

 2. **GitHub Pages网站无法访问**
   - 确认您选择了正确的分支（main或gh-pages）和目录（/root）
   - 等待10-15分钟，GitHub Pages可能需要时间来部署
   - 检查项目根目录是否有index.html文件
   - 确认package.json中的build脚本是否正确设置为`"build": "vite build --base=/"`

 3. **GitHub Actions部署失败**
   - 点击"Actions"选项卡查看详细错误日志
   - 确认您添加的密钥信息是否正确
   - 检查项目的构建脚本是否能正常运行（应为`"build": "vite build --base=/"`）

## 其他注意事项

### 腾讯云EdgeOne费用说明（如使用）
如果您选择将网站部署到腾讯云EdgeOne，请注意这是一项收费服务。费用根据您选择的套餐和使用量而定，包括基础套餐费、流量费和可能的增值服务费等。建议在使用前访问[腾讯云EdgeOne官方价格页面](https://cloud.tencent.com/product/edgeone/pricing)了解最新的收费标准。

### 其他建议
- 定期备份您的代码和数据
- 考虑设置分支保护规则，防止误操作
- 如果您的项目需要协作，可以邀请其他GitHub用户加入您的仓库
- 如需修改网站信息（如联系我们、关于我们等内容），只需编辑`src/config/siteConfig.ts`文件，然后重新上传并部署网站即可

通过以上步骤，您应该能够成功通过网页版GitHub完成体育行业标准查询系统的部署。如有任何问题，请参考GitHub官方文档或联系技术支持。