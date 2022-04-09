import React from 'react'
import './AppBar.scss'

export default function AppBar() {
    return (
        <nav className="c-appBar">
            <div className="c-appBar__title">
                <h1>PrecioLuz</h1>
            </div>
            <div className="c-appBar__img">
                <img src="https://res.cloudinary.com/dffkajufp/image/upload/v1649377758/photo1649377718_yr3h2m.jpg" alt="profile image"/>
            </div>
        </nav>
    )
}
