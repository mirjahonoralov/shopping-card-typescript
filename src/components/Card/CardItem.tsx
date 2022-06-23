import { Button } from "@material-ui/core";
import { ProductType } from "../../App";
import { Wrapper } from "./style";

type prop = {
  item: ProductType;
  addToCard: (selectedProduct: ProductType) => void;
  removeProduct: (id: number) => void;
};

const CardItem: React.FC<prop> = ({ item, addToCard, removeProduct }) => (
  <Wrapper>
    <div style={{ width: "100%" }}>
      <h3>{item.title}</h3>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <span>Price: ${item.price.toFixed(2)}</span>
        <span>Total: ${(item.amount * item.price).toFixed(2)}</span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => removeProduct(item.id)}
        >
          -
        </Button>
        {item.amount}
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => addToCard(item)}
        >
          +
        </Button>
      </div>
    </div>
    <img src={item.image} alt="" />
  </Wrapper>
);

export default CardItem;
