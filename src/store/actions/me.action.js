import { HttpAuth } from '../../config/Http';

export const actionTypes = {
  USER_DATA: 'USER_DATA'
}

export const index = () => dispatch => {
  HttpAuth.get('/me')
    .then( (response) => {
      if (response){
        dispatch({
          type: 'USER_DATA',
          payload: response.data
        })
      } else {
        dispatch({
          type: 'NO_USER',
          payload: ''
        })
      }
    })
}