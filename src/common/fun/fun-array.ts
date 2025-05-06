//根據物件的某個特定 key 的值來對陣列進行去重
const deduplicateByKeys = (arr: any[], key: string) => {
    if (!Array.isArray(arr)) {
        console.error("錯誤：第一個參數必須是一個陣列。");
        return [];
    }
    if (typeof key !== 'string' || key === '') {
        console.error("錯誤：第二個參數必須是一個非空字串的鍵名。");
        return arr;
    }

    const map = new Map();

    arr.forEach(item => {
        if (item && typeof item === 'object') {
            const mapKey = item[key];
            map.set(mapKey, item);
        }
    });
    return Array.from(map.values());
}

export default {
    deduplicateByKeys
}