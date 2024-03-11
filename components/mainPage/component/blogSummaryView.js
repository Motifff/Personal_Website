import { useRouter } from 'next/navigation';

// Description: This component is used to display the summary of the blog.
export default function BlogSummaryView(props) {
    const router = useRouter();

    const handleOnClick = () => {
        //window.location.href = `/blog/${props.link}`;
        window.location.href = "/Personal_Website/blog/"+props.link;// this modefiy is for github pages
        router.push(`/blog/${props.link}`);
    }

    return (
        <a
            onClick={handleOnClick}
            style={{
                display: 'flex',
                flexDirection: props.ifFold ? 'column' : "row",
                height: props.ifFold ? "60vh" : "33.3vh",
                alignItems: 'flex-start',
                gap: '3.33vw',
                alignSelf: 'stretch',
            }}
        >
            <div
                className="Image"
                style={{
                    width: props.ifFold ? "100%" : "35vw",
                    height: "100%",
                    backgroundImage: `url(${props.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center center",
                }} />
            <div className="Wrap" style={{ width: props.ifFold ? "100%" : "35vw", height: props.ifFold ? "20vh" : "100%", display: "flex", flexDirection: 'column', justifyContent: "space-between", alignSelf: "strench", gap: 16 }}>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                    alignItems: "flex-start"
                }}>
                    <div className="Title" style={{ color: '#D4D5D9', fontSize: 36, fontWeight: '500', lineHeight: "130%", wordWrap: 'break-word', borderTop: "1px solid #636467" }}>{props.title}</div>
                    <div className="SubTitle" style={{ width: "33.3vh", color: '#5D5D5D', fontSize: 12, fontWeight: '500', lineHeight: "130%", wordWrap: 'break-word' }}>{props.subtitle}</div>
                </div>
                <div className="Datas" style={{ display: "flex", flexWrap: "wrap", "justifyContent": "space-between", "alignItems": "flex-end" }}>
                    <div style={{ "display": "flex", "flexDirection": "column", "justifyContent": "flex-start", "alignItems": "flex-start", "gap": "4px" }}>
                        <div style={{ "color": "#D4D5D9", "fontSize": 16, "fontStyle": "normal", "fontWeight": "500", "lineHeight": "130%", "letterSpacing": "-0.16px" }}>{props.cotegories}</div>
                        <div style={{ "color": "#5D5D5D", "fontSize": 10, "fontStyle": "normal", "fontWeight": "500", "lineHeight": "130%", "letterSpacing": "-0.1px" }}>COTEGORIES</div>
                    </div>
                    <div style={{ "display": "flex", "flexDirection": "row", "justifyContent": "flex-end", "alignItems": "flex-end", "gap": "24px" }}>
                        <div style={{ "display": "flex", "flexDirection": "column", "justifyContent": "flex-end", "alignItems": "flex-end", "gap": "4px" }}>
                            <div style={{ "color": "#D4D5D9", "fontSize": 16, "fontStyle": "normal", "fontWeight": "500", "lineHeight": "130%", "letterSpacing": "-0.16px" }}>{props.locations}</div>
                            <div style={{ "color": "#5D5D5D", "fontSize": 10, "fontStyle": "normal", "fontWeight": "500", "lineHeight": "130%", "letterSpacing": "-0.1px" }}>LOCATIONS</div>
                        </div>
                        <div style={{ "display": "flex", "flexDirection": "column", "justifyContent": "flex-end", "alignItems": "flex-end", "gap": "4px" }}>
                            <div style={{ "color": "#D4D5D9", "fontSize": 16, "fontStyle": "normal", "fontWeight": "500", "lineHeight": "130%", "letterSpacing": "-0.16px" }}>{props.date}</div>
                            <div style={{ "color": "#5D5D5D", "fontSize": 10, "fontStyle": "normal", "fontWeight": "500", "lineHeight": "130%", "letterSpacing": "-0.1px" }}>DATE</div>
                        </div>
                    </div>
                </div>
            </div>
        </a>
    )
}