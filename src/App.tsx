import "./App.css";
import 'react-notifications-component/dist/theme.css'

import { createTheme, ThemeProvider } from "@mui/material";
import WalletContextProvider from "./utils/WalletContextProvider";
import Home from "./components/Home";
import About from "./components/About";
import Landing from "./components/Landing";
import { ReactNotifications } from "react-notifications-component";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";


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
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />} >
              <Route index element={<Landing />} />
              <Route path="/demo" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<div>NOTHING FOUND</div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </WalletContextProvider>
    </ThemeProvider>
  );
};

export default App;
