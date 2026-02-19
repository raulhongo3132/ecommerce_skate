import { useContext } from 'react';
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { CheckCircleIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../Context';

// eslint-disable-next-line react/prop-types
const Card = ({ data }) => {
  const {
    openProductDetail,
    closeProductDetail,
    setProductToShow,
    cartProducts,
    setCartProduct,
    openCheckoutSideMenu,
    closeCheckoutSideMenu,
  } = useContext(ShoppingCartContext);

  // eslint-disable-next-line react/prop-types
  const { title, price, category, image } = data;

  const showProduct = (productDetail) => {
    openProductDetail();
    setProductToShow(productDetail);
    closeCheckoutSideMenu();
  };

  const addProductToCart = (event, productData) => {
    event.stopPropagation();
    setCartProduct([...cartProducts, productData]);
    closeProductDetail();
    openCheckoutSideMenu();
  };

  const renderIcon = (id) => {
    const isInCart =
      cartProducts.filter((product) => product.id === id).length > 0;
    if (isInCart) {
      return (
        <CheckCircleIcon
          className="absolute top-1 right-1 flex justify-center items-center size-6 text-green-950"
          onClick={(e) => e.stopPropagation()}
        />
      );
    } else {
      return (
        <PlusCircleIcon
          className="absolute top-1 right-1 flex justify-center items-center size-6 text-green-800 hover:text-green-950"
          onClick={(event) => addProductToCart(event, data)}
        />
      );
    }
  };

  return (
    <div
      className="bg-white cursor-pointer w-44 h-56 sm:w-56 sm:h-64 rounded-lg mb-6 shadow-md hover:shadow-2xl text-green-950"
      onClick={() => showProduct(data)}
    >
      <figure className="relative mb-2 w-full h-4/5 px-2">
        <span className="first-letter:uppercase absolute bottom-0 left-0 bg-green-700 rounded-lg text-white text-xs m-2 px-3 py-0.5">
          {category}
        </span>
        <img
          className="w-full h-full object-contain rounded-lg"
          src={image}
          alt={title}
        />
        {/* eslint-disable-next-line react/prop-types */}
        {renderIcon(data.id)}
      </figure>
      <p className="flex justify-between items-center gap-3 px-2.5">
        <span className="text-xs font-light line-clamp-2">{title}</span>
        <span className="text-lg font-medium">${price}</span>
      </p>
    </div>
  );
};

export default Card;
