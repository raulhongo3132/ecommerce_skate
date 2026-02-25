import { TrashIcon } from '@heroicons/react/24/solid';

const OrderCard = (props) => {
  // eslint-disable-next-line react/prop-types
  const { id, title, image, price, handleDelete, myOrderStyle } = props;

  return (
    <div
      className={`flex gap-3 justify-between items-center text-green-950 ${
        myOrderStyle || 'px-4 py-2 mb-2 hover:shadow-lg'
      }`}
    >
      <div className="flex items-center gap-4">
        <figure className="w-20 h-20">
          <img
            className="w-full h-full object-contain"
            src={image}
            alt={title}
          />
        </figure>
        <p className="text-sm font-light text-balance line-clamp-2">{title}</p>
      </div>

      <div className="flex place-center items-center gap-2">
        <p className="text-lg font-medium">${price}</p>
        {handleDelete && (
          <TrashIcon
            className="text-green-800 size-4 cursor-pointer hover:text-green-950"
            onClick={() => handleDelete(id)}
          />
        )}
      </div>
    </div>
  );
};

export default OrderCard;
