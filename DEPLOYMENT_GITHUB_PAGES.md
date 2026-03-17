# 体育行业标准查询系统 - 零成本部署方案（GitHub Pages）

本教程将详细指导您如何**完全免费**地将体育行业标准查询系统部署到GitHub Pages，无需支付任何费用。

## 为什么选择GitHub Pages？

- **完全免费**：GitHub Pages是一项免费的静态网站托管服务
- **无流量限制**：没有带宽或流量限制
- **易于设置**：只需简单配置，无需复杂的服务器管理
- **自动部署**：与GitHub仓库集成，可以设置提交代码后自动更新网站

## 前提条件

在开始之前，请确保您已经：

1. 拥有GitHub账号（[注册地址](https://github.com/join)）
2. 下载并解压了本项目的代码文件

## 第一部分：将代码部署到GitHub

### 步骤1：登录GitHub

1. 打开浏览器，访问[GitHub官网](https://github.com)
2. 点击右上角的"Sign in"按钮登录您的GitHub账号

### 步骤2：创建新仓库

1. 登录后，点击右上角的"+"图标，选择"New repository"
   ![创建仓库按钮](https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=GitHub+create+new+repository+button&sign=ffce80e56c122b404935fe32b06ba88b)

 2. 在新建仓库页面，填写以下信息：
   - **Repository name**: 为您的项目命名，例如 `sports-standards-search`
   - **Description**: 可选，简单描述您的项目，例如"体育行业标准查询系统"
   - **Visibility**: 选择"Public"（必须选择公开，私有仓库的GitHub Pages需要付费）
   - 不要勾选任何初始化选项（如"Add a README file"、".gitignore"或"License"），因为项目文件中已经包含了这些文件

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

## 第二部分：配置GitHub Pages

### 步骤1：项目配置确认（重要）

项目中已经配置了正确的构建参数，确保在GitHub Pages上部署时，网站的静态资源能够正确加载。

**已配置的关键设置：**
- `package.json`中的`build`脚本已经设置为`"build": "vite build --base=/"`
- 项目中包含了`404.html`文件，用于解决单页应用的路由问题
- `index.html`中添加了路由修复脚本
- `src/main.tsx`中添加了路由处理逻辑

这些配置确保了GitHub Pages能够正确处理单页应用的路由，避免刷新页面时出现404错误。

如果需要手动确认或修改配置，请按照以下步骤操作：

**本地项目确认步骤：**
1. 在您的计算机上打开下载并解压的项目文件夹
2. 使用文本编辑器打开`package.json`文件
3. 确认`scripts`部分中的`build`脚本是否为：
   ```json
   "build": "vite build --base=/"
   ```
4. 如果不是，请按照上述格式修改并保存文件

**GitHub网页端确认步骤（如果您直接在GitHub上编辑）：**
1. 在GitHub仓库页面，点击文件名列表中的`package.json`文件
2. 确认`build`脚本是否为：
   ```json
   "build": "vite build --base=/"
   ```
3. 如果不是，点击右上角的铅笔图标编辑文件，修改后点击"Commit changes"按钮保存

### 步骤2：启用GitHub Pages

1. 在您的仓库页面，点击顶部导航栏中的"Settings"选项卡
   ![设置选项卡](https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=GitHub+repository+settings+tab&sign=6ce02bac86341551ac349418a98ff360)

2. 在左侧菜单中，点击"Pages"选项
   ![Pages选项](https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=GitHub+repository+pages+option&sign=68a22a913fb091f8976aeb5e7b31aa12)

3. 在GitHub Pages设置页面：
   - 在"Source"部分，点击"None"旁边的下拉菜单，选择"main"分支
   - 在"/ (root)"或"/docs"选项中，选择"/root"
   - 点击"Save"按钮

   ![GitHub Pages设置](https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=GitHub+pages+settings+interface&sign=58933ef3827f4b9d22dca62b4ed3eeff)

4. 等待几分钟，GitHub Pages会自动构建并部署您的网站

### 步骤3：访问您的网站

 1. 配置完成后，您将在GitHub Pages设置页面看到一个绿色的提示，显示您的网站已经部署成功，并提供了一个访问链接，格式为 `https://[您的用户名].github.io/[仓库名称]`
 2. 点击该链接，您就可以访问部署在GitHub Pages上的体育行业标准查询系统了
 3. 注意：首次部署可能需要等待10-15分钟才能完全生效

    ![GitHub Pages部署成功](https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=GitHub+pages+deployment+success+message&sign=f61b86fcf13246352da521c435634d04)

## 第三部分：自动构建与部署

为了让GitHub Pages能够正确展示React应用并解决路由问题，我们需要配置GitHub Actions来自动构建项目，并确保正确处理单页应用的路由。

### 步骤1：创建GitHub Actions工作流文件

1. 返回您的仓库主页，点击"Add file"按钮，选择"Create new file"
   ![创建新文件](https://space.coze.cn/api/coze_space/gen_image?image_size=square&prompt=GitHub+create+new+file+button&sign=3858878498e6742130164828307e599f)

2. 在文件名框中输入`.github/workflows/deploy.yml`（注意前面的点号）

 3. 在文件内容区域，粘贴以下代码：
    ```yaml
    name: Deploy React App to GitHub Pages

    on:
      push:
        branches: [ main ]  # 或 master，取决于您的默认分支
      pull_request:
        branches: [ main ]

    permissions:
      contents: read
      pages: write
      id-token: write

    jobs:
      build-and-deploy:
        runs-on: ubuntu-latest
        environment:
          name: github-pages
          url: ${{ steps.deployment.outputs.page_url }}
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

          - name: Setup Pages
            uses: actions/configure-pages@v5

          - name: Upload artifact
            uses: actions/upload-pages-artifact@v3
            with:
              path: './dist'

          - name: Deploy to GitHub Pages
            id: deployment
            uses: actions/deploy-pages@v4
   ```

4. 滚动到页面底部，输入提交信息，然后点击"Commit new file"按钮

### 步骤2：更新GitHub Pages设置

  1. 回到"Settings" > "Pages"设置页面
  2. 在"Source"部分，选择"Deploy from a branch"
  3. 从下拉菜单中选择"gh-pages"分支
  4. 在"/ (root)"或"/docs"选项中，确保选择"/root"
 4. 点击"Save"按钮

### 步骤3：触发自动部署

1. 每次您向仓库推送更改时，GitHub Actions都会自动运行构建和部署工作流
2. 要查看部署进度，可以点击仓库页面顶部的"Actions"选项卡
3. 在这里，您可以看到正在运行或已完成的工作流，点击具体的工作流可以查看详细日志

   ![GitHub Actions页面](https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_16_9&prompt=GitHub+actions+workflows+interface&sign=e5e4a825ee5f1f973c83aa86be7b9e23)

## 第四部分：更新和维护

### 如何更新网站内容

1. 对本地项目文件进行修改
2. 按照"第一部分：将代码部署到GitHub"中的"步骤3：上传项目文件"的方法，将修改后的文件上传到GitHub
3. GitHub Actions将自动构建并更新您的网站

### 常见问题排查

 1. **网站无法访问或显示不正常**
   - 确认GitHub Pages设置中选择了正确的分支（gh-pages）和目录（/root）
   - 等待10-15分钟，GitHub Pages可能需要时间来部署
   - 检查GitHub Actions的构建日志，查看是否有错误
   - 确保您的仓库中存在`index.html`文件

 2. **GitHub Actions构建失败**
   - 点击"Actions"选项卡查看详细错误日志
   - 确认package.json中的依赖和构建脚本是否正确（应为`"build": "vite build --base=/"`）
   - 检查是否有编译错误

 3. **路由问题（刷新页面后404错误）**
   - 这是单页应用(SPA)在GitHub Pages上的常见问题
   - 解决方案：项目中已经包含了404.html文件和必要的路由修复脚本。请确保GitHub Pages设置正确，并且构建输出目录设置为dist（而非dist/static）

## 零成本方案的优势与限制

### 优势
- **完全免费**：不需要支付任何服务器费用
- **易于维护**：与GitHub集成，更新简单
- **稳定可靠**：GitHub基础设施保障网站稳定运行
- **无需技术背景**：按照本指南操作，无需专业的服务器知识

### 限制
- **仅支持静态网站**：无法运行服务器端代码
 2. **自定义域名需要额外配置**：虽然可以使用自定义域名，但需要购买域名
 3. **文件大小限制**：GitHub仓库有1GB的大小限制（对于大多数静态网站足够）
 4. **API调用限制**：如果您的网站需要调用API，可能会受到GitHub Pages的限制
 5. **部署延迟**：首次部署或更新后，可能需要等待10-15分钟才能完全生效

## 其他零成本选项（备选方案）

如果GitHub Pages不满足您的需求，还有其他零成本的静态网站托管服务：

1. **Netlify**：提供免费的静态网站托管，有更强大的构建功能
2. **Vercel**：专注于前端项目的托管平台，免费计划适合小型项目
3. **Cloudflare Pages**：Cloudflare提供的静态网站托管服务，与CDN集成

这些服务的设置过程与GitHub Pages类似，但各有特点，您可以根据自己的需求选择最适合的平台。

通过以上步骤，您应该能够成功将体育行业标准查询系统部署到GitHub Pages上，完全零成本！如有任何问题，请参考GitHub官方文档或在GitHub社区寻求帮助。