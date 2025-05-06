const getColorByYN = (type: string): string => {
    switch (type) {
        case "N":
        case "失敗":
            return 'red';
        case "Y":
        case "成功":
            return 'green';
        default:
            return 'gray'; // 最好補個 default，避免 undefined
    }
};

// 將值轉換為小寫字串
const toLowerCaseString = (val: unknown): string => {
    if (val === null || val === undefined) return '';
    return String(val).toLowerCase();
};

export default{
    getColorByYN,
    toLowerCaseString
}