export const useLocalStorage = <T>(key: string) => {
    const setItem = (value: T) => {
        try {
            const toStore = typeof value === "string" ? value : JSON.stringify(value);
            window.localStorage.setItem(key, toStore);
        } catch (error) {
            console.log(error);
        }
    };

    const getItem = (): T | null => {
        try {
            const item = window.localStorage.getItem(key);
            if (!item) return null;
    
            try {
                return JSON.parse(item);
            } catch {
                return item as T;
            }
        } catch (e) {
            console.log(e);
            return null;
        }
    };

    const removeItem = () => {
        try {
            window.localStorage.removeItem(key);
        } catch (error) {
            console.log(error);
        }
    };

    return { setItem, getItem, removeItem };

};