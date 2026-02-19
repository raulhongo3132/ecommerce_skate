import { useContext, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCartContext } from '../../Context';
import Layout from '../../Components/Layout';
import { Storage } from '../../Utils/Storage';
import { Navigate } from 'react-router-dom';


function SignIn() {
  const { signOut } = useContext(ShoppingCartContext);

  if (!signOut) {
    return <Navigate to="/" replace />;
  }
  const navigate = useNavigate();
  const { setSignOut, setAccount, hasAnAccount } =
    useContext(ShoppingCartContext);

  const [view, setView] = useState('login');
  const [error, setError] = useState('');
  const form = useRef(null);

  const { accountParsed, hasUserAnAccount } = hasAnAccount();

  useEffect(() => {
    document.title = 'Iniciar sesión | Skate Shop';
  }, []);

  const handleLogin = () => {
    const formData = new FormData(form.current);
    const email = formData.get('email');
    const password = formData.get('password');

    if (
      email === accountParsed?.email &&
      password === accountParsed?.password
    ) {
      Storage.setItem('sign-out', false);
      setSignOut(false);
      navigate('/');
    } else {
      setError('Correo o contraseña incorrectos');
    }
  };

  const createAnAccount = () => {
    const formData = new FormData(form.current);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
    };

    Storage.setItem('account', data);
    setAccount(data);
    Storage.setItem('sign-out', false);
    setSignOut(false);
    navigate('/');
  };

  const renderLogin = () => (
    <form ref={form} className="flex flex-col gap-4 mt-10 w-80">
      <div className="flex flex-col gap-1">
        <label className="text-sm text-green-950">Correo:</label>
        <input
          type="email"
          name="email"
          placeholder="correo@ejemplo.com"
          className="border border-green-950 rounded-lg w-full py-2 px-4 text-sm outline-none"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-green-950">Contraseña:</label>
        <input
          type="password"
          name="password"
          placeholder="********"
          className="border border-green-950 rounded-lg w-full py-2 px-4 text-sm outline-none"
          required
        />
      </div>

      {error && (
        <span className="text-sm text-red-600">{error}</span>
      )}

      <button
        type="button"
        onClick={handleLogin}
        className="bg-green-950 text-white rounded-lg px-4 py-2 w-full font-semibold"
      >
        Iniciar sesión
      </button>

      <span
        onClick={() => setView('recover')}
        className="text-sm text-center text-green-700 underline underline-offset-4 cursor-pointer hover:text-green-950"
      >
        Recuperar contraseña
      </span>

      <button
        type="button"
        onClick={() => setView('register')}
        className="bg-green-400 text-green-950 rounded-lg px-4 py-2 w-full font-semibold"
      >
        Crear cuenta
      </button>
    </form>
  );

  const renderRegister = () => (
    <form ref={form} className="flex flex-col gap-4 mt-10 w-80">
      <div className="flex flex-col gap-1">
        <label className="text-sm text-green-950">Nombre:</label>
        <input
          type="text"
          name="name"
          placeholder="Pedro"
          className="border border-green-950 rounded-lg w-full py-2 px-4 text-sm outline-none"
          required
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-sm text-green-950">Correo:</label>
        <input
          type="email"
          name="email"
          placeholder="correo@ejemplo.com"
          className="border border-green-950 rounded-lg w-full py-2 px-4 text-sm outline-none"
          required
        />
      </div>

      <div className="flex flex-col gap-1 mb-6">
        <label className="text-sm text-green-950">Contraseña:</label>
        <input
          type="password"
          name="password"
          placeholder="********"
          className="border border-green-950 rounded-lg w-full py-2 px-4 text-sm outline-none"
          required
        />
      </div>

      <button
        type="button"
        onClick={createAnAccount}
        className="bg-green-400 text-green-950 rounded-lg px-4 py-2 w-full font-semibold"
      >
        Registrarse
      </button>

      <span
        onClick={() => setView('login')}
        className="text-sm text-center text-green-700 underline underline-offset-4 cursor-pointer hover:text-green-950"
      >
        Ya tengo cuenta
      </span>
    </form>
  );

  const renderRecover = () => (
    <div className="flex flex-col gap-4 mt-10 w-80">
      <p className="text-sm text-green-950">
        Ingresa tu correo y te enviaremos instrucciones.
      </p>

      <input
        type="email"
        placeholder="correo@ejemplo.com"
        className="border border-green-950 rounded-lg w-full py-2 px-4 text-sm outline-none"
      />

      <button
        className="bg-green-400 text-green-950 rounded-lg px-4 py-2 w-full font-semibold"
        onClick={() => alert('Funcionalidad disponible próximamente')}
      >
        Enviar
      </button>

      <span
        onClick={() => setView('login')}
        className="text-sm text-center text-green-700 underline underline-offset-4 cursor-pointer hover:text-green-950"
      >
        Volver
      </span>
    </div>
  );

  const renderView = () => {
    if (view === 'register') return renderRegister();
    if (view === 'recover') return renderRecover();
    return renderLogin();
  };

  return (
    <Layout>
      <h1 className="text-2xl font-bold mt-5 mb-6 text-green-950">
        Bienvenido
      </h1>
      {renderView()}
    </Layout>
  );
}

export default SignIn;
