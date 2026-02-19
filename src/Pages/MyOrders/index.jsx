import { useContext } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../Components/Layout';
import { ShoppingCartContext } from '../../Context';
import OrdersCard from '../../Components/OrdersCard';

function MyOrders() {
  const { order } = useContext(ShoppingCartContext);

  return (
    <Layout>
      <div className="flex items-center justify-center relative w-80">
        <h1 className="text-2xl font-bold mb-10 mt-5 text-green-950">
          Mis ordenes
        </h1>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {order.map((order) => (
          <Link key={order.id} to={`/my-orders/${order.id}`}>
            <OrdersCard
              date={order.date}
              totalProducts={order.totalProducts}
              totalPrice={order.totalPrice}
              id={order.id}
            />
          </Link>
        ))}
      </div>
    </Layout>
  );
}

export default MyOrders;
