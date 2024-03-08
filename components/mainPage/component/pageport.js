import { useRouter, usePathname } from 'next/navigation';

export default function PagePort(props){
    const router = useRouter();
    const pathname = usePathname()
    
    const handleButtonClick = (n) => {
        const currentPath = pathname;
        if(!currentPath.includes(n)){
            if(!props.isSubpage){
                router.push(n)
            }else{
                router.replace("!"+n)
            }
        }else{
            if(currentPath.includes("blog")){
                router.replace("!blog")
            }
        }
    }
    
    return (
        <div className="tab" style={{ minHeight: 20, gap: 16, display: 'flex', flexDirection: 'row',flexWrap:"wrap"}}>
            <div className="Home" onClick={() => handleButtonClick("home")} style={{ color: '#D4D5D9', fontSize: 14, fontWeight: '500', height: 20, cursor:'pointer' }}>Home</div>
            <div style={{ opacity: 0.40, color: '#D4D5D9', fontSize: 14, fontWeight: '400', height: 20 }}>/</div>
            <div className="Blog" onClick={() => handleButtonClick("blog")} style={{ color: '#D4D5D9', fontSize: 14, fontWeight: '500', height: 20, cursor:'pointer' }}>Blog</div>
            <div style={{ opacity: 0.40, color: '#D4D5D9', fontSize: 14, fontWeight: '400', height: 20 }}>/</div>
            <div className="About" onClick={() => handleButtonClick("about")} style={{ color: '#D4D5D9', fontSize: 14, fontWeight: '500', height: 20, cursor:'pointer' }}>About</div>
            <div style={{ opacity: 0.40, color: '#D4D5D9', fontSize: 14, fontWeight: '400', height: 20 }}>/</div>
            <div className="Contacts" onClick={() => handleButtonClick("contacts")} style={{ color: '#D4D5D9', fontSize: 14, fontWeight: '500', height: 20, cursor:'pointer' }}>Contacts</div>
        </div>
    )
}