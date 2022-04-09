import React from 'react'
import './NavigationDrawer.scss'
import { Link } from 'react-router-dom'

export default function NavigationDrawer() {
    return (
        <div className="c-navigationDrawer">
            <ul className="c-navigationDrawer__items">
                <li className="c-navigationDrawer__item">
                    <Link to="/">
                    <h3>Tabla</h3>
                    </Link>
                </li>
                <li className="c-navigationDrawer__item">
                    <Link to="/nothing">
                    <h3>Chart</h3>
                    </Link>
                </li>
                <li className="c-navigationDrawer__item">
                    <h3>Elemento 3</h3>
                </li>
                <li className="c-navigationDrawer__item">
                    <h3>Elemento 4</h3>
                </li>
            </ul>
        </div>
    )
}
