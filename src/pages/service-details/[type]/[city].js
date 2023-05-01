import React from "react";
import Layout from "../../../layout/Layout";
import Breadcrumb from "../../../components/breadcrumb/Breadcrumb";
import ServiceCard from "../../../components/service/ServiceCard";

function ServiceByCityAndType(props) {
  return (
    
      <Layout>
      <Breadcrumb pageName="Shop" pageTitle="Shop" />
      <div className="shop-page pt-120 mb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="shop-sidebar">
                <div className="shop-widget">
                  <div className="check-box-item">
                    <h5 className="shop-widget-title">niveau de service </h5>
                    <div className="checkbox-container">
                      <label className="containerss">
                        basique
                        <input type="checkbox" defaultChecked="checked" />
                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        intermédiaire
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        personnalisé
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="shop-widget">
                  <div className="check-box-item">
                    <h5 className="shop-widget-title">Expérience</h5>
                    <div className="checkbox-container">
                      <label className="containerss">
                        Plus de 3 ans
                        <input type="checkbox" defaultChecked="checked" />
                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        Plus de 5 ans
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        Plus de 10 ans
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
            
                    </div>
                  </div>
                </div>
              
              
              </div>
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
                <div className="col-lg-12 d-flex justify-content-center">
                  <div className="paginations-area">
                    <nav aria-label="Page navigation example">
                      <ul className="pagination">
                        <li className="page-item">
                          <a className="page-link" href="#">
                            <i className="bi bi-arrow-left-short" />
                          </a>
                        </li>
                        <li className="page-item active">
                          <a className="page-link" href="#">
                            01
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            02
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            03
                          </a>
                        </li>
                        <li className="page-item">
                          <a className="page-link" href="#">
                            <i className="bi bi-arrow-right-short" />
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
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
