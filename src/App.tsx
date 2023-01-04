import "./App.css";
import 'react-notifications-component/dist/theme.css'

import { createTheme, ThemeProvider } from "@mui/material";
import WalletContextProvider from "./utils/WalletContextProvider";
import Nav from "./components/Nav";
import Home from "./components/Home";
import { ReactNotifications } from "react-notifications-component";



const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <WalletContextProvider>
        <ReactNotifications />
        <Nav />
        <Home />
      </WalletContextProvider>
    </ThemeProvider>
  );
};

export default App;
