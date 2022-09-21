import React from 'react';

export default function Registro({loading,id,cid,nom,st,pop,rh,lrt}) {
  const url = "https://api.datos.gob.mx/v1/condiciones-atmosfericas";
  const options = {
    headers: { "content-type": "application/json" }
    ,
    method: "GET"
  }
  const handleFetch = async() => {
    const res = await fetch(`${url}/${id}`,options);
    
  }
  return (
    <tr key={id}>
      {(!loading) ? (
        <>
          <td><button onClick={handleFetch}>{id}</button></td>
          <td>{cid}</td>
          <td>{nom}</td>
          <td>{st}</td>
          <td>{pop}</td>
          <td>{rh}</td>
          <td>{lrt}</td>
          <td>{(pop > 60 || rh > 50) ? "Llueve" : "No llueve"}</td>
        </>
      ) : <p>No hay registros</p>
      }
    </tr>
  )
}
