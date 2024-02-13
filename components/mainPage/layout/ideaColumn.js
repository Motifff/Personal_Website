import Divider from "../component/divider"
import MemoBlock from "../component/memoBlock"

export default function IdeaColumn(props) {
    return (
        <div style={{display: "flex",flexDirection:"column",width:props.ifFold?null:"384px",padding:"16px",gap:"16px"}}>
            <Divider text="Memo & Idea"/>
            <MemoBlock 
                subtitle="Ideas" 
                title="Can the learning rate of a neural network in 3D space be visualized by a ball?" 
                time="1mo ago"
            />
        </div>
    )
}