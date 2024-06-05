import { AppShell, Burger, Button, Flex, Text,Input, TextInput,Modal,Indicator} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { UnstyledButton } from "@mantine/core";
import { CiShoppingCart } from "react-icons/ci";
import { ActionIcon } from "@mantine/core";
import { Avatar } from "@mantine/core";
import { FiHeart } from "react-icons/fi";

import { useModal } from "../context/ModalContext";
import { useEffect,useState } from "react";



const Header = () => {
  const [opened, { toggle }] = useDisclosure();
  const [totalCart,setTotal]=useState([])
  const navigate = useNavigate();
  const [openeModal, { open, close }] = useDisclosure(false);
  const {showModal} =   useModal();
  console.log('showModal:', showModal); // Add this log

  useEffect(()=>{
    const cartProducts = JSON.parse(localStorage.getItem("cartProduct")) || [];
    console.log("🚀 ~ useEffect ~ cartTotal:", cartProducts)
    setTotal(cartProducts.length)
    
  },[])
  

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
          <Button onClick={handleClick}>Login</Button>

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
            <div style={{ display: 'flex', alignItems: 'center' }}>
      <Indicator color="red" label={totalCart} size={15} offset={7}>
        <ActionIcon
          variant="transparent"
          size="xl"
          aria-label="Cart"
          onClick={() => navigate("/cart")}
        >
          <CiShoppingCart style={{ width: "70%", height: "70%", color: "black" }} />
        </ActionIcon>
      </Indicator>
    </div>
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
      <Modal opened={openeModal} onClose={close} title="Authentication" centered   transitionProps={{ transition: 'fade', duration: 600, timingFunction: 'linear' }}
>
        {/* Modal content */}
      </Modal>
    </AppShell>
    
  );
};

export default Header;
