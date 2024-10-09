import arrow from "@/components/src/Vector.svg"

export default function LinkJumper(props) {

    return (
        <a href={props.link} target="_blank" rel="noopener noreferrer" style={{alignSelf: "stretch"}}>
            <div
                style={{
                    alignSelf: "stretch",
                    display: "flex",
                    padding: "8px 0px",
                    alignItems: "flex-start",
                    gap: "16px",
                    borderTop: "1px solid #636467",
                }}
            >
                <div 
                    style={{
                        display: "flex",
                        padding: "2px 0px",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "10px",
                    }}    
                >
                    <div className="Texts" style={{color: "#FFF",fontSize: "12px",fontWeight: 300,lineHeight: "130%",letterSpacing: "-0.12px"}}>
                        {props.text}
                    </div>
                    <div className="Vector" style={{ width: 12, height: 12, opacity: 0.80, backgroundImage: `url(${arrow.src})`, backgroundSize: "cover" }}></div>
                </div>
            </div>
        </a>
    )
}