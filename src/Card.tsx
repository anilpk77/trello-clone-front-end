import { useRef } from "react" 
import { CardContainer } from "./style" 
import { useItemDrag } from "./utils/useItemDrag" 
import { useDrop } from "react-dnd" 
import { useAppState } from "./state/AppStateContext" 
import { isHidden } from "./utils/isHidden" 
import { moveTask, SetDraggedItem } from "./state/action" 
import { throttle } from "throttle-debounce-ts"

type CardProps = {
    text: string
    id: string
    columnId: string
    isPreview?: boolean
}


export const Card = ({text, id, columnId, isPreview}: CardProps) => {
    const { draggedItem, dispatch } = useAppState()
    const ref = useRef<HTMLDivElement>(null)
    const { drag } = useItemDrag({
        type: "CARD",
        id,
        text,
        columnId
    })
    const [, drop] = useDrop({
        accept: "CARD",
        hover: throttle(200, () => {
            if (!draggedItem) {
                return
            }
            if (draggedItem.type !== "CARD") {
                return
            }
            if (draggedItem.id === id) {
                return
            }

            dispatch(
                moveTask(draggedItem.id, id, draggedItem.columnId, columnId)
            )
            dispatch(SetDraggedItem({ ...draggedItem, columnId}))
        })
    })
    drag(drop(ref))

    return (
        <CardContainer
           isHidden = { isHidden(draggedItem, "CARD", id, isPreview)}
           isPreview = {isPreview}
           ref = {ref}
        >
            {text}
        </CardContainer>
    )
}
