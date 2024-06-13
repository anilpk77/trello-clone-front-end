import { useState } from "react"
import { NewItemButton, NewItemFormCOntainer, NewItemInput } from "./style"
import { useFocus } from "./utils/useFocus"





type NewItemFormProps = {
    onAdd(text: string): void //onAdd is a callback passed through AddNewItemProps.
}

export const NewItemForm = ({onAdd}: NewItemFormProps) => {
    const [text, setText] = useState("")
    const inputRef = useFocus()
    const handleAddText = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            onAdd(text)
        }
    }

    return (
        <NewItemFormCOntainer>
            <NewItemInput
              ref = {inputRef}
              value = {text}
              onChange = {(e) => setText(e.target.value)}
              onKeyDown = {handleAddText}
            />
            <NewItemButton onClick={() => onAdd(text)}>
                Create
            </NewItemButton>
        </NewItemFormCOntainer>
    
    )

}