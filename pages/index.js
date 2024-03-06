import Head from 'next/head';
import { useState } from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer';

export default function Home() {
  const [responseText, setResponseText] = useState('');
  const [token, setToken] = useState('');

  const consultarCopagos = async () => {
    try {
      if (!token) {
        const credentials = {
          username: '1lerkbvv9bblni5kvs3ffiovtd',
          password: '1qh8dk63cerdj0ptca1oh1hbsjepurs6qak5vh420cntm2k92i13',
        };

        const response = await fetch('https://cross-gateway.conexia.com/uat/login/api', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(credentials),
        });

        const responseData = await response.json();

        if (responseData.access_token) {
          setToken(responseData.access_token);
          setResponseText('Token obtenido correctamente.');
        } else {
          setResponseText('Error al obtener el token.');
          return;
        }
      }

      const parametrosConsulta = {
        TipoDocumento: 'CC',
        NumeroDocumento: '5544728',
        fechaNacimiento: '1939-11-04',
      };

      const copagosResponse = await fetch('https://emssanar-gateway.conexia.com/api/integraciones/consultar-copagos-afiliado', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(parametrosConsulta),
      });

      const copagosData = await copagosResponse.json();
      setResponseText(JSON.stringify(copagosData, null, 2));
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

        {/* Modificar botones y textarea */}
        <button onClick={consultarCopagos}>Consultar Copagos</button>
        <textarea value={responseText} readOnly />
      </main>

      <Footer />
    </div>
  );
}
