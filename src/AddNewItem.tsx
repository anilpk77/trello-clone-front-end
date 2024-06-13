import { useState } from "react";
import { AddItemButton } from "./style";
import { NewItemForm } from "./NewItemForm";

type AddNewItemProps = {
    onAdd(text: string): void    // onAdd is a callback function that will be called when we click the Create button. 
    toggleButtonText: string     //  toggleButtonText is the text we’ll render when this component is a button.
    dark?: boolean              //   dark is a flag that we’ll pass to the styled component.
}

export const AddNewItem = (props: AddNewItemProps) => {
    const [showform, setShowForm] = useState(false)
    const { onAdd, toggleButtonText, dark } = props

    if (showform) {
        return(
            <NewItemForm
              onAdd={(text) => {
                onAdd(text)
                setShowForm(false)
              }}
            />
        )
    }

    return (
        <AddItemButton dark ={dark} onClick={ () => setShowForm(true)}>
            {toggleButtonText}
        </AddItemButton>
    )
}