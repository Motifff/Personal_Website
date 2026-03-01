import InArticleImage from "./inArticleImage";
import ParaBlock from "./paraBlock";
import LinkJumper from "./linkJumper";
import HeadingBlock from "./headingBlock";
import QuoteBlock from "./quoteBlock";

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
        case "heading":
            return (
                <HeadingBlock level={item.level} text={item.text} />
            );
        case "quote":
            return (
                <QuoteBlock text={item.text} />
            );
        default:
            return null;
    }
}



