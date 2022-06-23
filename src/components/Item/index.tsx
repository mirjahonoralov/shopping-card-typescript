import { Button } from "@material-ui/core";
import { ProductType } from "../../App";
import { Wrapper } from "./style";

type props = {
  item: ProductType;
  addToCard: (selectedItem: ProductType) => void;
};

const Item: React.FC<props> = ({ item, addToCard }) => (
  <Wrapper>
    <img src={item.image} alt="" />
    <h3>{item.title}</h3>
    <p>{item.description}</p>
    <h3>${item.price.toFixed(2)}</h3>
    <Button variant="contained" color="primary" onClick={() => addToCard(item)}>
      Sale
    </Button>
  </Wrapper>
);

export default Item;
