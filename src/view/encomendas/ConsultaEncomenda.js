import react, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import { HttpAuth } from '../../config/Http';

export default function ConsultaEncomenda(props) {

  const [loading, setLoading] = useState(true);
  const [responseToken, setResponseToken] = useState(null);

  useEffect(()=>{
    HttpAuth.get('/consultaEncomenda/'+props.token).then( (response)=>{
      if (typeof response !== undefined || typeof response === ''){
        console.log(response);
        setResponseToken(response);
        setLoading(false);
      }
    });
  },[]);

  return(
    <>
      {loading ? 
        <CircularProgress/>
          :
        responseToken.data.status
      }
    </>
  );
}