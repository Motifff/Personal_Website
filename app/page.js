"use client"

//custom apps
import ShaderBlock from "@/components/mainPage/component/shaderBackground";
import PagePort from "@/components/mainPage/component/pageport";
import Name from "@/components/mainPage/component/name";
import LanguageSwitcher from "@/components/mainPage/component/languageSwitcher";

export default function Home() {

  return (
    <div className="Homepage"
      style={{
        position: "absolute",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100vh",
        padding: 24,
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        gap: 24,
        display: 'inline-flex'
      }}>
      <div className="title"
        style={{
          flexDirection: 'column',
          justifyContent: 'flex-end',
          alignItems: 'flex-start',
          gap: "25vh",
          display: 'flex'
        }}>
        <Name isSubpage={false} />
        <div style={{display: 'flex', alignItems: 'center', gap: 16}}>
          <PagePort isSubpage={false} />
          <LanguageSwitcher />
        </div>
      </div>
      <div className="background" style={{ position: "absolute", left: 0, top: 0, zIndex: -1, }}>
        <ShaderBlock />
      </div>
    </div>
  );
}
