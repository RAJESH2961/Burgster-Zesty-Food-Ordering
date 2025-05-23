import { useContext } from 'react'
import logoImg from '../assets/logo.jpg'
import Button from './UI/Button'
import cartContext from '../store/CartContext'
import UserProgressContext from '../store/UserProgressContext';
export default function Header() {
    const cartCtx = useContext(cartContext);
    //calling the UserProgressContextProvider
    const userProgressCtx = useContext(UserProgressContext);


    //reduce is an default build in function in javascript
    //In this case it will go to every item in items and adds their quantity not only item quantity
    const totalCartItems = cartCtx.items.reduce((totalNumberofItems, item) => {
        return totalNumberofItems + item.quantity;
    }, 0);
    //calling the function named showCart in the UserProgressContext component
    function handleShowCart(){
        userProgressCtx.showCart();
    }
    return <header id="main-header">
        <div id="title">
            <img src={logoImg} alt="A restaurant logo" />
            <h1>Burgster Zesty</h1>
        </div>
        <nav>
            <Button textOnly onClick={handleShowCart}> Cart ({totalCartItems})</Button>
        </nav>
    </header>
}