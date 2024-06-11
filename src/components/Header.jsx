import { AppShell, Burger, Button, Flex, Text, Input, TextInput, Modal, Indicator, Menu, rem } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { ActionIcon } from "@mantine/core";
import { Avatar } from "@mantine/core";
import { FiHeart } from "react-icons/fi";

import { useModal } from "../context/ModalContext";
import { useGetCartProduct } from "../services/usecartService";
import { useCart } from "../context/CartProductContext";

import {
  IconSettings,
  IconUser,
  IconLogout,
  IconLogin,
} from '@tabler/icons-react';

const Header = () => {
  const { cartItems } = useCart();
  console.log("kkk", cartItems)
  const [opened, { toggle }] = useDisclosure();
  // const [totalCart,setTotal]=useState([])
  const navigate = useNavigate();
  const [openeModal, { open, close }] = useDisclosure(false);
  const { showModal } = useModal();
  console.log('showModal:', showModal); // Add this log
  const userId = "exampleUserId";


  const cartProducts = useGetCartProduct(userId);
  const totalCart = cartProducts.length

  const handleClick = () => {
    showModal();
  };
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
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Indicator color="red" label={cartItems.length} size={15} offset={7}>
                <ActionIcon
                  variant="transparent"
                  size="xl"
                  aria-label="Cart"
                  onClick={() => {
                    if (!localStorage.getItem("AuthToken")) {
                      showModal();
                    } else {
                      navigate("/cart");
                    }
                  }}
                >
                  <CiShoppingCart style={{ width: "70%", height: "70%", color: "black" }} />
                </ActionIcon>
              </Indicator>
            </div>
            <Menu shadow="md" width={200}>
              <Menu.Target>

                <Avatar color='black' alt="it's me" />
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                  Settings
                </Menu.Item>
                <Menu.Item leftSection={<IconUser style={{ width: rem(14), height: rem(14) }} />}>
                  profile
                </Menu.Item>
                <Menu.Item
                  color="blue"
                  leftSection={<IconLogin style={{ width: rem(14), height: rem(14) }} />}
                  onClick={handleClick}
                >
                  Login
                </Menu.Item>
                <Menu.Item
                  color="red"
                  leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
          <Burger opened={opened} onClick={toggle} hiddenFrom='sm' size='sm' />
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar hiddenFrom='sm' p='md'>
        Navbar
      </AppShell.Navbar>
      <Modal opened={openeModal} onClose={close} title="Authentication" centered transitionProps={{ transition: 'fade', duration: 600, timingFunction: 'linear' }}
      >
        {/* Modal content */}
      </Modal>
    </AppShell>

  );
};

export default Header;
