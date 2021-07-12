import react, { useState, useEffect } from 'react';
import Header from '../header';
import { index } from '../../store/actions/items.action';
import { useSelector, useDispatch } from "react-redux";
import { CircularProgress } from '@material-ui/core';

export default function ItemEdit(props) {

  const items = useSelector (state => state.Items);
  const [isLoading, setLoading] = useState(true);
  const dispatch = useDispatch();

  async function indexCall () {
    await dispatch( index() );
    await setLoading(false);
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
        <>{items}</>
      }
    </>
  )
}