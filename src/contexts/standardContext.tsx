import { createContext, useContext, useState, useEffect } from 'react';
import { standards } from '@/mocks/standards';

// 定义标准过滤条件接口
export interface StandardFilter {
  category?: string;
  subCategory?: string;
  type?: string;
  status?: string;
}

// 定义上下文接口
interface StandardContextType {
  searchStandards: (keyword: string, filters: StandardFilter) => any[];
  getStandardsByCategory: (category: string, subCategory?: string) => any[];
  getStandardById: (id: string) => any | undefined;
}

// 创建上下文
const StandardContext = createContext<StandardContextType>({
  searchStandards: () => [],
  getStandardsByCategory: () => [],
  getStandardById: () => undefined
});

// 标准提供者组件
export const StandardProvider = ({ children }: { children: React.ReactNode }) => {
  // 从localStorage加载数据，如果没有则使用默认数据
  const [standardsData, setStandardsData] = useState<any[]>(() => {
    const savedStandards = localStorage.getItem('standards');
    return savedStandards ? JSON.parse(savedStandards) : standards;
  });

  // 保存数据到localStorage
  useEffect(() => {
    localStorage.setItem('standards', JSON.stringify(standardsData));
  }, [standardsData]);

  // 搜索标准
  const searchStandards = (keyword: string, filters: StandardFilter) => {
    return standardsData.filter(standard => {
      // 关键词搜索
      const matchesKeyword = !keyword || 
        standard.title.includes(keyword) || 
        standard.number.includes(keyword) || 
        standard.summary.includes(keyword) ||
        standard.content.includes(keyword);

      // 分类筛选
      const matchesCategory = !filters.category || standard.category === filters.category;
      
      // 子分类筛选
      const matchesSubCategory = !filters.subCategory || standard.subCategory === filters.subCategory;
      
      // 类型筛选
      const matchesType = !filters.type || standard.type === filters.type;
      
      // 状态筛选
      const matchesStatus = !filters.status || standard.status === filters.status;

      return matchesKeyword && matchesCategory && matchesSubCategory && matchesType && matchesStatus;
    });
  };

  // 根据分类获取标准
  const getStandardsByCategory = (category: string, subCategory?: string) => {
    return standardsData.filter(standard => {
      if (subCategory) {
        return standard.category === category && standard.subCategory === subCategory;
      }
      return standard.category === category;
    });
  };

  // 根据ID获取标准
  const getStandardById = (id: string) => {
    return standardsData.find(standard => standard.id === id);
  };

  // 提供上下文值
  const contextValue: StandardContextType = {
    searchStandards,
    getStandardsByCategory,
    getStandardById
  };

  return (
    <StandardContext.Provider value={contextValue}>
      {children}
    </StandardContext.Provider>
  );
};

// 自定义hook，用于在组件中使用上下文
export const useStandard = () => {
  const context = useContext(StandardContext);
  if (!context) {
    throw new Error('useStandard must be used within a StandardProvider');
  }
  return context;
};