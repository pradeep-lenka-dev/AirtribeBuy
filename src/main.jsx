import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { store } from "../src/store/store";
import { Provider } from "react-redux";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "./global.css";
import MainAppRouter from "../src/routes/MainAppRouter";
import ReactDOM from "react-dom/client";
const theme = createTheme({});

ReactDOM.createRoot(document.getElementById("root")).render(
  <MantineProvider theme={theme}>
    <Notifications position='top-center' />
    <Provider store={store}>
      <MainAppRouter />
    </Provider>
  </MantineProvider>
);
