import React from 'react'
import './Main.css'
import { assets } from '../../assets/assets'

const Main = () => {
    return (
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-content">
                <div className="greet">
                    <p><span>Hallo, Dev.</span></p>
                    <p>Wie kann ich dir heute Helfen?</p>
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
            </div>
        </div>
    )
}

export default Main