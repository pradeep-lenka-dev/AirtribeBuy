import { Box, SimpleGrid, Image, Card, Flex, Text, Button,Rating } from "@mantine/core";
import { useNavigate } from "react-router-dom";

import { useGetAllProducts } from "../services/useProductServices";
import { handelAddToCart } from "../services/usecartService";
import FilterAndSort from "../components/FilterAndSort"

const HomePage = () => {
  const navigate = useNavigate();
  const [products, loading] = useGetAllProducts();
  if (loading) {
    return <p>Loading...</p>;
  }

  function addToCart(product) {
    handelAddToCart(product);
  }

  return (
    <Box w='100%' style={{padding:'0', marginTop:'25px'}}>
      <FilterAndSort />
      <SimpleGrid cols={{ base: 1, xs: 2, sm: 2, md: 4, lg: 4, xl: 4 }} style={{marginTop:'10px'}}>
        {products.map((product) => (
          <Card
            className='product-card'
            shadow='sm'
            radius='md'
            key={product.id}
          >
            <Flex
              onClick={() => navigate(`/${product.id}`)}
              gap={10}
              p={10}
              direction='column'
              justify='center'
s            >
              <Box w='100%'>
                <Image
                  h={200}
                  fit='contain'
                  src={product.image}
                  alt='Product image'
                />
              </Box>
              <Text fz={15} fw={600}>
                {product.title}
              </Text>
              <Flex align='center' gap={10}>
                {product?.rating?.rate ? (
                  <Rating defaultValue={product.rating.rate} />
                ) : null}
                <Text c='dimmed' fz={20} fw={500}>
                  {product?.rating?.count ?? 0} Reviews
                </Text>
              </Flex>
              <Text fz={20} fw={800}>
                ₹{Number(product.price).toFixed(2)}
              </Text>
            </Flex>
            <Flex justify='space-between' p={10}>
              <Button style={{ backgroundColor: "#F76707" }} onClick={()=>{addToCart(product)}}>
                Add To Cart
              </Button>
              <Button style={{ backgroundColor: "#533298" }}>Buy Now</Button>
            </Flex>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default HomePage;
