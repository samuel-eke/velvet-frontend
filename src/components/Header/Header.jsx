import React from 'react'
import './Header.css'

const Header = () => {
    return (
        <div className='header'>
            <div className='header-contents'>
                <div className="header-blur">

                <h2>Stitch Your Story</h2>
                <h3 style={{fontStyle: "italic"}}>Shop One-of-a-Kind Knits & Crochet Creations</h3>
                <p>Transform your space and style with our exclusive range of handmade knitting and crochet products. Every piece tells a story, woven with passion and creativity. Whether you’re searching for the perfect gift or a special treat for yourself, find something truly unique in our shop today!</p>
                <button><a href="#explore-menu">Buy now</a></button>
                </div>
            </div>
        </div>
    )
}

export default Header
