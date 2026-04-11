export default function HomeProjectMeta(props) {
    const { labels, category, location, date, ifFold, locationWidth = "10ch", dateWidth = "9ch" } = props;

    const monthMap = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

    const formatDate = (rawDate) => {
        if (!rawDate || typeof rawDate !== "string") return "02 FEB 24";

        const trimmedDate = rawDate.trim();
        const exactPattern = /^(\d{1,2})\s+([A-Za-z]{3})\s+(\d{2})$/;
        const yearPattern = /^(\d{4})$/;
        const isoPattern = /^(\d{4})-(\d{2})-(\d{2})$/;

        if (exactPattern.test(trimmedDate)) {
            const [, day, month, year] = trimmedDate.match(exactPattern);
            return `${day.padStart(2, "0")} ${month.toUpperCase()} ${year}`;
        }

        if (yearPattern.test(trimmedDate)) {
            return `02 FEB ${trimmedDate.slice(-2)}`;
        }

        if (isoPattern.test(trimmedDate)) {
            const [, year, month, day] = trimmedDate.match(isoPattern);
            const monthIndex = Number(month) - 1;
            const monthText = monthMap[monthIndex] || "FEB";
            return `${day} ${monthText} ${year.slice(-2)}`;
        }

        const parsedDate = new Date(trimmedDate);
        if (!Number.isNaN(parsedDate.getTime())) {
            const day = String(parsedDate.getDate()).padStart(2, "0");
            const monthText = monthMap[parsedDate.getMonth()] || "FEB";
            const year = String(parsedDate.getFullYear()).slice(-2);
            return `${day} ${monthText} ${year}`;
        }

        return "02 FEB 24";
    };

    const itemBaseStyle = {
        display: "flex",
        flexDirection: "column",
        gap: "4px",
        justifyContent: "flex-end",
    };

    const valueStyle = {
        color: "#D4D5D9",
        fontSize: "16px",
        fontWeight: "500",
        lineHeight: "130%",
        letterSpacing: "-0.16px",
        whiteSpace: "nowrap",
    };

    const labelStyle = {
        color: "#5D5D5D",
        fontSize: "10px",
        fontWeight: "500",
        lineHeight: "130%",
        letterSpacing: "-0.1px",
        whiteSpace: "nowrap",
    };

    return (
        <div
            style={{
                display: "flex",
                flexWrap: ifFold ? "wrap" : "nowrap",
                justifyContent: ifFold ? "space-between" : "flex-end",
                alignItems: "flex-end",
                gap: ifFold ? "16px" : "32px",
                width: "100%",
            }}
        >
            <div style={{ ...itemBaseStyle, alignItems: "flex-end" }}>
                <div style={valueStyle}>{category || "-"}</div>
                <div style={labelStyle}>{labels.categories}</div>
            </div>
            <div style={{ ...itemBaseStyle, alignItems: "flex-end", width: ifFold ? "auto" : locationWidth }}>
                <div style={valueStyle}>{location || "-"}</div>
                <div style={labelStyle}>{labels.locations}</div>
            </div>
            <div style={{ ...itemBaseStyle, alignItems: "flex-end", width: ifFold ? "auto" : dateWidth }}>
                <div style={valueStyle}>{formatDate(date)}</div>
                <div style={labelStyle}>{labels.date}</div>
            </div>
        </div>
    );
}
