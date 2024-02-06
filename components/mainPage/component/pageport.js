import { useRouter, usePathname } from 'next/navigation';

export default function PagePort(props){
    const router = useRouter();
    const pathname = usePathname()
    
    const handleButtonClick = (n) => {
        const currentPath = pathname;
        console.log(currentPath);
        console.log(props.isSubpage)
        if(!currentPath.includes(n)){
            if(!props.isSubpage){
                router.replace("/main"+n)
            }else{
                router.replace("/main"+n+"!")
            }
        }
    }

    function concatenateWithoutOverlap(str1, str2) {
        // Find the common part (if any)
        const commonPart = str2.startsWith(str1) ? str1 : "";
      
        // Remove the common part from str2
        const remainingPart = str2.replace(commonPart, "");
      
        // Concatenate the strings
        const result = str1 + remainingPart;
      
        return result;
    }
    
    return (
        <div className="tab" style={{ height: 20, gap: 16, display: 'flex', flexDirection: 'row'}}>
            <div className="Home" onClick={() => handleButtonClick("/home")} style={{ color: '#D4D5D9', fontSize: 14, fontWeight: '500', height: 20, cursor:'pointer' }}>Home</div>
            <div style={{ opacity: 0.40, color: '#D4D5D9', fontSize: 14, fontWeight: '400', height: 20 }}>/</div>
            <div className="Blog" onClick={() => handleButtonClick("/blog")} style={{ color: '#D4D5D9', fontSize: 14, fontWeight: '500', height: 20, cursor:'pointer' }}>Blog</div>
            <div style={{ opacity: 0.40, color: '#D4D5D9', fontSize: 14, fontWeight: '400', height: 20 }}>/</div>
            <div className="About" onClick={() => handleButtonClick("/about")} style={{ color: '#D4D5D9', fontSize: 14, fontWeight: '500', height: 20, cursor:'pointer' }}>About</div>
            <div style={{ opacity: 0.40, color: '#D4D5D9', fontSize: 14, fontWeight: '400', height: 20 }}>/</div>
            <div className="Contacts" onClick={() => handleButtonClick("/contacts")} style={{ color: '#D4D5D9', fontSize: 14, fontWeight: '500', height: 20, cursor:'pointer' }}>Contacts</div>
        </div>
    )
}