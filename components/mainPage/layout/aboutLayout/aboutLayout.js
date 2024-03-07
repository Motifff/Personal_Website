import view from "@/components/src/view.jpg"
import selfie from "@/components/src/selfie.jpg"

import ExpBlock from "../../component/experienceBlock"
import LinkJumper from "../../component/linkJumper"

export default function AboutLayout(props) {

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
                        About Me
                    </div>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column"
                        }}
                    >
                        <div className="SubTitle" style={{ width: "256px", color: '#5D5D5D', fontSize: 12, fontWeight: '500', lineHeight: "130%", wordWrap: 'break-word' }}>
                            #Full-stack Designer
                        </div>
                        <div className="SubTitle" style={{ width: "256px", color: '#5D5D5D', fontSize: 12, fontWeight: '500', lineHeight: "130%", wordWrap: 'break-word' }}>
                            #Creative Coder
                        </div>
                        <div className="SubTitle" style={{ width: "256px", color: '#5D5D5D', fontSize: 12, fontWeight: '500', lineHeight: "130%", wordWrap: 'break-word' }}>
                            #Constantly Dreamer
                        </div>
                    </div>
                </div>
                <div
                    className="imageHolder"
                    style={{
                        width: "20vw",
                        height: "20vw",
                        backgroundImage: `url(${selfie.src})`,
                        backgroundSize: "cover",
                        borderRadius: "8px",
                        boxShadow: "0px 0px 4px 2px rgba(0, 0, 0, 0.25)"
                    }}
                />
            </div>
            <ExpBlock fold={props.ifFold} roleText="HCI | UX Engineer/Designer" locationText="London, UK" timeText="22 JAN 01" />
            <div className="Words" style={{ alignSelf: "stretch", paddingTop: "2px", height: "26px", color: '#D4D5D9', borderTop: "1px solid #636467", fontSize: 20, fontWeight: '500', letterSpacing: "-0.2px" }}>
                Experience
            </div>
            <ExpBlock fold={props.ifFold} roleText="University College London | MArch. DfPI" locationText="London, UK" timeText="JAN 25 - SEP 23" />
            <ExpBlock fold={props.ifFold} roleText="Aliyun | User Experience Design Intern" locationText="Hangzhou, CN" timeText="JUN 23 - SEP 23" />
            <ExpBlock fold={props.ifFold} roleText="Harman Intl. | UIUX Design Intern" locationText="Shenzhen, CN" timeText="DEC 22 - MAR 23" />
            <ExpBlock fold={props.ifFold} roleText="China Academy of Art | BEng. Industrial Design" locationText="Hangzhou, CN" timeText="SEP 19 - JUL 23" />
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
                        Taken From : Arthur&apos;s Seats, Edinburgh, Scotland
                    </div>
                </div>
            </div>
        </div>
    )
}