import { BrowserRouter } from "react-router-dom";
import { ShoppingCartProvider, initializeLocalStorage } from "../../Context";
import { AppRoutes } from "../../Routes";
import Navbar from "../../Components/Navbar";
import CheckoutSideMenu from "../../Components/CheckoutSideMenu";
import "./App.css";

const basename_for_router = import.meta.env.VITE_APP_BASE_PATH || "/";

const App = () => {
  initializeLocalStorage();
  return (
    <ShoppingCartProvider>
      <BrowserRouter basename={basename_for_router}>
        <AppRoutes />
        <Navbar />
        <CheckoutSideMenu />
      </BrowserRouter>
    </ShoppingCartProvider>
  );
};

export default App;
