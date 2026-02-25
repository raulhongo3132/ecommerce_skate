import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../Context';
import { totalPrice } from '../../Utils';
import OrderCard from '../OrderCard';

const CheckoutSideMenu = () => {
  const {
    isCheckoutSideMenuOpen,
    closeCheckoutSideMenu,
    cartProducts,
    setCartProduct,
    order,
    setOrder,
    signOut,
  } = useContext(ShoppingCartContext);

  const handleDelete = (id) => {
    const filteredProducts = cartProducts.filter(
      (product) => product.id !== id
    );
    setCartProduct(filteredProducts);
  };

  const handleCheckout = () => {
    const orderToAdd = {
      date: new Date().toLocaleDateString(),
      products: cartProducts,
      totalProducts: cartProducts.length,
      totalPrice: totalPrice(cartProducts),
      id: nanoid(10),
    };

    setOrder([...order, orderToAdd]);
    setCartProduct([]);
    closeCheckoutSideMenu();
  };

  return (
    <aside
      className={`${
        isCheckoutSideMenuOpen ? 'flex' : 'hidden'
      } top-[84px] md:top-[64px] lg:top-[68px] xl:top-[68px] w-full sm:w-[360px] md:w-[360px] lg:w-[360px] xl:w-[360px] h-[calc(100vh-84px)] sm:h-[calc(100vh-68px)] md:h-[calc(100vh-64px)] lg:h-[calc(100vh-68px)] xl:h-[calc(100vh-68px)] flex-col fixed bg-white text-green-950 right-0 border shadow-md`}
    >
      <div className="flex justify-between items-center px-6 py-4 ">
        <h2 className="font-semibold text-xl">Carrito de compra</h2>
        <div>
          <XMarkIcon
            className="text-green-800 size-6 cursor-pointer hover:text-green-950"
            onClick={() => closeCheckoutSideMenu()}
          />
        </div>
      </div>

      <div className="pt-6 custom-scrollbar overflow-y-auto overflow-x-hidden h-[calc(100%-180px)]">
        {cartProducts.length > 0 ? (
          cartProducts.map((product) => (
            <OrderCard
              key={product.id}
              id={product.id}
              title={product.title}
              image={product.image}
              price={product.price}
              handleDelete={handleDelete}
            />
          ))
        ) : (
          <p className="text-center text-lg font-light">Tu carrito está vacio</p>
        )}
      </div>

      {cartProducts.length > 0 ? (
        <div className="fixed bottom-0 right-0 w-full sm:w-[360px] md:w-[360px] lg:w-[360px] xl:w-[360px] p-6 pt-3 bg-white border-t-2">
          <p className="flex justify-between items-center">
            <span className="text-lg font-medium">Total:</span>
            <span className="text-xl font-bold">
              ${totalPrice(cartProducts)}
            </span>
          </p>
          <Link to={signOut ? `/sign-in` : `/my-orders/last`}>
            <button
              className="w-full mt-4 bg-green-800 hover:bg-green-950 text-white font-medium px-4 py-2 rounded-lg"
              onClick={signOut ? closeCheckoutSideMenu : handleCheckout}
            >
              Comprar
            </button>
          </Link>
        </div>
      ) : null}
    </aside>
  );
};

export default CheckoutSideMenu;
