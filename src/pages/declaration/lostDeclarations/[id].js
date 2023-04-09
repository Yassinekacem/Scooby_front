import Link from "next/link";
import React from "react";
import Layout from "../../../layout/Layout";
import Breadcrumb from "../../../components/breadcrumb/Breadcrumb";

function LostDetails(props) {
  return (
    <Layout>
      <Breadcrumb pageName="Lost Animal Details" pageTitle="Lost Animal  Details" />
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
    src={props.lostDeclaration.image}
    alt=""
    style={{ width: "470px", height: "430px" }}
  />
</div>

            
            
            
          </div>
          
        </div>
        <div className="col-lg-5">
          <div className="shop-details-content">
            <h3> animal  : {props.lostDeclaration.animal} {props.lostDeclaration.race} </h3> <br />

            <ul className="shopuct-review2 d-flex flex-row align-items-center mb-25">
              
              <li>
                <a >
                  {props.lostDeclaration.withReward ? `Récompense offerte pour retour de mon ${props.lostDeclaration.animal}`: "" } 
                </a>
              </li>
            </ul>
            <br /> <br />
            <div className="model-number">
              Contact: {props.lostDeclaration.phoneNumber}
            </div>
            <br /> <br />
            <div className="price-tag">
              <h4>
                perdu à : {props.lostDeclaration.placeLost} 
              </h4>
            </div>
            <br />
            <div >

              <h4>
                perdu le : {props.lostDeclaration.dateLost} 
              </h4>
            </div>
            <br />
            <p>
              {props.lostDeclaration.description}.{" "}
            </p>
            <div className="shop-quantity d-flex align-items-center justify-content-start mb-20">
              
              
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
  const res = await fetch (`http://localhost:2001/lostDeclarations/${context.params.id}`)
  const data = await res.json()
  return {
    props : {
      lostDeclaration : data
    }
  }
}