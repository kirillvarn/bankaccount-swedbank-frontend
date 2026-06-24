export default class ListUtil {
    static pickKeys<T>(obj: any, keys: string[]): Partial<T> {
        return keys.concat(['id']).reduce((acc: any, key: string) => {
            if (key in obj) {
                acc[key] = obj[key];
            }
            return acc;
        }, {});
    }
}