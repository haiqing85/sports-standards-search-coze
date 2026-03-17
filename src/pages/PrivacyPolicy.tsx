import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { siteInfo } from '@/config/siteConfig';

export default function PrivacyPolicy() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 模拟加载延迟
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);
  
  // 添加错误处理 - 如果URL路径有问题，确保能正确显示页面
  useEffect(() => {
    const checkUrlPath = () => {
      // 确保在GitHub Pages环境中也能正确加载
      if (window.location.pathname.includes('404.html')) {
        // 如果检测到404页面，尝试重写路径
        const path = new URLSearchParams(window.location.search).get('path') || '/privacy';
        window.history.replaceState(null, '', path);
      }
    };
    
    // 立即检查
    checkUrlPath();
    
    // 监听popstate事件，处理浏览器后退/前进操作
    window.addEventListener('popstate', checkUrlPath);
    
    return () => {
      window.removeEventListener('popstate', checkUrlPath);
    };
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-600 dark:text-slate-400">加载隐私政策中...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* 返回按钮 */}
      <button
        onClick={handleBack}
        className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors self-start"
      >
        <i className="fa-solid fa-arrow-left"></i>
        <span>返回</span>
      </button>

      {/* 隐私政策内容 */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 md:p-8 border border-slate-100 dark:border-slate-700">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 pb-3 border-b border-slate-200 dark:border-slate-700">隐私政策</h1>
        
        <div className="space-y-6 text-slate-700 dark:text-slate-300">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              发布日期：2026年3月17日 | 生效日期：2026年3月17日
            </p>
            <p>
              {siteInfo.name}（以下简称"我们"）非常重视用户隐私保护，并会尽全力保护您的个人信息安全可靠。本隐私政策旨在向您说明我们如何收集、使用、存储和分享您的个人信息，以及您可以行使的权利。
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">一、我们收集的信息</h2>
            
            <h3 className="text-lg font-medium mb-2">1. 自动收集的信息</h3>
            <p className="mb-4 pl-4">
              当您访问我们的网站时，我们可能会自动收集某些信息，包括但不限于：
            </p>
            <ul className="list-disc pl-10 mb-4 space-y-2">
              <li>您的IP地址和浏览器类型</li>
              <li>访问日期和时间</li>
              <li>您浏览的页面和点击的链接</li>
              <li>设备信息（如设备型号、操作系统）</li>
            </ul>

            <h3 className="text-lg font-medium mb-2">2. 您主动提供的信息</h3>
            <p className="mb-4 pl-4">
              当您与我们互动时，您可能会主动向我们提供信息，例如：
            </p>
            <ul className="list-disc pl-10 mb-4 space-y-2">
              <li>当您联系我们时提供的联系信息（如姓名、电子邮件地址、电话号码）</li>
              <li>您反馈的意见和建议</li>
              <li>您查询和使用的标准信息记录</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">二、我们如何使用您的信息</h2>
            <p className="mb-4 pl-4">
              我们使用收集的信息来：
            </p>
            <ul className="list-disc pl-10 mb-4 space-y-2">
              <li>提供、维护和改进我们的网站和服务</li>
              <li>处理您的查询和请求</li>
              <li>发送与您的账户或服务相关的通知</li>
              <li>分析网站使用情况，以便我们改进用户体验</li>
              <li>确保网站的安全性和完整性</li>
              <li>遵守适用法律和法规的要求</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">三、Cookie的使用</h2>
            <p className="mb-4 pl-4">
              我们使用Cookie来增强您的网站体验。Cookie是一种小型文本文件，当您访问网站时存储在您的设备上。我们使用Cookie来：
            </p>
            <ul className="list-disc pl-10 mb-4 space-y-2">
              <li>记住您的偏好设置</li>
              <li>分析网站流量和使用模式</li>
              <li>改善网站性能</li>
            </ul>
            <p className="pl-4">
              大多数网络浏览器默认接受Cookie，但您通常可以修改浏览器设置以拒绝Cookie。请注意，如果您选择拒绝Cookie，您可能无法使用网站的所有功能。
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">四、信息共享与披露</h2>
            <p className="mb-4 pl-4">
              我们尊重您的隐私，不会在未经您明确同意的情况下出售、出租或交易您的个人信息。我们可能会在以下情况下共享您的信息：
            </p>
            <ul className="list-disc pl-10 mb-4 space-y-2">
              <li>获得您的明确同意后</li>
              <li>遵守适用法律、法规或法律程序的要求</li>
              <li>保护和捍卫我们的权利、财产或安全，或用户的权利、财产或安全</li>
              <li>与我们的服务提供商共享，这些提供商必须按照我们的指示处理信息并保持保密</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">五、信息安全</h2>
            <p className="pl-4">
              我们采取合理的技术和组织措施来保护您的个人信息免受未经授权的访问、使用、披露、更改或销毁。然而，请注意，互联网传输并非完全安全，我们无法保证您通过互联网传输的任何信息的安全性。
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">六、您的权利</h2>
            <p className="mb-4 pl-4">
              根据适用的数据保护法律，您可能享有以下权利：
            </p>
            <ul className="list-disc pl-10 mb-4 space-y-2">
              <li>访问您的个人信息的权利</li>
              <li>更正不准确个人信息的权利</li>
              <li>删除您的个人信息的权利（在特定情况下）</li>
              <li>限制处理您的个人信息的权利（在特定情况下）</li>
              <li>数据可携权（在特定情况下）</li>
              <li>反对处理您的个人信息的权利（在特定情况下）</li>
            </ul>
            <p className="pl-4">
              如果您想行使这些权利，请通过本政策底部提供的联系方式与我们联系。
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">七、儿童隐私</h2>
            <p className="pl-4">
              我们的网站不面向16岁以下的儿童，我们不会故意收集16岁以下儿童的个人信息。如果我们发现我们在未获得可证实的父母同意的情况下收集了16岁以下儿童的个人信息，我们将尽快删除相关信息。
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">八、隐私政策的更新</h2>
            <p className="pl-4">
              我们可能会不时更新本隐私政策。当我们进行重大更改时，我们将通过在网站上发布新的隐私政策并更新"发布日期"来通知您。我们鼓励您定期查看本隐私政策，以了解我们如何保护您的信息。
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">九、联系我们</h2>
            <p className="pl-4">
              如果您对本隐私政策有任何问题或疑虑，请通过以下方式联系我们：
            </p>
            <ul className="list-none pl-10 mt-2 space-y-2">
               <li className="flex items-center gap-2">
                <i className="fa-solid fa-envelope text-blue-500"></i>
                <span>harris@aohuasports.com</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fa-solid fa-map-marker-alt text-blue-500 mt-1"></i>
                <span>山东省济南市春暄路3777号</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}