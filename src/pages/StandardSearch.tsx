import { useState, useEffect } from 'react';
import SearchBar from '@/components/SearchBar';
import StandardCard from '@/components/StandardCard';
import CategoryFilter from '@/components/CategoryFilter';
import { useStandard, StandardFilter } from '@/contexts/standardContext';
import { Empty } from '@/components/Empty';

export default function StandardSearch() {
  const { searchStandards } = useStandard();
  const [keyword, setKeyword] = useState('');
  const [filters, setFilters] = useState<StandardFilter>({});
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // 执行搜索
  const performSearch = () => {
    setIsLoading(true);
    // 模拟搜索延迟
    setTimeout(() => {
      const results = searchStandards(keyword, filters);
      setSearchResults(results);
      setIsLoading(false);
    }, 300);
  };

  // 当关键词或筛选条件变化时执行搜索
  useEffect(() => {
    performSearch();
  }, [keyword, filters]);

  // 处理搜索输入
  const handleSearch = (newKeyword: string) => {
    setKeyword(newKeyword);
  };

  // 处理筛选条件变化
  const handleFilterChange = (newFilters: StandardFilter) => {
    setFilters(newFilters);
  };

  // 处理热门标签点击
  const handleTagClick = (tag: string) => {
    setKeyword(tag);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* 搜索栏 */}
      <div className="text-center mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
          体育行业标准查询
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-4 sm:mb-6 text-sm sm:text-base">
          提供全面的体育建设标准查询服务，包括国家标准、地方标准、团标、行业标准和企业标准
        </p>
        <SearchBar onSearch={handleSearch} />
        
        {/* 热门搜索标签 */}
        <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-2">
          {['合成材料', '人造草坪', '灯光照明', '运动地板', '健身路径'].map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className="px-3 py-1 text-xs sm:text-sm rounded-full bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
        {/* 筛选条件 */}
        <div className="md:col-span-1">
          <CategoryFilter onFilterChange={handleFilterChange} />
        </div>

        {/* 搜索结果 */}
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-3 sm:mb-4">
            <h2 className="text-lg sm:text-xl font-bold">
              {keyword ? `搜索结果: "${keyword}"` : '标准列表'}
            </h2>
            <span className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              共找到 {searchResults.length} 条标准
            </span>
          </div>

          {isLoading ? (
            // 加载中状态
            <div className="space-y-3 sm:space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 sm:p-5 border border-slate-100 dark:border-slate-700 animate-pulse">
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-2 sm:mb-3"></div>
                  <div className="h-5 sm:h-6 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2 sm:mb-3"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-2 sm:mb-3"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full mb-2 sm:mb-3"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full mb-2 sm:mb-3"></div>
                  <div className="flex justify-between">
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
                    <div className="h-3 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : searchResults.length > 0 ? (
            // 搜索结果列表
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              {searchResults.map((standard) => (
                <StandardCard key={standard.id} standard={standard} />
              ))}
            </div>
          ) : (
            // 无结果状态
            <Empty />
          )}
        </div>
      </div>
    </div>
  );
}