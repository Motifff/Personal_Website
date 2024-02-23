import Divider from "../../component/divider"
import JumpTag from "../../component/jumpTag"

export default function QuoteColumn(props) {
    return (
        <div style={{display: "flex",flexDirection:"column",width:props.ifFold?null:"384px",padding:"16px",gap:"16px"}}>
            <Divider text="Quote"/>
            <JumpTag text="Personal Project Progress"/>
        </div>
    )
}