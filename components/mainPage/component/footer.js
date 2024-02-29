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
                    height: "50px",
                    backgroundColor: "#18191B"
                }}
            ></div>
            {stripes}
            <div
                style={{
                    height: "64px",
                    backgroundColor: "#D4D5D9"
                }}
            ></div>
        </div>
    )
}
