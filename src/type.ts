export function isNumber(a1: unknown): a1 is number {
    return typeof a1 === 'number';
}

export function isNumbers(list: unknown[]): list is number[] {
    for (const item of list) {
        if (!isNumber(item)) {
            return false;
        }
    }
    return true;
}
