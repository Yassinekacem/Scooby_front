import Link from "next/link";
import React from "react";
import Morphext from "../morphext/Morphext";

function Banner1() {
  const phrases = [ "chien .", "chat ." ,"oiseau ."];
  return (
    <div className="hero-style-1">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-lg-11">
            <div className="row">
              <div className="col-xxl-6 col-xl-5 d-flex align-items-center">
                <div className="banner-content ">
                  <div className="tag">
                    <ul>
                      <li>Loyauté</li>
                      <li>Professionnel</li>
                      <li>Sécurité</li>
                    </ul>
                  </div>
                  <h1>
                  offrez un petit cadeau 
                    <br /> a votre {" "}
                    <Morphext
                      animation="fadeInLeft"
                      speed="3000"
                      phrases={phrases}
                    />
                  </h1>
                </div>
              </div>
              <div className="col-xxl-6 col-xl-7 d-flex align-items-center justify-content-md-start justify-content-center">
                <div className="banner-img">
                  <img
                    className="img-fluid"
                    src="assets/images/bg/new-banner-img.png"
                    alt=""
                  />
                </div>
                <div className="reservation-review">
                  <div className="reservation-btn">
                    <Link legacyBehavior href="/shop">
                      <a className="primary-btn1">Accédez à la boutique</a>
                    </Link>
                  </div> 
                  
                  
                 
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner1;
