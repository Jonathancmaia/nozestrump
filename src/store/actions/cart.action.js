import { changeNotify } from './notify.action';

export const actionTypes = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  SET_CART: 'SET_CART',
  GET_CART: 'GET_CART',
  SET_ACTIVE: 'SET_ACTIVE'
}

export const get_cart = () => dispatch => {
  dispatch ({
    type: actionTypes.GET_CART
  });
}

const set_cart = () => dispatch => {
  dispatch ({
    type: actionTypes.SET_CART
  });
}

export const add_items = (id, qtd, img, desc, preco, tamanho) => dispatch => {
  if(dispatch({
      type: actionTypes.ADD_ITEM,
      payload: {id: id, qtd: qtd, img: img, desc: desc, preco: preco, tamanho: tamanho}
    })
  ){
    dispatch( changeNotify({
      open: true,
      class: 'success',
      msg: 'Item inserido no carrinho com sucesso.'
    }));
    dispatch ( set_cart() );
  } else {
    dispatch( changeNotify({
      open: true,
      class: 'error',
      msg: 'O item não foi inseridono carrinho.'
    }));
  }
}

export const remove_items = (id, tamanho) => dispatch => {
  if(
    dispatch ({
      type: actionTypes.REMOVE_ITEM,
      payload: {id: id, tamanho: tamanho}
    })
  ){
    dispatch( changeNotify({
      open: true,
      class: 'success',
      msg: 'Item removido do carrinho com sucesso.'
    }));
    dispatch ( set_cart() );
  } else {
    dispatch( changeNotify({
      open: true,
      class: 'error',
      msg: 'Item não removido do carrinho.'
    }));
  }
}

export const set_active = (val) => dispatch => {
  dispatch ( {
    type: actionTypes.SET_ACTIVE,
    payload: val
  } );
}