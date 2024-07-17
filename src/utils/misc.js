
export function updateInventory(inventory, item) {
    inventory.items[item] = (inventory.items[item] ?? 0) + 1;

}