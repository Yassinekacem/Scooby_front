import Link from "next/link";
import React from "react";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import ProductDetails from "../../components/shop/ProductDetails";
import Layout from "../../layout/Layout";
import ProductPriceCount from "../../components/shop/ProductPriceCount";

function ShopDetails(props) {
  return (
    <Layout>
      <Breadcrumb pageName="Détaille d'une annonce d'animal à vendre" pageTitle="Détaille animal" src1=""  src = "../../../assets/images/bg/inner-banner-img2.png" />
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
                  src={props.products.image}
                  alt=""
                  style={{ width: "350px", height: "350px" }}
                />
              </div>






            </div>
            <div className="col-lg-5">
              <div className="shop-details-content" align="center">
                <h3 style={{ fontFamily: "Caveat, cursive" }}>
                  {props.products.category === "food" ? "Nourriture pour animaux" : "Accessoire pour animaux"}

                </h3>
                <br />
                <div className="price-tag">
                  <h4>
                    Prix : {props.products.price} Dt
                  </h4>
                </div> <br />
                <i><h5 style={{ fontWeight: 'bold', color: 'black' }}>
                  animale cible  : {props.products.category === "food" ? "Nourriture" : "Accessoire"} {"pour"} {props.products.animalCible}
                </h5></i> <br />
                <i><h5 style={{ fontWeight: 'bold', color: 'black' }}>
                  Marque de produit : {props.products.brandProduct}
                </h5></i> <br />
                <h4>
                  {props.products.description}.{" "}
                </h4>
                <div className="shop-quantity d-flex align-items-center justify-content-start mb-20">

                </div>
                <h4 style={{ fontFamily: "Montserrat, sans-serif" }}>
                  contactez moi pour plus d'informations :
                </h4>
                <br />
                <div className="buy-now-btn">
                  <Link legacyBehavior href={``}>
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

export default ShopDetails;




export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:2001/products/${context.params.id}`)
  const data = await res.json()
  return {
    props: {
      products: data
    }
  }
}