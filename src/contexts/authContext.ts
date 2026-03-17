import React from 'react';
import { createContext } from "react";

// 保留此上下文以确保兼容性，但在当前项目中暂时不使用
export const AuthContext = createContext({
  isAuthenticated: false,
  setIsAuthenticated: (value: boolean) => {},
  logout: () => {},
});