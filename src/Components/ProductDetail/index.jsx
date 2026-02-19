import { useContext } from 'react';
import { XMarkIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../Context';

const ProductDetail = () => {
  const { productToShow, isProductDetailOpen, closeProductDetail } =
    useContext(ShoppingCartContext);

  return (
    <aside
      className={`${
        isProductDetailOpen ? 'flex' : 'hidden'
      } top-[84px] md:top-[64px] lg:top-[68px] xl:top-[68px] w-full sm:w-[360px] md:w-[360px] lg:w-[360px] xl:w-[360px] h-[calc(100vh-84px)] sm:h-[calc(100vh-68px)] md:h-[calc(100vh-64px)] lg:h-[calc(100vh-68px)] xl:h-[calc(100vh-68px)] flex-col fixed bg-white text-green-950 right-0 border shadow-md overflow-y-auto custom-scrollbar`}
    >
      <div className="flex justify-between items-center p-6">
        <h2 className="font-semibold text-xl">Detalles</h2>
        <div>
          <XMarkIcon
            className="text-green-800 size-6 cursor-pointer hover:text-green-950"
            onClick={() => closeProductDetail()}
          />
        </div>
      </div>

      <figure>
        <img
          className="w-full max-h-80 object-contain rounded-lg my-6 px-6"
          src={productToShow.image}
          alt={productToShow.title}
        />
      </figure>
      <p className="flex flex-col p-6">
        <span className="font-semibold text-2xl mb-2">
          ${productToShow.price}
        </span>
        <span className="font-medium text-md mb-2">{productToShow.title}</span>
        <span className="font-light text-md">{productToShow.description}</span>
      </p>
    </aside>
  );
};

export default ProductDetail;
