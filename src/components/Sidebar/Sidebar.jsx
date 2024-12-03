import React, { useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'

const Sidebar = () => {

    const [extended, setExtended] = useState(false);

    return (
        <div className='sidebar'>
            <div className="top">
                <img className="menu" onClick={() => setExtended(prev => !prev)} src={assets.menu_icon} alt="" />
                <div className="new-chat">
                    <img src={assets.plus_icon} alt="" />
                    {extended ? <p>Neuer Chat</p> : null}
                </div>
                {extended ?
                    <div className='recent'>
                        <p className='recent-title'>kürzlich</p>
                        <div className="recent-entry">
                            <img src={assets.message_icon} alt="" />
                            <p>Was ist React ...</p>
                        </div>
                    </div>
                    : null}
            </div>

            <div className="bottom">
                <div className="bottom-item recent-entry">
                    <img src={assets.question_icon} alt="" />
                    {extended ? <p>Hilfe</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.history_icon} alt="" />
                    {extended ? <p>Aktivitäten</p> : null}
                </div>
                <div className="bottom-item recent-entry">
                    <img src={assets.setting_icon} alt="" />
                    {extended ? <p>Einstellungen</p> : null}
                </div>
            </div>
        </div>
    )
}

export default Sidebar