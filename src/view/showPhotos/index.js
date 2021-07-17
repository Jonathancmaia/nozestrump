import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { photo } from '../../store/actions/items.action';
import { CircularProgress } from '@material-ui/core';
import { style } from './style.css';

export default function ShowPhotos(props){

  const items = useSelector(state => state.Items);
  
  const photos = items.PHOTO[0].filter(item => item.id === props.id).map((filtered) => <Carousel.Item className='carousel'>
    <img
      className="d-block carousel"
      src={'http://nozestrump.com/api-lojabim.test'.concat([filtered.img])}
      alt="First slide"
    />
  </Carousel.Item>);

  return (<>
    <Carousel className='carousel' indicators={false}>
      {photos}
    </Carousel>
  </>)
}