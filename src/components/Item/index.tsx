import Button from "@material-ui/core/Button";
import React from "react";
import { Wrapper } from "./style";
import { CardItemType } from "../../App";

type Props = {
  item: CardItemType;
  handleAddToCard: (clickedItem: CardItemType) => void;
};

const Item: React.FC<Props> = ({ item, handleAddToCard }) => (
  <Wrapper>
    <img src={item.image} alt="" />
    <div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <h3>${item.price}</h3>
    </div>
    <Button onClick={() => handleAddToCard(item)}>Add to Card</Button>
  </Wrapper>
);

export default Item;
