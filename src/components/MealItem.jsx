import React, { useContext } from "react";
import { currencyFormatter } from "../utili/formatting";
import Button from "./UI/Button";
import CartContext from "./store/CartContext";
import toast from "react-hot-toast";

export default function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);

  function handleAddMealToCart() {
    cartCtx.addItem(meal);
    toast.success('Item added to Cart successfully')
  }


  return (
    <li className="meal-item">
      <article>
        <img src={`https://food-order-app-2.onrender.com/${meal.image}`} alt={meal.name} />
        <div>
          <h3>{meal.name}</h3>
          <p className="meal-item-price">{currencyFormatter.format(meal.price)}</p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
            <Button onClick={handleAddMealToCart}>Add to Cart</Button>
        </p>
      </article>
    </li>
  );
}
