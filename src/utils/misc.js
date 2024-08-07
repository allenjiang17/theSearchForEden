
export function updateInventory(inventory, item) {
    inventory.items[item] = (inventory.items[item] ?? 0) + 1;
}

export function normalizeString(str) {
    return str
        .toLowerCase() // Convert to lowercase
        .replace(/[^\w\s]|_/g, "") // Remove punctuation
        .replace(/\s+/g, " ") // Replace multiple spaces with a single space
        .trim();
}

export function areStringsEqual(str1, str2) {
    const normalizedStr1 = normalizeString(str1);
    const normalizedStr2 = normalizeString(str2);

    return normalizedStr1 === normalizedStr2;
}