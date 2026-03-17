// 网站配置文件
// 您可以通过修改此文件来更新网站的联系信息、关于我们等内容

// 网站基本信息
export const siteInfo = {
  name: '体育标准查询系统',
  description: '提供全面的体育行业标准查询服务，包括国家标准、地方标准、团标、行业标准和企业标准。',
  logoIcon: 'fa-medal', // 使用的Font Awesome图标名称
  year: 2026 // 固定年份
};

// 联系信息
export const contactInfo = {
  // 去掉电话
  email: 'harris@aohuasports.com',
  address: '山东省济南市春暄路3777号',
  // 社交媒体链接
  social: {
    weixin: '#',
    weibo: '#',
    email: 'mailto:harris@aohuasports.com'
  }
};

// 关于我们内容
export const aboutInfo = {
  title: '关于我们',
  content: '体育标准查询系统致力于为体育行业提供全面、准确的标准信息查询服务。我们收集整理了各类体育相关标准，包括场地建设、材料要求、设施规范、器材标准等方面的内容，为体育场馆建设、器材生产、赛事组织等提供参考依据。'
};

// 快速链接
export const quickLinks = [
  { name: '标准查询', url: '/standards' },
  { name: '分类浏览', url: '/categories/场地' },
  { name: '关于我们', url: '#about' },
  { name: '使用帮助', url: '#help' }
];

// 底部法律链接
export const legalLinks = [
  { name: '隐私政策', url: '/privacy' },
  { name: '使用条款', url: '/terms' },
  { name: '免责声明', url: '/disclaimer' }
];