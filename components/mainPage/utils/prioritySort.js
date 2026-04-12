const DEFAULT_PRIORITY = 999;

function parseDateValue(value) {
    if (!value) return null;
    const parsed = new Date(value);
    if (!Number.isNaN(parsed.getTime())) return parsed.getTime();

    // Handles "02 FEB 24" style strings if Date parsing fails.
    const normalized = value
        .replace(/([0-9]{1,2})\s+([A-Za-z]{3})\s+([0-9]{2})$/, "$1 $2 20$3");
    const parsedNormalized = new Date(normalized);
    return Number.isNaN(parsedNormalized.getTime()) ? null : parsedNormalized.getTime();
}

function getPriorityValue(item) {
    if (!item || typeof item.priority !== "number") return DEFAULT_PRIORITY;
    return item.priority;
}

export function sortByPriorityThenDate(items = []) {
    if (!Array.isArray(items)) return [];

    return [...items].sort((a, b) => {
        const priorityA = getPriorityValue(a);
        const priorityB = getPriorityValue(b);
        if (priorityA !== priorityB) return priorityA - priorityB;

        const dateA = parseDateValue(a?.date || a?.time);
        const dateB = parseDateValue(b?.date || b?.time);
        if (dateA !== null && dateB !== null && dateA !== dateB) return dateB - dateA;
        if (dateA !== null && dateB === null) return -1;
        if (dateA === null && dateB !== null) return 1;

        return (a?.title || "").localeCompare(b?.title || "");
    });
}
