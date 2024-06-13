import { Action } from "./action"
import { nanoid } from "nanoid"
import { findItemIndexById, moveItem } from "../utils/arrayUtils"
import { DragItem } from "../DragItem";


export type Task = {
    id: string;
    text: string;
};

export type List = {
    id: string;
    text: string;
    tasks: Task[];
};

export type AppState = {
    lists: List[]
    draggedItem: DragItem | null
}

//call the state a draft, because we are using Immer and we’ll mutate this object directly. This way we remind ourselves that it is not a regular reducer state and we don’t have to worry about the immutability.
export const appStateReducer = ( draft: AppState, action: Action ): AppState | void => {
    switch (action.type) {
        case "ADD_LIST": {
            draft.lists.push({
                id: nanoid(),
                text: action.payload,
                tasks: []
            })
            break
        }
        case "ADD_TASK": {
            const { text, listId } = action.payload
            const targetListIndex = findItemIndexById(draft.lists, listId)

            draft.lists[targetListIndex].tasks.push({
                id: nanoid(),
                text
            })
            break
        }
        case "MOVE_LIST": {
            const { draggedId, hoverId} = action.payload
            const dragIndex = findItemIndexById(draft.lists, draggedId)
            const hoverIndex = findItemIndexById(draft.lists, hoverId)
            draft.lists = moveItem(draft.lists, dragIndex, hoverIndex)
        }
        break
        case "SET_DRAGGED_ITEM": {
            draft.draggedItem = action.payload
            break
        }
        case "MOVE_TASK": {
            const { draggedItemId, hoveredItemId, sourceCoulumnId, targetCoulumnId } = action.payload
            const sourceListIndex = findItemIndexById(
                draft.lists,
                sourceCoulumnId
            )
            const targetListIndex = findItemIndexById(
                draft.lists,
                targetCoulumnId
            )
            const dragIndex = findItemIndexById (
                draft.lists[sourceListIndex].tasks,
                draggedItemId
            )
            const hoverIndex = hoveredItemId ? findItemIndexById(
                draft.lists[targetListIndex].tasks,
                hoveredItemId
            )
            : 0
            const item = draft.lists[sourceListIndex].tasks[dragIndex]
            //// Remove the task from the source list
            draft.lists[sourceListIndex].tasks.splice(dragIndex, 1)
            // Add the task to the target list
            draft.lists[targetListIndex].tasks.splice(hoverIndex, 0, item)
            break
        }
    }

}