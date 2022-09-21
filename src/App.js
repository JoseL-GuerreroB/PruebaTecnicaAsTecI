import { useState, useEffect } from 'react';
import './App.css';
import Registro from './components/Registro';
// _formato(YYYY/MM/DD)
// llueve SI se cumple=probability_of_precip mayor 60 o relativehumidity mayor 50

function App() {
  const [datos, setDatos] = useState({});
  const [loading, setLoading] = useState(false);
  const [izq, setIzq] = useState(0);
  const [der, setDer] = useState(9);
  const url = "https://api.datos.gob.mx/v1/condiciones-atmosfericas";
  const options = {
    headers: {"content-type": "application/json"}
    ,
    method: "GET"
  }
  useEffect(()=> {
    async function peticion(url, options){
      const res = await fetch(url, options);
      return (res);
    }
    setLoading(true);
    const res = peticion(url, options);
    setDatos(res);
    setLoading(false);
  }, []);
  const handleAtras = () => {
    setIzq(izq-10);
    setDer(der-10);
  }
  const handleAdelante = () => {
    setIzq(izq + 10);
    setDer(der + 10);
  }
  return (
    <div className="App">
      <div>
        
      </div>
      <table>
        <thead>
          <tr>
            <th>_id</th>
            <th>cityId</th>
            <th>name</th>
            <th>state</th>
            <th>probability_of_precip</th>
            <th>relative humidity</th>
            <th>Last_report_time</th>
            <th>LLUEVE</th>
          </tr>
        </thead>
        <tbody>
          {!loading && 
            datos.results.map(obj => <Registro load={loading} id={obj._id} cid={obj.cityid} nom={obj.name} st={obj.state} pop={obj.probabilityofprecip} rh={obj.relativehumidity} lrt={obj.lastreporttime} />).splice(izq,der)
          }
        </tbody>
      </table>
      {!loading && 
        <>
        {izq>0 && <button onClick={handleAtras}>Atras</button>}
        <p>Registros del {izq+1} al {der}</p>
        {der<datos.results.length && <button onClick={handleAdelante}>Adelante</button>}
        </>
      }
    </div>
  );
}

export default App;
