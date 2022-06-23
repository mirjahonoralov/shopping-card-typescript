// Components
import LinearProgress from "@material-ui/core/LinearProgress";
import Drawer from "@material-ui/core/Drawer";
import { Badge, Grid } from "@material-ui/core";
import AddShoppingCart from "@material-ui/icons/AddShoppingCart";
import { useQuery } from "react-query";
import { StyledButton, Wrapper } from "./App.styles";
import Item from "./components/Item";
import { useState } from "react";
import Card from "./components/Card";

export type ProductType = {
  id: number;
  description: string;
  category: string;
  image: string;
  title: string;
  price: number;
  amount: number;
};

const getAllData = async (): Promise<ProductType[]> => {
  return await (await fetch("https://fakestoreapi.com/products")).json();
};

const App = () => {
  const [openCard, setOpenCard] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([] as ProductType[]);
  const { data, error, isLoading } = useQuery("products", getAllData);
  console.log(data);

  const calcTotal = () =>
    selectedProducts.reduce((prev, item) => prev + item.amount, 0);

  const handleAddToCard = (product: ProductType) => {
    setSelectedProducts((prev) => {
      const isThereProduct = prev.find((item) => item.id === product.id);
      console.log(isThereProduct, "isThereProduct");

      if (isThereProduct)
        return prev.map((item) => {
          if (item.id === product.id)
            return { ...item, amount: item.amount + 1 };
          else return item;
        });
      else return [...prev, { ...product, amount: 1 }];
    });
  };

  const handleRemoveProduct = (id: number) =>
    setSelectedProducts((prev) =>
      prev.reduce((old, item) => {
        if (item.id === id) {
          if (item.amount === 1) return old;
          else return [...old, { ...item, amount: item.amount - 1 }];
        }
        return [...old, item];
      }, [] as ProductType[])
    );

  if (isLoading) return <LinearProgress />;
  if (error) return <div>something was wrong</div>;

  return (
    <Wrapper>
      <Drawer anchor="right" open={openCard} onClose={() => setOpenCard(false)}>
        <Card
          cardItems={selectedProducts}
          addToCard={handleAddToCard}
          removeProduct={handleRemoveProduct}
        />
      </Drawer>

      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid xs={12} sm={4} item key={item.id}>
            <Item item={item} addToCard={handleAddToCard} />
          </Grid>
        ))}
      </Grid>

      <StyledButton onClick={() => setOpenCard(true)}>
        <Badge badgeContent={calcTotal()} color="error">
          <AddShoppingCart />
        </Badge>
      </StyledButton>
    </Wrapper>
  );
};

export default App;
