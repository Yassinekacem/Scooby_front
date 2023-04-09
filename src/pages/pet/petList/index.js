import React, { useState, useEffect } from "react";
import Breadcrumb from "../../../components/breadcrumb/Breadcrumb";
import AnimalCard from "../../../components/animal/AnimalCard";
import Layout from "../../../layout/Layout";
import Link from "next/link";

function animal() {
  const [value, setValue] = React.useState(50);

  const [animals, setAnimals] = useState([])
  const getAnimals = async () => {
    const response = await fetch("http://localhost:2001/animals");
    const data = await response.json();
    setAnimals(data)
  };

  useEffect(() => {
    getAnimals()
  }, [])

  return (
    <Layout>
      {console.log(animals)}
      <Breadcrumb pageName="Dboutique de Scooby" pageTitle="boutique de Scooby" />
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
                    <h5 className="shop-widget-title">race chat</h5>
                    <div className="checkbox-container">
                      <label className="containerss">
                        siamois
                        <input type="checkbox" defaultChecked="checked" />
                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        persan
                        <input type="checkbox" defaultChecked="checked" />
                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        siberian
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        ragdoll
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="shop-widget">
                  <div className="check-box-item">
                    <h5 className="shop-widget-title">race chien</h5>
                    <div className="checkbox-container">
                      <label className="containerss">
                        berger allemand
                        <input type="checkbox" defaultChecked="checked" />
                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        pitbull
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        caniche
                        <input type="checkbox" />
                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        chihuauah
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
                    <h6>liste des animaux </h6>
                    <div className="multiselect-area">
                      Vous voulez vendre un animal ? cliquez ici :
                      <div className="single-select two">

                        <Link legacyBehavior href={`addPet`}>
                          <a>vendre mon animal
                          </a>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row g-4 justify-content-center">
              {animals
                  .filter((item) => item.status === "toSell")
                  .map((item, index) => <AnimalCard item={item} key={index} />)
                }
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

export default animal;
