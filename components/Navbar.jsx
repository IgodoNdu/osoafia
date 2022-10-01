import React from 'react'

import Link from 'next/link'
//for the shopping icon
import { AiOutlineShopping } from 'react-icons/ai'

import Cart from './Cart'
//pull the setShowCart & other State(s) I'll be needing here
import { useStateContext } from '../context/StateContext'

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href='/'>OsoAfia Headphones</Link>
      </p>

      {/**Making the button close and open the cart on demand */}
      <button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
        <AiOutlineShopping /><span className='cart-item-qty'>{totalQuantities}</span>
      </button>

      {/**Then Only show the cart component, when the ShowCart State is set to true */}
      {showCart && <Cart />}
    </div>
  )
}

export default Navbar
