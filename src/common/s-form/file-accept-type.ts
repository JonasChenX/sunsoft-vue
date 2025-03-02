export enum FileAcceptType {
    // 圖片類型
    ImageAll = 'image/*',
    ImagePng = 'image/png',
    ImageJpeg = 'image/jpeg',
    ImageGif = 'image/gif',
    ImageSvg = 'image/svg+xml',

    // 文件類型
    DocumentPdf = 'application/pdf',
    DocumentDoc = 'application/msword',
    DocumentDocx = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    DocumentXls = 'application/vnd.ms-excel',
    DocumentXlsx = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',

    // 視頻類型
    VideoAll = 'video/*',
    VideoMp4 = 'video/mp4',
    VideoWebm = 'video/webm',

    // 音頻類型
    AudioAll = 'audio/*',
    AudioMp3 = 'audio/mpeg',
    AudioWav = 'audio/wav',

    // 其他常見類型
    TextPlain = 'text/plain',
    TextCsv = 'text/csv',
    TextHtml = 'text/html',

    // 通配符
    All = '*/*'
}