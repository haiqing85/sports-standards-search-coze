// 体育行业标准模拟数据

export interface Standard {
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
}

export const standards: Standard[] = [
  {
    id: '1',
    title: '合成材料面层运动场地',
    number: 'GB 36246-2018',
    category: '场地',
    subCategory: '合成材料面层',
    type: 'national',
    typeName: '国家标准',
    status: 'active',
    publishDate: '2018-11-01',
    implementDate: '2019-11-01',
    department: '国家市场监督管理总局、国家标准化管理委员会',
    summary: '规定了合成材料面层运动场地的技术要求、试验方法、检验规则及标志、包装、运输和贮存。',
    content: '本标准规定了合成材料面层运动场地的技术要求、试验方法、检验规则及标志、包装、运输和贮存。本标准适用于新建、改建和扩建的合成材料面层运动场地，包括田径场、足球场、篮球场、排球场、网球场等。标准要求合成材料面层运动场地应具有良好的物理机械性能、耐老化性能和环保性能，有害物质限量应符合相关规定。',
    isHot: true
  },
  {
    id: '2',
    title: '人造草坪运动场地技术要求',
    number: 'GB/T 20394-2019',
    category: '场地',
    subCategory: '人造草坪',
    type: 'national',
    typeName: '国家标准',
    status: 'active',
    publishDate: '2019-05-10',
    implementDate: '2020-01-01',
    department: '国家市场监督管理总局、国家标准化管理委员会',
    summary: '规定了人造草坪运动场地的术语和定义、分类、技术要求、试验方法、检验规则及标志、包装、运输和贮存。',
    content: '本标准规定了人造草坪运动场地的术语和定义、分类、技术要求、试验方法、检验规则及标志、包装、运输和贮存。本标准适用于足球、橄榄球、曲棍球、高尔夫球等运动项目的人造草坪场地。标准要求人造草坪应具有良好的耐用性、抗老化性、环保性和运动性能，同时对场地基础、排水系统等也提出了具体要求。',
    isHot: true
  },
  {
    id: '3',
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
    content: '本标准规定了体育场馆照明的设计要求、计算方法、检测方法和评价标准。本标准适用于新建、改建和扩建的各类体育场馆的照明设计与检测。标准对不同级别比赛和训练场地的照明水平、均匀度、眩光控制、显色性等指标提出了具体要求，并规定了照明系统的节能要求和维护管理要求。',
    isHot: false
  },
  {
    id: '4',
    title: '合成材料运动场地面层用橡胶颗粒',
    number: 'GB/T 19264-2003',
    category: '材料',
    subCategory: '颗粒',
    type: 'national',
    typeName: '国家标准',
    status: 'revised',
    publishDate: '2003-11-10',
    implementDate: '2004-06-01',
    department: '国家质量监督检验检疫总局',
    summary: '规定了合成材料运动场地面层用橡胶颗粒的技术要求、试验方法、检验规则及标志、包装、运输和贮存。',
    content: '本标准规定了合成材料运动场地面层用橡胶颗粒的技术要求、试验方法、检验规则及标志、包装、运输和贮存。本标准适用于以废旧橡胶为主要原料，经加工制成的用于合成材料运动场地面层的橡胶颗粒。标准对橡胶颗粒的外观质量、粒度分布、物理机械性能、有害物质限量等指标提出了具体要求。',
    isHot: false
  },
  {
    id: '5',
    title: 'PVC运动地胶技术要求',
    number: 'T/CPSS 0001-2019',
    category: '材料',
    subCategory: 'PVC运动地胶',
    type: 'association',
    typeName: '团体标准',
    status: 'active',
    publishDate: '2019-12-01',
    implementDate: '2020-03-01',
    department: '中国体育用品业联合会',
    summary: '规定了PVC运动地胶的分类、技术要求、试验方法、检验规则及标志、包装、运输和贮存。',
    content: '本标准规定了PVC运动地胶的分类、技术要求、试验方法、检验规则及标志、包装、运输和贮存。本标准适用于室内运动场地使用的PVC运动地胶，包括篮球、排球、羽毛球、乒乓球等运动场地。标准对PVC运动地胶的外观质量、物理机械性能、环保性能、防滑性能、耐老化性能等指标提出了具体要求。',
    isHot: true
  },
  {
    id: '6',
    title: '运动木地板技术要求和检验方法',
    number: 'GB/T 20239-2015',
    category: '材料',
    subCategory: '木地板',
    type: 'national',
    typeName: '国家标准',
    status: 'active',
    publishDate: '2015-12-10',
    implementDate: '2016-09-01',
    department: '国家质量监督检验检疫总局、国家标准化管理委员会',
    summary: '规定了运动木地板的术语和定义、分类、技术要求、检验方法、检验规则及标志、包装、运输和贮存。',
    content: '本标准规定了运动木地板的术语和定义、分类、技术要求、检验方法、检验规则及标志、包装、运输和贮存。本标准适用于篮球、排球、羽毛球、乒乓球等室内运动场地使用的木地板系统。标准对运动木地板的结构、外观质量、物理性能、力学性能、环保性能等指标提出了具体要求，并规定了冲击吸收、垂直变形、滑动摩擦系数等运动性能指标。',
    isHot: false
  },
  {
    id: '7',
    title: '体育围网技术要求',
    number: 'DB11/T 1209-2015',
    category: '设施',
    subCategory: '围网',
    type: 'local',
    typeName: '地方标准(北京)',
    status: 'active',
    publishDate: '2015-06-05',
    implementDate: '2015-09-01',
    department: '北京市质量技术监督局',
    summary: '规定了体育围网的分类、技术要求、试验方法、检验规则及标志、包装、运输和贮存。',
    content: '本标准规定了体育围网的分类、技术要求、试验方法、检验规则及标志、包装、运输和贮存。本标准适用于北京地区新建、改建和扩建的各类体育场地的围网设施。标准对体育围网的材料、结构、尺寸偏差、表面处理、力学性能、耐腐蚀性能等指标提出了具体要求，并规定了围网的安装要求和安全性能要求。',
    isHot: false
  },
  {
    id: '8',
    title: '篮球架通用技术条件',
    number: 'GB/T 23115-2008',
    category: '器材',
    subCategory: '体育器材',
    type: 'national',
    typeName: '国家标准',
    status: '废止',
    publishDate: '2008-12-30',
    implementDate: '2009-09-01',
    department: '国家质量监督检验检疫总局、国家标准化管理委员会',
    summary: '规定了篮球架的分类、技术要求、试验方法、检验规则及标志、包装、运输和贮存。',
    content: '本标准规定了篮球架的分类、技术要求、试验方法、检验规则及标志、包装、运输和贮存。本标准适用于竞赛和训练用篮球架。标准对篮球架的材料、结构、尺寸偏差、外观质量、安全性能、耐用性能等指标提出了具体要求，并规定了篮球架的安装要求和维护要求。该标准已于2022年被新标准取代。',
    isHot: false
  },
  {
    id: '9',
    title: '健身路径器材安全通用要求',
    number: 'GB 19272-2011',
    category: '器材',
    subCategory: '健身路径',
    type: 'national',
    typeName: '国家标准',
    status: 'active',
    publishDate: '2011-12-30',
    implementDate: '2012-10-01',
    department: '国家质量监督检验检疫总局、国家标准化管理委员会',
    summary: '规定了健身路径器材的术语和定义、分类、安全要求、试验方法、检验规则及标志、包装、运输和贮存。',
    content: '本标准规定了健身路径器材的术语和定义、分类、安全要求、试验方法、检验规则及标志、包装、运输和贮存。本标准适用于安装在室外公共场所供公众使用的健身器材。标准对健身路径器材的材料、结构、尺寸偏差、外观质量、安全性能、耐用性能等指标提出了具体要求，并规定了器材的安装要求和维护要求。',
    isHot: true
  },
  {
    id: '10',
    title: '体育场馆声学设计及测量规程',
    number: 'JGJ/T 131-2012',
    category: '设施',
    subCategory: '声学',
    type: 'industry',
    typeName: '行业标准',
    status: 'active',
    publishDate: '2012-08-23',
    implementDate: '2012-12-01',
    department: '住房和城乡建设部',
    summary: '规定了体育场馆声学设计的基本要求、声学指标、计算方法、测量方法和评价标准。',
    content: '本标准规定了体育场馆声学设计的基本要求、声学指标、计算方法、测量方法和评价标准。本标准适用于新建、改建和扩建的各类体育场馆的声学设计与测量。标准对不同类型体育场馆的总容积、每座容积、混响时间、背景噪声、语言传输指数等声学指标提出了具体要求，并规定了声学设计的基本原则和测量方法。',
    isHot: false
  }
];

