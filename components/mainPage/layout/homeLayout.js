'use client'

import { useSpring, animated } from '@react-spring/web'
import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
import axios from 'axios';
//custom apps
import ShaderBlock from "@/components/mainPage/component/shaderBackground";
import PagePort from "@/components/mainPage/component/pageport";
import Name from "@/components/mainPage/component/name";
import MainLayout from './mainLayout/mainLayout';
import BlogLayout from './blogLayout/blogLayout';
import ContactLayout from './contactLayout/contactLayout';
import AboutLayout from './aboutLayout/aboutLayout';
import Footer from '../component/footer';

export default function HomeLayout() {
  // this is to decide whether we should close the surrounding columns
  const [ifFold, setIfFold] = useState(false);
  // this one is to determine whether use two columns in the design projects area
  const [if2, setIf2] = useState(true);
  const pathname = usePathname()
  const [timeUp, setTimeup] = useState(false);

  const jumpAnimationHomepage = useSpring({
    minHeight: pathname.includes("!") ? pathname.includes("home") ? "21.875vh" : "6.25vh" : timeUp ? pathname.includes("home") ? "21.875vh" : "6.25vh" : "100vh"
  });

  const jumpAnimationTitle = useSpring({
    gap: pathname.includes("!") ? pathname.includes("home") ? "10vh" : "1.5625vh" : timeUp ? pathname.includes("home") ? "10vh" : "1.5625vh" : "25vh",
    flexDirection: pathname.includes("home") ? 'column' : 'row',
    alignItems: pathname.includes('home') ? 'flex-start' : ifFold ? 'flex-start' : 'center',
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
            justifyContent: 'flex-end',
            display: 'flex',
            ...jumpAnimationTitle
          }}>
          <Name isSubpage={true} />
          <PagePort isSubpage={true} />
        </animated.div>
      </animated.div>
      {
        pathname.includes("home") ? <MainLayout ifFold={ifFold} if2={if2} /> : null
      }
      {
        pathname.includes("blog") ? <BlogLayout ifFold={ifFold} /> : null
      }
      {
        pathname.includes("about") ? <AboutLayout ifFold={ifFold} /> : null
      }
      {
        pathname.includes("contacts") ? <ContactLayout /> : null
      }
      <Footer />
      <div className="background" style={{ position: "absolute", left: 0, top: 0, zIndex: -1 }}>
        {
          pathname.includes("home") ? <ShaderBlock /> : null
        }
      </div>
    </div>
  );
}
