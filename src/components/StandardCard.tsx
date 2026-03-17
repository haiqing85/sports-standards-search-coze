import { Link } from 'react-router-dom';
import { Standard } from '@/mocks/standards';

interface StandardCardProps {
  standard: Standard;
}

export default function StandardCard({ standard }: StandardCardProps) {
  // 获取状态对应的颜色和文本
  const getStatusInfo = () => {
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

  return (
    <Link
      to={`/standards/${standard.id}`}
      className="block group bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-100 dark:border-slate-700"
    >
      <div className="p-4 sm:p-5">
        <div className="flex justify-between items-start mb-2 sm:mb-3">
          <div className="flex items-center gap-2">
            <i className={`fa-solid ${getTypeIcon()} text-blue-500 dark:text-blue-400`}></i>
            <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">{standard.typeName}</span>
          </div>
          <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusInfo.color}`}>
            {statusInfo.text}
          </span>
        </div>

        <h3 className="text-base sm:text-lg font-bold mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {standard.title}
        </h3>

        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-500 dark:text-slate-400 mb-2 sm:mb-3">
          <span className="font-medium text-blue-600 dark:text-blue-400">{standard.number}</span>
          <span className="text-slate-300 dark:text-slate-600">|</span>
          <span>{standard.category} / {standard.subCategory}</span>
        </div>

        <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm line-clamp-2 mb-3 sm:mb-4">
          {standard.summary}
        </p>

        <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
          <div>
            <span>发布: {standard.publishDate}</span>
          </div>
          <div>
            <span>实施: {standard.implementDate}</span>
          </div>
        </div>
        
        {standard.isHot && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400">
              <i className="fa-solid fa-fire-flame-simple mr-1 text-red-500 dark:text-red-400"></i>
              热门
            </span>
          </div>
        )}
      </div>
    </Link>
  );
}