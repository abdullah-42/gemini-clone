import React, { useState, useContext, useEffect } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";

const Sidebar = () => {
    const { prevPrompts, prevChat, setChatBox, setChatIndex, chatIndex } = useContext(Context);

    const [extended, setExtended] = useState(false);
    const [selectedPrompt, setSelectedPrompt] = useState("");

    useEffect(() => {
        if (prevPrompts.length > 0) {
            setSelectedPrompt(prevPrompts[0].prompt);
        } else {
            setSelectedPrompt("");
        }
    }, [prevPrompts]); // Immer wenn prevPrompts sich ändern, wird dieser Effekt ausgelöst

    const handleSelectChange = (e) => {
        const selectedIndex = prevPrompts.findIndex((item) => item.prompt === e.target.value);
        setSelectedPrompt(e.target.value);
        prevChat(selectedIndex);
    };

    const addNewChat = () => {
        const newChat = { id: chatIndex + 1, dialog: [] };
        setChatIndex(chatIndex + 1);
        // Zustand aktualisieren: Neuen Chat hinzufügen und den Zähler erhöhen
        setChatBox((prevChatBox) => [...prevChatBox, newChat]);
    };


    return (
        <div className={`sidebar ${extended ? "extended" : ""}`}>
            <div className="top">
                <img
                    className="menu"
                    onClick={() => setExtended((prev) => !prev)}
                    src={assets.menu_icon}
                    alt=""
                />
                <div onClick={() => addNewChat()} className="new-chat">
                    <img src={assets.plus_icon} alt="" />
                    {extended && <p>Neuer Chat</p>}
                </div>

                {extended && (
                    <div className="recent">
                        <p className="recent-title">Chatverlauf</p>

                        {/* Dropdown für den Chatverlauf */}
                        <FormControl fullWidth>
                            <InputLabel id="chat-select-label">Verlauf</InputLabel>
                            <Select
                                labelId="chat-select-label"
                                value={selectedPrompt}
                                onChange={handleSelectChange}
                                label="Verlauf"
                            >
                                {prevPrompts.length === 0 ? (
                                    <MenuItem value="">
                                        <p>Kein Verlauf</p>
                                    </MenuItem>
                                ) : (
                                    prevPrompts.map((item, index) => (
                                        <MenuItem key={index} value={item.prompt}>
                                            {item.prompt.length > 30
                                                ? `${item.prompt.substring(0, 30)}...`
                                                : item.prompt}
                                        </MenuItem>
                                    ))
                                )}
                            </Select>
                        </FormControl>
                    </div>
                )}
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

