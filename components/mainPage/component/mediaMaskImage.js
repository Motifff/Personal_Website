import { useCallback, useEffect, useRef } from "react";

function getCoverCrop(sourceWidth, sourceHeight, targetWidth, targetHeight) {
    const sourceRatio = sourceWidth / sourceHeight;
    const targetRatio = targetWidth / targetHeight;

    if (sourceRatio > targetRatio) {
        const cropWidth = Math.round(sourceHeight * targetRatio);
        const cropX = Math.round((sourceWidth - cropWidth) / 2);
        return { sx: cropX, sy: 0, sw: cropWidth, sh: sourceHeight };
    }

    const cropHeight = Math.round(sourceWidth / targetRatio);
    const cropY = Math.round((sourceHeight - cropHeight) / 2);
    return { sx: 0, sy: cropY, sw: sourceWidth, sh: cropHeight };
}

export default function MediaMaskImage(props) {
    const { src, alt = "", sampleSize = 12 } = props;
    const wrapperRef = useRef(null);
    const canvasRef = useRef(null);
    const imageRef = useRef(null);
    const renderFrameRef = useRef(0);

    const renderImage = useCallback(() => {
        const wrapper = wrapperRef.current;
        const canvas = canvasRef.current;
        const image = imageRef.current;
        if (!wrapper || !canvas || !image || !image.complete || image.naturalWidth === 0) return;

        const rect = wrapper.getBoundingClientRect();
        const cssWidth = Math.max(1, Math.round(rect.width));
        const cssHeight = Math.max(1, Math.round(rect.height));
        const dpr = window.devicePixelRatio || 1;

        canvas.width = Math.max(1, Math.round(cssWidth * dpr));
        canvas.height = Math.max(1, Math.round(cssHeight * dpr));
        canvas.style.width = `${cssWidth}px`;
        canvas.style.height = `${cssHeight}px`;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const lowResWidth = Math.max(1, Math.round(cssWidth / sampleSize));
        const lowResHeight = Math.max(1, Math.round(cssHeight / sampleSize));
        const lowCanvas = document.createElement("canvas");
        lowCanvas.width = lowResWidth;
        lowCanvas.height = lowResHeight;
        const lowCtx = lowCanvas.getContext("2d");
        if (!lowCtx) return;

        const { sx, sy, sw, sh } = getCoverCrop(
            image.naturalWidth,
            image.naturalHeight,
            lowResWidth,
            lowResHeight
        );

        lowCtx.imageSmoothingEnabled = true;
        lowCtx.clearRect(0, 0, lowResWidth, lowResHeight);
        lowCtx.drawImage(image, sx, sy, sw, sh, 0, 0, lowResWidth, lowResHeight);

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.imageSmoothingEnabled = false;
        ctx.drawImage(lowCanvas, 0, 0, canvas.width, canvas.height);
    }, [sampleSize]);

    useEffect(() => {
        let cancelled = false;
        const image = new window.Image();
        image.onload = () => {
            if (cancelled) return;
            imageRef.current = image;
            cancelAnimationFrame(renderFrameRef.current);
            renderFrameRef.current = requestAnimationFrame(renderImage);
        };
        image.src = src;

        const wrapper = wrapperRef.current;
        const resizeObserver = wrapper && "ResizeObserver" in window
            ? new ResizeObserver(() => {
                cancelAnimationFrame(renderFrameRef.current);
                renderFrameRef.current = requestAnimationFrame(renderImage);
            })
            : null;

        if (wrapper && resizeObserver) resizeObserver.observe(wrapper);

        const handleWindowResize = () => {
            cancelAnimationFrame(renderFrameRef.current);
            renderFrameRef.current = requestAnimationFrame(renderImage);
        };

        window.addEventListener("resize", handleWindowResize);

        return () => {
            cancelled = true;
            window.removeEventListener("resize", handleWindowResize);
            resizeObserver?.disconnect();
            cancelAnimationFrame(renderFrameRef.current);
        };
    }, [src, renderImage]);

    return (
        <div
            ref={wrapperRef}
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                backgroundColor: "#08050E",
                isolation: "isolate",
            }}
        >
            <canvas
                ref={canvasRef}
                aria-hidden="true"
                style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    imageRendering: "pixelated",
                    filter: "contrast(1.12) saturate(1.14) brightness(0.92)",
                }}
            />
            <div
                aria-hidden="true"
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "repeating-linear-gradient(to right, rgba(0,0,0,0.78) 0px, rgba(0,0,0,0.78) 1px, rgba(255,255,255,0.06) 1px, rgba(255,255,255,0.06) 2px)",
                    mixBlendMode: "multiply",
                    opacity: 0.68,
                    pointerEvents: "none",
                }}
            />
            <div
                aria-hidden="true"
                style={{
                    position: "absolute",
                    inset: 0,
                    background:
                        "linear-gradient(to bottom, rgba(0,0,0,0.18), rgba(0,0,0,0.26) 50%, rgba(0,0,0,0.2))",
                    pointerEvents: "none",
                }}
            />
            <span
                aria-hidden="true"
                style={{
                    position: "absolute",
                    width: 1,
                    height: 1,
                    overflow: "hidden",
                    clipPath: "inset(50%)",
                    whiteSpace: "nowrap",
                }}
            >
                {alt}
            </span>
        </div>
    );
}
