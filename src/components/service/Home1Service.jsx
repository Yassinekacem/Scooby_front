import Link from "next/link";
import React from "react";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
SwiperCore.use([Navigation, Pagination, Autoplay, EffectFade]);
function Home1Service() {
  const serviceSlider = {
    slidesPerView: "auto",
    spaceBetween: 24,
    // centeredSlides: true,
    loop: true,
    speed: 1500,
    autoplay: {
      delay: 2000,
    },
    navigation: {
      nextEl: ".next-btn-1",
      prevEl: ".prev-btn-1",
    },
    breakpoints: {
      280: {
        slidesPerView: 1,
        spaceBetween: 15,
      },
      480: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
      1400: {
        slidesPerView: 4,
      },
      1600: {
        slidesPerView: 4,
      },
    },
  };
  return (
    <div className="h1-service-area pt-120 mb-120">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 d-flex justify-content-center">
            <div className="section-title1 text-center">
              <span>
                <img src="assets/images/icon/section-vec-l1.svg" alt="" />
                Services
                <img src="assets/images/icon/section-vec-r1.svg" alt="" />
              </span>
              <h2>Les services disponibles ici</h2>
            </div>
          </div>
        </div>
        <div className="row d-sm-flex d-none">
          <div className="col-lg-12">
            <div className="swiper-btn-wrap d-flex align-items-center justify-content-between">
              <div className="slider-btn prev-btn-1">
                <i style={{ cursor: "pointer" }} className="bi bi-arrow-left" />
              </div>
              <div className="slider-btn next-btn-1">
                <i
                  style={{ cursor: "pointer" }}
                  className="bi bi-arrow-right"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <Swiper {...serviceSlider} className="swiper home1-services-slider">
            <div className="swiper-wrapper">
              <SwiperSlide className="swiper-slide">
                <div className="services-card1">
                  <img
                    className="services-card-vec"
                    src="assets/images/bg/services-card-vec.png"
                    alt=""
                  />
                  <div className="icon">
                    <img src="assets/images/icon/daycare-center2.svg" alt="" />
                  </div>
                  <div className="content">
                    <h3>
                      <Link legacyBehavior href="/service-details">
                        <a>"garderie d'animaux"</a>
                      </Link>
                    </h3>
                    <p>
                      tu peux trouver quelqu un qui garde ton animal
                    </p>
                  </div>
                 
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="services-card1 two">
                  <img
                    className="services-card-vec"
                    src="assets/images/bg/services-card-vec.png"
                    alt=""
                  />
                  <div className="icon">
                    <img src="assets/images/icon/grooming2.svg" alt="" />
                  </div>
                  <div className="content">
                    <h3>
                      <Link legacyBehavior href="/service-details">
                        <a> "toilettage d'animaux" </a>
                      </Link>
                    </h3>
                    <p>
                      tu peux trouver un professionnel qui vous aide a nettoyer ton animal
                    </p>
                  </div>
                  
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="services-card1 three">
                  <img
                    className="services-card-vec"
                    src="assets/images/bg/services-card-vec.png"
                    alt=""
                  />
                  <div className="icon">
                    <img src="assets/images/icon/boarding2.svg" alt="" />
                  </div>
                  <div className="content">
                    <h3>
                      <Link legacyBehavior href="/service-details">
                        <a> "dressage d'animaux"</a>
                      </Link>
                    </h3>
                    <p>
                    tu peux trouver un professionnel  qui fait le dressage pour ton animal
                    </p>
                  </div>
                  
                </div>
              </SwiperSlide>
              <SwiperSlide className="swiper-slide">
                <div className="services-card1 four">
                  <img
                    className="services-card-vec"
                    src="assets/images/bg/services-card-vec.png"
                    alt=""
                  />
                  <div className="icon">
                    <img src="assets/images/icon/veterinary2.svg" alt="" />
                  </div>
                  <div className="content">
                    <h3>
                      <Link legacyBehavior href="/service-details">
                        <a>"Soignement d'animaux"</a>
                      </Link>
                    </h3>
                    <p>
                    tu peux trouver un professionnel qui vous aide a soigner ton animal                   </p>
                  </div>
                  
                </div>
              </SwiperSlide>
            </div>
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default Home1Service;
