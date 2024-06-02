import {
  Flex,
  Stack,
  Box,
  Text,
  Button,
  Image,
  SimpleGrid,
  Badge,
  Rating,
  Card,
  Spoiler
} from "@mantine/core";
import { useParams, useNavigate } from "react-router-dom";
import {
  useGetProductDetails,
  useGetAllProductsInCategory,
} from "../services/useProductServices";
import { CATEGORY } from "../constants/category";
import { handelAddToCart } from "../services/usecartService";



const ProductDetailsPage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [product, loading] = useGetProductDetails(params.productId);
  const [products] = useGetAllProductsInCategory(product.category);
  // handeladdToCart(product)

  const AddToCart = (product) => {
    handelAddToCart(product);
  };
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <Stack gap='lg' w='100%' style={{marginTop:"45px"}}>
      <SimpleGrid
        cols={{ base: 1, xs: 1, sm: 1, md: 2, lg: 2, xl: 2 }}
        w='100%'
      >
        <Box mah={500}>
          <Image fit='contain' h='100%' src={product.image} />
        </Box>

        <Stack gap={30}>
          <Text fz={30} fw={500}>
            {product.title}
          </Text>
          <Spoiler maxHeight={120} showLabel='Show more' hideLabel='Hide'>
            <Text c='dimmed' fz={20} fw={500}>
              {product.description}
            </Text>
          </Spoiler>
          <Badge color={CATEGORY[product.category]?.color}>
            <Text fz={12} fw={500} c={CATEGORY[product.category]?.textColor}>
              {product.category}
            </Text>
          </Badge>
          <Flex align='center' gap={10}>
            {product?.rating?.rate ? (
              <Rating defaultValue={product.rating.rate} />
            ) : null}
            <Text c='dimmed' fz={20} fw={500}>
              {product?.rating?.count ?? 0} Reviews
            </Text>
          </Flex>
          <Text fz={30} fw={600}>
            ₹{Number(product.price).toFixed(2)}
          </Text>
          <Button
            onClick={() => AddToCart(product)}
            color='orange'
            radius='md'
            size='lg'
          >
            Add To Cart
          </Button>
        </Stack>
      </SimpleGrid>
      <Text mt={50} fz={25} fw={500}>
        People also bought
      </Text>
      <SimpleGrid cols={{ base: 1, xs: 1, sm: 1, md: 3, lg: 5 }}>
        {products.map((product) => (
          <Card
            onClick={() => navigate(`/${product.id}`)}
            className='product-card'
            shadow='sm'
            radius='md'
            key={product.id}
          >
            <Flex
              gap={20}
              p={10}
              direction='column'
              justify='center'
              align='center'
            >
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
            </Flex>
          </Card>
        ))}
      </SimpleGrid>
    </Stack>
  );
};

export default ProductDetailsPage;
