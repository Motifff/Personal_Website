import MainColumn from "./mainColumn";

export default function MainLayout(props) {
    const blueZoneHeight = props.ifFold ? "74vh" : "78.125vh";

    return (
        <div className="mainContent" style={{ display: "flex", flexDirection: "column", backgroundColor: "#18191B", height: blueZoneHeight }}>
            <MainColumn ifFold={props.ifFold} ifDouble={props.if2} />
        </div>
    )
}
