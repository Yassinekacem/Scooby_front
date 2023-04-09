import { useRouter } from "next/router";
import React from "react";

function Home1About() {
  const currentpage = useRouter().pathname;
  return (
    <div
      className={
        currentpage === "/about"
          ? "h1-story-area two mb-120 pt-120"
          : "h1-story-area mb-120"
      }
    >
      <div className="container">
        <div className="row g-lg-4 gy-5">
          <div className="col-lg-6">
            <div className="section-title1">
              <span>
                <img src="assets/images/icon/section-vec-l1.svg" alt="" />
                Notre histoire
                <img src="assets/images/icon/section-vec-r1.svg" alt="" />
              </span>
              <h2><center>"ScoobyDo"</center> <center>La plateforme pour les amoureux des animaux</center></h2>
            </div>
            <div className="story-content" style={{ fontSize: "24px" }}>
  <center>
    "ScoobyDo" est une plateforme pour les amoureux des animaux créée en 2023 par
    <a href="https://aftercode.tn/fr" target="_blank" rel="noopener noreferrer"> AfterCode </a>.
    Nous proposons des animaux à vendre ou à adopter, des déclarations de perte et de découverte, des produits pour animaux, ainsi que des services de vétérinaires et de dresseurs.
    Notre site est convivial et sécurisé pour les utilisateurs.
  </center>
</div>


          </div>
          <div className="col-lg-6 d-flex justify-content-lg-end justify-content-center">
            <div className="story-img">
              <img
                className="img-fluid"
                src="assets/images/bg/story-img1.png"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home1About;
