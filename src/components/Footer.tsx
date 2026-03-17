import { Link } from 'react-router-dom';
// 导入网站配置
import { siteInfo, contactInfo, legalLinks } from '@/config/siteConfig';

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-6 sm:py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 flex items-center gap-2">
              <i className={`fa-solid ${siteInfo.logoIcon}`}></i>
              {siteInfo.name}
            </h3>
            <p className="text-slate-300 text-sm sm:text-base mb-4">
              {siteInfo.description}
            </p>
          </div>
          
          <div className="md:ml-auto md:text-left">
            <h3 className="text-base sm:text-lg font-bold mb-3 md:mb-3">联系我们</h3>
            <ul className="space-y-2 text-slate-300 text-sm">
              <li className="flex items-start gap-2">
                <i className="fa-solid fa-envelope mt-1"></i>
                <span>{contactInfo.email}</span>
              </li>
              <li className="flex items-start gap-2">
                <i className="fa-solid fa-map-marker-alt mt-1"></i>
                <span className="whitespace-normal">{contactInfo.address}</span>
              </li>
            </ul>
          </div>
        </div>
        
         <div className="border-t border-slate-700 mt-6 pt-4 sm:mt-8 sm:pt-6">
        <p className="text-slate-400 text-xs sm:text-sm text-center">
          © {siteInfo.year} {siteInfo.name} 版权所有
        </p>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 mt-3">
          {legalLinks.map((link, index) => (
            <a 
              key={index} 
              href={link.url} 
              className="text-slate-400 hover:text-white text-xs sm:text-sm transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      </div>

      </div>
    </footer>
  );
}