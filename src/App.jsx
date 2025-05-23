import Cart from './components/Cart.jsx';
import Header from './components/Header.jsx'
import Meals from './components/Meals.jsx';
import { CartContextProvider } from './store/CartContext.jsx';
import { UserProgressContextProvider } from './store/UserProgressContext.jsx';
import Checkout from './components/Checkout.jsx';


function App() {
  return (
    <>
    {/* //when we wrap the components inside the CartContextProvider the data will be shared between those components */}
    <UserProgressContextProvider>
    <CartContextProvider>
      <Header/>
      <Meals />
      <Cart/>
      <Checkout/>
      </CartContextProvider>
      </UserProgressContextProvider>
    </>
  );
}

export default App;
