import Head from 'next/head';
import { useState } from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer';

export default function Home() {
  const [response, setResponse] = useState({});
  const [token, setToken] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('CC');
  const [numeroDocumento, setNumeroDocumento] = useState('5544728');
  const [fechaNacimiento, setFechaNacimiento] = useState('1939-11-04');

  const obtenerToken = async () => {
    try {
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
      }
    } catch (error) {
      setResponseText(`Error al obtener el token: ${error.message}`);
    }
  };

  const consultarCopagos = async () => {
    try {
      // Obtener un nuevo token en cada consulta
      await obtenerToken();

      const parametrosConsulta = {
        TipoDocumento: tipoDocumento,
        NumeroDocumento: numeroDocumento,
        fechaNacimiento: fechaNacimiento,
      };

      const copagosResponse = await fetch('https://emssanar-gateway.conexia.com/uat/api/integraciones/consultar-copagos-afiliado', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(parametrosConsulta),
      });

      const copagosData = await copagosResponse.json();
      setResponse(copagosData);
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

        {/* Modificar formulario y div para mostrar la respuesta */}
        <form>
          <label>
            Tipo de Documento:
            <input type="text" value={tipoDocumento} onChange={(e) => setTipoDocumento(e.target.value)} />
          </label>
          <br />
          <label>
            Número de Documento:
            <input type="text" value={numeroDocumento} onChange={(e) => setNumeroDocumento(e.target.value)} />
          </label>
          <br />
          <label>
            Fecha de Nacimiento:
            <input type="text" value={fechaNacimiento} onChange={(e) => setFechaNacimiento(e.target.value)} />
          </label>
        </form>

        <button onClick={consultarCopagos}>Consultar Copagos</button>

        {/* Mostrar detalles de la respuesta en elementos div */}
        {Object.keys(response).length > 0 && (
          <div>
            <p>Tipo de Documento: {response.tipoDocumento}</p>
            <p>Número de Documento: {response.numeroDocumento}</p>
            <p>Fecha de Nacimiento: {response.fechaNacimiento}</p>
            <p>Total Copago Generado: {response.totalCopagoGenerado}</p>
            <p>Total Copago Cancelado: {response.totalCopagoCancelado}</p>
            <p>Tope Máximo Evento: {response.topeMaximoEvento}</p>
            <p>Tope Máximo Anual: {response.topeMaximoAnual}</p>
            <p>Exento Copago: {response.exentoCopago ? 'Sí' : 'No'}</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
