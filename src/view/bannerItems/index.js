import React, { useEffect, useState, useLayoutEffect } from 'react';
import { CircularProgress } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { index, photo } from '../../store/actions/items.action';
import { style } from './style.css';
import ShowPhotos from '../showPhotos';
import { ButtonGroup, Button } from 'react-bootstrap';
import { Modal, Container, Row, Col } from 'react-bootstrap';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import styled from 'styled-components';
import InputLabel from '@material-ui/core/InputLabel';
import { changeNotify } from '../../store/actions/notify.action';
import { add_items, remove_items, get_cart } from '../../store/actions/cart.action';
import { SignalCellularNoSimOutlined } from '@material-ui/icons';
import tshrit from '../../public/icons/tshirt.png';
import sleevelessShirt from '../../public/icons/sleeveless-shirt.png';
import shorts from '../../public/icons/shorts.png';
import sneakers from '../../public/icons/sneakers.png';

export default function BannerItems(){

  const dispatch = useDispatch();
  const items = useSelector(state => state.Items);
  const showItems = useSelector(state => state.ShowItems);

  //Seleçãode itens a ser mostrado
  const [tipoItens, setTipoItens] = useState(0);


  useEffect(()=>{
    dispatch( index(tipoItens) );
  },[tipoItens]);

  useEffect(()=>{
    setTipoItens(showItems.data);
  },[showItems.data]);

  function indexCall() {
    dispatch( index(0) );
  }

  //Definidor de width da tela em tempo real
  const [width, setWidth] = useState(window.innerWidth);
  useLayoutEffect(() => {
    function updateSize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  //!Abertura de itens

  useEffect (() => {
    if (!items.LOADING){

      let items_id = [];

      for(let i = 0; i < items.ITEMS.length; i = i + 1 ) {

        if (items.ITEMS[i].id !== undefined){
          items_id.push(items.ITEMS[i].id);
        }
      }

      dispatch( photo( items_id ) );

      setQtdItens(items.ITEMS.length);

    }
  }, [items.LOADING]);

  useEffect( () => {
    indexCall();
  }, []);

  //input de tamanho e retorno
  const [tamanho, setTamanho] = useState(undefined);

  const handleChange = (event) => {
    setTamanho(event.target.value);
  };

  const handleOpen = (id, desc, preco, tipo) => {
    setOpen(true);
    setItem({ id: id,
              desc: desc,
              preco: preco,
              tipo: tipo
            });
  };

  const handleClose = () => {
    setOpen(false);
  };

  function tamanhoSel(tipo){

    //Tipos de vestimenta:
    //  1 - Camisa Slim (P ao XG)
    //  2 - Camisa Regatas (M ao XXG)
    //  3 - Chinelo (37 ao 43)
    //  4 - Bermudas e calças (P ao G)
    if (tipo !== 3){
      return (<>
        <FormControl component="fieldset">
          <FormLabel component="legend">TAMANHO</FormLabel>
          <RadioGroup aria-label="tamanho" name="tamanho" value={tamanho} onChange={handleChange}>
            
          { tipo === 1 && <>
              <FormControlLabel value="p" control={<Radio />} label="P" />
            </>}
            <FormControlLabel value="m" control={<Radio />} label="M" />
            <FormControlLabel value="g" control={<Radio />} label="G" />
            { tipo === 1 && <>
              <FormControlLabel value="xg" control={<Radio />} label="XG" />
            </>}
            { tipo === 2 && <>
              <FormControlLabel value="xxg" control={<Radio />} label="XXG" />
            </>}
          </RadioGroup>
        </FormControl>
      </>);
    } else {
      return (<>
        <FormControl>
          <InputLabel id="tam-select" displayEmpty='true'>TAMANHO</InputLabel>
          <Select
            labelId="tam-select"
            id="simple-select"
            value={tamanho}
            onChange={handleChange}
          >
            <MenuItem value={37} selected>37</MenuItem>
            <MenuItem value={38}>38</MenuItem>
            <MenuItem value={39}>39</MenuItem>
            <MenuItem value={40}>40</MenuItem>
            <MenuItem value={41}>41</MenuItem>
            <MenuItem value={42}>42</MenuItem>
            <MenuItem value={43}>43</MenuItem>
          </Select>
        </FormControl>
      </>);
    }
  }

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState({ 
    id: null,
    foto: null, 
    desc: null,
    preco: null
  });

  //define o numero de itens carregados e sistema de paginação
  const [indexItens, setIndexItens] = useState(0);
  const [proximaPaginaButton, setProximaPaginaButton] = useState(false);
  const [paginaAnteriorButton, setPaginaAnteriorButton] = useState(false);
  const [qtdItens, setQtdItens] = useState(0);
  const [pgAtual, setPgAtual] = useState(1);
  const [numOfPages, setNumOfPages] = useState('');

  let itensShow = items.ITEMS.slice(indexItens, indexItens + 15);

  useEffect(()=>{
    
    let numPages = Math.ceil(qtdItens/15);
    setNumOfPages(numPages);

    if (pgAtual < numPages){
      setProximaPaginaButton(false);
    } else {
      setProximaPaginaButton(true);
    }

    if (pgAtual <= 1){
      setPaginaAnteriorButton(true);
    } else {
      setPaginaAnteriorButton(false);
    }

  },[qtdItens, pgAtual]);

  function proximaPagina(){
    setIndexItens(indexItens+15);
    setPgAtual(pgAtual+1);

  }

  function paginaAnterior(){
    setIndexItens(indexItens-15);
    setPgAtual(pgAtual-1);
  }

  return (
    <div className="container pt-5">

      <Modal
        show={open}
        onHide={handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>
            {item.desc}
          </Modal.Title>
        </Modal.Header>
        <div className='row d-flex align-items-center modalOpenedItem'>
          <div className='col-md-6 d-flex align-items-center flex-row'>
            <center className='photo-container'>
              {
                items.LOADING_PHOTO ? 
                  <CircularProgress/> 
                    : 
                  <ShowPhotos id={item.id} className='d-flex align-self-center'/>
              }
            </center>
          </div>
          <div className='col-md-6 d-flex flex-column align-items-center justify-content-around item-display'>
            <div className='tamanho'>
              {tamanhoSel(item.tipo)}
            </div>
          </div>
        </div>
        <Modal.Footer>
          <Container>
            <Row>
              <Col>
                <center>
                  <h3 className='preco'>
                    R$ {item.preco}
                  </h3>
                </center>
              </Col>
            </Row>
            <Row>
              <Col>
                <center>
                  <Button variant="dark"
                    onClick={()=>{
                      if (tamanho === undefined){
                        dispatch( changeNotify({
                          open: true,
                          class: 'error',
                          msg: 'Selecione um tamanho.'
                        }));
                      } else {
                        dispatch( add_items(item.id, 1, item.foto, item.desc, item.preco, tamanho));
                        setTamanho(undefined);
                        handleClose();
                      }
                  }}
                  >
                    Adicionar ao carrinho
                  </Button>
                </center>
              </Col>
            </Row>
          </Container>
        </Modal.Footer>
      </Modal>

      <div className="row justify-content-center titulo">
        <div className="col-auto" onClick={(e)=>{setTipoItens(0)}}>
          <h1 className='mb-4 titulo'>
            {tipoItens === 0 && 'Últimas novidades'}
            {tipoItens === 1 && 'Camisas Slim'}
            {tipoItens === 2 && 'Camisas Street'}
            {tipoItens === 3 && 'Calçados'}
            {tipoItens === 4 && 'Bermudas e calças'}
          </h1>
        </div>
      </div>
      <div className="row justify-content-center">
        {items.LOADING ? <CircularProgress />
        :
        <>
          {typeof(itensShow) === "object" ?
            itensShow.map( (item) => 
              <div
                key={item.id}
                className='col-md-3 d-flex card flex-column justify-content-between'
              >
                <span 
                  onClick={(e)=>handleOpen(item.id, item.desc, item.preco, item.tipo)}
                  className='apontador'
                >
                  <div className='row d-flex flex-row justify-content-center'>
                      {
                        items.LOADING_PHOTO ? <CircularProgress/> : <ShowPhotos id={item.id}/>
                      }
                  </div>
                  <Row className='row desc d-flex flex-row'>
                    <Col>
                      <center>
                        {item.desc}
                      </center>
                    </Col>
                  </Row>
                  <div className='preco'>
                    <center>
                      R$ 
                      <span className='real'>
                        {item.preco.split(".")[0]}
                      </span>
                      ,
                      <span className='centavos'>
                        {item.preco.split(".")[1]}
                      </span>
                    </center>
                  </div>
                </span>
              </div>
            )
            :
            <>
              Não há itens nessa categoria.
            </>
          }
        </>
        }
      </div>
      <Container>
        <Row>
          <Col className='d-flex justify-content-center align-items-center p-4'>
            <Button
              variant='outline-dark'
              size='lg'
              onClick={()=>paginaAnterior()}
              disabled={paginaAnteriorButton}
              className='mr-2'
              >
              Página anterior
            </Button>
            <Button
              variant='outline-dark'
              size='lg'
              onClick={()=>proximaPagina()}
              disabled={proximaPaginaButton}
              className='ml-2'
            >
              Próxima página
            </Button>
          </Col>
        </Row>
        <Row>
          <Col>
            <center className='numOfPages'>
              Página {pgAtual} de {numOfPages}
            </center>
          </Col>
        </Row>
      </Container>
    </div>
  )
}