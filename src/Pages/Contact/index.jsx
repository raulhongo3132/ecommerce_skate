import Layout from "../../Components/Layout";
import { useEffect } from "react";

const Contact = () => {
  useEffect(() => {
    document.title = "Contacto | Skate Shop";
  }, []);

  return (
    <Layout>
      <div style={{textAlign: 'justify', padding: '15px', margin: '0 3 0 3'}}  className="max-w-4xl mx-auto mt-16 text-white space-y-8">

        {/* Título */}
        <h1 className="text-4xl font-bold text-black text-center">
          Contacto
        </h1>

        {/* Información */}
          <div className="bg-gray-900 p-6 rounded-xl space-y-5 shadow-md">
            <p className="text-gray-300 font-medium">
              skt-dstry@skateshop.com
            </p>

            <form className="space-y-4 text-gray-300">
              
              <div className="flex flex-col space-y-1">
                <label className="text-sm">Nombre</label>
                <input
                  type="text"
                  className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 
                            focus:outline-none focus:ring-2 focus:ring-white/20 
                            focus:border-gray-500 transition"
                  placeholder="Tu nombre"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-sm">Correo</label>
                <input
                  type="email"
                  className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 
                            focus:outline-none focus:ring-2 focus:ring-white/20 
                            focus:border-gray-500 transition"
                  placeholder="correo@ejemplo.com"
                />
              </div>

              <div className="flex flex-col space-y-1">
                <label className="text-sm">Comentario</label>
                <input
                  type="text"
                  className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 
                            focus:outline-none focus:ring-2 focus:ring-white/20 
                            focus:border-gray-500 transition"
                  placeholder="Escribe tus dudas"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-white text-black font-semibold py-2 rounded-lg
                          hover:bg-gray-300 transition duration-200"
              >
                Enviar
              </button>

            </form>
          </div>


        {/* Mapa */}
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3763.7420247248433!2d-99.05548712461635!3d19.38031984234808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1fd0614558e4b%3A0x3760847a107a0b9f!2sTecNM%20%7C%20Tecnol%C3%B3gico%20Nacional%20de%20M%C3%A9xico%20Campus%20Iztapalapa!5e0!3m2!1ses!2smx!4v1771471807061!5m2!1ses!2smx"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        {/* Redes sociales */}
        <div className="bg-gray-900 p-6 rounded-xl shadow-md space-y-4 text-center">
          <h2 className="text-xl font-semibold">
            Redes Sociales
          </h2>

          <div className="flex justify-center gap-8 text-lg">
            <a
              href="https://www.facebook.com/ThrasherMagazine/?locale=es_LA"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition"
            >
              Facebook
            </a>

            <a
              href="https://www.instagram.com/transworldskate/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition"
            >
              Instagram
            </a>

            <a
              href="https://www.youtube.com/@elpatincom"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-500 transition"
            >
              YouTube
            </a>

            <a
              href="https://www.tiktok.com/discover/nike-sb?lang=es"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition"
            >
              TikTok
            </a>
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default Contact;


