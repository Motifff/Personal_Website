import Divider from "../../component/divider"
import MemoBlock from "../../component/memoBlock"
import { useLanguage } from "@/context/LanguageContext";

export default function IdeaColumn(props) {
    const { language } = useLanguage();
    const text = {
        en: {
            divider: "Memo & Idea",
            subtitle: "Ideas",
            title: "Can the learning rate of a neural network in 3D space be visualized by a ball?"
        },
        zh: {
            divider: "备忘与想法",
            subtitle: "想法",
            title: "三维空间中神经网络的学习率可以用球体可视化吗？"
        }
    };
    const t = text[language] || text.en;

    return (
        <div style={{display: "flex",flexDirection:"column",width:props.ifFold?null:"384px",padding:"16px",gap:"16px"}}>
            <Divider text={t.divider}/>
            <MemoBlock 
                subtitle={t.subtitle} 
                title={t.title} 
                time="2023/10/10"
            />
        </div>
    )
}