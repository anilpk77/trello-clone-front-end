import { ColumnContainer, ColumnTitle } from "./style";
import { Card } from "./Card";
import { AddNewItem } from "./AddNewItem";
import { useAppState } from "./state/AppStateContext";
import { useRef } from "react";
import { useItemDrag } from "./utils/useItemDrag";
import { useDrop } from "react-dnd";
import { throttle } from "throttle-debounce-ts";
import { isHidden } from"./utils/isHidden"
import { addTask, moveList, moveTask, SetDraggedItem } from "./state/action";

type ColumnProps = {
    text: string
    id: string
    isPreview?: boolean
}

export const Column = ({text, id, isPreview}: ColumnProps) => {
    const { getTasksByListId, dispatch, draggedItem} = useAppState()
    const tasks = getTasksByListId(id)
    const ref = useRef<HTMLDivElement>(null)
    const [, drop] = useDrop({
        accept: ["COLUMN", "CARD"],
        hover: throttle(200, () =>{
            if (!draggedItem) {
                return
            }
            if (draggedItem.type ==="COLUMN") {
                if(draggedItem.id === id) {
                    return
                } else {
                    if (draggedItem.id === id) {
                        return
                    }
                    if (tasks.length) {
                        return
                    }

                    dispatch(
                        moveTask(draggedItem.id, null, draggedItem.id, id)
                    )
                    dispatch(SetDraggedItem({ ...draggedItem, id: id}))
                }
                dispatch(moveList(draggedItem.id, id))
            }
        })
    })
    const { drag } = useItemDrag({
        type: "COLUMN", id, text,
    })
    drag(drop(ref));

    return (
        <ColumnContainer ref={ref} isHidden={isHidden(draggedItem, "COLUMN", id, isPreview)}>
          <ColumnTitle> {text} </ColumnTitle>
          {tasks.map((task) => (
            <Card text ={task.text} key={task.id} id ={task.id} columnId={id} />
          ))}
          <AddNewItem 
          toggleButtonText="+ Add another card"
          onAdd={(text) => dispatch(addTask(text, id))}
          />
        </ColumnContainer>
    )
}

