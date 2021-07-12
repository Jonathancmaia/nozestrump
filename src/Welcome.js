import React, { useState } from 'react';
import styled from 'styled-components';
import capa01 from './public/banners/capa01.jpeg';
import BannerItems from './view/bannerItems';
import Header from './view/header';
import Footer from './view/footer';

const Section1 = styled.div`
  min-height: 60vh;
  width: 100%;
`;

const BannerSection1 = styled.div`
  min-height: 60vh;
  width: 100%;
  background-image: url(${capa01});
  background-size: cover;
`;

const BannerRow = styled.div`
  height: 100%;
  width: 100%;
  font-size: 3.0em;
`;

const Section2 = styled.div`
  min-height: 124vh;
  width: 100%;
  background-color: #474a51;
`;

const Items = styled.div`
  height: 100%;
`;

export default function Welcome() {

  return (
    <>
      <Header />
      <Section1 className='container'>
        <BannerRow className='row'>
          <div className='col-md-6 d-flex justify-content-center' style={{alignItems: 'center'}}>
            <br/>
            <span className='message'>#SejaNozesTrump</span>
          </div>
          <div className='col-md-6'>
            <BannerSection1 />
          </div>
        </BannerRow>
      </Section1>
      <Section2>
        <BannerItems>
        </BannerItems>
      </Section2>
      <Footer />
    </>
)}