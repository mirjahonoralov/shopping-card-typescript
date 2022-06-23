import React from "react";
import { CardItemType } from "../../App";
import CardItem from "../CardItem";
import { Wrapper } from "./style";

type Props = {
  cardItems: CardItemType[];
  addToCard: (clickedItem: CardItemType) => void;
  removeItemFromCard: (id: number) => void;
};

const calcTotal = (items: CardItemType[]) =>
  items.reduce((acc, item) => acc + item.price * item.amount, 0);

const Card: React.FC<Props> = ({
  cardItems,
  addToCard,
  removeItemFromCard,
}) => (
  <Wrapper>
    <h2>Your shopping card</h2>
    {cardItems.length === 0 ? <p>No items in card</p> : null}
    {cardItems.map((item) => (
      <CardItem
        item={item}
        addToCard={addToCard}
        removeFromCard={removeItemFromCard}
      />
    ))}
    <h2>Total: {calcTotal(cardItems).toFixed(2)}</h2>
  </Wrapper>
);

export default Card;
