import Link from "next/link";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import Layout from "../../layout/Layout";
import "react-datepicker/dist/react-datepicker.css";
import Home1Service from "../../components/service/Home1Service";
import ItemCounter from "../../components/shop/ProductCount";

function ServiceDetails() {

    const [selectedService, setSelectedService] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    const handleServiceChange = (event) => {
        setSelectedService(event.target.value);
    };

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };


    return (
        <Layout>
            <Breadcrumb pageName="Services pour animaux" pageTitle="Services pour animaux" />
            <div className="services-details-area pt-120 mb-120">
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
                                        src="assets/images/bg/card-big-01.png"
                                        alt=""
                                    />
                                </div>
                                <div
                                    className="tab-pane fade"
                                    id="v-pills-img2"
                                    role="tabpanel"
                                    aria-labelledby="v-pills-img2-tab"
                                >
                                    <img
                                        className="img-fluid"
                                        src="assets/images/bg/card-big-02.png"
                                        alt=""

                                    />
                                </div>
                                <div
                                    className="tab-pane fade"
                                    id="v-pills-img3"
                                    role="tabpanel"
                                    aria-labelledby="v-pills-img3-tab"
                                >
                                    <img
                                        className="img-fluid"
                                        src="assets/images/bg/card-big-03.png"
                                        alt=""

                                    />
                                </div>
                                <div
                                    className="tab-pane fade"
                                    id="v-pills-img4"
                                    role="tabpanel"
                                    aria-labelledby="v-pills-img4-tab"
                                >
                                    <img
                                        className="img-fluid"
                                        src="assets/images/bg/card-big-04.png"
                                        alt=""

                                    />
                                </div>
                                <div
                                    className="tab-pane fade"
                                    id="v-pills-img5"
                                    role="tabpanel"
                                    aria-labelledby="v-pills-img5-tab"
                                >
                                    <img
                                        src="assets/images/bg/card-big-05.png"
                                        alt=""

                                    />
                                </div>
                            </div>
                            <div
                                className="nav nav1 nav-pills"
                                id="v-pills-tab"
                                role="tablist"
                                aria-orientation="vertical"
                            >
                                <button
                                    id="v-pills-img1-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#v-pills-img1"
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-img1"
                                    aria-selected="true"
                                >
                                    <img src="assets/images/bg/card-sm-01.png" alt=""
                                    />
                                </button>
                                <button
                                    className="nav-link"
                                    id="v-pills-img2-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#v-pills-img2"
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-img2"
                                    aria-selected="false"
                                >
                                    <img src="assets/images/bg/card-sm-02.png" alt="" />
                                </button>
                                <button
                                    className="nav-link"
                                    id="v-pills-img3-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#v-pills-img3"
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-img3"
                                    aria-selected="false"
                                >
                                    <img src="assets/images/bg/card-sm-03.png" alt="" />
                                </button>
                                <button
                                    className="nav-link"
                                    id="v-pills-img4-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#v-pills-img4"
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-img4"
                                    aria-selected="false"
                                >
                                    <img src="assets/images/bg/card-sm-04.png" alt="" />
                                </button>
                                <button
                                    className="nav-link"
                                    id="v-pills-img5-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#v-pills-img5"
                                    type="button"
                                    role="tab"
                                    aria-controls="v-pills-img5"
                                    aria-selected="false"
                                >
                                    <img src="assets/images/bg/card-sm-05.png" alt="" />
                                </button>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="services-datails-content">
                                <div className="banner-title">
                                    <div className="currency">
                                        <h5>Sélectionnez le service désiré</h5>
                                    </div>
                                </div>
                                <div className="service-area">
                                    <form>
                                        <div className="row g-4">
                                            <div className="col-lg-12">
                                                <div className="form-inner">
                                                    <label>Service *</label>
                                                    <select
                                                        id="duration"
                                                        style={{
                                                            width: "100%",
                                                            padding: "10px",
                                                            borderRadius: "5px",
                                                            border: "1px solid #ddd",
                                                        }}
                                                        onChange={handleServiceChange}

                                                    >
                                                        <option value="">Choisissez un service</option>
                                                        <option value="veterinaryCaring">Soignement d'animaux</option>
                                                        <option value="petTraining">Dressage d'animaux</option>
                                                        <option value="petSitting">Garderie d'animaux</option>
                                                        <option value="petGrooming">Toilettage d'animaux</option>

                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-12">
                                                <div className="form-inner">
                                                    <label>Votre ville *</label>
                                                    <select
                                                        id="duration"
                                                        style={{
                                                            width: "100%",
                                                            padding: "10px",
                                                            borderRadius: "5px",
                                                            border: "1px solid #ddd",
                                                        }}
                                                        onChange={handleCityChange}

                                                    >
                                                        <option value="tunis"> Tunis</option><option value="nabeul">Nabeul</option><option value="beja">Beja</option ><option value="sousse">Sousse</option><option value="bizerte">Bizerte</option><option value="kef">Kef</option><option value="jendouba">Jendouba</option><option value="monastir">Monastir</option><option value="kairaouan">Kairaouan</option><option value="gassrine">Gassrine</option>
                                                        <option value="mahdia">Mahdia</option><option value="sfax">Sfax</option><option value="gabes">Gabes</option><option value="mannouba">Mannouba</option><option value="ariana">Ariana</option><option value="ben arous">Ben Arous</option><option value="zaghouane">Zaghouane</option><option value="siliana">Siliana</option><option value="tataouine">Tataouine</option><option value="mednin">Mednin</option>
                                                        <option value="gafsa">Gafsa</option><option value="tozeur">Tozeur</option><option value="gbelli">Gbelli</option><option value="sidi bou zid">Sidi Bou Zid</option>


                                                    </select>
                                                </div>
                                            </div>
                                            <div className="shop-quantity d-flex flex-wrap align-items-center justify-content-start mb-5">
                                                <Link legacyBehavior href={`/service-details/${selectedService}/${selectedCity}`}>
                                                    <a className="primary-btn3">Voir les disponibilités</a>
                                                </Link>
                                            </div>


                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row g-4 justify-content-center">

                    </div>
                    <Home1Service />
                </div>
            </div>
        </Layout>
    );
}

export default ServiceDetails;
