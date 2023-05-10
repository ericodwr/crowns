import { memo } from 'react';

// styles
import { CategoryItem } from '../../store/categories/categories.types';
import './cart-item.styles.scss';

export type Item = CategoryItem & {
  quantity: number;
};

const CartItem = memo(({ cartItem }: { cartItem: Item }) => {
  const { name, quantity, imageUrl, price } = cartItem;
  return (
    <div className="cart-item-container">
      <img src={imageUrl} alt={name} />
      <div className="item-details">
        <span className="name">{name}</span>
        <span className="price">
          {quantity} x ${price}
        </span>
      </div>
    </div>
  );
});

export default CartItem;
