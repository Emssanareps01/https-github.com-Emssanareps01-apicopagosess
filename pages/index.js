import Head from 'next/head';
import { useState } from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer';

// Configuración del proxy CORS
(function() {
    var cors_api_host = 'cors-anywhere.herokuapp.com';
    var cors_api_url = 'https://' + cors_api_host + '/';
    var slice = [].slice;
    var origin = window.location.protocol + '//' + window.location.host;
    var open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function() {
        var args = slice.call(arguments);
        var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1]);
        if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
            targetOrigin[1] !== cors_api_host) {
            args[1] = cors_api_url + args[1];
        }
        return open.apply(this, args);
    };
})();

export default function Home() {
  const [responseText, setResponseText] = useState('');

  const handleButtonClick = async () => {
    try {
      const credentials = {
        username: '6tp2r4in2naoiq6p7a07m01laa',
        password: '1epguv5pso4m2sd2523tgrn6p1qv1l0m751ebp0amntneekduhs2',
      };

      const apiUrl = 'https://cross-gateway.conexia.com/login/api';

      const response = await fetch(apiUrl, {
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
