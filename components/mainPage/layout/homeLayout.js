'use client'

import { useSpring, animated } from '@react-spring/web'
import { useState, useEffect} from "react";
import { usePathname, useParams } from 'next/navigation';

//custom apps
import ShaderBlock from "@/components/mainPage/component/shaderBackground";
import PagePort from "@/components/mainPage/component/pageport";
import Name from "@/components/mainPage/component/name";
import LanguageSwitcher from "@/components/mainPage/component/languageSwitcher";
import MainLayout from './mainLayout/mainLayout';
import BlogLayout from './blogLayout/blogLayout';
import ContactLayout from './contactLayout/contactLayout';
import AboutLayout from './aboutLayout/aboutLayout';
import Footer from '../component/footer';

// BlogLayout is kept for article detail rendering under /home/{link}

export default function HomeLayout() {
  // this is to decide whether we should close the surrounding columns
  const [ifFold, setIfFold] = useState(false);
  // this one is to determine whether use two columns in the design projects area
  const [if2, setIf2] = useState(false);
  const pathname = usePathname()
  const pageParams = useParams()
  const articleId = pageParams?.id
  const [timeUp, setTimeup] = useState(false);
  const isHomeLanding = pathname.includes("home") && !articleId;

  const jumpAnimationHomepage = useSpring({
    minHeight: pathname.includes("!") ? isHomeLanding ? "21.875vh" : "6.25vh" : timeUp ? isHomeLanding ? "21.875vh" : "6.25vh" : "100vh",
  });

  const jumpAnimationTitle = useSpring({
    gap: pathname.includes("!") ? isHomeLanding ? "10vh" : "16px" : timeUp ? isHomeLanding ? "10vh" : "16px" : "25vh",
    flexDirection: isHomeLanding ? 'column' : 'row',
    alignItems: isHomeLanding ? 'flex-start' : 'center',
  });

  const resizeSet = (windowSize) => {
    if (windowSize > 224 + 384 + 236 * 2 + 16 * 3) {
      setIfFold(false);
      setIf2(true);
    } else if (windowSize > 520) {
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
    // Clean up the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    resizeSet(window.innerWidth);

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
          position: isHomeLanding ? 'relative' : 'sticky',
          top: 0,
          zIndex: 100,
          backgroundColor: 'transparent',
          backdropFilter: 'none',
          overflow: 'hidden',
          ...jumpAnimationHomepage
        }}>
        {!isHomeLanding ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              zIndex: -1,
              overflow: "hidden",
              pointerEvents: "none",
            }}
          >
            {pathname.includes("home") ? (
              <ShaderBlock />
            ) : (
              <div style={{ width: "100%", height: "100%", backgroundColor: "#18191B" }} />
            )}
          </div>
        ) : null}
        <animated.div className="title"
          style={{
            justifyContent: 'flex-end',
            display: 'flex',
            width: '100%',
            ...jumpAnimationTitle
          }}>
          {(!pathname.includes("home") && ifFold) ? null : <Name isSubpage={true} />}
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            columnGap: 16, 
            rowGap: 8, 
            alignItems: 'center', 
            justifyContent: 'space-between',
            flex: 1,
            width: isHomeLanding ? '100%' : 'auto' 
          }}>
            <PagePort isSubpage={true} />
            <LanguageSwitcher />
          </div>
        </animated.div>
      </animated.div>
      {
        pathname.includes("home") && !articleId ? <MainLayout ifFold={ifFold} if2={if2} /> : null
      }
      {
        pathname.includes("home") && articleId ? <BlogLayout ifFold={ifFold} /> : null
      }
      {
        pathname.includes("about") ? <AboutLayout ifFold={ifFold} if2={if2}/> : null
      }
      {
        pathname.includes("contacts") ? <ContactLayout /> : null
      }
      <Footer />
      <div className="background" style={{ position: "absolute", left: 0, top: 0, zIndex: -1 }}>
        {
          pathname.includes("home") ? <ShaderBlock /> : <div style={{ width: "100vw", height: "100vh" , backgroundColor:"#000000"}}></div>
        }
      </div>
    </div>
  );
}
