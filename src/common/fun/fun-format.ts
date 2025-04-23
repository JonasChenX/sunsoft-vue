// 格式化時間成 HH:mm:ss
const formatTime = (date: Date): string => {
    const pad = (n: number) => n.toString().padStart(2, '0')
    return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

export default {
    formatTime
}