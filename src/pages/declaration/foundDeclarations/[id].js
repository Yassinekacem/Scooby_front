import Link from "next/link";
import React from "react";
import Layout from "../../../layout/Layout";
import Breadcrumb from "../../../components/breadcrumb/Breadcrumb";

function FoundDetails(props) {
  return (
    <Layout>
      <Breadcrumb pageName="Détaille d'une déclaration de trouveille" pageTitle="Détaille déclaration" />
      <div className="shop-details-page pt-120 mb-120">
        <div className="container">
        <div className="row g-lg-4 gy-5 mb-120">
        <div className="col-lg-7">
          <div
  className="tab-pane fade active show"
  id="v-pills-img1"
  role="tabpanel"
  aria-labelledby="v-pills-img1-tab"
>
  <img
    className="img-fluid"
    src={props.foundDeclaration.image}
    alt=""
    style={{ width: "520px", height: "480px" }}
  />
</div>

            
            
            
          
        </div>
        <div className="col-lg-5">
          <div className="shop-details-content" align="center">
          <h4>Annonce de trouveille d'un : </h4> <br />  

            <h3> {props.foundDeclaration.animal==="cat" ? "chat" : "chien" } {props.foundDeclaration.race} </h3> 

            <ul className="shopuct-review2 d-flex flex-row align-items-center mb-25">
              
              <li>
                <a >
                </a>
              </li>
            </ul>
            
            <div className="model-number">
              <h4>Numéro de téléphone : <u>{props.foundDeclaration.phoneNumber}</u></h4>
            </div>
            <br /> <br />
            <div className="price-tag">
              <h4>
                trouvé à : {props.foundDeclaration.placeFound} 
              </h4>
            </div>
            <br />
            <div >

              <h3>
                Trouvé le : {props.foundDeclaration.dateFound} 
              </h3>
            </div>
            <br />
            <p>
              {props.foundDeclaration.description}.{" "}
            </p>
            <div className="shop-quantity d-flex align-items-center justify-content-start mb-20">
              
              
            </div>
            
                <div className="buy-now-btn">
                  <Link legacyBehavior href={`tel:+216${props.foundDeclaration.phoneNumber}`}>
                    <a>
                       Appelez maintenant  <i className="fa fa-phone"></i>
                    </a>
                  </Link>
                </div>
            
          </div>
        </div>
      </div>
    
        </div>
      </div>
    </Layout>
  );
}

export default FoundDetails;



export async function getServerSideProps(context) {
  const res = await fetch (`http://localhost:2001/foundDeclarations/${context.params.id}`)
  const data = await res.json()
  return {
    props : {
      foundDeclaration : data
    }
  }
}