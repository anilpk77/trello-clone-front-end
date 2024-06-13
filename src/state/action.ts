import { DragItem } from "../DragItem"


interface AddLIstAction {
    type: "ADD_LIST"
    payload: string
}

interface AddTaskAction {
    type: "ADD_TASK"
    payload: { text: string; listId: string}
}

interface MoveListAction {
    type: "MOVE_LIST"
    payload: {
        draggedId: string
        hoverId: string
    }
}

interface SetDraggedItem {
    type: "SET_DRAGGED_ITEM"
    payload: DragItem | null
}

interface MoveTask {
    type: "MOVE_TASK"
    payload: {
        draggedItemId: string
        hoveredItemId: string | null
        sourceCoulumnId: string
        targetCoulumnId: string
    }
}

export type Action = AddLIstAction | AddTaskAction | MoveListAction | SetDraggedItem | MoveTask

export const addTask = ( text: string, listId: string): Action => ({
    type: "ADD_TASK",
    payload: { text, listId} 
})

export const addList = ( text: string): Action => ({
    type: "ADD_LIST",
    payload: text
})

//We’ve added the MOVE_LIST action. This action has draggedId and hoverId in its payload. 
//When we start dragging the column, we remember its id and pass it as draggedId. 
//When we hover over other columns we take their ids and use them as a hoverId.
export const moveList = ( draggedId:string, hoverId: string): Action => ({
    type: "MOVE_LIST",
    payload: { draggedId, hoverId}

})

export const SetDraggedItem = (draggedItem: DragItem | null): Action => ({
    type: "SET_DRAGGED_ITEM",
    payload: draggedItem
})

export const moveTask = (
    draggedItemId: string,
    hoveredItemId: string | null,
    sourceCoulumnId: string,
    targetCoulumnId: string
 ): Action => ({
    type: "MOVE_TASK",
    payload: {
        draggedItemId,
        hoveredItemId,
        sourceCoulumnId,
        targetCoulumnId
    }
})

