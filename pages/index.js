import Head from 'next/head';
import { useState } from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer';

const obtenerToken = async () => {
  try {
    const credentials = {
      username: '6tp2r4in2naoiq6p7a07m01laa',
      password: '1epguv5pso4m2sd2523tgrn6p1qv1l0m751ebp0amntneekduhs2',
    };

    const response = await fetch('https://cross-gateway.conexia.com/login/api', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    const responseData = await response.json();

    if (responseData.access_token) {
      return responseData.access_token;
    } else {
      throw new Error('Error al obtener el token.');
    }
  } catch (error) {
    throw new Error(`Error al obtener el token: ${error.message}`);
  }
};

const consultarCopagos = async (token, tipoDocumento, numeroDocumento, fechaNacimiento) => {
  try {
    const parametrosConsulta = {
      TipoDocumento: tipoDocumento,
      NumeroDocumento: numeroDocumento,
      fechaNacimiento: fechaNacimiento,
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
    return copagosData;
  } catch (error) {
    throw new Error(`Error al consultar copagos: ${error.message}`);
  }
};

export default function Home() {
  const [response, setResponse] = useState({});
  const [tipoDocumento, setTipoDocumento] = useState('CC');
  const [numeroDocumento, setNumeroDocumento] = useState('5544728');
  const [fechaNacimiento, setFechaNacimiento] = useState('1939-11-04');

  const handleConsultarCopagos = async () => {
    try {
      const token = await obtenerToken();
      const copagosData = await consultarCopagos(token, tipoDocumento, numeroDocumento, fechaNacimiento);
      setResponse(copagosData);
    } catch (error) {
      console.error(error.message);
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

        <button onClick={handleConsultarCopagos}>Consultar Copagos</button>

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
