import Head from 'next/head';
import { useState } from 'react';
import Header from '@components/Header';
import Footer from '@components/Footer';

export default function Home() {
  const [responseText, setResponseText] = useState('');
  const [token, setToken] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('CC');
  const [numeroDocumento, setNumeroDocumento] = useState('5544728');
  const [fechaNacimiento, setFechaNacimiento] = useState('1939-11-04');

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

      // Organizar la respuesta por separado
      const {
        numeroDocumento,
        fechaNacimiento,
        totalCopagoGenerado,
        totalCopagoCancelado,
        topeMaximoEvento,
        topeMaximoAnual,
        exentoCopago,
      } = copagosData;

      const organizedData = {
        NumeroDocumento: numeroDocumento,
        FechaNacimiento: fechaNacimiento,
        TotalCopagoGenerado: totalCopagoGenerado,
        TotalCopagoCancelado: totalCopagoCancelado,
        TopeMaximoEvento: topeMaximoEvento,
        TopeMaximoAnual: topeMaximoAnual,
        ExentoCopago: exentoCopago,
      };

      setResponseText(JSON.stringify(organizedData, null, 2));
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

        {/* Modificar formulario y textarea */}
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
        <textarea value={responseText} readOnly />
      </main>

      <Footer />
    </div>
  );
}
