import { toast } from 'sonner';

// 标准信息服务接口
export interface StandardInfo {
  id: string;
  title: string;
  number: string;
  category: string;
  subCategory: string;
  type: 'national' | 'local' | 'association' | 'industry' | 'enterprise';
  typeName: string;
  status: 'active' | 'revised' | '废止';
  publishDate: string;
  implementDate: string;
  department: string;
  summary: string;
  content: string;
  isHot: boolean;
  source?: string;
  pdfUrl?: string;
}

// 从国家标准信息公共服务平台搜索标准
export async function searchFromPlatform(keyword: string): Promise<StandardInfo[]> {
  try {
    // 使用开放的标准信息 API 或抓取公开数据
    // 这里使用国家标准全文公开系统、全国标准信息公共服务平台等公开数据
    
    const response = await fetch(
      `https://openstd.samr.gov.cn/bzgk/gb/std_list?search=${encodeURIComponent(keyword)}`,
      {
        method: 'GET',
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
        mode: 'cors',
      }
    );

    if (!response.ok) {
      throw new Error('网络请求失败');
    }

    const html = await response.text();
    return parseSearchResults(html, keyword);
  } catch (error) {
    console.error('搜索标准失败:', error);
    // 如果直接访问失败，尝试使用 CORS 代理
    return searchWithProxy(keyword);
  }
}

// 使用 CORS 代理搜索
async function searchWithProxy(keyword: string): Promise<StandardInfo[]> {
  try {
    // 使用公开的 CORS 代理服务
    const proxyUrl = 'https://api.allorigins.win/get?url=';
    const targetUrl = encodeURIComponent(
      `https://openstd.samr.gov.cn/bzgk/gb/std_list?search=${encodeURIComponent(keyword)}`
    );

    const response = await fetch(proxyUrl + targetUrl);
    const data = await response.json();
    
    if (data.contents) {
      return parseSearchResults(data.contents, keyword);
    }
    
    return [];
  } catch (error) {
    console.error('代理搜索失败:', error);
    toast.error('网络搜索失败，请稍后重试');
    return [];
  }
}

// 解析搜索结果 HTML
function parseSearchResults(html: string, keyword: string): StandardInfo[] {
  const results: StandardInfo[] = [];
  
  try {
    // 创建 DOM 解析器
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // 查找标准列表项（根据实际网站结构调整选择器）
    const items = doc.querySelectorAll('.std-item, .result-item, tbody tr');
    
    items.forEach((item, index) => {
      try {
        const titleElement = item.querySelector('.std-title, .title, td:nth-child(2)');
        const numberElement = item.querySelector('.std-number, .number, td:nth-child(1)');
        const dateElement = item.querySelector('.date, td:nth-child(3)');
        const statusElement = item.querySelector('.status, td:nth-child(4)');
        
        if (titleElement && numberElement) {
          results.push({
            id: `std_${Date.now()}_${index}`,
            title: titleElement.textContent?.trim() || '',
            number: numberElement.textContent?.trim() || '',
            category: guessCategory(titleElement.textContent || ''),
            subCategory: guessSubCategory(titleElement.textContent || ''),
            type: guessStandardType(numberElement.textContent || ''),
            typeName: getStandardTypeName(guessStandardType(numberElement.textContent || '')),
            status: parseStatus(statusElement?.textContent || ''),
            publishDate: dateElement?.textContent?.trim() || '',
            implementDate: '',
            department: '国家市场监督管理总局',
            summary: `${keyword} 相关标准`,
            content: `${titleElement.textContent?.trim()}\n\n标准编号：${numberElement.textContent?.trim()}`,
            isHot: false,
            source: '国家标准全文公开系统'
          });
        }
      } catch (e) {
        console.error('解析标准项失败:', e);
      }
    });
  } catch (error) {
    console.error('解析HTML失败:', error);
  }
  
  return results;
}

// 从多个公开数据源搜索标准
export async function searchStandardsFromWeb(keyword: string): Promise<StandardInfo[]> {
  const results: StandardInfo[] = [];
  
  try {
    // 1. 尝试从国家标准信息公共服务平台搜索
    const nationalResults = await searchFromPlatform(keyword);
    results.push(...nationalResults);
    
    // 2. 如果有结果则返回
    if (results.length > 0) {
      return results;
    }
    
    // 3. 如果没有结果，生成基于关键词的标准建议
    return generateSuggestedStandards(keyword);
  } catch (error) {
    console.error('网络搜索失败:', error);
    return generateSuggestedStandards(keyword);
  }
}

