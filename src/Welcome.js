import React, { useState } from 'react';
import styled from 'styled-components';
import capa02 from './public/banners/capa02.jpg';
import capa03 from './public/banners/capa03.jpg';
import BannerItems from './view/bannerItems';
import Header from './view/header';
import Footer from './view/footer';
import { Carousel } from 'react-bootstrap';

const Section1 = styled.div`
  min-height: 60vh;
  width: 100vw;
  min-height: 60vh;
  background-image: url(${capa03});
  background-size: cover;
  background-position: 50% 40%;
  background-repeat: no-repeat;
`;

const Section2 = styled.div`
  min-height: 60vh;
  width: 100vw;
  min-height: 60vh;
  background-image: url(${capa02});
  background-size: cover;
  background-position: 50% 25%;
  background-repeat: no-repeat;
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

const Items = styled.div`
  height: 100%;
`;

export default function Welcome() {

  return (
    <>
      <Header />
      <Carousel className='carousel-dif'>
        <Carousel.Item>
          <Section1 className='container-fluid'>
            <div className='row'>
              <div className='col-12'>
                <center className='banner-text'>
                  <h1>
                    SEJA NOZES TRUMP
                  </h1>
                  <h3>
                    Confira os melhores preços de lançamento
                  </h3>
                </center>
              </div>
            </div>
          </Section1>
        </Carousel.Item>
        <Carousel.Item>
          <Section2>
            <div className='row'>
              <div className='col-12'>
                <center className='banner-text'>
                  <h1>
                    Moda masculina
                  </h1>
                  <h3>
                    Melhores ofertas em moda masculina
                  </h3>
                </center>
              </div>
            </div>
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