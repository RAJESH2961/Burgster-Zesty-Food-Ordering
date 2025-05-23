// Import required hooks and context API from React
import { createContext, useState } from "react";

// Step 1: Create the context with default values
const UserProgressContext = createContext({
  progress: '',               // This can be 'cart', 'checkout', or '' (empty string for none)
  showCart: () => {},         // Function to show the cart
  hideCart: () => {},         // Function to hide the cart
  showCheckout: () => {},     // Function to show the checkout screen
  hideCheckout: () => {}      // Function to hide the checkout screen
});

// Step 2: Create the provider component
export function UserProgressContextProvider({ children }) {
  const [userProgress, setUserProgress] = useState('');  // Holds current progress state

  // Show the cart view
  function showCart() {
    setUserProgress('cart');
  }

  // Hide the cart (reset to empty)
  function hideCart() {
    setUserProgress('');
  }

  // Show the checkout view
  function showCheckout() {
    setUserProgress('checkout');
  }

  // Hide the checkout (reset to empty)
  function hideCheckout() {
    setUserProgress('');
  }

  // Bundle all the context data and functions
  const userProgressCtx = {
    progress: userProgress,
    showCart,
    hideCart,
    showCheckout,
    hideCheckout
  };

  // Step 3: Provide the context to the children
  return (
    <UserProgressContext.Provider value={userProgressCtx}>
      {children}
    </UserProgressContext.Provider>
  );
}

export default UserProgressContext;
