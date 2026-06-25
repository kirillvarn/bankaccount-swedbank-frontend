export default class ListUtil {
    static pickKeys(obj: Record<string, any>, keys: string[]): Record<string, any> {
        return keys.concat(['id']).reduce((acc: any, key: string) => {
            if (key in obj) {
                acc[key] = obj[key];
            }
            return acc;
        }, {});
    }
}