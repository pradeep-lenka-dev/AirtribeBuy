import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
// import FilterAndSort from "../components/FilterAndSort";
import { CartProvider } from "../context/CartProductContext";
const AppLayout = () => {
  const currentUserId = "exampleUserId";
  return (
    <AppShell>
      <CartProvider userId={currentUserId}>

      <Header />
      <AppShell.Main style={{paddingTop:"0px"}}>
        {/* <FilterAndSort /> */}
        <Outlet />
      </AppShell.Main>
      </CartProvider>
    </AppShell>
  );
};

export default AppLayout;
