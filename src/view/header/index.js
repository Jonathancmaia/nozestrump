import { Link } from "react-router-dom";
import style from "./style.css";
import PersonIcon from '@material-ui/icons/Person';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { index } from '../../store/actions/me.action';
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import Cart from '../cart';
import { set_active } from '../../store/actions/cart.action';
import Auth from '../auth';
import { Navbar, Nav, Popover, OverlayTrigger, Button, ListGroup } from 'react-bootstrap';
import Encomendas from '../encomendas';


export default function Header() {

  const me = useSelector (state => state.Me);
  const cart = useSelector(state => state.Cart);
  const dispatch = useDispatch();

  function indexCall () {
    dispatch( index() );
  }

  useEffect( () => {
    indexCall();
  }, [me.NAME]);

  function logout() {
    localStorage.clear();
    window.location.reload();
  }

  //ABERTURA E FECHAMENTO DO LOGIN
  const [opened, setOpened] = useState();

  //Popover do login
  const popover = (
    <Popover id="popover-basic">
      <Popover.Title as="h3">Opções</Popover.Title>
      <Popover.Content>
        <ListGroup>
          <Encomendas />
          <ListGroup.Item>Mudar senha</ListGroup.Item>
          <ListGroup.Item action onClick={logout}>
            Logout
          </ListGroup.Item>
        </ListGroup>
      </Popover.Content>
    </Popover>
  );
  
  const Usuario = () => (
    <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
      <Button variant="outline-secondary">Olá, {me.NAME}</Button>
    </OverlayTrigger>
  );


  return (
    <>
      <Cart />
      <Auth opened = {opened} />

        <Navbar bg="dark" variant="dark" expand="md" className='navbar'>
          <Navbar.Brand className='logo'>
            <h3>
              Nozes Trump
            </h3>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar" className="justify-content-end">
            <Nav>
              <Nav.Link href='#'>
                {(me.LOADING) ?
                  <div className="d-flex jultify-content-center">
                    <Button variant="outline-secondary">
                      <CircularProgress />
                    </Button>
                  </div>
                  :
                  <>{(me.NAME) ?
                      <Usuario />                  
                      :
                      <Button
                      variant="outline-secondary"
                      className='loginButton'
                      onClick={
                        (e) => { 
                          setOpened(true);
                          setTimeout(()=>{setOpened()}, 3000);
                        }
                      }>
                        <PersonIcon fontSize='default'/>
                        Login
                      </Button>
                    }
                  </>
                }
              </Nav.Link>

              <Nav.Link href='#'>
                <Button variant="outline-secondary"
                  onClick={(e)=>{
                    dispatch( set_active(true) );
                  }
                }>
                  <ShoppingCartIcon fontSize='default'/> Carrinho
                </Button>
              </Nav.Link>
            </Nav>
        </Navbar.Collapse>
      </Navbar>  
    </>
  )
}