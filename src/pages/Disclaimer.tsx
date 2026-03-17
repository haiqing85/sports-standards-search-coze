import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { siteInfo } from '@/config/siteConfig';

export default function Disclaimer() {
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
        const path = new URLSearchParams(window.location.search).get('path') || '/disclaimer';
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
        <p className="text-slate-600 dark:text-slate-400">加载免责声明中...</p>
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

      {/* 免责声明内容 */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 md:p-8 border border-slate-100 dark:border-slate-700">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 pb-3 border-b border-slate-200 dark:border-slate-700">免责声明</h1>
        
        <div className="space-y-6 text-slate-700 dark:text-slate-300">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              发布日期：2026年3月17日 | 生效日期：2026年3月17日
            </p>
            <p>
              感谢您访问{siteInfo.name}（以下简称"本网站"）。在使用本网站之前，请您仔细阅读并理解本免责声明。访问或使用本网站，即表示您同意受本免责声明的约束。
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">一、信息准确性</h2>
            <p className="pl-4">
              本网站提供的体育行业标准信息仅供参考，我们已尽最大努力确保信息的准确性和及时性，但不对信息的完整性、准确性、可靠性、适用性或可用性做出任何明示或暗示的保证。由于标准可能会被修订或更新，我们建议您在使用相关标准时，通过官方渠道获取最新版本的标准文件，以确保您使用的是最新和最准确的信息。
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">二、使用风险</h2>
            <p className="pl-4">
              您使用本网站提供的任何信息或数据的风险由您自行承担。在任何情况下，本网站及其运营方、管理人员、员工或代理人不对因使用或依赖本网站提供的信息而导致的任何直接、间接、偶然、特殊或后果性损害（包括但不限于利润损失、数据丢失、业务中断或其他有形或无形损失）承担责任，无论该损害是基于保证、合同、侵权行为（包括过失）或任何其他法律理论，即使我们已被告知可能发生此类损害。
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">三、第三方内容</h2>
            <p className="pl-4">
              本网站可能包含来自第三方的信息、链接或内容。我们不对这些第三方内容的准确性、完整性、及时性或合法性负责。提供这些链接或引用不构成我们对第三方内容的认可或推荐。访问或使用第三方内容的风险由您自行承担，我们建议您在访问第三方网站前查看其使用条款和隐私政策。
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">四、网站可用性</h2>
            <p className="pl-4">
              我们努力确保本网站的正常运行和可用性，但不对本网站的连续性、安全性或无错误做出保证。我们有权在任何时候，以任何理由，暂时或永久修改、中断或终止本网站的全部或部分功能，恕不另行通知。我们不对因本网站的修改、中断或终止而导致的任何损失或损害承担责任。
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">五、法律合规</h2>
            <p className="pl-4">
              本网站的使用应符合中华人民共和国法律法规的规定。用户在使用本网站过程中必须遵守相关法律法规，不得利用本网站从事任何违法或不当活动。对于用户因违反法律法规或本免责声明而导致的任何后果，本网站不承担任何责任。
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">六、知识产权</h2>
            <p className="pl-4">
              本网站包含的所有内容（包括但不限于文字、图片、音频、视频、图表、标志、标识等）的知识产权归我们或相关权利人所有。未经我们或相关权利人的书面许可，任何人不得以任何形式复制、转载、传播、修改或使用本网站的任何内容，否则将依法追究其法律责任。
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">七、免责声明的修改</h2>
            <p className="pl-4">
              我们有权随时修改本免责声明，而无需事先通知。修改后的免责声明将在本网站上公布，您继续使用本网站即表示您接受修改后的免责声明。我们建议您定期查看本免责声明，以了解任何修改。
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">八、管辖法律</h2>
            <p className="pl-4">
              本免责声明的解释、效力及纠纷的解决，适用中华人民共和国大陆地区法律。如就本免责声明发生任何争议，双方应友好协商解决；协商不成的，任何一方均有权将争议提交至本网站运营方所在地有管辖权的人民法院诉讼解决。
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">九、联系我们</h2>
            <p className="pl-4">
              如果您对本免责声明有任何疑问或建议，请通过以下方式联系我们：
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