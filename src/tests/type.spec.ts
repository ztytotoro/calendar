import { isNumber, isNumbers } from '../type';

test('test isNumber', () => {
    expect(isNumber(2020)).toBeTruthy();
    expect(isNumber('2020')).toBeFalsy();
    expect(isNumber(undefined)).toBeFalsy();
});

test('test isNumbers', () => {
    expect(isNumbers([1, 2, 3])).toBeTruthy();
    expect(isNumbers(['2020', 1])).toBeFalsy();
    expect(isNumbers([undefined])).toBeFalsy();
});
