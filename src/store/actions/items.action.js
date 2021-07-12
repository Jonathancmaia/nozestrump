import { Http } from '@material-ui/icons';
import { HttpAuth } from '../../config/Http';

export const actionTypes = {
  INDEX_ITEMS: 'INDEX_ITEMS',
  INDEX_LOADING: 'ITEMS_LOADING',
  INDEX_PHOTO: 'ITEMS_PHOTO',
  LOADING_PHOTO: 'LAOADING_PHOTO'
}

export const index = (type) => dispatch => {

  dispatch({
    type: actionTypes.INDEX_LOADING,
    payload: true
  });

  dispatch({
    type: actionTypes.INDEX_ITEMS,
    payload: []
  });

  return HttpAuth.get('/item/'+type)
    .then( (response) => {

      if(response !== undefined){

        dispatch({
          type: actionTypes.INDEX_ITEMS,
          payload: response.data
        });
  
        dispatch({
          type: actionTypes.INDEX_LOADING,
          payload: false
        });

      } else {

        return ('algo deu errado.');

      }
    }
  )
}

export const photo = (id) => dispatch => {
  return HttpAuth.get('item/['+ id +']/foto')
    .then(  (response) => {

      try {

        dispatch({
          type: actionTypes.INDEX_PHOTO,
          payload: response.data
        });

      } catch(error) {

        return('Produto sem foto.' + error);

      }

      dispatch({
        type: actionTypes.LOADING_PHOTO,
        payload: false
      })
    }
  )
}