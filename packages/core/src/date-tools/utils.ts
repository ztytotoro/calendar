import { Defined } from './definition';

export function diff<
  T extends {
    [K: string]: number;
  }
>(a: T, b: T) {
  const result = {} as T;
  if (isDefined(a) && isDefined(b)) {
    Object.keys(a).forEach((p) => {
      Object.defineProperty(result, p, {
        value: b[p] - a[p],
      });
    });
  }
  return result;
}

export function isNum(number: unknown): number is number {
  return typeof number === 'number' && !isNaN(number);
}

export function isInt(number: unknown): number is number {
  return Number.isInteger(number);
}

export function isPositiveInt(number: number): number is number {
  return isInt(number) && number > 0;
}

export function increaseSign(a: number, b: number) {
  if (a === b) {
    return 0;
  }
  return (b - a) / Math.abs(b - a);
}

export function range(count: number): number[];
export function range(from: number, end: number): number[];
export function range(a: number, b?: number) {
  if (isNum(a) && isNum(b)) {
    return Array(Math.abs(b - a) + 1)
      .fill(0)
      .map((_, i) => a + i * increaseSign(a, b));
  } else {
    return Array(a)
      .fill(0)
      .map((_, i) => i);
  }
}

export function isDefined<T>(val: T): val is Defined<T> {
  return val !== undefined && val !== null;
}

export function lastOf<T>(list: T[]) {
  return list[list.length - 1];
}

export function getDefault<T>(val: T, defaultVal: Defined<T>) {
  if (isDefined(val)) {
    return val;
  }
  return defaultVal;
}

export function toPositiveInt(number: number) {
  return number >= 1 ? Math.round(number) : 1;
}
