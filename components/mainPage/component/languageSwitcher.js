import { useLanguage } from '@/context/LanguageContext';

export default function LanguageSwitcher() {
    const { language, toggleLanguage } = useLanguage();
    return (
        <div style={{ display: 'flex', gap: 4, fontSize: 14, color: '#D4D5D9', cursor: 'pointer' }}>
            <span 
                onClick={() => toggleLanguage('zh')} 
                style={{ fontWeight: language === 'zh' ? 'bold' : 'normal', opacity: language === 'zh' ? 1 : 0.6 }}
            >
                ZH
            </span>
            <span>/</span>
            <span 
                onClick={() => toggleLanguage('en')} 
                style={{ fontWeight: language === 'en' ? 'bold' : 'normal', opacity: language === 'en' ? 1 : 0.6 }}
            >
                EN
            </span>
        </div>
    );
}
