import React, { useState, useContext } from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const { setPrevPrompts, prevPrompts, prevChat } = useContext(Context);

    return (
        <div className={`sidebar ${extended ? "extended" : ""}`}>
            <div className="top">
                <img
                    className="menu"
                    onClick={() => setExtended((prev) => !prev)}
                    src={assets.menu_icon}
                    alt=""
                />
                <div onClick={() => setPrevPrompts[[]]} className="new-chat">
                    <img src={assets.plus_icon} alt="" />
                    {extended && <p>Neuer Chat</p>}
                </div>
                {extended && (
                    <div className="recent">
                        <p className="recent-title">Chatverlauf</p>
                        {prevPrompts.map((item, index) => (
                            <div key={index} onClick={() => prevChat(index)} className="recent-entry">
                                <img src={assets.message_icon} alt="" />
                                <p>{item.prompt} ...</p>
                            </div>
                        ))}
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
