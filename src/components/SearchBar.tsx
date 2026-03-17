import React from 'react';
import { useState } from 'react';

interface SearchBarProps {
  onSearch: (keyword: string) => void;
  placeholder?: string;
}

export default function SearchBar({ onSearch, placeholder = '搜索标准名称、编号或关键词...' }: SearchBarProps) {
  const [keyword, setKeyword] = useState('');

  const handleSearch = () => {
    onSearch(keyword.trim());
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="relative max-w-3xl mx-auto w-full">
      <div className="flex">
        <input
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={placeholder}
          className="flex-1 py-3 px-4 pl-12 rounded-l-lg border border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <button
          onClick={handleSearch}
          className="bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-medium py-3 px-6 rounded-r-lg transition-all flex items-center gap-2"
        >
          <i className="fa-solid fa-search"></i>
          <span>搜索</span>
        </button>
      </div>
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <i className="fa-solid fa-search text-slate-400"></i>
      </div>
    </div>
  );
}