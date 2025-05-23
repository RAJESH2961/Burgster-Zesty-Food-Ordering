import { useContext } from "react";
import Modal from "./UI/Modal";
import CartContext from "../store/CartContext";
import { currencyFormatter } from "../util/formatting";
import Button from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./CartItem";


export default function Cart(){
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

    //handle close cart
    function handleCloseCart(){
        userProgressCtx.hideCart();
    }

    function handleGoToCheckout(){
        userProgressCtx.showCheckout();
    }


    const cartTotal = cartCtx.items.reduce((totalPrice, item) => totalPrice+item.quantity * item.price, 0);
    // If it is equal to cart the Modal will be opened
    return <Modal className="cart" open={userProgressCtx.progress === 'cart'} onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null}>
        {/* onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null  fix : to show checkout form */ }
        <h2>Your cart</h2>
        <ul>
            {cartCtx.items.map(item => (<CartItem key={item.id} name={item.name} quantity={item.quantity} price={item.price} onIncrease={() => cartCtx.addItem(item)} onDecrease={() => cartCtx.removeItem(item.id)} />))}
        </ul>
        <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
        <p className="modal-actions">
            <Button textOnly onClick={handleCloseCart}>Close</Button>
            {/* //Conditionally rendering if no items present we dont need to checkout */}
            {cartCtx.items.length > 0 && <Button onClick={handleGoToCheckout}>Go to checkout</Button>}
        </p>
    </Modal>
}