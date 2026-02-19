import Layout from '../../Components/Layout';
import { useEffect } from 'react';

function About() {
  useEffect(() => {
    document.title = 'Quiénes Somos | Skate Shop';
  }, []);

  return (
    <Layout>
      <div className="max-w-4xl mx-auto mt-10 text-black space-y-8">

        <h1 className="text-3xl font-bold">
          Skate and Destroy: ¿Quiénes Somos?
        </h1>

        <p className="text-black leading-relaxed">
          En Skate and Destroy somos una tienda especializada en skateboarding enfocada en ofrecer
          productos de alta calidad para riders urbanos. Nuestro objetivo es
          brindar una experiencia de compra simple, clara y accesible.
        </p>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Misión</h2>
          <p className="text-black">
            Facilitar el acceso a componentes y equipos de skate mediante una
            plataforma digital eficiente, moderna y fácil de usar.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Visión</h2>
          <p className="text-black">
            Consolidarnos como una referencia en comercio electrónico de
            skateboarding en entornos urbanos.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Valores</h2>
          <ul className="list-disc list-inside text-black space-y-2">
            <li>Calidad en productos</li>
            <li>Transparencia</li>
            <li>Compromiso con la comunidad skate</li>
            <li>Innovación digital</li>
            <br>
            
            </br>
          </ul>
        </section>

      </div>
    </Layout>
  );
}

export default About;
