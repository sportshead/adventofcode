export const MS = 1;
export const SECONDS = 1000 * MS;
export const MINUTES = 60 * SECONDS;
export const HOURS = 60 * MINUTES;
export const DAYS = 24 * HOURS;
export const WEEKS = 7 * DAYS;

// shifted to UTC-5
export const getAOCDate = (d?: Date) => {
    const date = d ?? new Date();
    date.setTime(date.getTime() - 5 * HOURS);
    return date;
};

export const getAOCYear = (d?: Date) => getAOCDate(d).getFullYear();
export const getAOCDay = (d?: Date) => getAOCDate(d).getDate();

export const secondsToHMMSS = (_s: number) => {
    let ms = _s * SECONDS;
    const h = Math.floor(ms / HOURS);
    ms = ms % HOURS;
    const m = Math.floor(ms / MINUTES);
    ms = ms % MINUTES;
    const s = Math.floor(ms / SECONDS);
    return `${h ? `${h}:` : ""}${m.toString().padStart(h && 2, "0")}:${s
        .toString()
        .padStart(2, "0")}`;
};
