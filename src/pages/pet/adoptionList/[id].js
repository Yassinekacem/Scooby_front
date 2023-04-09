import Link from "next/link";
import React from "react";
import Breadcrumb from "../../../components/breadcrumb/Breadcrumb";
import ProductDetails from "../../../components/shop/ProductDetails";
import Layout from "../../../layout/Layout";

function AdoptionDetails(props) {
  return (
    <Layout>
      <Breadcrumb pageName="adoption Details" pageTitle="adoption Details" />
      <div className="shop-details-page pt-120 mb-120">
        <div className="container">
        <div className="row g-lg-4 gy-5 mb-120">
        <div className="col-lg-7">
          <div className="tab-content tab-content1" id="v-pills-tabContent">
            <div
              className="tab-pane fade active show"
              id="v-pills-img1"
              role="tabpanel"
              aria-labelledby="v-pills-img1-tab"
            >
              <img
                className="img-fluid"
                src={props.animals.image}
                alt=""
               style={{ width: "470px", height: "430px" }}
              />
            </div>
            
            
            
          </div>
          
        </div>
        <div className="col-lg-5">
          <div className="shop-details-content">
            <h3>{props.animals.species} {props.animals.race}</h3>
            <ul className="shopuct-review2 d-flex flex-row align-items-center mb-25">
              
              <li>
                <a href="#" className="review-no">
                 Gender : {props.animals.gender}
                </a>
              </li>
            </ul>
            <div className="model-number">
              <span>age:{props.animals.age} ans </span>
            </div>
            <div className="price-tag">
              <h4>
               FREE(for adoption)
              </h4>
            </div>
            <p>
              {props.animals.description}.{" "}
            </p>
            <div className="shop-quantity d-flex align-items-center justify-content-start mb-20">
              <div className="quantity d-flex align-items-center">
              </div>
              
            </div>
            <div className="buy-now-btn">
              <Link legacyBehavior href="/cart">
                <a>Adopt Now</a>
              </Link>
            </div>
            <div className="compare-wishlist-area">
              
            </div>
            
          </div>
        </div>
      </div>
        </div>
      </div>
    </Layout>
  );
}

export default AdoptionDetails;




export async function getServerSideProps(context) {
  const res = await fetch (`http://localhost:2001/animals/${context.params.id}`)
  const data = await res.json()
  return {
    props : {
      animals : data
    }
  }
}