import { AnyAction } from 'redux';

import { setIsCartOpen, closeCart, setCartItems } from './cart.action';

import { CartItem } from './cart.types';

export type CartState = {
  readonly isCartOpen: boolean;
  readonly cartItems: CartItem[];
};

export const INITIAL_STATE: CartState = {
  isCartOpen: false,
  cartItems: [],
};

export const cartReducer = (
  state = INITIAL_STATE,
  action: AnyAction,
): CartState => {
  if (setIsCartOpen.match(action)) {
    return {
      ...state,
      isCartOpen: !state.isCartOpen,
    };
  }

  if (closeCart.match(action)) {
    return {
      ...state,
      isCartOpen: action.payload,
    };
  }

  if (setCartItems.match(action)) {
    return {
      ...state,
      cartItems: action.payload,
    };
  }

  return state;
};
