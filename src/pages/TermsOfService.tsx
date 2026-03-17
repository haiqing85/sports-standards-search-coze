import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { siteInfo } from '@/config/siteConfig';

export default function TermsOfService() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 模拟加载延迟
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => {
    navigate(-1);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-500 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-600 dark:text-slate-400">加载使用条款中...</p>
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

      {/* 使用条款内容 */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6 md:p-8 border border-slate-100 dark:border-slate-700">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 pb-3 border-b border-slate-200 dark:border-slate-700">使用条款</h1>
        
        <div className="space-y-6 text-slate-700 dark:text-slate-300">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              发布日期：2026年3月17日 | 生效日期：2026年3月17日
            </p>
            <p>
              欢迎使用{siteInfo.name}（以下简称"本网站"）。本使用条款（以下简称"本条款"）构成您与我们之间关于使用本网站的法律协议。请仔细阅读本条款，因为它们会影响您的法律权利和义务。
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">一、接受条款</h2>
            <p className="pl-4">
              访问或使用本网站，即表示您同意遵守本条款。如果您不同意本条款的任何部分，您不得访问或使用本网站。我们保留随时修改、暂停或终止本网站及其任何部分的权利，恕不另行通知。
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">二、网站使用</h2>
            
            <h3 className="text-lg font-medium mb-2">1. 允许的使用</h3>
            <p className="mb-4 pl-4">
              您可以出于个人、非商业目的访问和使用本网站，以查询和获取体育行业标准信息。
            </p>

            <h3 className="text-lg font-medium mb-2">2. 禁止的行为</h3>
            <p className="mb-4 pl-4">
              在使用本网站时，您不得：
            </p>
            <ul className="list-disc pl-10 mb-4 space-y-2">
              <li>以任何非法目的或违反任何适用法律使用本网站</li>
              <li>侵犯本网站的知识产权或其他权利</li>
              <li>干扰或破坏本网站的正常运行或安全</li>
              <li>上传、发布或传播任何非法、侵权、淫秽、骚扰或其他不当内容</li>
              <li>尝试未经授权访问本网站的任何部分或功能</li>
              <li>使用任何自动化手段（如爬虫、机器人）访问或收集本网站的内容</li>
              <li>复制、修改、分发、出售或出租本网站的任何部分或内容</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">三、知识产权</h2>
            <p className="mb-4 pl-4">
              本网站及其所有内容，包括但不限于文本、图形、图像、音频、视频、标志、徽标、按钮图标、软件和数据（以下简称"内容"），均受版权、商标和其他知识产权法律的保护。这些内容的所有权归我们或我们的许可方所有。
            </p>
            <p className="pl-4">
              未经我们或相关权利持有人的明确书面许可，您不得复制、修改、分发、出售、出租、传播或以其他方式利用本网站的任何内容。
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">四、第三方链接</h2>
            <p className="pl-4">
              本网站可能包含指向第三方网站或资源的链接。我们不对这些第三方网站或资源的内容、准确性、可靠性、合法性或任何其他方面负责。访问这些链接由您自行承担风险，我们鼓励您在访问前查看这些第三方网站的使用条款和隐私政策。
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">五、免责声明</h2>
            <p className="mb-4 pl-4">
              本网站提供的信息仅供参考，不构成任何形式的保证或承诺。我们尽最大努力确保信息的准确性和完整性，但不对信息的准确性、及时性、完整性或适用性做出任何明示或暗示的保证。
            </p>
            <p className="pl-4">
              在任何情况下，我们不对因使用或无法使用本网站或其内容而导致的任何直接、间接、偶然、特殊或后果性损害承担责任，包括但不限于利润损失、数据丢失或业务中断。
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">六、用户内容</h2>
            <p className="mb-4 pl-4">
              如果您向本网站提交任何内容（如评论、反馈或建议），您授予我们永久、不可撤销、全球、免版税和可转让的许可，以使用、复制、修改、改编、发布、翻译、分发和展示此类内容。
            </p>
            <p className="pl-4">
              您保证您提交的内容不违反任何法律或侵犯任何第三方的权利，并且您有提交该内容的所有必要权利。
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">七、终止</h2>
            <p className="pl-4">
              我们有权在任何时候，以任何理由，立即终止或暂停您对本网站的访问，恕不另行通知。终止后，您必须立即停止使用本网站，并销毁您拥有的任何本网站内容的副本。
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">八、适用法律</h2>
            <p className="pl-4">
              本条款的解释、效力及纠纷的解决，适用于中华人民共和国大陆地区法律。您同意因本条款产生的任何争议应提交至本网站运营方所在地有管辖权的人民法院诉讼解决。
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">九、完整协议</h2>
            <p className="pl-4">
              本条款构成您与我们之间关于使用本网站的完整协议，并取代所有先前或同期的口头或书面通信和建议。如果本条款的任何部分被认定为无效或不可执行，其余部分仍应保持完全有效。
            </p>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3">十、联系我们</h2>
            <p className="pl-4">
              如果您对本使用条款有任何问题或疑虑，请通过以下方式联系我们：
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