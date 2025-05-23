import { currencyFormatter } from "../util/formatting"
export default function CartItem({name, quantity, price, onIncrease, onDecrease}) {
    return <li className="cart-item">
        <p>
            {name} - {quantity} X {currencyFormatter.format(price)}
        </p>
        <p className="cart-item-actions">
            {/* //OnIncrease and OnDecrease function is received as an props from parent component which is called the CartContext at the end */}
            {/* In the end both will call the add item to cart and remove item from cart function which is located in CartContect */}
            {/* the parent component have the acess to context */}
            <button onClick={onDecrease}>-</button>
            <span>{quantity}</span>
            <button onClick={onIncrease}>+</button>
        </p>
    </li>
}