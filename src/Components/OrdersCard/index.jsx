import { CalendarDaysIcon } from '@heroicons/react/24/solid';
import { ShoppingBagIcon } from '@heroicons/react/24/solid';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

const OrdersCard = (props) => {
  // eslint-disable-next-line react/prop-types
  const { date, totalPrice, totalProducts } = props;

  return (
    <div className="flex items-center justify-between w-80 p-4 rounded-lg border text-green-950 border-green-500 hover:border-green-950 hover:shadow-lg">
      <div className="flex flex-col gap-2">
        <p className="flex text-md">
          <CalendarDaysIcon className="size-6 mr-2" />
          <span>{date}</span>
        </p>
        <p className="flex text-md">
          <ShoppingBagIcon className="size-6 mr-2" />
          <span>
            {totalProducts} {totalProducts > 1 ? 'articles' : 'article'}
          </span>
        </p>
      </div>

      <p className="flex gap-1">
        <span className="text-2xl font-bold">${totalPrice}</span>
        <ChevronRightIcon className="size-8" />
      </p>
    </div>
  );
};

export default OrdersCard;
