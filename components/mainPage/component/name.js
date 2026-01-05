import { useSpring, animated } from '@react-spring/web'
import { useState, useEffect } from "react";
import { useRouter, usePathname } from 'next/navigation';

import arrow from "@/components/src/Vector.svg"


export default function Name(props) {
  const router = useRouter();
  const pathname = usePathname()

  const [timeUp, setTimeup] = useState(false);

  const currentPath = pathname;

  useEffect(() => {
    // Set showContent to false after 3000 milliseconds (3 seconds)
    const timer = setTimeout(() => {
      setTimeup(true);
    }, 300);

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  const sizeOfFont = useSpring({
    fontSize: currentPath.includes("!") ? "2.73vh" : !timeUp ? "12.5vh" : !props.isSubpage ? "12.5vh" : "2.73vh",
    letterSpacing: currentPath.includes("!") ? "-1.12px" : !timeUp ? "-3.84px" : !props.isSubpage ? "-3.84px" : "-1.12px"
  })

  const handleButtonClick = () => {
    router.push("https://motifff.github.io/Personal_Website/")
  }

  return (
    <div className="name" style={{ gap: 8, display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center' }}>
      <div style={{ gap: 8, display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', alignItems: 'center' }}>
        <animated.div className="YutingChen" onClick={handleButtonClick} style={{ display: 'flex', alignItems: 'center', color: '#D4D5D9', fontWeight: 500, lineHeight: 1, cursor: 'pointer', mixBlendMode: "plus-lighter", ...sizeOfFont }}>Yuting</animated.div>
        <animated.div className="YutingChen" onClick={handleButtonClick} style={{ display: 'flex', alignItems: 'center', color: '#D4D5D9', fontWeight: 500, lineHeight: 1, cursor: 'pointer', mixBlendMode: "plus-lighter", ...sizeOfFont }}>Chen</animated.div>
      </div>
      <div className="Vector" style={{ width: 12, height: 12, opacity: 0.80, backgroundImage: `url(${arrow.src})`, backgroundSize: "cover" }}></div>
    </div>
  )
}