import { createAction } from '../../utils/reducer/reducer.utils';
import { CART_ACTION_TYPES } from './cart.types';

// helper
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

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const deleteItemFromCart = (cartItems, cartToRemove) => {
  const newCartItems = deleteCart(cartItems, cartToRemove);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
};

export const setIsCartOpen = () => {
  return createAction(CART_ACTION_TYPES.TOGGLE_CART);
};

export const closeCart = (value) => {
  return createAction(CART_ACTION_TYPES.CLOSE_CART, value);
};
