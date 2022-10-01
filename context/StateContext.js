//Managing the store/state of this application
import React, { useContext, useState, useEffect, createContext } from "react";
//pop up notification
import { toast } from "react-hot-toast";

//Creating a Context, and call it as a hook
const Context = createContext();

export const StateContext = ({ children }) => {
    //Can have lots of different states in my context
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState();
    const [totalPrice, setTotalPrice] = useState();
    const [totalQuantities, setTotalQuantities] = useState();
    const [qty, setQty] = useState(1);

    //dynamic update functions
    const incQty = () => {
        setQty((prevQty) => prevQty + 1);
    }

    const decQty = () => {
        setQty((prevQty) => {
            if(prevQty - 1 < 1) return 1;
            return prevQty - 1;
        });
    }

    //creating the Context Provider (wrap everything within the context provider)
    return (
        <Context.Provider
            value={{
                showCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
            }}>
            {children}
        </Context.Provider>
    )
}