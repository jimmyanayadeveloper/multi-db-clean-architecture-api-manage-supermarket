export function toUtc(dateLike: Date | string | number): Date {
    const d = new Date(dateLike);

    return new Date(Date.UTC(
        d.getUTCFullYear(),
        d.getUTCMonth(),
        d.getUTCDate(),
        d.getUTCHours(),
        d.getUTCMinutes(),
        d.getUTCSeconds(),
        d.getUTCMilliseconds()
    ));
}

export function dateWithTime(dateLike: Date | string | number): Date {
    const d = new Date(dateLike);

    return new Date(Date.UTC(
        d.getUTCFullYear(),
        d.getUTCMonth(),
        d.getUTCDate(),
        0, 0, 0, 0
    ));
}

export function addUtcDays(baseUtc: Date, days: number): Date {
    return new Date(baseUtc.getTime() + days * 86400000);
}