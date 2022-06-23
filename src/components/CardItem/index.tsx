import Button from "@material-ui/core/Button";
import React from "react";
import { CardItemType } from "../../App";
import { Wrapper } from "./style";

type Props = {
  item: CardItemType;
  addToCard: (clickedItem: CardItemType) => void;
  removeFromCard: (id: number) => void;
};

const CardItem: React.FC<Props> = ({ item, addToCard, removeFromCard }) => (
  <Wrapper>
    <div>
      <h3>{item.title}</h3>
      <div className="information">
        <p>Price: ${item.price}</p>
        <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
      </div>

      <div className="buttons">
        <Button
          variant="contained"
          size="small"
          disableElevation
          onClick={() => removeFromCard(item.id)}
        >
          -
        </Button>
        <p>{item.amount}</p>
        <Button
          variant="contained"
          size="small"
          disableElevation
          onClick={() => addToCard(item)}
        >
          +
        </Button>
      </div>
    </div>

    <img src={item.image} alt={item.title} />
  </Wrapper>
);

export default CardItem;
