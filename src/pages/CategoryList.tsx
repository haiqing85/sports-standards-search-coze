import React from 'react';
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStandard } from '@/contexts/standardContext';
import StandardCard from '@/components/StandardCard';
import { Empty } from '@/components/Empty';
import { categories, subCategories } from '@/mocks/standards';

export default function CategoryList() {
  const { category } = useParams();
  const navigate = useNavigate();
  const { getStandardsByCategory } = useStandard();
  const [subCategory, setSubCategory] = useState<string>('');
  const [standards, setStandards] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryInfo, setCategoryInfo] = useState<any>(null);

  useEffect(() => {
    if (category) {
      // 查找分类信息
      const foundCategory = categories.find(c => c.id === category);
      setCategoryInfo(foundCategory);
      
      // 加载标准数据
      setIsLoading(true);
      setTimeout(() => {
        const results = getStandardsByCategory(category, subCategory || undefined);
        setStandards(results);
        setIsLoading(false);
      }, 300);
    }
  }, [category, subCategory, getStandardsByCategory]);

  const handleSubCategoryChange = (newSubCategory: string) => {
    setSubCategory(newSubCategory);
  };

  const handleBack = () => {
    if (subCategory) {
      setSubCategory('');
    } else {
      navigate('/standards');
    }
  };

  if (!category) {
    return null;
  }

  const currentSubCategories = (subCategories as any)[category] || [];

  return (
    <div className="space-y-6">
      {/* 返回按钮和分类标题 */}
      <div>
        <button
          onClick={handleBack}
          className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors mb-4"
        >
          <i className="fa-solid fa-arrow-left"></i>
          <span>{subCategory ? '返回子分类' : '返回标准查询'}</span>
        </button>
        
        <div className="flex items-center gap-3 mb-6">
          {categoryInfo && (
            <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <i className={`fa-solid ${categoryInfo.icon} text-xl`}></i>
            </div>
          )}
          <h1 className="text-2xl md:text-3xl font-bold">
            {subCategory ? `${subCategory}` : `${categoryInfo?.name || category}标准`}
          </h1>
        </div>
      </div>

      {/* 子分类筛选（如果有子分类） */}
      {currentSubCategories.length > 0 && !subCategory && (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 border border-slate-100 dark:border-slate-700">
          <h2 className="text-lg font-semibold mb-3">选择子分类</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {currentSubCategories.map((sub: string) => (
              <button
                key={sub}
                onClick={() => handleSubCategoryChange(sub)}
                className="p-4 rounded-lg bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors text-center"
              >
                <h3 className="font-medium">{sub}</h3>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 标准列表 */}
      {isLoading ? (
        // 加载中状态
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-5 border border-slate-100 dark:border-slate-700 animate-pulse">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-3"></div>
              <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-3"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-3"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full mb-3"></div>
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full mb-3"></div>
              <div className="flex justify-between">
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
                <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : standards.length > 0 ? (
        // 标准列表
        <div className="grid grid-cols-1 gap-4">
          {standards.map((standard) => (
            <StandardCard key={standard.id} standard={standard} />
          ))}
        </div>
      ) : (
        // 无结果状态
        <Empty />
      )}


    </div>
  );
}