import React, { useState } from 'react';
import styled from 'styled-components';
import capa02 from './public/banners/capa02.jpg';
import capa03 from './public/banners/capa03.jpg';
import BannerItems from './view/bannerItems';
import Header from './view/header';
import Footer from './view/footer';
import { Carousel } from 'react-bootstrap';
import texto02 from './public/banners/texto02.png';
import texto3 from './public/banners/texto3.png';

const Section1 = styled.div`
  min-height: 60vh;
  width: 100vw;
  background-image: url(${capa03});
  background-size: cover;
  background-position: 50% 40%;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Section2 = styled.div`
min-height: 60vh;
width: 100vw;
background-image: url(${capa02});
background-size: cover;
background-position: 50% 40%;
background-repeat: no-repeat;
display: flex;
align-items: center;
justify-content: center;
`;

const BannerRow = styled.div`
  height: 100%;
  width: 100%;
  font-size: 3.0em;
`;

const Section3 = styled.div`
  min-height: 124vh;
  width: 100%;
`;

const IMG = styled.img`
  max-width: 50vw;
  max-height: 30vh;
`;

const Items = styled.div`
  height: 100%;
`;

export default function Welcome() {

  return (
    <>
      <Header />
      <Carousel className='carousel-dif' indicators={false}>
        <Carousel.Item>
          <Section1>
            <IMG
              src={texto02}
              alt="First slide"
            />
          </Section1>
        </Carousel.Item>
        <Carousel.Item>
        <Section2>
            <IMG
              src={texto3}
              alt="Second slide"
            />
          </Section2>
        </Carousel.Item>
      </Carousel>
      <Section3>
        <BannerItems>
        </BannerItems>
      </Section3>
      <Footer />
    </>
)}