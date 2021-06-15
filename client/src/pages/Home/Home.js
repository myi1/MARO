import React from "react";
import HeroCarousel from "react-hero-carousel";
import heroImageOne from "../../assets/images/mars-hero-1.jpg";
import heroImageTwo from "../../assets/images/mars-hero-2.jpg";
import heroImageThree from "../../assets/images/mars-hero-3.jpg";
import heroImageFour from "../../assets/images/mars-hero-4.jpg";
import "./Home.scss";

function Home() {
  return (
    <div className='hero'>
      <HeroCarousel height='100vh' interval={3000}>
        <img src={heroImageOne} alt='hero' width='100%' height='100%' />
        <img src={heroImageTwo} alt='hero' width='100%' height='100%' />
        <img src={heroImageThree} alt='hero' width='100%' height='100%' />
        <img src={heroImageFour} alt='hero' width='100%' height='100%' />
      </HeroCarousel>
    </div>
  );
}

export default Home;
