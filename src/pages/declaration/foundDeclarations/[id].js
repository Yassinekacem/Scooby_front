import Link from "next/link";
import React from "react";
import Layout from "../../../layout/Layout";
import Breadcrumb from "../../../components/breadcrumb/Breadcrumb";

function FoundDetails(props) {
  return (
    <Layout>
      <Breadcrumb pageName="Found animal Details" pageTitle="Found animal Details" />
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
    src={props.foundDeclaration.image}
    alt=""
    style={{ width: "470px", height: "430px" }}
  />
</div>

            
            
            
          </div>
          
        </div>
        <div className="col-lg-5">
          <div className="shop-details-content">
            <h3> animal  : {props.foundDeclaration.animal} {props.foundDeclaration.race} </h3> <br />

            
            <br /> <br />
            <div className="model-number">
              Contact: {props.foundDeclaration.phoneNumber}
            </div>
            <br /> <br />
            <div className="price-tag">
              <h4>
                trouvé à : {props.foundDeclaration.placeFound} 
              </h4>
            </div>
            <br />
            <div >

              <h4>
                trouvé le : {props.foundDeclaration.dateFound} 
              </h4>
            </div>
            <br />
            <p>
              {props.foundDeclaration.description}.{" "}
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