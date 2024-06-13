import { useState, useEffect } from "react";
import { AppState } from "./state/appStateReducer";
import { load } from "./api";

//type that represents the props that we are injecting
type InjectedProps = {
    initialState: AppState
}

//a helper type PropsWithoutInjected
type PropaWithoutInjected<TBaseProps> = Omit<TBaseProps, keyof InjectedProps>

export function withInitialState<TProps>(
    WrappedComponent: React.ComponentType<PropaWithoutInjected<TProps> & InjectedProps>
) {
    return (props: PropaWithoutInjected<TProps>) => {
        const [initialState, setInitialState] = useState<AppState>({
            lists: [],
            draggedItem: null
        })
        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState<Error | undefined> ()

        useEffect(() => {
            const fetchInitialState = async () => {
                try {
                    const data = await load ()
                    setInitialState(data)
                } catch (e) {
                    if (e instanceof Error) {
                        setError(e)
                    }
                }
                setIsLoading(false)
            }
            fetchInitialState()
        }, [])
        
        if (isLoading) {
            return <div>Loading</div>
        }

        if (error) {
            return <div>{error.message}</div>
        }

        return <WrappedComponent {...props} initialState={initialState} />
    }
}