import { useContext, useState, useRef } from 'react';
import { ShoppingCartContext } from '../../Context';
import { Storage } from '../../Utils/Storage';
import Layout from '../../Components/Layout';

function MyAccount() {
  const { setAccount } = useContext(ShoppingCartContext);
  const [view, setView] = useState('user-info');
  const account = Storage.getItem('account');
  const form = useRef(null);

  const editAccount = () => {
    const formData = new FormData(form.current);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    };

    // Update account
    Storage.setItem('account', data);
    setAccount(data);
  };

  const handleEditAccount = (event) => {
    event.preventDefault();
    editAccount();
    setView('user-info');
  };

  const renderUserInfo = () => {
    return (
      <div className="flex flex-col gap-4 mt-10 w-80">
        <p className="w-full flex gap-2 items-center justify-between text-sm text-green-950">
          <span className="font-semibold">Nombre: </span>
          <span className="block text-sm text-green-950 bg-green-200 px-4 py-2 rounded-lg w-3/4 h-[36px] truncate">
            {account?.name}
          </span>
        </p>
        <p className="w-full flex gap-2 items-center justify-between text-sm text-green-950">
          <span className="font-semibold">Email: </span>
          <span className="block text-sm text-green-950 bg-green-200 px-4 py-2 rounded-lg w-3/4 h-[36px] truncate">
            {account?.email}
          </span>
        </p>
        <button
          className="bg-green-400 text-green-950 rounded-lg px-4 py-2 w-full font-semibold mt-10"
          onClick={() => setView('edit-user-info')}
        >
          Editar
        </button>
      </div>
    );
  };

  const renderEditUserInfo = () => {
    return (
      <form ref={form} className="flex flex-col gap-4 mt-10 w-80">
        <div className="flex flex-col gap-1 text-sm text-green-950">
          <label htmlFor="name" className="font-semibold">
            Nombre:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            defaultValue={account?.name}
            placeholder="Peter"
            className="border border-green-950 rounded-lg w-full py-2 px-4 outline-none placeholder:font-light"
          />
        </div>
        <div className="flex flex-col gap-1 text-sm text-green-950">
          <label htmlFor="email" className="font-semibold">
            Email:
          </label>
          <input
            type="text"
            id="email"
            name="email"
            defaultValue={account?.email}
            placeholder="hi@example.com"
            className="border border-green-950 rounded-lg w-full py-2 px-4 outline-none placeholder:font-light"
          />
        </div>
        <div className="flex flex-col gap-1 mb-10 text-sm text-green-950 ">
          <label htmlFor="password" className="font-semibold">
            Contraseña:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            defaultValue={account?.password}
            placeholder="********"
            className="border border-green-950 rounded-lg w-full py-2 px-4 outline-none"
          />
        </div>
        <button
          className="bg-green-950 text-white rounded-lg px-4 py-2 w-full font-semibold"
          onClick={() => {
            handleEditAccount(event);
          }}
        >
          Editar
        </button>
      </form>
    );
  };

  const renderView = () =>
    view === 'edit-user-info' ? renderEditUserInfo() : renderUserInfo();

  return (
    <Layout>
      <h1 className="text-2xl font-bold mt-5 mb-6 text-green-950">
        Mi cuenta
      </h1>
      {renderView()}
    </Layout>
  );
}

export default MyAccount;
