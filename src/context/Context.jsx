import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setInput] = useState(""); // Benutzer-Eingabe
    const [recentPrompt, setRecentPrompt] = useState(""); // Letzter Prompt
    const [prevPrompts, setPrevPrompts] = useState([]); // Verlauf aller Prompts und Antworten
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const [resultData, setResultData] = useState(""); // Formatierte Ausgabe

    // Auf "Enter" senden
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            onSent();
        }
    };

    const onSent = async () => {
        if (!input) return; // Keine leeren Prompts senden
        setRecentPrompt(input);
        setLoading(true);
        setShowResult(true);

        // Neuen Prompt zum Verlauf hinzufügen (ohne Antwort)
        const newPrompt = { prompt: input, response: null };
        const updatedPrompts = [...prevPrompts, newPrompt];
        setPrevPrompts(updatedPrompts);

        // Kombiniere alle bisherigen Prompts und Antworten als Kontext
        const context = updatedPrompts
            .map((item) => `User: ${item.prompt}\nAI: ${item.response || ""}`)
            .join("\n");

        try {
            const result = await run(context); // Kontext an KI senden

            // Formatierung von Markdown und Code-Snippets in HTML
            const formattedResult = result
                .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Fettgedruckter Text
                .replace(/\*(.*?)\*/g, "<i>$1</i>") // Kursiver Text
                .replace(/\n/g, "<br>") // Neue Zeilen
                .replace(/^\* (.*?)$/gm, "<li>$1</li>") // Listenpunkte
                .replace(/<li>(.*?)<\/li>/g, "<ul><li>$1</li></ul>") // Liste umschließen
                .replace(/```(.*?)```/gs, "<pre><code>$1</code></pre>") // Code-Snippets
                .replace(/\*/g, ""); // Entferne übriggebliebene Sternchen

            // Antwort zum Verlauf hinzufügen
            const finalPrompts = updatedPrompts.map((item, index) =>
                index === updatedPrompts.length - 1
                    ? { ...item, response: result }
                    : item
            );
            setPrevPrompts(finalPrompts); // Verlauf aktualisieren
            setResultData(formattedResult); // Formatierte Antwort speichern
            console.log(finalPrompts)
        } catch (error) {
            console.error("Error fetching AI response:", error);
            setResultData("Es ist ein Fehler aufgetreten."); // Fehlermeldung anzeigen
        }

        setLoading(false);
        setInput(""); // Eingabefeld zurücksetzen
    };

    const prevChat = (index) => {
        setShowResult(true);
        setRecentPrompt(prevPrompts[index].prompt);

        const result = prevPrompts[index].response;

        const formattedResult = result
            .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Fettgedruckter Text
            .replace(/\*(.*?)\*/g, "<i>$1</i>") // Kursiver Text
            .replace(/\n/g, "<br>") // Neue Zeilen
            .replace(/^\* (.*?)$/gm, "<li>$1</li>") // Listenpunkte
            .replace(/<li>(.*?)<\/li>/g, "<ul><li>$1</li></ul>") // Liste umschließen
            .replace(/```(.*?)```/gs, "<pre><code>$1</code></pre>") // Code-Snippets
            .replace(/\*/g, ""); // Entferne übriggebliebene Sternchen

        setResultData(formattedResult)
    }

    const contextValue = {
        prevPrompts, // Verlauf aller Prompts und Antworten
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
        prevChat
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;
