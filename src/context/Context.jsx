import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {
    const [chatBox, setChatBox] = useState([
        { id: 1, dialog: [] }
    ]);
    const [chatIndex, setChatIndex] = useState(1)
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
    //     if (!input) return; // Keine leeren Prompts senden
    //     // setRecentPrompt(input);
    //     setLoading(true);
    //     setShowResult(true);

    //     // Neuen Prompt zum Verlauf hinzufügen (ohne Antwort)
    //     const newPrompt = { prompt: input, response: null };
    //     // const updatedPrompts = [...prevPrompts, newPrompt];
    //     // setPrevPrompts(updatedPrompts);

    //     // setChatBox(prevState => {
    //     //     const existingChat = prevState.find(chat => chat.id === chatIndex);
    //     //     if (existingChat) {
    //     //         // Chat mit der gleichen ID existiert bereits, aktualisiere ihn
    //     //         return prevState.map(chat =>
    //     //             chat.id === chatIndex ? { ...chat, dialog: newPrompt } : chat
    //     //         );
    //     //     }
    //     // });

    //     addDialogToId(chatIndex, newPrompt)

    //     // Kombiniere alle bisherigen Prompts und Antworten als Kontext
    //     const context = getDialogById(chatIndex)
    //         .map((item) => `User: ${item.prompt}\nAI: ${item.response || ""}`)
    //         .join("\n");

    //     try {
    //         const result = await run(context); // Kontext an KI senden

    //         // Formatierung von Markdown und Code-Snippets in HTML
    //         const formattedResult = result
    //             .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Fettgedruckter Text
    //             .replace(/\*(.*?)\*/g, "<i>$1</i>") // Kursiver Text
    //             .replace(/\n/g, "<br>") // Neue Zeilen
    //             .replace(/^\* (.*?)$/gm, "<li>$1</li>") // Listenpunkte
    //             .replace(/<li>(.*?)<\/li>/g, "<ul><li>$1</li></ul>") // Liste umschließen
    //             .replace(/```(.*?)```/gs, "<pre><code>$1</code></pre>") // Code-Snippets
    //             .replace(/\*/g, ""); // Entferne übriggebliebene Sternchen

    //         // Antwort zum Verlauf hinzufügen
    //         setChatBox((prevChatBox) =>
    //             prevChatBox.map((item) =>
    //                 item.id === chatIndex
    //                     ? {
    //                         ...item,
    //                         dialog: item.dialog.map((dialogItem, index) =>
    //                             index === item.dialog.length - 1
    //                                 ? { ...dialogItem, response: result } // Füge die Antwort zum letzten Dialog hinzu
    //                                 : dialogItem
    //                         ),
    //                     }
    //                     : item
    //             )
    //         );

    //         // setPrevPrompts(finalPrompts); // Verlauf aktualisieren

    //         // setChatBox(prevState => {
    //         //     const existingChat = prevState.find(chat => chat.id === chatIndex);
    //         //     if (existingChat) {
    //         //         // Chat mit der gleichen ID existiert bereits, aktualisiere ihn
    //         //         return prevState.map(chat =>
    //         //             chat.id === chatIndex ? { ...chat, dialog: finalPrompts } : chat
    //         //         );
    //         //     }
    //         // });


    //         setResultData(formattedResult); // Formatierte Antwort speichern
    //         // console.log(finalPrompts);
    //         console.log(chatBox);
    //     } catch (error) {
    //         console.error("Error fetching AI response:", error);
    //         setResultData("Es ist ein Fehler aufgetreten."); // Fehlermeldung anzeigen
    //     }

    //     setLoading(false);
    //     setInput(""); // Eingabefeld zurücksetzen
    // };

    const onSent = async (customInput = "") => {

        const inputToUse = customInput || input;

        if (!inputToUse) return;

        setRecentPrompt(inputToUse);
        setLoading(true);
        setShowResult(true);

        const newPrompt = { prompt: inputToUse, response: null };

        // Prompt sofort zur passenden Chat-ID hinzufügen
        const updatedChatBox = chatBox.map((item) =>
            item.id === chatIndex
                ? { ...item, dialog: [...item.dialog, newPrompt] }
                : item
        );

        setChatBox(updatedChatBox); // Zustand aktualisieren

        // Kontext für die Anfrage vorbereiten
        const context = updatedChatBox
            .find((item) => item.id === chatIndex)
            ?.dialog.map((item) => `User: ${item.prompt}\nAI: ${item.response || ""}`)
            .join("\n");

        try {
            // KI-Antwort abrufen
            const result = await run(context);
            const formattedResult = result
                .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Fettgedruckter Text
                .replace(/\*(.*?)\*/g, "<i>$1</i>") // Kursiver Text
                .replace(/\n/g, "<br>") // Neue Zeilen
                .replace(/^\* (.*?)$/gm, "<li>$1</li>") // Listenpunkte
                .replace(/<li>(.*?)<\/li>/g, "<ul><li>$1</li></ul>") // Liste umschließen
                .replace(/```(.*?)```/gs, "<pre><code>$1</code></pre>") // Code-Snippets
                .replace(/\*/g, ""); // Entferne übriggebliebene Sternchen

            // Dialog des aktuellen Chats aktualisieren
            setChatBox((prevChatBox) =>
                prevChatBox.map((item) =>
                    item.id === chatIndex
                        ? {
                            ...item,
                            dialog: item.dialog.map((dialogItem, index) =>
                                index === item.dialog.length - 1
                                    ? { ...dialogItem, response: result }
                                    : dialogItem
                            ),
                        }
                        : item
                )
            );

            setResultData(formattedResult); // Formatierte Antwort speichern
        } catch (error) {
            console.error("Error fetching AI response:", error);
            setResultData("Es ist ein Fehler aufgetreten.");
        }

        setLoading(false);
        setInput(""); // Eingabefeld zurücksetzen
        console.log(chatBox.length)
        console.log(chatBox.find((item) => item.id === chatIndex)?.dialog.length);
        console.log(chatBox)
    };


    const prevChat = (DialogIndex) => {
        setShowResult(true);

        const matchingChat = chatBox.find((item) => item.id === chatIndex); // Finde den Chat mit der aktuellen ID
        const specificPrompt = matchingChat.dialog[DialogIndex]?.prompt;
        setRecentPrompt(specificPrompt);

        const specificResponse = matchingChat.dialog[DialogIndex]?.response;

        const result = specificResponse;

        const formattedResult = result
            .replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // Fettgedruckter Text
            .replace(/\*(.*?)\*/g, "<i>$1</i>") // Kursiver Text
            .replace(/\n/g, "<br>") // Neue Zeilen
            .replace(/^\* (.*?)$/gm, "<li>$1</li>") // Listenpunkte
            .replace(/<li>(.*?)<\/li>/g, "<ul><li>$1</li></ul>") // Liste umschließen
            .replace(/```(.*?)```/gs, "<pre><code>$1</code></pre>") // Code-Snippets
            .replace(/\*/g, ""); // Entferne übriggebliebene Sternchen

        setResultData(formattedResult);
    };

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
        prevChat,
        setChatBox,
        chatBox,
        setChatIndex,
        chatIndex,
    };

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    );
};

export default ContextProvider;


