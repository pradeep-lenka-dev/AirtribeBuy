import { useGetCartProduct } from "../services/usecartService";
import {
  Box,
  Card,
  Container,
  SimpleGrid,
  Flex,
  Image,
  Text,
  Rating,
  Badge,
  Button,
  ScrollArea,
  Group
} from "@mantine/core";
import { useState } from "react";
import { useCart } from "../context/CartProductContext";



const CartPage = () => {
  const userId = "exampleUserId";
  // const cartProductList = useGetCartProduct(userId);
  const [isSticky, setIsSticky] = useState(false);
  const { cartItems } = useCart();

  if (cartItems.length == 0) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
      <Card mt={50} padding="lg" radius="md" style={{ width: '50%', textAlign: 'center' }}>
        <Card.Section>
          <Image
            src="/emtycart.png"
            height={300}
            alt="Norway"
            fit="contain"
          />
        </Card.Section>



        <Text mt="xl" fw={500} color="pink">Your Cart is empty</Text>

        <Text size="sm" c="dimmed">
          Add something to make me happy :)
        </Text>

        <Button color="blue" fullWidth mt="xl" radius="md">
          Continue Shopping
        </Button>
      </Card>
    </div>
  }
  const handleScroll = () => {
    if (window.pageYOffset > 100) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  };
  window.addEventListener("scroll", handleScroll);

  const calculateTotal = () => {
    let total = 0;

    cartItems.forEach((cartProduct) => {
      total = total + Number(cartProduct.price) * cartProduct.quantity;
      console.log("🚀 ~ cartItems.forEach ~ total:", total)
    });

    return total.toFixed(2); // Return total amount with 2 decimal places
  };
  const calculateProductTotal = (cartProduct) => {
    return (Number(cartProduct.price) * cartProduct.quantity).toFixed(2);
  };

  return (
    <Container style={{ marginTop: "45px" }}>
      <SimpleGrid>
        <Card withBorder shadow='sm' radius='md'>
          <ScrollArea h={550}>
            <Flex>
              <Box flex={4} pl={5}>
                {cartItems.map((cartProduct) => (
                  <Card key={cartProduct.id} shadow='sm' radius='md' mb={3}>
                    <Flex gap={20} p={10} direction='row' justify='left'>
                      <Box>
                        <Image h={100} fit='contain' src={cartProduct.image} />
                        <Flex
                          align='center'
                          gap='md'
                          style={{ marginTop: "5px" }}
                        >
                          <Button
                            variant='outline'
                            size='xs'
                            color='gray'
                            radius='xl'
                          >
                            -
                          </Button>
                          <Card
                            withBorder
                            padding='xs'
                            shadow='sm'
                            radius='sm'
                            style={{
                              width: "60px",
                              height: "35",
                              alignItems: "center",
                              textAlign: "center",
                              padding: "3px",
                            }}
                          >
                            {cartProduct.quantity}
                          </Card>

                          <Button
                            variant='outline'
                            size='xs'
                            color='gray'
                            radius='xl'
                          >
                            +
                          </Button>
                        </Flex>
                      </Box>
                      <Flex direction='column' gap={10}>
                        <Text fontSize={15} fontWeight={600}>
                          {cartProduct.title}
                        </Text>
                        <Flex align='center' gap={10}>
                          {cartProduct?.rating.rate ? (
                            <Rating defaultValue={cartProduct.rating.rate} />
                          ) : null}
                          <Text color='dimmed' fontSize={20} fontWeight={500}>
                            {cartProduct?.rating?.count ?? 0} Reviews
                          </Text>
                        </Flex>
                        <Flex>
                          <Badge color='violet' size='lg'>
                            {cartProduct?.category}
                          </Badge>
                        </Flex>
                        <Text fontSize={20} fontWeight={800}>
                          ₹{calculateProductTotal(cartProduct)}
                          {/* ₹{Number(cartProduct?.price).toFixed(2)} */}
                        </Text>
                      </Flex>
                    </Flex>
                  </Card>
                ))}
              </Box>
            </Flex>
          </ScrollArea>
          <Flex
            flex={1}
            position='fixed'
            // bu={isSticky ? 0 : undefined}
            zIndex={1}
            backgroundColor='white'
            p={3}
          >
            <Text fontWeight={600}>Total: ₹{calculateTotal()}</Text>
            <Button
              fullWidth
              mt={2}
              variant='filled'
              color='#F76707'
              size='lg'
              disabled={cartItems.length === 0}
            //   onClick={handlePlaceOrder}
            >
              Place Order
            </Button>
          </Flex>
        </Card>
      </SimpleGrid>
    </Container>
  );
};

export default CartPage;