// 分类数据
export const categories = [
  { id: '场地', name: '场地', icon: 'fa-field-hockey' },
  { id: '材料', name: '材料', icon: 'fa-material-icons' },
  { id: '设施', name: '设施', icon: 'fa-gym' },
  { id: '器材', name: '器材', icon: 'fa-basketball' },
  { id: '管理', name: '管理', icon: 'fa-list-check' }
];

// 子分类数据
export const subCategories = {
  '场地': ['合成材料面层', '人造草坪', '天然草坪', '土场地', '沙地'],
  '材料': ['颗粒', 'PVC运动地胶', '木地板', '塑胶', '橡胶'],
  '设施': ['灯光照明', '围网', '看台', '声学', '通风空调'],
  '器材': ['体育器材', '健身路径', '裁判器材', '计时计分系统'],
  '管理': ['场馆管理', '安全规范', '维护保养', '等级评定']
};

// 标准类型数据
export const standardTypes = [
  { id: 'national', name: '国家标准', icon: 'fa-landmark' },
  { id: 'local', name: '地方标准', icon: 'fa-building' },
  { id: 'association', name: '团体标准', icon: 'fa-users' },
  { id: 'industry', name: '行业标准', icon: 'fa-industry' },
  { id: 'enterprise', name: '企业标准', icon: 'fa-building-circle-check' }
];