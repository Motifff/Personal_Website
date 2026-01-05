import { useLanguage } from "@/context/LanguageContext";

export default function ContactLayout(props) {
    const { language } = useLanguage();
    const text = {
        en: {
            msg1: ";-)",
            msg2: "Oops!",
            msg3: "Working on it!"
        },
        zh: {
            msg1: ";-)",
            msg2: "哎呀!",
            msg3: "正在开发中!"
        }
    };
    const t = text[language] || text.en;

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "70vh",
            background: "#18191B",
            gap: 24
        }}>
            <div style={{ color: '#D4D5D9', fontSize: 48, fontWeight: '500', lineHeight: "130%", wordWrap: 'break-word' }}>
                {t.msg1}
            </div>
            <div style={{ color: '#D4D5D9', fontSize: 48, fontWeight: '400', lineHeight: "130%", wordWrap: 'break-word' }}>
                {t.msg2}
            </div>
            <div style={{ color: '#D4D5D9', fontSize: 48, fontWeight: '400', lineHeight: "130%", wordWrap: 'break-word' }}>
                {t.msg3}
            </div>
        </div>
    )
}