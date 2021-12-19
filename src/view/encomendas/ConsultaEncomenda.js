import react, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import { HttpAuth } from '../../config/Http';
import { ListGroup, Table } from 'react-bootstrap';

export default function ConsultaEncomenda(props) {

  const [loading, setLoading] = useState(true);
  const [responseToken, setResponseToken] = useState(null);
  const [response, setResponse] = useState(null);

  useEffect(()=>{
    HttpAuth.get('/consultaEncomenda/'+props.token).then( (response)=>{

      if (typeof response !== undefined || typeof response === ''){
        
        setResponse(response);
        switch (response.data.status) {
          case '1':
            setResponseToken('Completo');
            break;

          case '2':
            setResponseToken('Aprovado');
            break;
          
          case '3':
            setResponseToken('Em análise');
            break;
          
          case '4':
            setResponseToken('Devolvido');
            break;

          case '5':
            setResponseToken('Cancelado');
            break;
        }
        
        setLoading(false);
      }
    });
  },[]);

  return(
    <tr>
      {loading ? 
        <CircularProgress/>
          :
        <>
          <td>
            {response.data.grossAmount}
          </td>
          <td>
            <Table striped bordered hover>
              {response.data.items !== undefined ? 
                response.data.items.item.map((item)=>(<>
                  <tr>
                    <td>
                      {item.description}
                    </td>
                    <td>
                      {item.quantity}
                    </td>
                    <td>
                      {item.amount}
                    </td>
                  </tr>
                </>))
              :
              <></>  
              }
            </Table>
          </td>
          <td>
            {responseToken}
          </td>
        </>
      }
    </tr>
  );
}