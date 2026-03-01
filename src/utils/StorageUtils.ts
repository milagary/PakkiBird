export class StorageUtils {
    static getNumber(key: string, defaultValue: number): number {
        try {
            const val = localStorage.getItem(key);
            return val ? parseFloat(val) : defaultValue;
        } catch {
            return defaultValue;
        }
    }

    static setNumber(key: string, value: number) {
        try {
            localStorage.setItem(key, value.toString());
        } catch {}
    }

    static getArray(key: string): string[] {
        try {
            const val = localStorage.getItem(key);
            return val ? JSON.parse(val) : [];
        } catch {
            return [];
        }
    }

    static setArray(key: string, value: string[]) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch {}
    }
}