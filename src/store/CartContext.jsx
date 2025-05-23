// ✅ Import necessary hooks and functions from React
import { createContext, useReducer, useState } from "react";

// ✅ Create a context with default values
const CartContext = createContext({
    items: [],                     // Array to store cart items
    addItem: (item) => {},         // Function to add item (placeholder)
    removeItem: (id) => {},        // Function to remove item (placeholder)
    clearCart: () => {}
});

// ✅ Reducer function to manage cart state
function cartReducer(state, action) {
    
    // ➕ If the action is 'ADD_ITEM'
    if (action.type === 'ADD_ITEM') {
        // Find if the item already exists in the cart
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.item.id
        );

        // Make a copy of the items array
        const updatedItems = [...state.items];

        // If item already exists in the cart (index > -1)
        if (existingCartItemIndex > -1) {
            const existingItem = updatedItems[existingCartItemIndex];
            // Increase the quantity by 1
            const updatedItem = {
                ...existingItem,
                quantity: existingItem.quantity + 1
            };
            // Replace old item with updated item
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            // If item doesn't exist, add it with quantity = 1
            updatedItems.push({ ...action.item, quantity: 1 });
        }

        // Return updated state
        return { ...state, items: updatedItems };
    }

    // ➖ If the action is 'REMOVE_ITEM'
    if (action.type === 'REMOVE_ITEM') {
        // Find the item in the cart
        const existingCartItemIndex = state.items.findIndex(
            (item) => item.id === action.id
        );

        const existingCartItem = state.items[existingCartItemIndex];

        // Make a copy of the items array
        const updatedItems = [...state.items];

        // If only 1 quantity, remove the item completely
        if (existingCartItem.quantity === 1) {
            // Remove item using splice
            updatedItems.splice(existingCartItemIndex, 1);
        } else {
            // If more than 1, decrease quantity by 1
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity - 1
            };
            // Replace item with updated item
            updatedItems[existingCartItemIndex] = updatedItem;
        }

        // Return updated state
        return { ...state, items: updatedItems };
    }

    // Clearing cart
    if(action.type === 'CLEAR_CART'){
        return {...state, items: []};
    }

    // Default: return current state if action type doesn't match
    return state;
}

// ✅ Context provider component
export function CartContextProvider({ children }) {
    // Use useReducer to manage cart state
    const [cart, dispatchCartAction] = useReducer(cartReducer, { items: [] });

    // Function to dispatch ADD_ITEM action
    function addItem(item) {
        dispatchCartAction({ type: 'ADD_ITEM', item: item });
    }

    // Function to dispatch REMOVE_ITEM action
    function removeItem(id) {
        dispatchCartAction({ type: 'REMOVE_ITEM', id });
    }

    //Clear cart
    function clearCart() {
        dispatchCartAction({ type: 'CLEAR_CART' })
    }

    

    // Context value that will be provided to consumers
    const cartContext = {
        items: cart.items,
        addItem,
        removeItem,
        clearCart
    };

    // For debugging: log current context state
    console.log(cartContext);

    // Return the Provider component wrapping child components
    return (
        <CartContext.Provider value={cartContext}>
            {children}
        </CartContext.Provider>
    );
}

// ✅ Export the context to be used in other components
export default CartContext;
