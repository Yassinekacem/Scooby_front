import React, { useState, useEffect } from "react";
import Breadcrumb from "../../../components/breadcrumb/Breadcrumb";
import FoundDeclarationCard from "../../../components/declaration/FoundDeclarationCard";
import Layout from "../../../layout/Layout";
import Link from "next/link";

function FoundDeclaration() {
  const [value, setValue] = React.useState(50);

  const [FoundDeclarations, setFoundDeclarations] = useState([])
  const getFoundDeclarations = async () => {
    const response = await fetch("http://localhost:2001/foundDeclarations");
    const data = await response.json();
    setFoundDeclarations(data)
  };

  useEffect(() => {
    getFoundDeclarations()
  }, [])

  return (
    <Layout>
      {console.log(FoundDeclarations)}
      <Breadcrumb pageName="Déclarations de trouveille" pageTitle="Déclarations de trouveille" />
      <div className="shop-page pt-120 mb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="shop-sidebar">
                <div className="shop-widget">
                  <div className="check-box-item">
                    <h5 className="shop-widget-title">animal</h5>
                    <div className="checkbox-container">
                      <label className="containerss">
                        chat
                        <input type="checkbox" defaultChecked="checked" />
                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        chien
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="shop-widget">
                  <div className="check-box-item">
                    <h5 className="shop-widget-title">perdu</h5>
                    <div className="checkbox-container">
                      <label className="containerss">
                        Aujourd'hui
                        <input type="checkbox" defaultChecked="checked" />
                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        cette semaine
                        <input type="checkbox" defaultChecked="checked" />
                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        ce mois
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        cet année
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
                    <h6>Déclarations de perte </h6>
                    <div className="multiselect-area">
                      voulez vous aidez quelqu'un a trouver son animal ? cliquez ici :
                      <div className="single-select two">

                        <Link legacyBehavior href={`/declaration/addFoundDeclaration`}>
                          <a>J'ai trouvé un animal
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row g-4 justify-content-center">
                {FoundDeclarations.map((item, index) =>
                  <FoundDeclarationCard item={item} key={index} />
                )}
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

export default FoundDeclaration;
