import React from "react";
import "./Button.css";

type PropsType = {
  type: string;
  title: string;
  disable: boolean;
  team: 'blue' | 'gray';
  
  onClick: () => void;
};

const Button: React.FC<PropsType> = props => {
  const { type, title, disable, team } = props;
  const { onClick } = props;
  console.log(team);

  return (
    <button
      className={team === 'blue' ? (`btn ${
        (type === "add" && "addBlue") ||
        (type === "remove" && "removeBlue") ||
        (type === "checkout" && "checkout")
      }`) : (`btn ${
          (type === "add" && "addGray") ||
          (type === "remove" && "removeGray") ||
          (type === "checkout" && "checkout")
      }`)}
      disabled={disable}
      onClick={onClick}
    >
      {title}
    </button>
  );
}

export default Button;
