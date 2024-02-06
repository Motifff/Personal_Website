"use client"

import ShaderBlock from "@/components/mainPage/component/shaderBackground";
import PagePort from "@/components/mainPage/component/pageport";
import { useSpring, animated } from '@react-spring/web'
import { useState, useEffect } from "react";
import { useRouter, usePathname } from 'next/navigation';
//custom apps
import Name from "@/components/mainPage/component/name";
import MainColumn from "@/components/mainPage/layout/mainColumn";
import LatestColumn from "@/components/mainPage/layout/latestColumn";
import IdeaColumn from "@/components/mainPage/layout/ideaColumn";


export default function Home() {
  const pathname = usePathname()
  const [timeUp, setTimeup] = useState(false);

  const jumpAnimationHomepage = useSpring({
    height: pathname.includes("!") ? "21.875vh" : timeUp ? "21.875vh" : "100vh"
  });

  const jumpAnimationTitle = useSpring({
    gap: pathname.includes("!") ? "10vh" : timeUp ? "10vh" : "25vh"
  });

  useEffect(() => {
    // Set showContent to false after 3000 milliseconds (3 seconds)
    const timer = setTimeout(() => {
      setTimeup(true);
    }, 300);

    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      <animated.div className="Homepage"
        style={{
          width: "100vw",
          padding: 24,
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          gap: 24,
          display: 'inline-flex',
          ...jumpAnimationHomepage
        }}>
        <animated.div className="title"
          style={{
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
            display: 'flex',
            ...jumpAnimationTitle
          }}>
          <Name isSubpage={true} />
          <PagePort isSubpage={true} />
        </animated.div>
      </animated.div>
      <div className="mainContent" style={{display:"flex",flexDirection:"row",backgroundColor:"#18191B"}}>
          <LatestColumn/>
          <MainColumn/>
          <IdeaColumn/>
      </div>
      <div className="background" style={{ position: "absolute", left: 0, top: 0, zIndex: -1 }}>
        <ShaderBlock />
      </div>
    </div>
  );
}
