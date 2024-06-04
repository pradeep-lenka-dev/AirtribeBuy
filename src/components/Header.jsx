import { AppShell, Burger, Button, Flex, Text, TextInput } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { UnstyledButton } from "@mantine/core";
import { CiShoppingCart } from "react-icons/ci";
import { ActionIcon } from "@mantine/core";
import { Avatar } from "@mantine/core";
import { FiHeart } from "react-icons/fi";




const Header = () => {
  const [opened, { toggle }] = useDisclosure();
  const navigate = useNavigate();

  return (
    <AppShell
      header={{ height: 50 }}
      navbar={{
        breakpoint: "sm",
        collapsed: { mobile: !opened },
      }}
      padding='md'
    >
      <AppShell.Header p='sm'>
        <Flex h='100%' align='center' gap={10}>
          <Flex
            flex={1}
            onClick={() => navigate("/")}
            style={{ cursor: "pointer" }}
          >
            <Text fz={20} fw={600}>
              <span className='Text Airtribe'>Airtribe</span>
              <span className='Text Buy'>Buy</span>
            </Text>
          </Flex>
          <TextInput visibleFrom='sm' placeholder='Search product' flex={1} />
          <Flex visibleFrom='sm' gap={2} ml='auto'>
            {/* <Button>Login</Button> */}

            <ActionIcon
              variant='transparent'
              size='xl'
              aria-label='Settings'
              onClick={() => navigate("/wishlist")}
              
            >
              <FiHeart
                style={{ width: "60%", height: "60%", color: "black" }}
                // stroke={1.5}
              />
            </ActionIcon>

            <ActionIcon
              variant='transparent'
              size='xl'
              aria-label='Settings'
              onClick={() => navigate("/cart")}
            >
              <CiShoppingCart
                style={{ width: "70%", height: "70%", color: "black" }}
                stroke={1.5}
              />
            </ActionIcon>
            <Avatar color='black' alt="it's me" />

            {/* <UnstyledButton>
              <VscAccount style={{ fontSize: "25px" }} />
            </UnstyledButton> */}
          </Flex>
          <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar hiddenFrom='sm' p='md'>
        Navbar
      </AppShell.Navbar>
    </AppShell>
  );
};

export default Header;
