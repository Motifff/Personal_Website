import InArticleImage from "./inArticleImage";
import ParaBlock from "./paraBlock";
import LinkJumper from "./linkJumper";

export default function ContentRenderer({ item }) {
    switch (item.type) {
        case "imageBed":
            return (
                <InArticleImage ao={item.aspectRatio} content={item.content} />
            );
        case "paragraph":
            return (
                <ParaBlock text={item.content} credits={item.credits} />
            );
        case "link":
            return (
                <LinkJumper text={item.text} link={item.link} />
            );
        default:
            return null;
    }
}



