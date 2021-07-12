import { useState, useEffect } from 'react';
import Header from '../header';
import { index } from '../../store/actions/me.action';
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from '@material-ui/core';

export default function ItemEdit(props) {

  const me = useSelector (state => state.Me);
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const indexCall = () => {
    dispatch( index() );
    setLoading(false);
  }

  useEffect( ()=>{
    indexCall();
  }, []);

  return (
    <>
      <Header/>
      {(isLoading) ?
          <div className="d-flex jultify-content-center mt-5 pt-5">
            <CircularProgress />
          </div>
          :
          <>{me}</>
      }
    </>
  )
}