import { currencyFormatter } from "../util/formatting"
import Button from "./UI/Button"
import { useContext } from "react"
import cartContext from "../store/CartContext"

export default function MealItem({meal}) {// we can also accept the one prop object or we can accept seperate

    const cartCtx = useContext(cartContext);

    function handleAddMealToCart(){
        //calling he addItem function inside the CardContext component
        cartCtx.addItem(meal);
    }
    return <li className="meal-item">
        <article>
            <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
            <div>
                <h3>{meal.name}</h3>
                <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
                <p className="meal-item-description">{meal.description}</p>
            </div>
            <p className="meal-item-actions">
                <Button onClick={handleAddMealToCart}>Add to cart</Button>
            </p>
        </article>
    </li>
}