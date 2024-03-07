import ArticleTitle from "./articleTitle";
import DefaultImage from "/public/view.jpg";


export default function BlogSummaryView(props) {
    return (
        <div style={{
            display: 'flex',
            height: '25vh',
            alignItems: 'flex-start',
            gap: '16px',
            alignSelf: 'stretch',
        }}>
            <Image src={DefaultImage} alt="Picture of the author" width={"0.35vw"} height={"100%"} />
            <ArticleTitle title={props.title} subtitle={props.subtitle} cotegories={props.cotegories} locations={props.locations} date={props.date}/>
        </div>
    )
}