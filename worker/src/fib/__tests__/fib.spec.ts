import { fibSlow } from '../fib';

describe('Fib tests', () => {
    test('0 should return 1', () => {
        const res = fibSlow(0);
        expect(res).toBe(1);
    });

    test('1 should return 1', () => {
        const res = fibSlow(1);
        expect(res).toBe(1);
    });

    test('2 should return 2', () => {
        const res = fibSlow(2);
        expect(res).toBe(2);
    });

    test('5 should return 8', () => {
        const res = fibSlow(5);
        expect(res).toBe(8);
    });

    test('6 should 13', () => {
        const res = fibSlow(6);
        expect(res).toBe(13);
    });
});
