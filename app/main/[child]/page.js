"use client"

import ShaderBlock from "@/components/mainPage/component/shaderBackground";
import PagePort from "@/components/mainPage/component/pageport";
import { useSpring, animated } from '@react-spring/web'
import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
//custom apps
import Name from "@/components/mainPage/component/name";
import MainColumn from "@/components/mainPage/layout/mainLayout/mainColumn";
import LatestColumn from "@/components/mainPage/layout/mainLayout/latestColumn";
import IdeaColumn from "@/components/mainPage/layout/mainLayout/ideaColumn";


export function generateStaticParams() {
  return [{ child: 'home' }, { child: 'home!' },
          { child: 'blog' }, { child: 'blog!' },
          { child: 'about!'},{ child: 'about!'},
          { child: 'contacts!'},{ child: 'contacts!'},
        ]
}

export default function Home() {
  const [ifFold, setIfFold] = useState(false);
  const [if2, setIf2] = useState(true);
  const pathname = usePathname()
  const [timeUp, setTimeup] = useState(false);

  const jumpAnimationHomepage = useSpring({
    minHeight: pathname.includes("!") ? "21.875vh" : timeUp ? "21.875vh" : "100vh"
  });

  const jumpAnimationTitle = useSpring({
    gap: pathname.includes("!") ? "10vh" : timeUp ? "10vh" : "25vh"
  });

  const resizeSet = (windowSize) => {
    if (windowSize > 224 + 384 + 236 * 2 + 16 * 3) {
      setIfFold(false);
      setIf2(true);
    } else if (windowSize > 236 * 2 + 16 * 3) {
      setIfFold(true);
      setIf2(true);
    } else {
      setIfFold(true);
      setIf2(false);
    }
  }

  useEffect(() => {
    // Set showContent to false after 3000 milliseconds (3 seconds)
    const timer = setTimeout(() => {
      setTimeup(true);
    }, 300);
    // Window Size Auto Detection
    resizeSet(window.innerWidth);
    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    function handleWindowResize() {
      resizeSet(window.innerWidth);
    }

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return (
    <div>
      <animated.div className="Homepage"
        style={{
          width: "100vw",
          padding: 24,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          gap: 24,
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
      <div className="mainContent" style={{ display: "flex", flexDirection: ifFold ? "column" : "row", backgroundColor: "#18191B" }}>
        {
          ifFold ?
            (<>
              <LatestColumn ifFold={ifFold} />
              <MainColumn ifFold={ifFold} ifDouble={if2} />
            </>
            )
            :
            (
              <>
                <LatestColumn ifFold={ifFold} />
                <MainColumn ifFold={ifFold} ifDouble={if2} />
                <IdeaColumn ifFold={ifFold} />
              </>
            )
        }
      </div>
      <div className="background" style={{ position: "absolute", left: 0, top: 0, zIndex: -1 }}>
        <ShaderBlock />
      </div>
    </div>
  );
}
