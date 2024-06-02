import { AppShell } from "@mantine/core";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
// import FilterAndSort from "../components/FilterAndSort";
const AppLayout = () => {
  return (
    <AppShell>
      <Header />
      <AppShell.Main>
        {/* <FilterAndSort /> */}
        <Outlet />
      </AppShell.Main>
    </AppShell>
  );
};

export default AppLayout;
