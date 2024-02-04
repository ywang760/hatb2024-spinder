import React, { useState } from 'react';

interface AlienContextType {
    chosenAlien: null | number
    setChosenAlien: React.Dispatch<React.SetStateAction<null | number>>;
}

const AlienStateContext = React.createContext<AlienContextType | undefined>(undefined);

export { AlienStateContext };

export function AlienStateProvider({ children }: { children: React.ReactNode }) {
        const [chosenAlien, setChosenAlien] = useState<null | number>(null);

        return (
            <AlienStateContext.Provider value={{ chosenAlien, setChosenAlien }}>
                {children}
            </AlienStateContext.Provider>
        );
}