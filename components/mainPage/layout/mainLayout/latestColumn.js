import Divider from "../../component/divider"
import InfoBlock from "../../component/infoBlock"

export default function LatestColumn(props) {
    return (
        <div style={{ width: props.ifFold?null:"224px", display: "flex", flexDirection: "column", padding: "16px", gap: "16px" }}>
            <Divider text="Latest" />
            <InfoBlock
                subtitle="Personal Project Progress"
                title="Add new features to the Information Architecture"
                time="15min ago"
            />
        </div>
    )
}