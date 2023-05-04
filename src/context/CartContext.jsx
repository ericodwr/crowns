import { createContext, useReducer } from 'react';

import { createAction } from '../utils/reducer/reducer.utils';

// helper func

// add cart
const addCartItem = (cartItems, productToAdd) => {
  // if cartItems contains productToAdd
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id == productToAdd.id,
  );

  // if found, increment quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id == productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : { ...cartItem },
    );
  }

  // return new array with modified cartItems / new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

// decrease quantity cart
const removeCartItem = (cartItems, cartItemToRemove) => {
  // if cartItems contains productToAdd
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id == cartItemToRemove.id,
  );

  // if cartItem quantity == 1
  if (existingCartItem.quantity == 1) {
    return cartItems.filter((cartitem) => cartitem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id == cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : { ...cartItem },
  );
};

// removeCart
const deleteCart = (cartItems, cartToRemove) => {
  return cartItems.filter((cartItem) => cartItem.id !== cartToRemove.id);
};

// create context
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  totalCart: 0,
  totalPrice: 0,
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  deleteItemFromCart: () => {},
});

// reducer
const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  totalCart: 0,
  totalPrice: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case 'SET_CART_ITEMS':
      return {
        ...state,
        ...payload,
      };
    case 'TOGGLE_CART':
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };

    default:
      throw new Error(`unhandled type of ${type} in cartReducer`);
  }
};

// Cart Provider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const { cartItems, totalCart, totalPrice, isCartOpen } = state;

  // function handler
  const updateCartItemsReducer = (newCartItems) => {
    // getting quantity cart
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0,
    );

    // getting total cart price
    const totalPrice = newCartItems.reduce(
      (total, cartItem) => (total += cartItem.price * cartItem.quantity),
      0,
    );

    dispatch(
      createAction('SET_CART_ITEMS', {
        cartItems: newCartItems,
        totalPrice,
        totalCart: newCartCount,
      }),
    );
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemsReducer(newCartItems);
  };

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const deleteItemFromCart = (cartToRemove) => {
    const newCartItems = deleteCart(cartItems, cartToRemove);
    updateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = () => {
    dispatch(createAction('TOGGLE_CART'));
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    totalCart,
    totalPrice,
    addItemToCart,
    removeItemFromCart,
    deleteItemFromCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
