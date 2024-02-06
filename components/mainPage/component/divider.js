

export default function Divider(props) {
    return (
        <div className="Divider" style={{display:"flex",flexDirection: 'column',gap: 2}}>
            <div className="Line" style={{ width: 147, height: 1, position: 'relative', opacity: 0.40, background: '#D4D5D9' }} />
            <div className="Words" style={{ height:"26px",color: '#D4D5D9', fontSize: 20, fontWeight: '500',letterSpacing: "-0.2px"}}>{props.text}</div>
        </div>
    )
}