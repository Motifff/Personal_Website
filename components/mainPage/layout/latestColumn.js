import Divider from "../component/divider"

export default function LatestColumn(props) {
    return (
        <div style={{display: "flex",flexDirection:"column",padding:"16px",gap:"16px"}}>
            <Divider text="Latest"/>
        </div>
    )
}