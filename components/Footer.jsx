import React from 'react'

import { AiFillInstagram, AiOutlineTwitter, AiFillAppstore, AiFillAndroid, AiFillApple } from 'react-icons/ai'

const Footer = () => {
  return (
    <div className='footer-container'>
      <p>2022 Moi Own Store All rights reserved</p>
      <p className='icons'>
        <AiFillInstagram />
        <AiOutlineTwitter />
        <AiFillAppstore />
        <AiFillAndroid />
        <AiFillApple />
      </p>
    </div>
  )
}

export default Footer
