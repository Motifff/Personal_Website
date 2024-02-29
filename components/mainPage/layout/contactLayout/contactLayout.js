export default function ContactLayout(props) {

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "70vh",
            background: "#18191B",
            gap: 24
        }}>
            <div style={{ color: '#D4D5D9', fontSize: 48, fontWeight: '500', lineHeight: "130%", wordWrap: 'break-word' }}>
                ;-)
            </div>
            <div style={{ color: '#D4D5D9', fontSize: 48, fontWeight: '400', lineHeight: "130%", wordWrap: 'break-word' }}>
                Oops!
            </div>
            <div style={{ color: '#D4D5D9', fontSize: 48, fontWeight: '400', lineHeight: "130%", wordWrap: 'break-word' }}>
                Working on it!
            </div>
        </div>
    )
}