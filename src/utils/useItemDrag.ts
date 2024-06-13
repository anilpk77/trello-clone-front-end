import { DragItem } from "../DragItem";
import { useAppState } from "../state/AppStateContext";
import { useDrag } from "react-dnd";
import { SetDraggedItem } from "../state/action";
import { getEmptyImage } from "react-dnd-html5-backend";
import { useEffect } from "react";






export const useItemDrag = (item: DragItem) => {
    const { dispatch } = useAppState()
    //Internally this hook uses useDrag from react-dnd. We pass an options object to it.
    //type - it will be CARD or COLUMN
    //item - returns dragged item object and dispatches the SET_DRAGGED_ITEM action
    //end - is called when we release the item
    const [, drag, preview] = useDrag({
        type: item.type,
        item: () => {
            dispatch(SetDraggedItem(item))
            return item
        },
        end: () => dispatch(SetDraggedItem(null))
    })
    useEffect(() => {
        preview(getEmptyImage(), {captureDraggingState: true})
    }, [preview])
     return { drag }

}