import { AxiosResponse } from 'axios';
import { saveAs } from 'file-saver';

const downloadBlob = (response: AxiosResponse) => {
    const blob = response.data;
    const content = String(response.headers['content-disposition']);
    const fileName = decodeURI(
        content
            .substr(content.lastIndexOf('filename*=') + 17)
            .replace(/"/g, '')
            .replace(/\+/g, '')
    );
    const extName = fileName.substring(fileName.lastIndexOf('.'));
    try {
        const file = new File([blob], fileName, { type: `text/${extName};charset=utf-8` });
        saveAs(file, fileName);
    } catch (err) {
        const textFileAsBlob = new Blob([blob], { type: `text/${extName}` });
        if ((window.navigator as any)['msSaveBlob']) {
            (window.navigator as any)['msSaveBlob'](textFileAsBlob, fileName);
        }
    }
}

export default{
    downloadBlob
}