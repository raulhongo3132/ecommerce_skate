import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { ShoppingCartContext } from '../../Context';
import ShoppingCart from '../ShoppingCart';
import logo from '../../assets/logo.svg';
import { Storage } from '../../Utils/Storage';

const Navbar = () => {
  const {
    setSearchByCategory,
    isMenuOpen,
    setIsMenuOpen,
    signOut,
    setSignOut,
    account,
  } = useContext(ShoppingCartContext);
  const activeStyle = 'underline underline-offset-4';

  const userLinks = [
    { label: "Mis órdenes", path: "/my-orders" },
    { label: "Mi cuenta", path: "/my-account" }
  ];

  // Menu Mobile
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Sign Out
  const isUserSignOut = signOut;

  const handleSignOut = () => {
    Storage.setItem('sign-out', true);
    setSignOut(true);
  };

  const renderView = () => {
    return isUserSignOut ? (
      <li>
        <NavLink
          to="/sign-in"
          className={({ isActive }) =>
            `hover:text-gray-300 ${isActive ? activeStyle : ''}`
          }
          onClick={() => handleSignOut()}
        >
          Iniciar sesión
        </NavLink>
      </li>
    ) : (
      <>
        <li className="text-white truncate max-w-[120px]">
          {account?.name}
        </li>

        {userLinks.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                `hover:text-gray-300 ${isActive ? activeStyle : ''}`
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}

        <li>
          <NavLink
            to="/sign-in"
            className={({ isActive }) =>
              `hover:text-gray-300 ${isActive ? activeStyle : ''}`
            }
            onClick={() => handleSignOut()}
          >
            Cerrar sesión
          </NavLink>
        </li>
      </>
    );
  };


  const renderViewMobile = () => {
    return isUserSignOut ? (
      <li key="Sign Out" className="w-full">
        <NavLink
          to="/sign-in"
          onClick={() => {
            setIsMenuOpen(false);
            handleSignOut();
          }}
          className="block p-2 hover:bg-green-200 rounded-lg"
        >
          Sign In
        </NavLink>
      </li>
    ) : (
      <>
        <li className="text-white place-self-end p-2">{account?.name}</li>
        {userLinks.map((item) => (
        <li key={item.path}>
          <NavLink
            to={item.path}
            className={({ isActive }) =>
              `hover:text-gray-300 ${isActive ? activeStyle : ''}`
            }
          >
            {item.label}
          </NavLink>
        </li>
      ))}

        <li key="Sign Out" className="w-full">
          <NavLink
            to="/sign-in"
            onClick={() => {
              setIsMenuOpen(false);
              handleSignOut();
            }}
            className="block p-2 hover:bg-green-200 rounded-lg"
          >
            Sign Out
          </NavLink>
        </li>
      </>
    );
  };

  return (
    <nav className="flex flex-wrap items-center justify-between fixed z-50 top-0 w-full py-5 px-8 md:px-2 lg:px-8 text-sm font-light bg-black shadow-md text-white">
      {/* Logo y Menú */}
      <div className="flex items-center justify-between w-full md:w-auto">
        <NavLink
          to="/"
          onClick={() => {
            setSearchByCategory('');
            setIsMenuOpen(false);
          }}
        >
          <img
            src={logo}
            alt="Logo"
            className="h-7 md:h-6 lg:h-7 drop-shadow-lg brightness-150"
          />
        </NavLink>

        <div className="flex gap-4 items-center">
          {/* Botón del carrito */}
          <div className="md:hidden p-2">
            <ShoppingCart />
          </div>
          {/* Botón Menú */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-800"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <XMarkIcon className="size-7" />
            ) : (
              <Bars3Icon className="size-7" />
            )}
          </button>
        </div>
      </div>

      {/* Menú Desktop */}
      <div className="hidden md:flex text-xs lg:text-sm flex-1 justify-between items-center">
        <ul className="flex items-center gap-4 ml-4">
          {[
              { to: '/', text: 'Todos' },
              { to: '/tablas', text: 'Tablas' },
              { to: '/trucks', text: 'Trucks' },
              { to: '/ruedas', text: 'Ruedas' },
              { to: '/accesorios', text: 'Accesorios' },
              { to: '/otros', text: 'Otros' },
            ].map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                onClick={() => {
                  setSearchByCategory('');
                  setIsMenuOpen(false);
                }}
                className={({ isActive }) =>
                  `hover:text-gray-300 ${isActive ? activeStyle : ''}`
                }
              >
                {link.text}
              </NavLink>
            </li>

          ))}
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `hover:text-gray-300 ${isActive ? activeStyle : ''}`
              }
            >
              Nosotros
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `hover:text-gray-300 ${isActive ? activeStyle : ''}`
              }
            >
              Contacto
            </NavLink>
          </li>

        </ul>

        {/* Sección derecha Desktop */}
        <ul className="flex items-center gap-4 text-nowrap">
          {renderView()}
          <li>
            <ShoppingCart />
          </li>
        </ul>
      </div>

      {/* Menú Móvil */}
      {isMenuOpen && (
        <div className="w-full md:hidden mt-4">
          <div className="flex flex-col pt-4 space-y-4 border-t border-gray-700 text-end">
            {/* Sección de navegación */}
            <ul className="flex flex-col items-end gap-1 w-full">
              {[
                { to: '/', text: 'Todos' },
                { to: '/tablas', text: 'Tablas' },
                { to: '/trucks', text: 'Trucks' },
                { to: '/ruedas', text: 'Ruedas' },
                { to: '/accesorios', text: 'Accesorios' },
                { to: '/otros', text: 'Otros' },
              ].map((link) => (
                <li key={link.to} className="w-full">
                  <NavLink
                    to={link.to}
                    onClick={() => {
                      setSearchByCategory('');
                      setIsMenuOpen(false);
                    }}
                    className={({ isActive }) =>
                      `block p-2 hover:bg-gray-800 rounded-lg ${
                        isActive ? activeStyle : ''
                      }`
                    }
                  >
                    {link.text}
                  </NavLink>
                </li>
              ))}
              <li className="w-full">
                <NavLink
                  to="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className="block p-2 hover:bg-gray-800 rounded-lg"
                >
                  Nosotos
                </NavLink>
              </li>

              <li className="w-full">
                <NavLink
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="block p-2 hover:bg-gray-800 rounded-lg"
                >
                  Contacto
                </NavLink>
              </li>

            </ul>

            {/* Sección usuario */}
            <ul className="flex flex-col items-center gap-1 w-full pt-4 border-t border-gray-700">
              {renderViewMobile()}
            </ul>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
