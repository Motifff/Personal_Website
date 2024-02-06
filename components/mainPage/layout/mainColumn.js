import Divider from "../component/divider"

export default function MainColumn(props) {
    return (
        <div style={{display: "flex",flex:"1 0 0",flexDirection:"column",alignSelf:"stretch",padding:"16px",gap:"16px"}}>
            <Divider text="Headline"/>
            <Divider text="Design Projects"/>
        </div>
    )
}