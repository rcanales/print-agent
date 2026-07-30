export function safeNumber(value, decimals = 2) {
    const num = Number(value ?? 0);

    return Number.isFinite(num)
        ? num.toFixed(decimals)
        : (0).toFixed(decimals);
}