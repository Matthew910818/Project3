import React, { createContext, useState } from 'react';


export const FridgeContext = createContext();


export function FridgeProvider({ children }) {
    const [items, setItems] = useState([]);

    return (
        <FridgeContext.Provider value={{ items, setItems }}>
            {children}
        </FridgeContext.Provider>
    );
}
