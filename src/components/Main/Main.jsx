import React, { useContext } from 'react'
import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {

    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context)

    return (
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.profil} alt="" />
            </div>
            <div className="main-content">
                <div className="greet">
                    <p><span>Hallo, Dev.</span></p>
                    <p>Wie kann ich Ihnen heute helfen?</p>
                </div>
                <div className="cards">
                    <div className="card">
                        <p>Schreib ein Gedicht über die Schönheit eines Sonnenuntergangs.</p>
                        <img src={assets.bulb_icon} alt="" />
                    </div>

                    <div className="card">
                        <p>Finde so viele Wörter wie möglich, die mit dem Buchstaben "B" beginnen und mit "L" enden.</p>
                        <img src={assets.message_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>Erklär mir den Unterschied zwischen React und Angular.</p>
                        <img src={assets.code_icon} alt="" />
                    </div>
                    <div className="card">
                        <p>Welche lokalen Spezialitäten sollte ich in Rom probieren?</p>
                        <img src={assets.compass_icon} alt="" />
                    </div>
                </div>

                <div className="main-bottom">
                    <div className="search-box">
                        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" placeholder='Gemini fragen' />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            <img onClick={(() => onSent())} src={assets.send_icon} alt="" />
                        </div>
                    </div>
                    <div className="bottom-info">
                        <p>Gemini kann fehlerhafte Aussagen liefern, auch über Personen, also überprüfe die Antworten. Datenschutz und Gemini</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main