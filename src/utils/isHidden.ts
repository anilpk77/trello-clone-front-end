import { DragItem } from "../DragItem";

//This function compares the type and id of the currently dragged item with the type and id we pass to it as arguments.
export const isHidden = (
    draggedItem: DragItem | null,
    itemtype: string,
    id: string,
    isPreview?: boolean
): boolean => {
    return Boolean(
      !isPreview &&
        draggedItem && 
        draggedItem.type === itemtype &&
        draggedItem.id === id
    )
}