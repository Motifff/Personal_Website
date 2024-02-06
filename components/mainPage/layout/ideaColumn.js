import Divider from "../component/divider"

export default function IdeaColumn(props) {
    return (
        <div style={{display: "flex",flexDirection:"column",padding:"16px",gap:"16px"}}>
            <Divider text="Memo & Idea"/>
        </div>
    )
}