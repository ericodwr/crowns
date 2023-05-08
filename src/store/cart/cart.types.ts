import { CategoryItem } from '../categories/categories.types';

export enum CART_ACTION_TYPES {
  SET_CART_ITEMS = 'SET_CART_ITEMS',
  TOGGLE_CART = 'TOGGLE_CART',
  CLOSE_CART = 'CLOSE_CART',
}

export type CartItem = CategoryItem & {
  quantity: number;
};
