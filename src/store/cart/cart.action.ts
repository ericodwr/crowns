import {
  createAction,
  withMatcher,
  Action,
  ActionWithPayload,
} from '../../utils/reducer/reducer.utils';
import { CategoryItem } from '../categories/categories.types';
import { CART_ACTION_TYPES, CartItem } from './cart.types';

// helper
// add cart
const addCartItem = (
  cartItems: CartItem[],
  productToAdd: CategoryItem,
): CartItem[] => {
  // if cartItems contains productToAdd
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id,
  );

  // if found, increment quantity
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : { ...cartItem },
    );
  }

  // return new array with modified cartItems / new cart item
  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

// decrease quantity cart
const removeCartItem = (
  cartItems: CartItem[],
  cartItemToRemove: CartItem,
): CartItem[] => {
  // if cartItems contains productToAdd
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id,
  );

  // if cartItem quantity === 1
  if (existingCartItem && existingCartItem.quantity === 1) {
    return cartItems.filter((cartitem) => cartitem.id !== cartItemToRemove.id);
  }

  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : { ...cartItem },
  );
};

// removeCart
const deleteCart = (
  cartItems: CartItem[],
  cartToRemove: CartItem,
): CartItem[] => {
  return cartItems.filter((cartItem) => cartItem.id !== cartToRemove.id);
};

export type SetIsCartOpen = Action<CART_ACTION_TYPES.TOGGLE_CART>;
export type CloseCart = ActionWithPayload<
  CART_ACTION_TYPES.CLOSE_CART,
  boolean
>;

export type SetCartItems = ActionWithPayload<
  CART_ACTION_TYPES.SET_CART_ITEMS,
  CartItem[]
>;

export const setCartItems = withMatcher(
  (cartItems: CartItem[]): SetCartItems =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, cartItems),
);

export const addItemToCart = (
  cartItems: CartItem[],
  productToAdd: CategoryItem,
) => {
  const newCartItems = addCartItem(cartItems, productToAdd);
  return setCartItems(newCartItems);
};

export const removeItemFromCart = (
  cartItems: CartItem[],
  cartItemToRemove: CartItem,
) => {
  const newCartItems = removeCartItem(cartItems, cartItemToRemove);
  return setCartItems(newCartItems);
};

export const deleteItemFromCart = (
  cartItems: CartItem[],
  cartToRemove: CartItem,
) => {
  const newCartItems = deleteCart(cartItems, cartToRemove);
  return setCartItems(newCartItems);
};

export const setIsCartOpen = withMatcher(
  (): SetIsCartOpen => createAction(CART_ACTION_TYPES.TOGGLE_CART),
);

export const closeCart = withMatcher(
  (boolean: boolean): CloseCart =>
    createAction(CART_ACTION_TYPES.CLOSE_CART, boolean),
);
