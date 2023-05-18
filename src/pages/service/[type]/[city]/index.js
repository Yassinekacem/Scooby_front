import React from "react";
import Layout from "../../../../layout/Layout";
import Breadcrumb from "../../../../components/breadcrumb/Breadcrumb";
import ServiceCard from "../../../../components/service/ServiceCard";

function ServiceByCityAndType(props) {
  return (
      <Layout>
{            console.log(props)
}
      <Breadcrumb pageName="liste des annonces de service a votre choix" pageTitle="liste des annonces" src="" src1="" />
      <div className="shop-page pt-120 mb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
             
            </div>
            <div className="col-lg-9">
              <div className="row mb-50">
                <div className="col-lg-12">
                  <div className="multiselect-bar">
                    <h6>Liste des {props.type==="petSitting" ? "gardeur d'animaux" : props.type==="petTraining" ? "dresseur d'animaux" : props.type==="veterinaryCaring" ? "véterinaire" : "toiletteur d'animaux"} dans votre ville : </h6>
                    
                  </div>
                </div>
              </div>
              <div className="row g-4 justify-content-center">
              
              <ServiceCard announcements={props.announcements} />
              </div>
              <div className="row pt-70">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const res = await fetch(
    `http://localhost:2001/announcements/${context.params.type}/${context.params.city}`
  );
  const data = await res.json();
  return {
    props: {
      announcements: data,
      type : context.params.type
    },
  };
}

export default ServiceByCityAndType;
