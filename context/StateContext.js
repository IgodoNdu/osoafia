//Managing the store/state of this application
import React, { useContext, useState, useEffect, createContext } from "react";
//pop up notification
import { toast } from "react-hot-toast";

//Creating a Context, and call it as a hook
const Context = createContext();

export const StateContext = ({ children }) => {
    //Can have lots of different states in my context
    const [showCart, setShowCart] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalQuantities, setTotalQuantities] = useState(0);
    const [qty, setQty] = useState(1);

    let foundProduct;
    let index;

    //dynamic update function for adding to cart (takes 2 params, product to be added, and the qty)
    const onAdd = (productToAdd, quantityToAdd) => {
        //update the total price state
        setTotalPrice((prevTotalPrice) => prevTotalPrice + productToAdd.price * quantityToAdd)
        //update total quantities state
        setTotalQuantities((prevTotalQty) => prevTotalQty + quantityToAdd)
        //check if the intended product to add is already in the cart
        const checkProductInCart = cartItems.find((item) => item._id === productToAdd._id);
        if(checkProductInCart) {
            //update the actual items in the cart state. If productToAdd is amongst items in the cart, increase it's quantity by quantityToAdd param
            //start by mapping over the cart items to get each cart item
            const updatedCartItems = cartItems.map((cartItem) => {
                if(cartItem._id === productToAdd._id) return {
                    //spread the cartItem, and increase it's qty accordingly
                    ...cartItem,
                    quantity: cartItem.quantity + quantityToAdd
                }
            })
            //update the cart item state
            setCartItems(updatedCartItems);
        } else {
            //if productToAdd isn't already in the cart, update the productToAdd qty by the intended qty
            productToAdd.quantity = quantityToAdd;
            //update the cartItems state, by spreading the existing cartItems, and adding the new productToAdd with it's properties (hence you add it as an object)
            setCartItems([...cartItems, { ...productToAdd }]);
        }
        toast.success(`${qty} ${productToAdd.name} added to the cart`) // notification message/prompt
    }

    //Removing item(s) from cart
    const onRemove = (productToRemove) => {
        //what product to update
        foundProduct = cartItems.find((cartItem) => cartItem._id === productToRemove._id)
        const newCartItems = cartItems.filter((cartItem) => cartItem._id !== productToRemove._id);
        setTotalPrice((prevTotalPrice) => prevTotalPrice -foundProduct.price * foundProduct.quantity);
        setTotalQuantities((prevTotalQty) => prevTotalQty - foundProduct.quantity);
        setCartItems(newCartItems);
    }

    //handling cartItem Quantity updates
    const toggleCartItemQuantity = (id, value) => {
        //find the item to toggle
        foundProduct = cartItems.find((cartItem) => cartItem._id === id)
        //find the index of the foundProduct item on the cart
        index = cartItems.findIndex((cartItem) => cartItem._id === id)
        //short cut logic: use filter to filter-off foundProduct from the cart (avoid duplication) -Note: not to mutate the state (REACT RULE)
        const newCartItems = cartItems.filter((cartItem) => cartItem._id !== id);

        //value: will be a string to conote a decrement/increment action
        if(value === 'inc') {
            //update the cartItems (with the foundProduct), the price & quantities
            setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity + 1}]);
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price);
            setTotalQuantities((prevTotalQty) => prevTotalQty + 1);
        } else if(value === 'dec') {
            //check if foundProduct exists in the cart
            if(foundProduct.quantity > 1) {
                setCartItems([...newCartItems, {...foundProduct, quantity: foundProduct.quantity - 1}]);
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price);
                setTotalQuantities((prevTotalQty) => prevTotalQty - 1);
            }
        }
    }

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
                setShowCart,
                cartItems,
                totalPrice,
                totalQuantities,
                qty,
                incQty,
                decQty,
                onAdd,
                toggleCartItemQuantity,
                onRemove,
            }}>
            {children}
        </Context.Provider>
    )
}

//to more easily grab the state
export const useStateContext = () => useContext(Context);