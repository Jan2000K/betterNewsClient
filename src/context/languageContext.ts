import {createContext} from "react";

interface langCtx {
    value: "ENG" | "SVN",
    setter: React.Dispatch<React.SetStateAction<"ENG" | "SVN">>
}


const ctx: langCtx = {
    value: "ENG", setter: () => {
    }
}

export const languageContext = createContext(ctx)