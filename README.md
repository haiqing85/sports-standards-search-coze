# 体育行业标准查询系统

这是一个用于查询体育行业标准的单页应用，支持国家标准、地方标准、团标、行业标准和企业标准的查询和浏览。

## 如何设置网站信息

如需修改网站的"联系我们"、"关于我们"等信息，请编辑 `src/config/siteConfig.ts` 文件：

```typescript
// 联系信息
export const contactInfo = {
  phone: '400-123-4567', // 修改为您的联系电话
  email: 'contact@sportsstandard.com', // 修改为您的联系邮箱
  address: '北京市朝阳区体育中心路1号', // 修改为您的地址
  // 社交媒体链接
  social: {
    weixin: '#',
    weibo: '#',
    email: 'mailto:contact@sportsstandard.com'
  }
};
```

修改完成后，重新构建和部署网站即可生效。

## 部署指南

请参考 `DEPLOYMENT_GITHUB_EDGEONE.md` 文件了解如何将网站部署到GitHub和腾讯EdgeOne。