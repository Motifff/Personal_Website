import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useLanguage } from '@/context/LanguageContext';

export default function LanguageSwitcher() {
    const { language, toggleLanguage } = useLanguage();
    const pathname = usePathname();
    const [hasZhVersion, setHasZhVersion] = useState(true);

    useEffect(() => {
        let cancelled = false;

        const checkZhAvailability = async () => {
            const pathSegments = (pathname || '').split('/').filter(Boolean);
            const isBlogArticle =
                pathSegments.length >= 2 &&
                (pathSegments[0] === 'blog' || pathSegments[0] === '!blog');

            if (!isBlogArticle) {
                if (!cancelled) setHasZhVersion(true);
                return;
            }

            const articleId = pathSegments[1];
            if (!articleId) {
                if (!cancelled) setHasZhVersion(true);
                return;
            }

            try {
                const response = await fetch(`/${articleId}/data_zh.json`, { cache: 'no-store' });
                if (!cancelled) setHasZhVersion(response.ok);
            } catch (e) {
                if (!cancelled) setHasZhVersion(false);
            }
        };

        checkZhAvailability();
        return () => {
            cancelled = true;
        };
    }, [pathname]);

    useEffect(() => {
        if (!hasZhVersion && language === 'zh') {
            toggleLanguage('en');
        }
    }, [hasZhVersion, language, toggleLanguage]);

    if (!hasZhVersion) {
        return null;
    }

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
