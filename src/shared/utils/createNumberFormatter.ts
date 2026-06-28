export default {
    custom(options: {
        unitMap: Array<{unit: string, value: number}>,
        toFix: number,
        maxLen: number
    }) {
        const unitMap = [...options.unitMap].sort((a, b) => a.value - b.value);
        
        return (num: number, maxLen = options.maxLen, toFix = options.toFix) => {
            const sign = num < 0 ? '-' : '';
            num = Math.abs(num);
            
            for(let {value, unit} of unitMap) {
                const formateValue = num / value;
                if(Math.floor(formateValue).toString().length <= maxLen) {
                    return `${sign}${formateValue.toFixed(toFix)}${unit}`;
                }
            }

            const last = unitMap[unitMap.length - 1];
            return `${sign}${(num / last.value).toFixed(toFix)}${last.unit}`;
        }
    },

    byRatio(ratio: number, units: string[], toFix = 2) {
        const maxLen = ratio.toString().split('.')[0].length-1;
        return this.custom({
            toFix,
            maxLen,
            unitMap: units.map((unit, index) => ({
                unit,
                value: Math.pow(ratio, index)
            })),
        })
    },


} as const;