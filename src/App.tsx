import "./App.css";

import { createTheme, ThemeProvider } from "@mui/material";
import WalletContextProvider from "./utils/WalletContextProvider";
import Nav from "./components/Nav";
import Home from "./components/Home";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <WalletContextProvider>
        <Nav />
        <Home />
      </WalletContextProvider>
    </ThemeProvider>
  );
};

export default App;
