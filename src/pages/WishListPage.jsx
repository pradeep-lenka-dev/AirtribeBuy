import {
  Card,
  Container,
  SimpleGrid,
  Image,
  Text,
  Title,
  Flex,
  CloseButton
} from "@mantine/core";
import { useSelector } from "react-redux";

const WishListPage = () => {
  const wishListProductList = useSelector((state) => state.addWishlist);
  return (
    <Container style={{ marginTop: "60px" }}>
      <Title order={3}>
        My Wishlist {wishListProductList.WishlistProduct.length} items
      </Title>

      <SimpleGrid cols={4} spacing='sm' verticalSpacing='sm'>
        {wishListProductList.WishlistProduct.map((wishListProduct) => (
          <Card
            shadow='sm'
            w={200}
            // padding={0}
            radius='md'
            withBorder
            key={wishListProduct.id}
          >
<CloseButton
                title="Remove from wishlist"
                size="lg"
                iconSize={20}
                radius="xl"
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  zIndex: 1,
                }}
              />
            <Card.Section padding={5}>
              <Image src={wishListProduct.image} height={160} fit='contain' style={{margin:"5px", padding:"5px"}}/>
            </Card.Section>
            <Flex direction='column' wrap='wrap'>
              <Text lineClamp={1} fw={500}>{wishListProduct.title}</Text>
              <Text ta="center" fw={700}>Rs.{wishListProduct.price}</Text>
            </Flex>
            <Card.Section withBorder inheritPadding py='xs' style={{cursor:"pointer"}}>
              <Text c='red' ta='center' align='center' padding={5}>
                MOVE TO CART
              </Text>
            </Card.Section>
          </Card>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default WishListPage;
