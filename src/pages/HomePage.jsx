import {
  Box,
  SimpleGrid,
  Image,
  Card,
  Flex,
  Text,
  Rating,
  Chip,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { useGetAllProducts } from "../services/useProductServices";
import { handelAddToCart } from "../services/usecartService";
import FilterAndSort from "../components/FilterAndSort";

import { IconHeart, IconHeartFilled } from "@tabler/icons-react";
import { useDispatch } from "react-redux";
import { addWishlist } from "../store/wishListSlice";
import { Loader } from '@mantine/core';

const HomePage = () => {
  const navigate = useNavigate();
  const [products, loading] = useGetAllProducts();
  const [wishlist, setWishlist] = useState({});
  const [hoveredProduct, setHoveredProduct] = useState(null);

  // const wishlistProduct = useSelector((state)=>state.WishlistProduct.value);
  const dispatch = useDispatch();

  if (loading) {
    return <Flex justify="center" align="center" w="100%" h="100vh">
      <Loader color="blue" type="dots" size="xl" />;
    </Flex>
  }
  const toggleWishlist = (product) => {
    setWishlist((prevWishlist) => ({
      ...prevWishlist,
      [product.id]: !prevWishlist[product.id],
    }));
  };
  const handelAddToWishlist = (product) => {
    dispatch(addWishlist(product))
  }
  function addToCart(product) {
    handelAddToCart(product);
  }

  return (
    <Box w='100%' style={{ padding: "0px", marginTop: "25px" }}>
      <FilterAndSort />
      <SimpleGrid
        cols={{ base: 1, xs: 2, sm: 2, md: 4, lg: 6, xl: 6 }}
        style={{ marginTop: "10px" }}
      >
        {products.map((product) => (
          <Card
            className='product-card'
            shadow='sm'
            radius='md'
            key={product.id}
            onMouseEnter={() => setHoveredProduct(product.id)}
            onMouseLeave={() => setHoveredProduct(null)}
          >
            <Flex
              onClick={() => navigate(`/${product.id}`)}
              gap={10}
              p={10}
              direction='column'
              justify='center'
              s
            >
              <Box w='100%'>
                <Image
                  h={200}
                  fit='contain'
                  src={product.image}
                  alt='Product image'
                />
              </Box>
              <Text fz={15} fw={600} className="product-title ">
                {product.title}
              </Text>
              <Flex align='center' gap={10}>
                {product?.rating?.rate ? (
                  <Rating defaultValue={product.rating.rate} />
                ) : null}
                <Text c='dimmed' fz={10} fw={500}>
                  {product?.rating?.count ?? 0} Reviews
                </Text>
              </Flex>
              <Text fz={20} fw={800}>
                ₹{Number(product.price).toFixed(2)}
              </Text>
            </Flex>
            {/* <Flex justify='space-between' p={10}> */}
            {/* <Button style={{ backgroundColor: "#F76707" }} onClick={()=>{addToCart(product)}}>
                Add To Cart
              </Button> */}
            {hoveredProduct == product.id ? (
            <div className="wishlist-button-container">
            <Chip
              variant="outline"
              size="md"
              radius="sm"
              className="full-width-chip"
              checked={wishlist[product.id] || false}
              onChange={() => toggleWishlist(product)}
              onClick={() => handelAddToWishlist(product)}
            >
              {wishlist[product.id] ? (
                <IconHeartFilled className="custom-chip-icon" />
              ) : (
                <IconHeart className="custom-chip-icon" />
              )}
              WISHLISTED
            </Chip>
          </div>
            ) : (
              <></>
            )}

            {/* </Flex> */}
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default HomePage;
