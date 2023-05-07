import Link from "next/link";
import React from "react";
import Layout from "../../../layout/Layout";
import Breadcrumb from "../../../components/breadcrumb/Breadcrumb";
import SingleProductDescription from "../../../components/shop/SingleProductDescription";


function LostDetails(props) {
  return (
    <Layout>

      <Breadcrumb pageName="Détaille d'une déclaration de perte" pageTitle="Détaille déclaration" />
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
                  src={props.lostDeclaration.image}
                  alt=""
                  style={{ width: "520px", height: "480px" }}
                />
              </div>





            </div>
            <div className="col-lg-5">
              <div className="shop-details-content" align="center">
                <h3> {props.lostDeclaration.animal === "cat" ? "chat" : "chien"} {props.lostDeclaration.race} </h3>

                <ul className="shopuct-review2 d-flex flex-row align-items-center mb-25">

                  <li>
                    <a >
                      <h4 color={"green"}>{props.lostDeclaration.withReward ? `"Récompense offerte pour retour de mon ${props.lostDeclaration.animal}"` : ""} </h4>
                    </a>
                  </li>
                </ul>
                <br />
                <div className="model-number">
                  <h4>Contact: <u>{props.lostDeclaration.phoneNumber}</u></h4>
                </div>
                <br /> <br />
                <div className="price-tag">
                  <h4>
                    perdu à : {props.lostDeclaration.placeLost}
                  </h4>
                </div>
                <br />
                <div >

                  <h3>
                    perdu le : {props.lostDeclaration.dateLost}
                  </h3>
                </div>
                <br />
                <p>
                  {props.lostDeclaration.description}.{" "}
                </p>
                <div className="shop-quantity d-flex align-items-center justify-content-start mb-20">


                </div>
                <h2>Svp Si vous le trouvez n'hésitez pas à me Contacter : </h2> <br />
                <div className="buy-now-btn">
                  <Link legacyBehavior href={`tel:+216${props.lostDeclaration.phoneNumber}`}>
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

export default LostDetails;

export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:2001/lostDeclarations/${context.params.id}`)
  const data = await res.json()
  return {
    props: {
      lostDeclaration: data
    }
  }
}