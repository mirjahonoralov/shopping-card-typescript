import { ProductType } from "../../App";
import CardItem from "./CardItem";
import { Container } from "./style";

type prop = {
  cardItems: ProductType[];
  addToCard: (selectedItem: ProductType) => void;
  removeProduct: (id: number) => void;
};

const Card: React.FC<prop> = ({ cardItems, addToCard, removeProduct }) => (
  <Container>
    <h2>Your shopping card</h2>
    {cardItems.length === 0 ? <div>Products not found</div> : null}
    {cardItems?.map((item) => (
      <CardItem
        key={item.id}
        item={item}
        addToCard={addToCard}
        removeProduct={removeProduct}
      />
    ))}
  </Container>
);

export default Card;
