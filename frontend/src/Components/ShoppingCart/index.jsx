import { useContext } from 'react';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../Context';

const ShoppingCart = () => {
  const { openCheckoutSideMenu, closeProductDetail, cartProducts } =
    useContext(ShoppingCartContext);

  const openCart = () => {
    openCheckoutSideMenu();
    closeProductDetail();
  };

  return (
    <div className="relative flex gap-0.5 items-center" onClick={openCart}>
      <ShoppingBagIcon className="text-green-900 size-6 cursor-pointer hover:text-green-950" />
      <div className="absolute p-1 bottom-3.5 left-3.5 flex justify-center items-center rounded-full bg-green-50 size-4 text-xs text-green-950 shadow-lg font-semibold">
        {cartProducts.length}
      </div>
    </div>
  );
};

export default ShoppingCart;
