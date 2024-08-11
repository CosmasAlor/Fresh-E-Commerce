import { createContext, useState } from "react";

export let CounterContext = createContext(0);

export default function CounterContextProvider(props) {
    
    const [count, setCount] = useState(10);
    const [userName, setUserName] = useState('Ahmed');

    return (
        <CounterContext.Provider value={{ count, setCount, userName }}>
            {props.children}
        </CounterContext.Provider>
    );
}
