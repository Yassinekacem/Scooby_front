import React from "react";

function AboutService() {
  return (
    <div className="h2-services-area mb-120">
      <div className="services-btm ">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="services-img">
                <div className="services-img-bg">
                  <img src="assets/images/icon/h2-services-img-bg.svg" alt="" />
                </div>
                <img
                  className="img-fluid"
                  src="assets/images/bg/h2-services-img.png"
                  alt=""
                />
              </div>
            </div>
            <div className="col-lg-7">
              <div className="services-content">
                <img src="assets/images/icon/section-sl-no.svg" alt="" />
                <h2><center>Le seul site en Tunisie pour les animaux et qui offre cette variété de services</center></h2>
                <p style={{ fontSize: "24px" }}><center>
                Nous sommes le premier et le seul site en Tunisie à offrir une variété de services pour les amoureux des animaux,
                 y compris la recherche d'animaux, de produits, et de professionnels de confiance.
                </center>
               
                </p>
                <div className="author-area">
                  <div className="author-quat">
                    <p>
                      <sup>
                        <img
                          src="assets/images/icon/author-quat-icon.svg"
                          alt=""
                        />
                      </sup>{" "}
                      En tant que passionné des animaux,
                      Nous avons créé "ScoobyDo" avec la vision de fournir une plateforme conviviale et sûre pour les amoureux des animaux en Tunisie
                    </p>
                  </div>
                  <div className="author-name-deg">
                    <h4>Yassine Kacem </h4>
                    <span>fondateur, Scooby</span>
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

export default AboutService;
