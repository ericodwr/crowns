import { createContext, useState, useEffect } from 'react';

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

// Cart Provider
export const CartProvider = ({ children }) => {
  // states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [totalCart, setTotalCart] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // tracking price and total cart
  useEffect(() => {
    // getting quantity cart
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0,
    );

    // getting total cart price
    const totalPrice = cartItems.reduce(
      (total, cartItem) => (total += cartItem.price * cartItem.quantity),
      0,
    );

    setTotalPrice(totalPrice);

    setTotalCart(newCartCount);
  }, [cartItems]);

  // function handler
  const addItemToCart = (productToAdd) =>
    setCartItems(addCartItem(cartItems, productToAdd));

  const removeItemFromCart = (cartItemToRemove) =>
    setCartItems(removeCartItem(cartItems, cartItemToRemove));

  const deleteItemFromCart = (cartToRemove) =>
    setCartItems(deleteCart(cartItems, cartToRemove));

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
