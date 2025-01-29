import { FC } from 'react';
import { ICartProps } from './typing';
import './Cart.css';
import { Link } from "react-router-dom";
import cartImage from "/images/cart.png";
import { useAppSelector } from '../../core/store/hooks';

export const Cart: FC<ICartProps> = () => {
  const { itemsInCart, expertiseId } = useAppSelector((state) => state.app);
  const { isAuth } = useAppSelector((state) => state.user);
  const isInactive = !isAuth || itemsInCart === 0; 

  return (
    <div
      className={`cart-container position-relative ${isInactive ? 'inactive' : ''}`}
      style={{ transition: isInactive ? 'none' : 'transform 550ms' }}
      onMouseEnter={(e) => {
        if (!isInactive) e.currentTarget.style.transform = 'translateY(-5px)';
      }}
      onMouseLeave={(e) => {
        if (!isInactive) e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {isAuth ? (
        <Link to={`/expertise/${expertiseId}`} className="cart-link text-decoration-none">
          <img src={cartImage} alt="Basket Icon" className="cart-icon" />
          {itemsInCart > 0 && <div className="cart-counter">{itemsInCart}</div>}
        </Link>
      ) : (
        <div className="cart-link text-decoration-none disabled">
          <img src={cartImage} alt="Basket Icon" className="cart-icon" />
        </div>
      )}
    </div>
  );
};
