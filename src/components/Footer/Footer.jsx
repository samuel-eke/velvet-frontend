import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
            <img src={assets.logo} alt="" />
            <p>At Velvet Loop, we pour our heart into every stitch. Discover the warmth and unique charm of our hand-knitted woolen clothes and luxurious fabrics, crafted with passion and dedication. We believe in sustainable, cozy fashion that tells a story.</p>
            <div className="footer-social-icons">
                <img src={assets.facebook_icon} alt="" />
                <img src={assets.twitter_icon} alt="" />
                <img src={assets.linkedin_icon} alt="" />
            </div>
        </div>
        <div className="footer-content-center">
            <h2>Velvet Loop</h2>
            <ul>
                <li><a href="#"> Home</a></li>
                <li><a href="#">About us</a></li>
                <li><a href="#">Delivery</a></li>
                <li><a href="#">Privacy policy</a></li>
            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+1-825-747-6945</li>
                <li>sidiqohakintola@gmail.com</li>
            </ul>
        </div>
      </div>
      <hr />
      <p className="footer-copyright">Copyright 2025 © myvelvetloop.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer
