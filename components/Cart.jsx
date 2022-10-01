import React, { useRef } from 'react'
import Link from 'next/link'
import { AiOutlineMinus, AiOutlinePlus, AiOutlineLeft, AiOutlineShopping } from 'react-icons/ai'
import { TiDeleteOutline } from 'react-icons/ti'
import { toast } from 'react-hot-toast'
import { urlFor } from '../lib/client'

//importing the Context
import { useStateContext } from '../context/StateContext'

const Cart = () => {
  //set up reference to the cart
  const cartRef = useRef();
  //Needed data/values from context
  const { totalPrice, totalQuantities, cartItems, setShowCart } = useStateContext();


  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button type='button' className='cart-heading' onClick={() => setShowCart(false)}>
          <AiOutlineLeft />
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150} />
            <h3>C'mon add some items for purchase</h3>
            <Link href='/'>
              <button type='button' onClick={() => setShowCart(false)} className='btn'> Continue Shopping</button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
