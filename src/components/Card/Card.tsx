import React, { useState } from "react";
import Button from "../Button/Button";
import type { GetItemsType } from '../../Types';
// import { HiOutlinePlusCircle, HiOutlineMinusCircle  } from "react-icons/hi";
// import { SlMinus, SlPlus } from "react-icons/sl";
import "./Card.css";

type PropsType = {
  item: GetItemsType;
  Them:'blue' | 'gray';

  onAdd: (item: GetItemsType) => void;
  onRemove: (item: GetItemsType) => void;
  handleOpenWindow: (item: GetItemsType) => void;
};

const Card: React.FC<PropsType> = props => {
  const { item, Them } = props;
  const { onAdd, onRemove, handleOpenWindow} = props;

  const { title, iconUrl, price, weight } = item;

  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 3);
    onAdd(item);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
      onRemove(item);
    }
  };

  const openWindow = () => {
    handleOpenWindow(item);
  };

  const getColors = (count: number): any => {
    if (count <= 9) {
      return {backgroundColor : '#ffffff', color: '#000000', border: '5px solid', borderColor: '#000000'}
    } else if (count >= 10 && count <= 19) {
      return {backgroundColor : '#b11b1b', color: '#ffffff', border: '5px solid', borderColor: '#ffffff'}
    } else if (count >= 20 && count <= 49) {
      return {backgroundColor : '#003a11', color: '#ffffff', border: '5px solid', borderColor: '#ffffff'}
    } else if (count >= 50 && count <= 99) {
      return {backgroundColor : '#011f38', color: '#ffffff', border: '5px solid', borderColor: '#ffffff'}
    } else if (count >= 100) {
      return {backgroundColor : '#000000', color: '#ffffff', border: '5px solid', borderColor: '#ffffff'}
    } else {
      return {};
    }
  };

  return (
    <div className="card">
      <div onClick={openWindow}>
        {count !== 0 ? (<span className="card__badge" style={getColors(count)}>{count}</span>) : null}
        <div className="image__container">
          <img src={iconUrl} alt={title} />
        </div>
        <div className="card__title">
          {title}
        </div>
      </div>
      <div className="card__price">
        {`${price}THB ${weight}pcs`}
      </div>

      <div className="btn__container">
        <Button title={"-"} type={"remove"} onClick={handleDecrement} disable={false} team={Them}/>
        {/* <SlMinus type={"remove"} onClick={handleDecrement} className="btn__container__buttonMinus"/> */}
        <Button title={"+"} type={"add"} onClick={handleIncrement} disable={false} team={Them}/>
        {/* <SlPlus type={"add"} onClick={handleIncrement} className="btn__container__buttonPlus"/> */}
      </div>
    </div>
  );
}

export default Card;
