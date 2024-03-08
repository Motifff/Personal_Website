export default function Footer(props) {
    const numberOfStripes = 20; // Adjust as needed
    const stripeHeight = 22; // Set the desired height for each stripe
  
    const stripes = Array.from({ length: numberOfStripes }, (_, index) => (
      <div
        key={index}
        style={{
          height: index % 2 === 0 ? stripeHeight - index : index,
          backgroundColor: index % 2 === 0 ? "#18191B" : "#D4D5D9",
        }}
      />
    ));

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    alignSelf: "stretch",
                    height: "20vh",
                    backgroundColor: "#18191B",
                    justifyContent: "flex-end",
                    alignItems: "flex-end",
                    paddingRight: "24px"
                }}
            >
                <div style={{width:"fit-content",color:"#ADB3AB", fontSize:"12px", fontWeight:"200", lineHeight:"130%", letterSpacing:"-0.12px"}}>
                    Build from scratch @2024
                </div>
            </div>
            {stripes}
            <div
                style={{
                    height: "64px",
                    backgroundColor: "#D4D5D9",
                }}
            >
            </div>
        </div>
    )
}
