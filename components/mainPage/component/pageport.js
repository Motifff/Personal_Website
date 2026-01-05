import { useRouter, usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

export default function PagePort(props){
    const router = useRouter();
    const pathname = usePathname()
    const { language } = useLanguage();

    const menuItems = {
        en: { home: "Home", blog: "Blog", about: "About", contacts: "Contacts" },
        zh: { home: "主页", blog: "博客", about: "关于", contacts: "联系" }
    };
    
    const handleButtonClick = (n) => {
        const currentPath = pathname;
        if(!currentPath.includes(n)){
            if(!props.isSubpage){
                router.push(`/${n}`);
            }else{
                router.replace(`/${"!"+n}`)
            }
        }else{
            if(currentPath.includes("blog")){
                router.replace(`/${"!"+"blog"}`)
            }
        }
    }
    
    return (
        <div className="tab" style={{ minHeight: 20, gap: 16, display: 'flex', flexDirection: 'row', flexWrap: "wrap", alignItems: "center" }}>
            <div className="Home" onClick={() => handleButtonClick("home")} style={{ color: '#D4D5D9', fontSize: 14, fontWeight: '500', height: 20, cursor: 'pointer' }}>
                {menuItems[language].home}
            </div>
            <div style={{ opacity: 0.40, color: '#D4D5D9', fontSize: 14, fontWeight: '400', height: 20 }}>/</div>
            <div className="Blog" onClick={() => handleButtonClick("blog")} style={{ color: '#D4D5D9', fontSize: 14, fontWeight: '500', height: 20, cursor: 'pointer' }}>
                {menuItems[language].blog}
            </div>
            <div style={{ opacity: 0.40, color: '#D4D5D9', fontSize: 14, fontWeight: '400', height: 20 }}>/</div>
            <div className="About" onClick={() => handleButtonClick("about")} style={{ color: '#D4D5D9', fontSize: 14, fontWeight: '500', height: 20, cursor: 'pointer' }}>
                {menuItems[language].about}
            </div>
            <div style={{ opacity: 0.40, color: '#D4D5D9', fontSize: 14, fontWeight: '400', height: 20 }}>/</div>
            <div className="Contacts" onClick={() => handleButtonClick("contacts")} style={{ color: '#D4D5D9', fontSize: 14, fontWeight: '500', height: 20, cursor: 'pointer' }}>
                {menuItems[language].contacts}
            </div>
        </div>
    )
}