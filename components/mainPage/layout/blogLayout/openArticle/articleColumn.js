import ArticleTitle from "../../../component/articleTitle"
import HeadLineBlock from "../../../component/headLineBlock"
import LinkJumper from "../../../component/linkJumper"
import ParaBlock from "../../../component/paraBlock"
import QuoteBlock from "../../../component/quoteBlock"

export default function ArticleColumn(props) {
    return (
        <div style={{ display: "flex", flex: "1 0 0", padding: "16px", flexDirection: "column", alignSelf: "stretch", gap: "16px" }}>
            <ArticleTitle 
                title="Detective Rhetoric" 
                subtitle="An interactive robot for awakening caution of expression conducted by chatbots"
                cotegories="HCI | UX" 
                locations="Hangzhou" 
                date="02 FEB 24" />
            <HeadLineBlock/>
            <ParaBlock 
                text="Internationally renowned media artist Refik Anadol's groundbreaking approach to AI-based immersive data narratives takes the audience on a mesmerizing journey of light, movement, and color in Machine Hallucinations: The Sphere at The Sphere. The artwork presents a series of AI Data Sculptures that incorporates vivid pigments, shapes, and patterns, aiming to create a collective, meditative, and multisensory experience. This immersive experience simulates the rhythms of various environments and invites the visitors to imagine alternative realities constructed by invisible data movements around them." 
                credits="John Wick"
            />
            <HeadLineBlock/>
            <QuoteBlock text="SALT is grateful to Google's Artists and Machine Intelligence program, and Doğuş Technology, ŠKODA, Volkswagen Doğuş Finansman for supporting Archive Dreaming."/>
            <HeadLineBlock/>
            <HeadLineBlock/>
            <LinkJumper link="https://www.google.com" text="Full Design File"/>
        </div>
    )
}