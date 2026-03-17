import { useState } from 'react';
import { categories, subCategories, standardTypes } from '@/mocks/standards';
import { StandardFilter } from '@/contexts/standardContext';

interface CategoryFilterProps {
  onFilterChange: (filters: StandardFilter) => void;
  currentFilters?: StandardFilter;
}

export default function CategoryFilter({ onFilterChange, currentFilters = {} }: CategoryFilterProps) {
  const [category, setCategory] = useState(currentFilters.category || '');
  const [subCategory, setSubCategory] = useState(currentFilters.subCategory || '');
  const [type, setType] = useState(currentFilters.type || '');
  const [status, setStatus] = useState(currentFilters.status || '');

  // 当选择大类时，重置子类
  const handleCategoryChange = (newCategory: string) => {
    setCategory(newCategory);
    setSubCategory('');
    onFilterChange({
      ...currentFilters,
      category: newCategory,
      subCategory: ''
    });
  };

  // 当选择子类时
  const handleSubCategoryChange = (newSubCategory: string) => {
    setSubCategory(newSubCategory);
    onFilterChange({
      ...currentFilters,
      subCategory: newSubCategory
    });
  };

  // 当选择标准类型时
  const handleTypeChange = (newType: string) => {
    setType(newType);
    onFilterChange({
      ...currentFilters,
      type: newType
    });
  };

  // 当选择状态时
  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    onFilterChange({
      ...currentFilters,
      status: newStatus
    });
  };

  // 重置所有筛选条件
  const handleReset = () => {
    setCategory('');
    setSubCategory('');
    setType('');
    setStatus('');
    onFilterChange({});
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 border border-slate-100 dark:border-slate-700 mb-4 sm:mb-6">
      <div className="flex flex-col space-y-3 sm:space-y-4">
        <div>
          <h3 className="text-base sm:text-lg font-semibold mb-2 sm:mb-3 flex items-center gap-2">
            <i className="fa-solid fa-filter text-blue-500"></i>
            筛选条件
          </h3>
        </div>
        
        {/* 大类筛选 */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            标准分类
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleCategoryChange('')}
              className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full transition-all ${
                category === ''
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
              }`}
            >
              全部
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full transition-all flex items-center gap-1 ${
                  category === cat.id
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
                }`}
              >
                <i className={`fa-solid ${cat.icon} text-xs`}></i>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 子类筛选 */}
        {category && (
          <div>
            <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              子分类
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleSubCategoryChange('')}
                className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full transition-all ${
                  subCategory === ''
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
                }`}
              >
                全部
              </button>
              {(subCategories as any)[category]?.map((sub: string) => (
                <button
                  key={sub}
                  onClick={() => handleSubCategoryChange(sub)}
                  className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full transition-all ${
                    subCategory === sub
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
                  }`}
                >
                  {sub}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 标准类型筛选 */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            标准类型
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleTypeChange('')}
              className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full transition-all ${
                type === ''
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
              }`}
            >
              全部
            </button>
            {standardTypes.map((stdType) => (
              <button
                key={stdType.id}
                onClick={() => handleTypeChange(stdType.id)}
                className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full transition-all flex items-center gap-1 ${
                  type === stdType.id
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
                }`}
              >
                <i className={`fa-solid ${stdType.icon} text-xs`}></i>
                <span>{stdType.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 状态筛选 */}
        <div>
          <label className="block text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            标准状态
          </label>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleStatusChange('')}
              className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full transition-all ${
                status === ''
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
              }`}
            >
              全部
            </button>
            <button
              onClick={() => handleStatusChange('active')}
              className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full transition-all ${
                status === 'active'
                  ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
              }`}
            >
              现行
            </button>
            <button
              onClick={() => handleStatusChange('revised')}
              className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full transition-all ${
                status === 'revised'
                  ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
              }`}
            >
              已修订
            </button>
            <button
              onClick={() => handleStatusChange('废止')}
              className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full transition-all ${
                status === '废止'
                  ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
              }`}
            >
              废止
            </button>
          </div>
        </div>

        {/* 重置按钮 */}
        <button
          onClick={handleReset}
          className="mt-1 sm:mt-2 px-3 sm:px-4 py-1.5 sm:py-2 border border-slate-300 dark:border-slate-600 rounded-lg text-xs sm:text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
        >
          重置筛选条件
        </button>
      </div>
    </div>
  );
}