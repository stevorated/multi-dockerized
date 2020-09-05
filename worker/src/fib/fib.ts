export const fibSlow = (index: number | string): number => {
    if (typeof index === 'string') {
        index = parseInt(index);
    }
    if (index <= 1) return 1;
    return fibSlow(index - 1) + fibSlow(index - 2);
};
