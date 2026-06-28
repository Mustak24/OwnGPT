import createNumberFormatter from "./createNumberFormatter";

export function formatNumberForUI(num: number, minLen = 4, toFix = 2): string {
    if (num === undefined || num === null || isNaN(Number(num))) {
        return '0.00';
    }
    
    if (toFix === undefined || toFix === null || isNaN(Number(toFix))) { toFix = 2; }
    if (minLen === undefined || minLen === null || isNaN(Number(minLen))) { minLen = 4; }
    const absNum = Math.abs(num);

    let sign: string = num < 0 ? '-' : '';

    if (Math.floor(absNum).toString().length <= minLen) { return `${sign}${absNum.toFixed(toFix)}`; }

    if (Math.floor(absNum / 1_000).toString().length <= minLen) { return `${sign}${(absNum / 1_000).toFixed(toFix)}K`; }

    if (Math.floor(absNum / 100_000).toString().length <= minLen) { return `${sign}${(absNum / 100_000).toFixed(toFix)}M`; }

    if (Math.floor(absNum / 100_00_000).toString().length <= minLen) { return `${sign}${(absNum / 100_00_000).toFixed(toFix)}B`; }

    return `${sign}${(absNum / 100_00_000_000).toFixed(toFix)}T`;
}


export function formatBytes(bytes: number, decimals = 2): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const val = parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) 
    
    if(isNaN(val)) return '0 Bytes';
    if(!val) return '0 Bytes';
    return val + ' ' + sizes[i];
}


export const formatSeconds = createNumberFormatter.custom({
    unitMap: [
        {unit: 'sec', value: 1},
        {unit: 'min', value: 60},
        {unit: 'hr', value: 60*60},
        {unit: 'day', value: 60*60*24},
        {unit: 'week', value: 60*60*24*7},
        {unit: 'month', value: 60*60*24*30},
        {unit: 'year', value: 60*60*24*365}
    ],
    toFix: 0,
    maxLen: 2
});

export const formatNumber = createNumberFormatter.byRatio(1000, ['','K', 'M', 'B', 'T'], 2);



export function sliceString(str: string, len = Infinity, rem = 2): string | undefined {
    if (str.length <= len) return str;
    return str?.slice(0, len - rem) + '...';
}