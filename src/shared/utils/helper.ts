export function minMax(value: number, min = -Infinity, max = Infinity) {
    return Math.min(Math.max(value, min), max);
}


export function withDebounce(fn: (arg: any) => any, delay = 100) {
    let timeout = 0;
    return (...args: any) => {
        clearTimeout(timeout);
        setTimeout(() => {
            fn(args)
        }, delay);
    }
}


export function speedometer(initialValue: number, ) {
    let time = Date.now();
    return (currentValue: number) => {
        const now = Date.now();
        const deltaTime = now - time;
        time = now;
        const deltaValue = currentValue - initialValue;
        initialValue = currentValue;

        const speed = deltaValue / (deltaTime / 1000);
        if(isNaN(speed)) return 0;
        return speed ?? 0;
    }
}

export function UUIDGenerator() {
  const idSet = new Set<string>();

  function generate(): string {
    const id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });

    if (idSet.has(id)) {
      return generate();
    }

    idSet.add(id);
    return id;
  }

  return generate;
};


export async function delay(ms: number) {
    return new Promise((resolve) => setTimeout(() => resolve(null), ms));
}