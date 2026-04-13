import { resolveMediaUrl } from "@/lib/assetBase";

/**
 * 图片拼接组件 - 左大右二布局
 *
 * 布局结构：
 * ┌─────────────┬───────┐
 * │             │ 图2   │
 * │    大图     ├───────┤
 * │    (图1)    │ 图3   │
 * └─────────────┴───────┘
 */
export default function ImageCollage(props) {
    const content = props.content;
    const aspectRatio = props.aspectRatio || "16/9";

    if (!content || content.length < 3) return null;

    // 图片位置配置
    const gridPositions = [
        { column: "1", row: "1 / 3" },  // 大图：跨两行
        { column: "2", row: "1" },      // 右上小图
        { column: "2", row: "2" },      // 右下小图
    ];

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr",
                gridTemplateRows: "1fr 1fr",
                gap: 4,
                aspectRatio: aspectRatio,
                overflow: "hidden",
                backgroundColor: "#000",
            }}
        >
            {content.slice(0, 3).map((item, index) => (
                <div
                    key={index}
                    style={{
                        gridColumn: gridPositions[index].column,
                        gridRow: gridPositions[index].row,
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <img
                        src={resolveMediaUrl(item.image)}
                        alt={item.title || ""}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                </div>
            ))}
        </div>
    );
}