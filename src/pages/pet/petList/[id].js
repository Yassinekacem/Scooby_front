import Link from "next/link";
import React from "react";
import Breadcrumb from "../../../components/breadcrumb/Breadcrumb";
import Layout from "../../../layout/Layout";

function ShopDetails(props) {
  return (
    <Layout>
      <Breadcrumb pageName="Détaille d'une annonce d'animal à vendre" pageTitle="Détaille animal" src1=""/>
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
                  className="img-fluid rounded-circle"
                  src={props.animals.image}
                  alt=""
                  style={{ width: "500px", height: "500px", borderRadius: "100%" }}
                />
              </div>






            </div>
            <div className="col-lg-5">
              <div className="shop-details-content" align="center">
                <h3 style={{ fontFamily: "Caveat, cursive" }}>
                  {props.animals.name} 

                </h3>
                <br />
                <div className="price-tag">
                  <h4>
                   Prix : {props.animals.price} Dt
                  </h4>
                </div> <br />
                <i><h5 style={{ fontWeight: 'bold', color: 'black' }}>
                  Race : {props.animals.species} {props.animals.race} 
                </h5></i> <br />
                <i><h5 style={{ fontWeight: 'bold', color: 'black' }}>
                  date de naissance : {props.animals.dateOfBirth}
                </h5></i> <br />
                <i><h5 style={{ fontWeight: 'bold', color: 'black' }}>
                  sexe : {props.animals.gender} 
                </h5></i>
                <br />
                <i><h5 style={{ fontWeight: 'bold', color: 'black' }} > age : {props.animals.age} ans </h5> </i><br />
                <i><h5 style={{ fontWeight: 'bold', color: 'red' }}> {props.animals.isEducated ? "dréssé" : ""}</h5></i>  
                <i><h5 style={{ fontWeight: 'bold', color: 'red' }}> {props.animals.isVaccinated ? "Vacciné" : ""}</h5></i>  

                <br />
                <div className="shop-quantity d-flex align-items-center justify-content-start mb-20">

                <h4>
                  {props.animals.description}.{" "}
                </h4> <br />
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
  const res = await fetch (`http://localhost:2001/animals/${context.params.id}`)
  const data = await res.json()
  return {
    props : {
      animals : data
    }
  }
}