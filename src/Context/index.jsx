import { createContext, useState, useEffect } from 'react';
import { apiUrl } from '../Api';
import { Storage } from '../Utils/Storage';
import { products } from '../data/products';

// eslint-disable-next-line
export const ShoppingCartContext = createContext();

// eslint-disable-next-line
export const initializeLocalStorage = () => {
  const accountInLocalStorage = Storage.getItem('account');
  const signOutInLocalStorage = Storage.getItem('sign-out');
  let parsedAccount = null;
  let parsedSignOut = true;

  if (!accountInLocalStorage) {
    Storage.setItem('account', parsedAccount);
  } else {
    parsedAccount = accountInLocalStorage;
  }

  if (signOutInLocalStorage !== null) {
    parsedSignOut = signOutInLocalStorage;
  } else {
    Storage.setItem('sign-out', parsedSignOut);
  }

  return { parsedAccount, parsedSignOut };
};

// eslint-disable-next-line react/prop-types
export const ShoppingCartProvider = ({ children }) => {
  // Local Storage
  const { parsedAccount, parsedSignOut } = initializeLocalStorage();

  // My Account
  const [account, setAccount] = useState(parsedAccount || {});

  // Sign Out
  const [signOut, setSignOut] = useState(parsedSignOut);

  // Has an account
  const hasAnAccount = () => {
    const accountParsed = Storage.getItem('account');
    const noAccountInLocalStorage = accountParsed
      ? Object.keys(accountParsed).length === 0
      : true;
    const noAccountInLocalState = account
      ? Object.keys(account).length === 0
      : true;
    const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState;
    return {
      accountParsed: accountParsed,
      hasUserAnAccount: hasUserAnAccount,
    };
  };

  // Product Detail - Open/Close
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  const openProductDetail = () => setIsProductDetailOpen(true);
  const closeProductDetail = () => setIsProductDetailOpen(false);

  // Checkout Side Menu - Open/Close
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
  const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

  // Loading Skeleton
  const [isLoading, setIsLoading] = useState(true);

  // Get Products
  const [items, setItems] = useState(null);

  // API - Get Products
  useEffect(() => {
    setItems(products);
    setIsLoading(false);
  }, []);

  // Menu - Open/Close
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Product Detail - Show product
  const [productToShow, setProductToShow] = useState({});

  // Shopping Cart - Add products to cart
  const savedCart = Storage.getItem('cart') || [];
  const [cartProducts, setCartProduct] = useState(savedCart);

  useEffect(() => {
    Storage.setItem('cart', cartProducts);
  }, [cartProducts]);


  // Shopping Cart - Order
  const [order, setOrder] = useState([]);

  // Get Products - Search by title
  const [searchByTitle, setSearchByTitle] = useState('');

  // Get Products - Search by category
  const [searchByCategory, setSearchByCategory] = useState('');

  // Get Filtered Products
  const [filteredItems, setFilteredItems] = useState(null);

  // Función genérica de filtrado
  const filterItems = (items, { key, value }) => {
    if (!items || !value) return items;

    const searchValue = value.toLowerCase();

    return items.filter((item) =>
      item[key]?.toLowerCase().includes(searchValue)
    );
  };

  // Función principal de filtrado combinado
  const filteredBy = (items, title, category) => {
    let result = items;

    if (category) {
      result = filterItems(result, { key: 'category', value: category });
    }

    if (title) {
      result = filterItems(result, { key: 'title', value: title });
    }

    return result;
  };

  useEffect(() => {
    setFilteredItems(filteredBy(items, searchByTitle, searchByCategory));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items, searchByTitle, searchByCategory]);

  return (
    <ShoppingCartContext.Provider
      value={{
        openProductDetail,
        closeProductDetail,
        isProductDetailOpen,
        productToShow,
        setProductToShow,
        cartProducts,
        setCartProduct,
        isCheckoutSideMenuOpen,
        openCheckoutSideMenu,
        closeCheckoutSideMenu,
        order,
        setOrder,
        items,
        setItems,
        searchByTitle,
        setSearchByTitle,
        filteredItems,
        searchByCategory,
        setSearchByCategory,
        isLoading,
        isMenuOpen,
        setIsMenuOpen,
        account,
        setAccount,
        signOut,
        setSignOut,
        hasAnAccount,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
