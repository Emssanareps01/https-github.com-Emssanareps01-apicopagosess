import Head from 'next/head';
import { useState } from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer';

export default function Home() {
  const [responseText, setResponseText] = useState('');

  const handleButtonClick = async () => {
    try {
      const credentials = {
        username: '1lerkbvv9bblni5kvs3ffiovtd',
        password: '1qh8dk63cerdj0ptca1oh1hbsjepurs6qak5vh420cntm2k92i13',
      };

      const response = await fetch('https://cross-gateway.conexia.com/uat/login/api', {
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
        <title>Tope Copagos</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Topes copagos afiliados" />
        <p className="description">
          Test <code>solicitud/index.js</code>
        </p>

        {/* Modificar botón y textarea */}
        <button onClick={handleButtonClick}>Realizar Solicitud a la API</button>
        <textarea value={responseText} readOnly />

      </main>

      <Footer />
    </div>
  );
}
