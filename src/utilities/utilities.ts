export const range = (start:number, end:number) => {
    const length = end - start;
    return Array.from({ length: length + 1 }, (_, i) => start + i);
}
