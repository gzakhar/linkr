import "./App.css";

import { createTheme, ThemeProvider } from "@mui/material";
import WalletContextProvider from "./utils/WalletContextProvider";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App = () => {

  return (
    <ThemeProvider theme={theme}>
      <WalletContextProvider>
        <p style={{color: "white"}}>Hello</p>
      </WalletContextProvider>
    </ThemeProvider>
  );
};

export default App;
