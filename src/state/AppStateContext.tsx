import { createContext, useContext, FC, ReactNode, Dispatch, useEffect } from "react";
import { appStateReducer } from "./appStateReducer";
import { Action } from "./action";
import { useImmerReducer } from "use-immer";
import { DragItem } from "../DragItem";
import { save } from "../api";
import { withInitialState } from "../withInitialState";


type Task = {
    id: string;
    text: string;
};

type List = {
    id: string;
    text: string;
    tasks: Task[];
};

type AppStateContextProps = {
    draggedItem: DragItem | null;
    lists: List[];
    getTasksByListId(id: string): Task[];
    dispatch: Dispatch<Action>
};

// Define the props type including children
type AppStateProviderProps = {
    children: ReactNode;
    initialState: AppState
};

export type AppState = {
    lists: List[];
    draggedItem: DragItem | null
};

const AppStateContext = createContext<AppStateContextProps>(
    {} as AppStateContextProps
);

const appData: AppState = {
    draggedItem: null,
    lists: [
        {
            id: "0",
            text: "To Do",
            tasks: [{ id: "c0", text: "Generate app scaffold" }]
        },
        {
            id: "1",
            text: "In Progress",
            tasks: [{ id: "c2", text: "Learn Typescript" }]
        },
        {
            id: "2",
            text: "To Do",
            tasks: [{ id: "c3", text: "Begin to use static typing" }]
        }
    ]
};

export const useAppState = () => {
    return useContext(AppStateContext);
};


export const AppStateProvider = withInitialState<AppStateProviderProps>(({ children, initialState }) => {
    const [state, dispatch] = useImmerReducer(appStateReducer, initialState);

    useEffect(() => {
        save(state);
    }, [state])

    const { draggedItem, lists } = state;
    const getTasksByListId = (id: string) => {
        return lists.find((list) => list.id === id)?.tasks || [];
    };

    return (
        <AppStateContext.Provider value={{ draggedItem, lists, getTasksByListId, dispatch }}>
            {children}
        </AppStateContext.Provider>
    );
});


