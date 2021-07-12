import { Http } from '../../config/Http';
import { changeLoading } from './loading.action';
import { changeNotify } from './notify.action';
import { index } from './me.action';

export const actionTypes = {
  CHANGE: 'CHANGE_AUTH',
  SUCCESS: 'SUCCESS_AUTH'
}

export const changeAuth = (data) => ({
  type: actionTypes.CHANGE,
  data,
})

export const successAuth = (data) => ({
  type: actionTypes.SUCCESS,
  data,
})

export const SetUserToken = token => dispatch => {

  localStorage.setItem('access_token', token);

  dispatch( changeAuth({
    email: '',
    password: ''
  }) )

  dispatch( successAuth(true) )
}

export const loginAuth = credentials => dispatch => {

  dispatch(changeLoading({
    open: true,
    msg: 'Autenticndo usuário...'
  }))

  return Http.post('/login', {
    email: credentials.email,
    password: credentials.password
  }).then( (response)=>{
    if (typeof response !== undefined){
      if(response.data.access_token){
        dispatch ( changeLoading({ open: false }) );
        dispatch ( SetUserToken(response.data.access_token) );
        dispatch ( index() );
      }
    }
  }).catch(error => {
    if (typeof error.response !== 'undefined'){
      if (error.response.status === 401 || error.response.status === 400){
        dispatch( changeLoading({ open: false }));
        dispatch( changeNotify({
          open: true,
          class: 'error',
          msg: 'Email e/ou senha incorretos'
        }));
      }
    } else {
      dispatch( changeLoading({ open: false }));
        dispatch( changeNotify({
          open: true,
          class: 'error',
          msg: 'Erro o se conectar ao servidor'
        })
      );
    }
  })
}