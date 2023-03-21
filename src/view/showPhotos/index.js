import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { style } from './style.css';

export default function ShowPhotos(props){

  const items = useSelector(state => state.Items);

  let carouselType = null;
  if (props.cart){
    carouselType = 'carousel-cart';
  } else {
    carouselType = 'carousel';
  }
  
  const photos = items.PHOTO[0].filter(item => item.id === props.id).map((filtered) => <Carousel.Item
    className={carouselType}
    >
    <img
      className={"d-block ".concat([carouselType])}
      src={'https://nozestrump.ga/'.concat([filtered.img])}
      alt="First slide"
    />
  </Carousel.Item>);

  return (<>
    <Carousel
      className={"carousel ".concat([carouselType])}
      indicators={false}
      controls={false}
    >
      {photos}
    </Carousel>
  </>)
}