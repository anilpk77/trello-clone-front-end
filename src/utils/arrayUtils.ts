


type Item = {
    id: string;
}

//We use the spread operator to generate a new array with the portion before the index that we get using the slice method, and the portion after the index using the slice method with index + 1.
export function removeItemIndex<TItem>(array : TItem[], index: number) {
    return [...array.slice(0, index), ...array.slice(index + 1)]
}

export function insertItemIndex<TItem>(array : TItem[], item: TItem, index: number) {
    return [...array.slice(0, index), ...array.slice(index + 1)]
}

export const moveItem = <TItem>( array: TItem[], from: number, to: number) => {
    const item = array[from]
    return insertItemIndex(removeItemIndex(array, from), item, to)
}

export const findItemIndexById = <TItem extends Item>( items: TItem[], id: string): number => {
    return items.findIndex((item: TItem)=> item.id === id)
}

const itemsWithId = [{ id: "1", text: "test1" }, { id: "2", text: "test2" }];
const index = findItemIndexById(itemsWithId, "1");
console.log(index); // Output: 0

