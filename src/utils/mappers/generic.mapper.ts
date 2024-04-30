export function removeUndefined(obj: Record<string, any>) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key) && obj[key] === undefined) {
            delete obj[key];
        }
    }
    return obj;
}
