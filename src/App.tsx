import { useQuery } from "react-query";
import { useState } from "react";

// Components
import LinearProgress from "@material-ui/core/LinearProgress";
import Drawer from "@material-ui/core/Drawer";
import { Badge, Grid } from "@material-ui/core";
import AddShoppingCart from "@material-ui/icons/AddShoppingCart";

// styles
import { StyledButton } from "./App.styles";
import Item from "./components/Item";
import Card from "./components/Card";

// types
export type CardItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CardItemType[]> =>
  await (await fetch("https://fakestoreapi.com/products")).json();

const App = () => {
  const [cardOpen, setCardOpen] = useState(false);
  const [cardItems, setCardItems] = useState([] as CardItemType[]);
  const { data, isLoading, error } = useQuery<CardItemType[]>(
    "products",
    getProducts
  );

  const getTotalItems = (items: CardItemType[]) =>
    items.reduce((acc, item) => acc + item.amount, 0);

  const handleAddToCard = (clickedItem: CardItemType) => {
    setCardItems((prev) => {
      const isItemInCard = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCard)
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      else return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const handleRemoveFromCard = (id: number) => {
    setCardItems((prev) =>
      prev.reduce((acc, item) => {
        if (item.id === id) {
          if (item.amount === 1) return acc;
          return [...acc, { ...item, amount: item.amount - 1 }];
        } else return [...acc, item];
      }, [] as CardItemType[])
    );
  };

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong</div>;

  return (
    <Grid container spacing={3}>
      <Drawer open={cardOpen} anchor="right" onClose={() => setCardOpen(false)}>
        <Card
          cardItems={cardItems}
          addToCard={handleAddToCard}
          removeItemFromCard={handleRemoveFromCard}
        />
      </Drawer>

      <StyledButton onClick={() => setCardOpen(true)}>
        <Badge badgeContent={getTotalItems(cardItems)} color="error">
          <AddShoppingCart />
        </Badge>
      </StyledButton>

      {data?.map((item) => (
        <Grid item key={item.id} xs={12} sm={4}>
          <Item item={item} handleAddToCard={handleAddToCard} />
        </Grid>
      ))}
    </Grid>
  );
};

export default App;
