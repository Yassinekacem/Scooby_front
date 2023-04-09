import React from "react";

function ChooseUs() {
  return (
    <div className="h1-choose-area mb-120">
      <div className="container ">
        <div className="row g-lg-4 gy-5 justify-content-center">
          <div className="col-lg-5">
            <div className="section-title1">
              <span>
                <img src="assets/images/icon/section-vec-l1.svg" alt="" />
                Pourquoi nous choisir ?
                <img src="assets/images/icon/section-vec-r1.svg" alt="" />
              </span>
              <h2>Trouvez tout ce qu'il vous faut pour votre animal</h2>
            </div>
            <div className="choose-content">
              <p style={{ fontSize: "20px" }}>
              Nous offrons des animaux à vendre ou à adopter, ainsi que des déclarations de perte et de découverte
              pour aider les propriétaires à retrouver leurs animaux perdus. 
              Les vendeurs peuvent également poster leurs produits à vendre sur notre site, notamment des aliments pour animaux et des accessoires.
              Les vétérinaires et les dresseurs peuvent également poster leurs services pour aider les propriétaires à prendre soin de leurs animaux de compagnie.
              Nous sommes fiers de fournir une plateforme sécurisée et conviviale pour tous les amoureux des animaux, offrant les meilleurs services possibles pour nos utilisateurs.
              </p>
              <div className="accordion" id="accordionExample">
                
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      01. "Vous avez perdu votre animal ? Comment ajouter une déclaration de perte ?"
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <p style={{ fontSize: "18px" }}>
                    Pour signaler une perte d'animal sur ScoobyDo,
                    il suffit d'ouvrir le site et de cliquer sur "Déclaration" dans la barre de navigation, puis sur " Lost Declarations". Ensuite, sélectionnez "I lost my animal" et entrez les coordonnées de votre animal. Vous pouvez également consulter les annonces de découverte en cliquant sur "Found Declarations".{" "}
                    </p></div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      02. Vous souhaitez adopter un animal ? Comment procéder ?
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                    <p style={{ fontSize: "18px" }}>Pour adopter un animal sur ScoobyDo, il suffit d'ouvrir le site et de cliquer sur "pet" dans la barre de navigation, puis sur "adoption List". et consulter tous les animales a adopter en tunisie . Vous pouvez également proposer ton animal a adopter en cliquant sur "propose your animal".{" "}
                    </p></div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingThree">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      03. vous etes une animalerie ou un freelancer ? comment vendez vos produits ?
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                    <p style={{ fontSize: "18px" }}>Pour vendre vos produits sur ScoobyDo,
                    il suffit d'ouvrir le site et de cliquer sur "shop" dans la barre de navigation. Ensuite, sélectionnez "add your product "  (il faut que tu es authentifié pour faire ca )
                    </p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-5 col-md-8">
            <div className="choose-img">
              <div className="batch">
                <img src="assets/images/icon/choose-star.svg" alt="" />
                <span>
                  100% Safe
                  <br />
                  Your Pet
                </span>
              </div>
              <div className="choose-vector">
                <img src="assets/images/icon/choose-vector.svg" alt="" />
              </div>
              <img
                className="img-fluid"
                src="assets/images/bg/choose-img.png"
                alt="choose-img"
              />
            </div>
          </div>
          <div className="col-lg-2">
            <div className="choose-feature">
              <ul>
                <li>
                  <div className="single-choose-card">
                    <div className="icon">
                      <img src="assets/images/icon/care.svg" alt="" />
                    </div>
                    <div className="content">
                      <h4>soins personnalisés</h4>
                      <p>
                      Vous trouverez des professionnels qui vous aideront avec beaucoup d'amour
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="single-choose-card">
                    <div className="icon">
                      <img src="assets/images/icon/team.svg" alt="" />
                    </div>
                    <div className="content">
                      <h4>équipe de confiance</h4>
                      <p>
                      Faites confiance aux vendeurs, vétérinaires et dresseurs, car nous vérifions leurs profils au préalable
                      </p>
                    </div>
                  </div>
                </li>
                <li>
                  <div className="single-choose-card">
                    <div className="icon">
                      <img src="assets/images/icon/mind.svg" alt="" />
                    </div>
                    <div className="content">
                      <h4>Tranquillité d'esprit</h4>
                      <p>
                      Vous pouvez avoir l'esprit tranquille avec nous
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseUs;
