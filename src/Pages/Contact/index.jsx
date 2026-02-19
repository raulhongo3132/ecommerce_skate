import Layout from "../../Components/Layout";
import { useEffect } from "react";

const Contact = () => {
  useEffect(() => {
    document.title = "Contacto | Skate Shop";
  }, []);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-10 text-white space-y-6">

        <h1 className="text-3xl font-bold">
          Contacto
        </h1>

        <div className="bg-gray-900 p-6 rounded-xl space-y-3">
          <p className="text-gray-300">
            Email: contacto@skateshop.com
          </p>

          <p className="text-gray-400">
            Tecnológico Nacional de México Campus Iztapalapa
          </p>
        </div>

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

      </div>
    </Layout>
  );
};

export default Contact;