// 生成建议的标准（基于关键词）
function generateSuggestedStandards(keyword: string): StandardInfo[] {
  const suggestions: StandardInfo[] = [];
  const lowerKeyword = keyword.toLowerCase();
  
  // 根据关键词匹配常见标准
  const standardTemplates: Record<string, StandardInfo> = {
    '合成材料': {
      id: 'suggested_1',
      title: '合成材料面层运动场地',
      number: 'GB 36246-2018',
      category: '场地',
      subCategory: '合成材料面层',
      type: 'national',
      typeName: '国家标准',
      status: 'active',
      publishDate: '2018-11-01',
      implementDate: '2019-11-01',
      department: '国家市场监督管理总局',
      summary: '规定了合成材料面层运动场地的技术要求、试验方法、检验规则及标志、包装、运输和贮存。',
      content: '本标准规定了合成材料面层运动场地的技术要求、试验方法、检验规则及标志、包装、运输和贮存。',
      isHot: true,
      source: '建议搜索'
    },
    '人造草坪': {
      id: 'suggested_2',
      title: '人造草坪运动场地技术要求',
      number: 'GB/T 20394-2019',
      category: '场地',
      subCategory: '人造草坪',
      type: 'national',
      typeName: '国家标准',
      status: 'active',
      publishDate: '2019-05-10',
      implementDate: '2020-01-01',
      department: '国家市场监督管理总局',
      summary: '规定了人造草坪运动场地的术语和定义、分类、技术要求、试验方法、检验规则及标志、包装、运输和贮存。',
      content: '本标准规定了人造草坪运动场地的术语和定义、分类、技术要求、试验方法、检验规则及标志、包装、运输和贮存。',
      isHot: true,
      source: '建议搜索'
    },
    '灯光': {
      id: 'suggested_3',
      title: '体育场馆照明设计及检测标准',
      number: 'JGJ 153-2016',
      category: '设施',
      subCategory: '灯光照明',
      type: 'industry',
      typeName: '行业标准',
      status: 'active',
      publishDate: '2016-08-18',
      implementDate: '2017-04-01',
      department: '住房和城乡建设部',
      summary: '规定了体育场馆照明的设计要求、计算方法、检测方法和评价标准。',
      content: '本标准规定了体育场馆照明的设计要求、计算方法、检测方法和评价标准。',
      isHot: false,
      source: '建议搜索'
    },
    '地板': {
      id: 'suggested_4',
      title: '运动木地板技术要求和检验方法',
      number: 'GB/T 20239-2015',
      category: '材料',
      subCategory: '木地板',
      type: 'national',
      typeName: '国家标准',
      status: 'active',
      publishDate: '2015-12-10',
      implementDate: '2016-09-01',
      department: '国家质量监督检验检疫总局',
      summary: '规定了运动木地板的术语和定义、分类、技术要求、检验方法、检验规则及标志、包装、运输和贮存。',
      content: '本标准规定了运动木地板的术语和定义、分类、技术要求、检验方法、检验规则及标志、包装、运输和贮存。',
      isHot: false,
      source: '建议搜索'
    },
    '健身': {
      id: 'suggested_5',
      title: '健身路径器材安全通用要求',
      number: 'GB 19272-2011',
      category: '器材',
      subCategory: '健身路径',
      type: 'national',
      typeName: '国家标准',
      status: 'active',
      publishDate: '2011-12-30',
      implementDate: '2012-10-01',
      department: '国家质量监督检验检疫总局',
      summary: '规定了健身路径器材的术语和定义、分类、安全要求、试验方法、检验规则及标志、包装、运输和贮存。',
      content: '本标准规定了健身路径器材的术语和定义、分类、安全要求、试验方法、检验规则及标志、包装、运输和贮存。',
      isHot: true,
      source: '建议搜索'
    }
  };
  
  // 匹配关键词
  for (const [key, standard] of Object.entries(standardTemplates)) {
    if (lowerKeyword.includes(key)) {
      suggestions.push(standard);
    }
  }
  
  // 如果没有匹配到，返回通用建议
  if (suggestions.length === 0) {
    suggestions.push({
      id: `suggested_${Date.now()}`,
      title: `${keyword} 相关标准`,
      number: '请输入完整标准编号',
      category: '通用',
      subCategory: '通用',
      type: 'national',
      typeName: '国家标准',
      status: 'active',
      publishDate: '',
      implementDate: '',
      department: '请通过标准编号精确搜索',
      summary: `正在搜索包含"${keyword}"的标准...`,
      content: `请输入更精确的关键词或完整的标准编号进行搜索`,
      isHot: false,
      source: '建议搜索'
    });
  }
  
  return suggestions;
}

// 辅助函数
function guessCategory(title: string): string {
  if (title.includes('场地') || title.includes('跑道') || title.includes('草坪')) return '场地';
  if (title.includes('材料') || title.includes('颗粒') || title.includes('胶')) return '材料';
  if (title.includes('设施') || title.includes('灯光') || title.includes('围网')) return '设施';
  if (title.includes('器材') || title.includes('设备') || title.includes('健身')) return '器材';
  return '管理';
}

function guessSubCategory(title: string): string {
  if (title.includes('合成材料')) return '合成材料面层';
  if (title.includes('人造草坪')) return '人造草坪';
  if (title.includes('灯光') || title.includes('照明')) return '灯光照明';
  if (title.includes('地板') || title.includes('地胶')) return '木地板';
  if (title.includes('健身')) return '健身路径';
  return '通用';
}

function guessStandardType(number: string): 'national' | 'local' | 'association' | 'industry' | 'enterprise' {
  if (number.startsWith('GB')) return 'national';
  if (number.startsWith('DB')) return 'local';
  if (number.startsWith('T/')) return 'association';
  if (number.match(/[A-Z]{2,}\s*\d/)) return 'industry';
  return 'national';
}

function getStandardTypeName(type: string): string {
  const names: Record<string, string> = {
    national: '国家标准',
    local: '地方标准',
    association: '团体标准',
    industry: '行业标准',
    enterprise: '企业标准'
  };
  return names[type] || '国家标准';
}

function parseStatus(statusText: string): 'active' | 'revised' | '废止' {
  if (statusText.includes('废止') || statusText.includes('作废')) return '废止';
  if (statusText.includes('修订') || statusText.includes('更新')) return 'revised';
  return 'active';
}
