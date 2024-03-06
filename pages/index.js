import Head from 'next/head';
import { useState } from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer';

export default function Home() {
  const [responseText, setResponseText] = useState('');
  const [token, setToken] = useState('');

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

      // Guardar el token en la variable de estado
      if (responseData.access_token) {
        setToken(responseData.access_token);
        setResponseText('Token obtenido correctamente.');
      } else {
        setResponseText('Error al obtener el token.');
      }
    } catch (error) {
      setResponseText(`Error: ${error.message}`);
    }
  };

  const handleConsultaCopagos = async () => {
    try {
      // Parámetros para la solicitud
      const parametrosConsulta = {
        TipoDocumento: 'CC',
        NumeroDocumento: '5544728',
        fechaNacimiento: '1939-11-04',
      };

      // Realiza la solicitud a la API de consulta de copagos con el token
      const response = await fetch('https://emssanar-gateway.conexia.com/api/integraciones/consultar-copagos-afiliado', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Utiliza el token almacenado
        },
        body: JSON.stringify(parametrosConsulta),
      });

      const responseData = await response.json();
      setResponseText(JSON.stringify(responseData, null, 2));
    } catch (error) {
      setResponseText(`Error al consultar copagos: ${error.message}`);
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
        <button onClick={handleButtonClick}>Obtener Token</button>
        <button onClick={handleConsultaCopagos}>Consultar Copagos</button>
        <textarea value={responseText} readOnly />

      </main>

      <Footer />
    </div>
  );
}
