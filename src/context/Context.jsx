import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState("");
    const [recentPrompt, setRecentPrompt] = useState("");
    const [prevPrompts, setPrevPrompts] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState("");

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onSent();
        }
    };

    const onSent = async (prompt) => {
        setResultData("");
        setLoading(true);
        setShowResult(true);
        setRecentPrompt(input);

        const result = await run(input);

        // Textverarbeitung: Markdown-artige Formatierung in HTML umwandeln
        const formattedResult = result
            .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Fettgedruckter Text
            .replace(/\*(.*?)\*/g, "<i>$1</i>") // Kursiver Text
            .replace(/\n/g, "<br>") // Neue Zeilen
            .replace(/^\* (.*?)$/gm, "<li>$1</li>") // Listenpunkte (Zeilen mit Stern)
            .replace(/<li>(.*?)<\/li>/g, "<ul><li>$1</li></ul>") // Liste umschließen
            .replace(/\*/g, "") // Entfernt übriggebliebene Sternchen
            .replace(/```(.*?)```/gs, "<pre><code>$1</code></pre>"); // Code-Snippets (```) in <pre><code> umwandeln

        setResultData(formattedResult);
        setLoading(false);
        setInput("");
    };


    const contextValue = {
        prevPrompts,
        setPrevPrompts,
        onSent,
        setRecentPrompt,
        recentPrompt,
        setShowResult,
        showResult,
        loading,
        resultData,
        input,
        setInput,
        handleKeyDown,
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider >
    )

}

export default ContextProvider