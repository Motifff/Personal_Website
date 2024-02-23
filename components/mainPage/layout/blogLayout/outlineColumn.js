import Divider from "../../component/divider"
import JumpTag from "../../component/jumpTag"

export default function OutlineColumn(props) {
    return (
        <div style={{display: "flex",flexDirection:"column",width:props.ifFold?null:"256px",padding:"16px",gap:"16px"}}>
            <Divider text="Outline"/>
            <JumpTag text="Personal Project Progress"/>
        </div>
    )
}