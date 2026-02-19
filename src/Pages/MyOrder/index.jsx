import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../Context';
import Layout from '../../Components/Layout';
import OrderCard from '../../Components/OrderCard';

function MyOrder() {
  const { order } = useContext(ShoppingCartContext);
  const { id } = useParams();
  const orderItem = id ? order?.find((item) => item.id === id) : order?.at(-1);

  const orderDetails = [
    { label: 'Date', value: orderItem?.date },
    { label: 'Order ID', value: orderItem?.id },
    { label: 'Total Products', value: orderItem?.totalProducts },
    { label: 'Total Price', value: `$${orderItem?.totalPrice}` },
  ];

  return (
    <Layout>
      <div className="flex items-center justify-center relative w-80 mb-6 mt-5 text-green-950">
        <Link to="/my-orders" className="absolute left-0">
          <ChevronLeftIcon className="size-6 text-green-800 cursor-pointer hover:text-green-950" />
        </Link>
        <h1 className="text-2xl font-bold">My Order Details</h1>
      </div>
      <div className="flex flex-col w-80 mb-6 border-b border-green-600 p-6 text-green-950">
        {orderDetails.map(({ label, value }) => (
          <p key={label} className="flex justify-between items-center text-md">
            <span className="font-medium">{label}:</span>
            <span className="font-light">{value}</span>
          </p>
        ))}
      </div>
      <div className="w-80">
        {orderItem?.products?.map((product) => (
          <OrderCard
            key={product.id}
            id={product.id}
            title={product.title}
            image={product.image}
            price={product.price}
            myOrderStyle="mb-6"
          />
        ))}
      </div>
    </Layout>
  );
}

export default MyOrder;
