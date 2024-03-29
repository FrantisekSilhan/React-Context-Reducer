import { useContext, useId, useReducer, useRef } from "react";
import Styles from "./ShoppingCart.module.css";
import { ThemeContext } from "../providers/ThemeProvider";

interface IShoppingItem {
  name: string;
  price: number;
  id: number;
}

const shoppingItems: Array<IShoppingItem> = [
  {
    id: 1,
    name: "kostlán",
    price: 25000
  },
  {
    id: 2,
    name: "indické dítě",
    price: 20000
  },
  {
    id: 3,
    name: "idk",
    price: 111
  },
]

type ActionType = {
  type: "ADD";
  name: string;
  price: number;
} | {
  type: "DELETE";
  id: number;
} | {
  type: "UPDATENAME";
  id: number;
  name: string;
}

const reducer = (state: Array<IShoppingItem>, action: ActionType) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          name: action.name,
          price: action.price,
          id: state.length + 1
        }
      ];
    case "DELETE":
      return state.filter(x => x.id !== action.id);
    case "UPDATENAME":
      return state.map(item => item.id === action.id ? { ...item, name: action.name } : item);
    default:
      return state;
  }
}

export const ShoppingCart: React.FC = () => {
  const [cart, dispatch] = useReducer(reducer, shoppingItems);
  const inputName = useRef<HTMLInputElement>(null);
  const inputPrice = useRef<HTMLInputElement>(null);

  const inputNewName = useRef<HTMLInputElement>(null);
  const inputId = useRef<HTMLInputElement>(null);

  const inputNameId = useId();
  const inputPriceId = useId();
  const inputNewNameId = useId();
  const inputIdId = useId();

  const data = useContext(ThemeContext);
  return (
    <div className={data.theme === "Light" ? [Styles["shopping-cart--light"], Styles["shopping-cart"]].join(" ") : [Styles["shopping-cart--dark"], Styles["shopping-cart"]].join(" ")}>
      <div className={Styles["shopping-cart__items"]}>
        {
          cart.map(shoppingItem => (
            <div className={Styles["shopping-cart__item"]}>
              <div>
                <p>{shoppingItem.id}</p>
                <p>{shoppingItem.name}</p>
                <p>{shoppingItem.price}</p>
              </div>
              <button onClick={() => {dispatch({
                type: "DELETE",
                id: shoppingItem.id
              })}}>Delete</button>
            </div>
          ))
        }
      </div>
      <div>
        <p>Add new item</p>
        <div>
          <label htmlFor={inputNameId}>Price</label>
          <input id={inputNameId} type="number" ref={inputPrice}></input>
          <label htmlFor={inputPriceId}>Name</label>
          <input id={inputPriceId} type="text" ref={inputName}></input>
          <button onClick={() => {dispatch({
            type: "ADD",
            name: String(inputName?.current?.value),
            price: Number(inputPrice?.current?.value)
          })}}>Add</button>
        </div>
      </div>
      <div>
        <p>Change name</p>
        <div>
          <label htmlFor={inputNewNameId}>Id</label>
          <input id={inputNewNameId} type="number" ref={inputId}></input>
          <label htmlFor={inputIdId}>Name</label>
          <input id={inputIdId} type="text" ref={inputNewName}></input>
          <button onClick={() => {dispatch({
            type: "UPDATENAME",
            name: String(inputNewName?.current?.value),
            id: Number(inputId?.current?.value)
          })}}>Update</button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;