import { test as test1 } from './main';

test('test returns 123', () => {
    expect(test1()).toBe(123);
});
