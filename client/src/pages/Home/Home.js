import React from "react";
import { Link } from "react-router-dom";
import HeroCarousel from "react-hero-carousel";
import heroImageOne from "../../assets/images/mars-hero-1.jpg";
import heroImageTwo from "../../assets/images/mars-hero-2.jpg";
import heroImageThree from "../../assets/images/mars-hero-3.jpg";
import heroImageFour from "../../assets/images/mars-hero-4.jpg";
import heroImageFive from "../../assets/images/mars-hero-5.jpg";
import "./Home.scss";

function Home() {
  return (
    <div className='hero'>
      <HeroCarousel height='100vh' interval={3000}>
        <img src={heroImageOne} alt='hero' width='100%' height='100%' />
        <img src={heroImageTwo} alt='hero' width='100%' height='100%' />
        <img src={heroImageThree} alt='hero' width='100%' height='100%' />
        <img src={heroImageFour} alt='hero' width='100%' height='100%' />
        <img src={heroImageFive} alt='hero' width='100%' height='100%' />
      </HeroCarousel>
      <div class="hero__overlay"></div>
      <div className='hero__text-container'>
        <h1 className='hero__header'>Maro</h1>
        <p className="hero__body">Step into the eyes of NASA's <span className="hero__span">Mars</span> Rovers</p>
        <Link to='/gallery' className='hero__text'>
          Explore Mars
        </Link>
      </div>
    </div>
  );
}

export default Home;
