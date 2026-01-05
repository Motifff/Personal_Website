import Divider from "../../component/divider"
import InfoBlock from "../../component/infoBlock"
import { useLanguage } from "@/context/LanguageContext";

export default function LatestColumn(props) {
    const { language } = useLanguage();
    const text = {
        en: {
            divider: "Latest",
            subtitle: "Personal Project Progress",
            title: "Add new features to the Information Architecture"
        },
        zh: {
            divider: "最新动态",
            subtitle: "个人项目进展",
            title: "增加信息架构的新特性"
        }
    };
    const t = text[language] || text.en;

    return (
        <div style={{ width: props.ifFold?null:"224px", display: "flex", flexDirection: "column", padding: "16px", gap: "16px" }}>
            <Divider text={t.divider} />
            <InfoBlock
                subtitle={t.subtitle}
                title={t.title}
                time="2024/10/2"
            />
        </div>
    )
}