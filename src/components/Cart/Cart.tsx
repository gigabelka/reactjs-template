import React from "react";
import "./Cart.css";
import Button from "../Button/Button";
import { GetItemsType } from "../Types"

type PropsType = {
  CartItems: GetItemsType[];
  TotalPrice: number;
  Them: 'blue' | 'gray';

  onCheckout: () => void;
};

const Cart: React.FC<PropsType> = props => {
  const { CartItems, TotalPrice, Them } = props;
  const { onCheckout } = props;

  return (
    <div className="cart__container">
      <h2 className="cart__container">{`${Math.round(TotalPrice)} THB`}</h2>
      <Button
        title={'Оформить заказ'}
        type={"checkout"}
        onClick={onCheckout}
        disable={CartItems.length === 0 ? true : false}
        team={Them}
      />
    </div>
  );
}

export default Cart;
