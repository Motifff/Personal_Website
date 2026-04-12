import InArticleImage from "./inArticleImage";
import ParaBlock from "./paraBlock";
import LinkJumper from "./linkJumper";
import HeadingBlock from "./headingBlock";
import QuoteBlock from "./quoteBlock";
import IframeBlock from "./iframeBlock";

export default function ContentRenderer({ item }) {
    switch (item.type) {
        case "imageBed":
            return (
                <InArticleImage ao={item.aspectRatio} content={item.content} />
            );
        case "paragraph":
            return (
                <ParaBlock
                    text={item.content}
                    encryptedContent={item.encryptedContent}
                    credits={item.credits}
                />
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
        case "iframe":
            return (
                <IframeBlock
                    encryptedLink={item.encryptedLink}
                    link={item.link}
                    aspectRatio={item.aspectRatio}
                    title={item.title}
                />
            );
        default:
            return null;
    }
}



