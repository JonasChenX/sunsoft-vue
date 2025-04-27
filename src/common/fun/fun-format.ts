// 格式化時間成 HH:mm:ss
const formatTime = (date: Date): string => {
    const pad = (n: number) => n.toString().padStart(2, '0')
    return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

function formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');  // 月份從0開始，因此需要加1
    const day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
}

export default {
    formatTime,
    formatDate
}