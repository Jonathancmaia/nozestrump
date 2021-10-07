import React, { useState, useEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Modal, Container, Row, Col, Button } from 'react-bootstrap';
import { get_cart, set_active } from '../../store/actions/cart.action';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { style } from './style.css'; 
import { remove_items, add_items } from '../../store/actions/cart.action';
import ShowPhotos from '../showPhotos';
import Endereco from './endereco';
import { index } from '../../store/actions/me.action';
import { changeNotify } from '../../store/actions/notify.action';


const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'auto',
    maxHeight: '80%',
    paddingTop: '34%',
    paddingBottom: '1%',
    marginTop: '5%'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Cart(props){

  const items = useSelector(state => state.Items);
  const me = useSelector (state => state.Me);

  //TOTAL DO CARRINHO
  let total = 0;
  const adicionarTotal = (preco, qtd) => {
    total = total + (parseFloat(preco) * parseFloat(qtd));
  }

  const convertTotal = (num) => {
    return num.toLocaleString(
      'pt-BR', { style: 'currency', currency: 'BRL' }
    );
  }
  //!TOTAL DO CARRINHO

  //CART REDUCER
  const cart = useSelector(state => state.Cart);
  const dispatch = useDispatch();

  const indexCall = ()=>{
    dispatch( get_cart() );
  };

  useEffect(()=>{
    indexCall();
  },[]);
  //!CART REDUCER

  const classes = useStyles();

  //Mecanismo de abertura e fechamento do carrinho
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    if (cart.ACTIVE === true) {
      dispatch( set_active(false) );
    }
  };

  useEffect(()=>{
    if (cart.ACTIVE === true){
      handleOpen();
    } else if (cart.ACTIVE === false){
      handleClose();
    }
  },[cart.ACTIVE]);

  function payment(){

    if (me.NAME) {

      setEnderecoOpen(true);
      
    } else {

      dispatch( changeNotify({
        open: true,
        class: 'error',
        msg: 'Faça o login para concluir a sua compra.'
      }));

    }
  }

  //Função que verifica se o item é o último listado. Caso não seja adiciona um separador.
  let indexAtual = 0;

  function separador(indexTotal){
    indexAtual++;
    if (indexAtual < indexTotal){
      return (<hr />);
    }
  }

  const [enderecoOpen, setEnderecoOpen] = useState(false);

  return (
    <>
      <Endereco id={me.ID} open={enderecoOpen}/>
      <Modal
        show={open}
        onHide={handleClose}
        size='xl'
        className='modal-content-cart'
      >
        <Modal.Header closeButton>
          <h2>
            Carrinho
          </h2>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              {cart.ITEMS.map( (item) =>
                <div key={item.id}>
                  <Row>
                    <Col className='d-flex justify-content-center'>
                      {
                        items.LOADING_PHOTO ?
                        <CircularProgress />
                          :
                        <ShowPhotos id={item.id} cart='true' />
                      }
                    </Col>
                    <Col>
                      <div className='namePrice-container'>
                        <div className='name-container'>
                          <h4>
                            {item.nome}
                          </h4>
                        </div>
                        <Row className='name-container'>
                          <Col className='pt-3'>
                            <small>
                              Tamanho: {item.tamanho}
                            </small>
                          </Col>
                        </Row>
                        <Row className='priceQtd-container'>
                          <Col>
                            <span>
                              <AddIcon
                              className='addButton'
                              onClick={ (e) => dispatch( add_items(item.id, item.qtd, item.img, item.desc, item.preco, item.tamanho) ) }
                              />
                              {item.qtd}
                              <RemoveIcon
                                className='removeButton'
                                onClick={ (e) => dispatch( remove_items(item.id, item.tamanho) ) }
                              />
                            </span>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <h3>
                              <span className='itemPreco'>R$ {item.preco}</span>
                            </h3>
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                  {adicionarTotal(item.preco, item.qtd)}
                  {
                    //Função que verifica se é o último item listado. Se não for, adiciona o separador.
                    separador(cart.ITEMS.length)
                  }
                </div>
              )}
              {total === 0 && 
                <div className='row d-flex'>
                  <div className='col-12 d-flex justify-content-center'>
                    <h6>
                      Carrinho vazio
                    </h6>
                  </div>
                </div>
              }
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          {total !== 0 &&
          <Container>
            <Row>
              <Col className='d-flex justify-content-center align-items-center'>
                <span>
                  <h3>
                    {convertTotal(total)}
                  </h3>
                </span>
              </Col>
              <Col className='d-flex justify-content-center'>
                <span>
                  <Button
                    variant="success"
                    size="lg"
                    onClick={ (e) => {payment()} }
                  >
                    Confirmar endereço de entrega
                  </Button>
                </span>
              </Col>
            </Row>
          </Container>
          }
        </Modal.Footer>
      </Modal>
    </>
  );
}