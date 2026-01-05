import ExpBlock from "../../component/experienceBlock"
import LinkJumper from "../../component/linkJumper"
import { useLanguage } from "@/context/LanguageContext";

import view from "@/components/src/view.jpg"
import selfie from "@/components/src/selfie.jpg"

export default function AboutLayout(props) {
    const { language } = useLanguage();
    const text = {
        en: {
            aboutMe: "About Me",
            tags: ["#Full-stack Designer", "#Creative Coder", "#Constantly Dreamer"],
            experience: "Experience",
            takenFrom: "Taken From : Arthur's Seats, Edinburgh, Scotland",
            expItems: [
                { role: "HCI | UX Engineer/Designer", loc: "Hangzhou, CN", time: "22 JAN 01" },
                { role: "Aliyun | Creative Designer", loc: "Hangzhou, CN", time: "Jan 13 - NOW" },
                { role: "Aliyun | User Experience Design Intern", loc: "Hangzhou, CN", time: "JUL 25 - SEP 8" },
                { role: "University College London | MArch. DfPI", loc: "London, UK", time: "SEP 23 - JAN 25" },
                { role: "Aliyun | User Experience Design Intern", loc: "Hangzhou, CN", time: "JUN 23 - SEP 23" },
                { role: "Harman Intl. | UIUX Design Intern", loc: "Shenzhen, CN", time: "DEC 22 - MAR 23" },
                { role: "China Academy of Art | BEng. Industrial Design", loc: "Hangzhou, CN", time: "SEP 19 - JUL 23" }
            ]
        },
        zh: {
            aboutMe: "关于我",
            tags: ["#全栈设计师", "#创意编程", "#持续梦想家"],
            experience: "经历",
            takenFrom: "拍摄于 : 亚瑟王座，爱丁堡，苏格兰",
            expItems: [
                { role: "HCI | UX 工程师/设计师", loc: "杭州, 中国", time: "22 JAN 01" },
                { role: "阿里云 | 创意设计师", loc: "杭州, 中国", time: "Jan 13 - NOW" },
                { role: "阿里云 | 用户体验设计实习生", loc: "杭州, 中国", time: "JUL 25 - SEP 8" },
                { role: "伦敦大学学院 | MArch. DfPI", loc: "伦敦, 英国", time: "SEP 23 - JAN 25" },
                { role: "阿里云 | 用户体验设计实习生", loc: "杭州, 中国", time: "JUN 23 - SEP 23" },
                { role: "哈曼国际 | UIUX 设计实习生", loc: "深圳, 中国", time: "DEC 22 - MAR 23" },
                { role: "中国美术学院 | BEng. 工业设计", loc: "杭州, 中国", time: "SEP 19 - JUL 23" }
            ]
        }
    };
    const t = text[language] || text.en;

    return (
        <div
            className="PageRestriction"
            style={{
                display: "flex",
                width: "100%",
                padding: "16px 13.33vw 64px 13.33vw",
                flexDirection: "column",
                alignItems: "flex-start",
                gap: "32px",
                background: "#18191B"
            }}
        >
            <div
                className="Heading"
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    alignSelf: "stretch",
                    columnGap: "16px",
                    rowGap: "16px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        width: "50vw",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        alignSelf: "stretch"
                    }}>
                    <div className="Title" style={{ color: '#D4D5D9', fontSize: 48, fontWeight: '500', lineHeight: "130%", wordWrap: 'break-word', borderTop: "1px solid #636467" }}>
                        {t.aboutMe}
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column"
                        }}
                    >
                        {t.tags.map((tag, i) => (
                            <div key={i} className="SubTitle" style={{ width: "256px", color: '#5D5D5D', fontSize: 12, fontWeight: '500', lineHeight: "130%", wordWrap: 'break-word' }}>
                                {tag}
                            </div>
                        ))}
                    </div>
                </div>
                <div
                    className="imageHolder"
                    style={{
                        width: !props.if2 ? "73.33vw" : "20vw",
                        height: !props.if2 ? "73.33vw" : "20vw",
                        backgroundImage: `url(${selfie.src})`,
                        backgroundSize: "cover",
                        borderRadius: "8px",
                        boxShadow: "0px 0px 4px 2px rgba(0, 0, 0, 0.25)"
                    }}
                />
                
            </div>
            {t.expItems.length > 0 && <ExpBlock fold={props.ifFold} roleText={t.expItems[0].role} locationText={t.expItems[0].loc} timeText={t.expItems[0].time} />}
            <div className="Words" style={{ alignSelf: "stretch", paddingTop: "2px", height: "26px", color: '#D4D5D9', borderTop: "1px solid #636467", fontSize: 20, fontWeight: '500', letterSpacing: "-0.2px" }}>
                {t.experience}
            </div>
            {t.expItems.slice(1).map((exp, i) => (
                <ExpBlock key={i} fold={props.ifFold} roleText={exp.role} locationText={exp.loc} timeText={exp.time} />
            ))}
            <LinkJumper text="Linkedin Page" link="https://www.linkedin.com/in/justin-yuting-chen" />
            <div style={{width:"100%", gap:"8px",justifyContent:"center",display:"flex",flexDirection:"column"}}>
                <div
                    className="imageHolder"
                    style={{
                        width: "100%",
                        height: "40vh",
                        backgroundImage: `url(${view.src})`,
                        backgroundPosition: "center center",
                        backgroundSize: "cover",
                        borderRadius: "8px",
                        boxShadow: "0px 0px 4px 2px rgba(0, 0, 0, 0.25)"
                    }}
                />
                <div style={{ display: "flex", padding: "8px 32px", justifyContent:"center", gap: "16px", alignSelf: "strench" }}>
                    <div style={{ textAlign:"center","color": "#D9D9D9", "fontSize": 12, "fontWeight": 300, lineHeight:"130%", letterSpacing: "-0.12px" }}>
                        {t.takenFrom}
                    </div>
                </div>
            </div>
        </div>
    )
}