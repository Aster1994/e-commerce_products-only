export const commaSeparator = (price: string | number | undefined | null) => {
    if (price === null || price === undefined) return ''
    const numberValue = Number(price)
    if (isNaN(numberValue)) return String(price)

    // Use toLocaleString to automatically handle comma separation.
    return numberValue.toLocaleString('en-US')
}