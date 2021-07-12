import { actionTypes } from '../actions/cart.action';

const initialState = {
  ITEMS: [],
  ACTIVE: null
}

export default (state = initialState, {type, payload}) => {
  switch (type){

    //REDUCER ADICIONAR ITEM DO CARRINHO
    case actionTypes.ADD_ITEM:
      let arr_items = state.ITEMS;
      let items = state.ITEMS.findIndex( 
        item => item.id === payload.id && item.tamanho === payload.tamanho 
      );
      let tam = payload.tamanho;

      if(items < 0) {
         
        arr_items.push({
          id: payload.id,
          qtd: payload.qtd,
          img: payload.img,
          nome: payload.desc,
          preco: payload.preco,
          tamanho: tam
        });
        
      } else {

        state.ITEMS[items].qtd = state.ITEMS[items].qtd + 1;

      }

      return {...state, ITEMS:  arr_items}
    //!REDUCER ADICIONAR ITEM DO CARRINHO
    
    //REDUCER REMOVER ITEM DO CARRINHO
    case actionTypes.REMOVE_ITEM:
      let remove_arr_items = state.ITEMS;
      let remove_items = state.ITEMS.findIndex( 
        item => item.id == payload.id && item.tamanho == payload.tamanho 
      );

      if(state.ITEMS[remove_items].qtd < 2) {
        remove_arr_items.splice(remove_items, 1);
      } else {
        state.ITEMS[remove_items].qtd = state.ITEMS[remove_items].qtd - 1;
      }

      return {...state, ITEMS:  remove_arr_items}
    //!REDUCER REMOVER ITEM DO CARRINHO

    case actionTypes.SET_CART:
      localStorage.removeItem('storeCart');
      localStorage.setItem('storeCart', JSON.stringify(state.ITEMS));

    case actionTypes.GET_CART:
      let cart = localStorage.getItem('storeCart');
      if (cart !== null) {
        return {...state, ITEMS: JSON.parse(cart)}
      }

    case actionTypes.SET_ACTIVE:

      if (state.ACTIVE !== null) {
        if (state.ACTIVE === false) {
          return {...state, ACTIVE: true}
        } else if (state.ACTIVE === true) {
          return {...state, ACTIVE: false}
        }
      } else if (state.ACTIVE === false ) {
        return {...state, ACTIVE: true}
      } else if (state.ACTIVE === null) {
        if (payload) {
          return {...state, ACTIVE: true}
        } else if (!payload) {
          return {...state, ACTIVE: false}
        }
      }
      
      

    default:
      return state
  }
}