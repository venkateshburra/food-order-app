import React, { createContext, useReducer } from "react";

const CartContext = createContext({
  item: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const exixstingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.items];

    if (exixstingCartItemIndex > -1) {
      const existingItem = state.items[exixstingCartItemIndex];
      const updatedItem = {
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[exixstingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }

  if (action.type === "REMOVE") {
    const exixstingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    const existingCartItem = state.items[exixstingCartItemIndex];

    const updatedItems = [...state.items];

    if (existingCartItem.quantity === 1) {
      updatedItems.splice(exixstingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[exixstingCartItemIndex] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }

  if (action.type === 'CLEAR_CART') {
    return {...state, items: []}
  }

  return state;
}

export function CartContextProvider({ children }) {
 const [ cart, dispatcCartAction ] = useReducer(cartReducer, { items: [] });


 function addItem(item) {
  dispatcCartAction({ type: 'ADD_ITEM', item: item})
 }

 function removeItem(id) {
  dispatcCartAction({ type: 'REMOVE', id})
 }

 function clearCart() {
  dispatcCartAction({ type: 'CLEAR_CART' })
 }

 
 const cartContext = {
  item: cart.items,
  addItem,
  removeItem,
  clearCart,
 };

 console.log(cartContext);

  return <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>;
}

export default CartContext;
