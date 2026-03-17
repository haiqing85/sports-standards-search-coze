import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStandard } from '@/contexts/standardContext';
import { toast } from 'sonner';

// 导入联系信息配置
import { contactInfo } from '@/config/siteConfig';

export default function StandardDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getStandardById } = useStandard();
  const [standard, setStandard] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      // 模拟加载延迟
      setTimeout(() => {
        const foundStandard = getStandardById(id);
        if (foundStandard) {
          setStandard(foundStandard);
        } else {
          toast.error('未找到该标准');
          navigate('/standards');
        }
        setIsLoading(false);
      }, 300);
    }
  }, [id, getStandardById, navigate]);

  // 获取状态对应的颜色和文本
  const getStatusInfo = () => {
    if (!standard) return { color: '', text: '' };
    
    switch (standard.status) {
      case 'active':
        return { color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400', text: '现行' };
      case 'revised':
        return { color: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400', text: '已修订' };
      case '废止':
        return { color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400', text: '废止' };
      default:
        return { color: 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400', text: '未知' };
    }
  };

  // 获取类型对应的图标
  const getTypeIcon = () => {
    if (!standard) return '';
    
    switch (standard.type) {
      case 'national':
        return 'fa-landmark';
      case 'local':
        return 'fa-building';
      case 'association':
        return 'fa-users';
      case 'industry':
        return 'fa-industry';
      case 'enterprise':
        return 'fa-building-circle-check';
      default:
        return 'fa-file-lines';
    }
  };

  const statusInfo = getStatusInfo();

  const handleBack = () => {
    navigate(-1);
  };

  const handleShare = () => {
    toast.info('分享功能开发中...');
  };

  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-600 dark:text-slate-400">加载标准信息中...</p>
      </div>
    );
  }

  if (!standard) {
    return null;
  }

  // 处理下载功能
  const handleDownload = () => {
    // 创建要下载的文本内容
    const content = `
# ${standard.title}
标准编号: ${standard.number}
标准类型: ${standard.typeName}
标准状态: ${statusInfo.text}
发布部门: ${standard.department}
发布日期: ${standard.publishDate}
实施日期: ${standard.implementDate}
分类: ${standard.category} / ${standard.subCategory}

## 摘要
${standard.summary}

## 标准内容
${standard.content}

## 备注
本文件由体育标准查询系统生成
下载时间: ${new Date().toLocaleString()}
    `.trim();
    
    // 创建Blob对象
    const blob = new Blob([content], { type: 'application/pdf;charset=utf-8' });
    
    // 创建下载链接
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${standard.number}_${standard.title}.pdf`;
    
    // 触发下载
    document.body.appendChild(a);
    a.click();
    
    // 清理
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast.success('标准PDF文件已开始下载');
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* 返回按钮 */}
      <button
        onClick={handleBack}
        className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors self-start"
      >
        <i className="fa-solid fa-arrow-left"></i>
        <span>返回</span>
      </button>

      {/* 标准详情 */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-4 sm:p-6 border border-slate-100 dark:border-slate-700">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2 sm:mb-3">
              <i className={`fa-solid ${getTypeIcon()} text-blue-500 dark:text-blue-400`}></i>
              <span className="text-sm text-slate-500 dark:text-slate-400">{standard.typeName}</span>
            </div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 sm:mb-3">{standard.title}</h1>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm">
              <span className="font-medium text-blue-600 dark:text-blue-400 text-base sm:text-lg">{standard.number}</span>
              <span className="text-slate-500 dark:text-slate-400">{standard.category} / {standard.subCategory}</span>
              <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusInfo.color}`}>
                {statusInfo.text}
              </span>
            </div>
          </div>
          
          <div className="flex gap-2 sm:gap-3">
            <button
              onClick={handleShare}
              className="p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 transition-colors"
              aria-label="分享"
            >
              <i className="fa-solid fa-share-nodes"></i>
            </button>
            <button
              onClick={handlePrint}
              className="p-2 rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600 transition-colors"
              aria-label="打印"
            >
              <i className="fa-solid fa-print"></i>
            </button>
            <button
              onClick={handleDownload}
              className="p-2 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-800/50 transition-colors"
              aria-label="下载"
            >
              <i className="fa-solid fa-download"></i>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="space-y-3 sm:space-y-4">
            <div>
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">发布部门</h3>
              <p className="font-medium text-sm sm:text-base">{standard.department}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">发布日期</h3>
              <p className="font-medium">{standard.publishDate}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">实施日期</h3>
              <p className="font-medium">{standard.implementDate}</p>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400 mb-1">摘要</h3>
            <p className="bg-slate-50 dark:bg-slate-900 p-3 sm:p-4 rounded-lg border border-slate-100 dark:border-slate-700 text-sm">
              {standard.summary}
            </p>
          </div>
        </div>

        <div className="mb-4 sm:mb-6">
          <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 pb-2 border-b border-slate-200 dark:border-slate-700">标准内容</h2>
          <div className="prose dark:prose-invert max-w-none text-sm sm:text-base">
            <p className="whitespace-pre-line">{standard.content}</p>
            {/* 这里可以根据实际需求展示更多标准内容 */}
            {standard.status === '废止' && (
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800/30 rounded-lg p-3 sm:p-4 mt-4">
                <h4 className="text-red-700 dark:text-red-400 font-medium flex items-center gap-2 text-sm">
                  <i className="fa-solid fa-triangle-exclamation"></i>
                  特别提示
                </h4>
                <p className="text-red-600 dark:text-red-300 mt-2 text-sm">
                  该标准已废止，相关内容仅供参考，请使用最新标准。
                </p>
              </div>
            )}
            {standard.status === 'revised' && (
              <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30 rounded-lg p-3 sm:p-4 mt-4">
                <h4 className="text-amber-700 dark:text-amber-400 font-medium flex items-center gap-2 text-sm">
                  <i className="fa-solid fa-circle-info"></i>
                  提示
                </h4>
                <p className="text-amber-600 dark:text-amber-300 mt-2 text-sm">
                  该标准已有修订版，建议查阅最新版本以获取准确信息。
                </p>
              </div>
            )}
           </div>
        </div>
      </div>

      {/* 相关标准推荐 */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 sm:p-6 border border-slate-100 dark:border-slate-700 mb-4">
        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">相关标准推荐</h2>
        <div className="space-y-2 sm:space-y-3">
          {Array(3).fill(0).map((_, index) => {
            // 根据当前标准类型生成相关标准推荐
            const getRelatedStandard = () => {
              // 提取当前标准的类别
              const category = standard.category;
              const subCategory = standard.subCategory;
              
              // 基于当前类别生成相关标准
              switch(category) {
                case '场地':
                  return ['合成材料跑道技术要求', '田径场设施规范', '体育场地安全标准'];
                case '材料':
                  return ['运动场地表面材料通用要求', '弹性地面材料检测方法', '环保型体育场地材料技术要求'];
                case '设施':
                  return ['体育场馆安全设施规范', '运动场地配套设施要求', '体育场馆无障碍设计标准'];
                case '器材':
                  return ['体育器材安全通用要求', '健身器材分类与命名', '竞赛器材检验规则'];
                default:
                  return ['体育场所开放条件与技术要求', '体育设施管理与维护规范', '体育场所等级划分与评定'];
              }
            };
            
            const relatedStandards = getRelatedStandard();
            const relatedTitle = relatedStandards[index];
            
            // 根据推荐内容生成对应的标准编号
            const relatedNumber = `${standard.number.substring(0, standard.number.indexOf('-'))}-${parseInt(standard.number.substring(standard.number.indexOf('-') + 1)) + index + 1}`;
            
            return (
              <div key={index} className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer">
                <i className="fa-solid fa-file-lines text-blue-500"></i>
                <div className="flex-1">
                  <h3 className="font-medium text-slate-800 dark:text-slate-200 text-sm">{relatedTitle}</h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{relatedNumber}</p>
                </div>
                <i className="fa-solid fa-chevron-right text-slate-400 text-xs"></i>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}