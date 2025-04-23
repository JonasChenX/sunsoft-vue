const generateRandomString = (length: number, type: 'number' | 'alpha' | 'alphanumeric'): string => {
    let characters = '';
    switch (type) {
        case 'number':
            characters = '0123456789';
            break;
        case 'alpha':
            characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            break;
        case 'alphanumeric':
            characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            break;
        default:
            throw new Error('Invalid type. Use "number", "alpha", or "alphanumeric".');
    }

    let result = '';
    for (let i = 0; i < length; i++) {
        const randIndex = Math.floor(Math.random() * characters.length);
        result += characters[randIndex];
    }

    return result;
}

export default {
    generateRandomString
}