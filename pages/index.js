import Head from 'next/head';
import { useState } from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer';

export default function Home() {
  const [responseText, setResponseText] = useState('');

  const handleButtonClick = async () => {
    try {
      const credentials = {
        username: '6tp2r4in2naoiq6p7a07m01laa',
        password: '1epguv5pso4m2sd2523tgrn6p1qv1l0m751ebp0amntneekduhs2',
      };

      const response = await fetch('https://cross-gateway.conexia.com/login/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Puedes agregar otros encabezados si es necesario
        },
        body: JSON.stringify(credentials),
      });

      const responseData = await response.json();
      setResponseText(JSON.stringify(responseData, null, 2));
    } catch (error) {
      setResponseText(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container">
      <Head>
        <title>Next.js Starter!</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my app!" />
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>

        {/* Modificar botón y textarea */}
        <button onClick={handleButtonClick}>Realizar Solicitud a la API</button>
        <textarea value={responseText} readOnly />

      </main>

      <Footer />
    </div>
  );
}
