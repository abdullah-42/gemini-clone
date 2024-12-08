import React, { useState, useContext } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const Sidebar = () => {
    const { chatBox, setChatBox, setChatIndex, chatIndex, setShowResult, prevChat } = useContext(Context);
    const [extended, setExtended] = useState(false);

    // Funktion, um einen neuen Chat zu erstellen
    const addNewChat = () => {
        const newChat = { id: chatBox.length + 1, dialog: [] }; // ID = Länge von chatBox + 1
        setChatBox((prevChatBox) => [...prevChatBox, newChat]);
        setChatIndex(chatBox.length + 1); // Setze den Index auf den neue erstellten Chat
        setShowResult(false)
    };

    // Wenn ein Dropdown geändert wird, wechsle zum entsprechenden Chat
    const handleChatChange = (chatId, selectedPrompt) => {
        setChatIndex(chatId); // Setze den aktiven Chat
        console.log(`Wechsel zu Chat ID ${chatId}, Prompt: ${selectedPrompt}`);
    };

    return (
        <div className={`sidebar ${extended ? "extended" : ""}`}>
            <div className="top">
                <img
                    className="menu"
                    onClick={() => setExtended((prev) => !prev)}
                    src={assets.menu_icon}
                    alt="menu icon"
                />
                <div onClick={addNewChat} className="new-chat">
                    <img src={assets.plus_icon} alt="add icon" />
                    {extended && <p>Neuer Chat</p>}
                </div>


                {/* Chat-Dropdowns */ extended &&
                    <div className="chat-dropdowns">
                        {chatBox.map((chat) => (
                            <div key={chat.id} className="chat-dropdown">
                                <FormControl fullWidth>
                                    <InputLabel id={`chat-select-label-${chat.id}`}>
                                        Chat {chat.id}
                                    </InputLabel>
                                    <Select
                                        labelId={`chat-select-label-${chat.id}`}
                                        value=""
                                        onChange={(e) => handleChatChange(chat.id, e.target.value)}
                                        label={`Chat ${chat.id} Verlauf`}
                                    >
                                        {chat.dialog.length === 0 ? (
                                            <MenuItem value="">
                                                <p>Kein Verlauf</p>
                                            </MenuItem>
                                        ) : (
                                            chat.dialog.map((dialogItem, dialogIndex) => (
                                                <MenuItem
                                                    key={`${chat.id}-${dialogIndex}`}
                                                    value={dialogItem.prompt}
                                                    onClick={() => prevChat(dialogIndex)}
                                                >
                                                    {`${dialogItem.prompt.substring(0, 20)}...`}


                                                </MenuItem>
                                            ))
                                        )}
                                    </Select>
                                </FormControl>
                            </div>
                        ))}
                    </div>
                }

            </div>

            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {extended && <p>Hilfe</p>}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {extended && <p>Aktivitäten</p>}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {extended && <p>Einstellungen</p>}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
