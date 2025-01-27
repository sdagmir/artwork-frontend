import { FC } from 'react';
import { ICartProps } from './typing';
import './Cart.css';
import { Link } from "react-router-dom";

export const Cart: FC<ICartProps> = ({ itemsInCart }) => {
  console.log("Количество товаров в корзине:", itemsInCart);
  return (
    <div
      className="cart-container position-relative"
      style={{ transition: 'transform 550ms' }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-5px)')}
      onMouseLeave={(e) => (e.currentTarget.style.transform = 'translateY(0)')}
    >
      <Link
        to=""
        className="cart-link text-decoration-none"
        onClick={(e) => e.preventDefault()} // Отключает действие ссылки
      >
        <img
          src="/cart.png"
          alt="Basket Icon"
          className="cart-icon"
        />
        {itemsInCart > 0 && (
          <div className="cart-counter">
            {itemsInCart}
          </div>
        )}
      </Link>
    </div>
  );
};
