export default function Divider(props) {
    return (
        <div className="Words" style={{width:"fit-content",paddingTop:"2px",height: "26px", color: '#D4D5D9',borderTop: "1px solid #636467", fontSize: 20, fontWeight: '500', letterSpacing: "-0.2px" }}>
            {props.text}
        </div>
    )
}