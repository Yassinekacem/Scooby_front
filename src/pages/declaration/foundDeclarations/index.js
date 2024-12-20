import React, { useState, useEffect } from "react";
import Breadcrumb from "../../../components/breadcrumb/Breadcrumb";
import FoundDeclarationCard from "../../../components/declaration/FoundDeclarationCard";
import Layout from "../../../layout/Layout";
import Link from "next/link";
import moment from "moment";
import axios from 'axios';
import jwtDecode from "jwt-decode"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function FoundDeclaration() {
  const [connectedUser, setConnectedUser] = useState({})
  const getConnectedUserData = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setConnectedUser(decodedToken);
    }
  };
  useEffect(() => {
    getConnectedUserData()
  }, [])


  const [value, setValue] = React.useState(50);
  // check animal
  const [isCatChecked, setIsCatChecked] = useState(false);
  const [isDogChecked, setIsDogChecked] = useState(false);


  const [isYours, setIsYours] = useState(false);
  const [isNotYours, setIsNotYours] = useState(false);


  // check date
  const [isTodayChecked, setIsTodayChecked] = useState(false);
  const [isWeekChecked, setIsWeekChecked] = useState(false);
  const [isMonthChecked, setIsmonthChecked] = useState(false);
  const [isYearChecked, setIsyearChecked] = useState(false);

  const [FoundDeclarations, setFoundDeclarations] = useState([])

  const getFoundDeclarations = async () => {
    try {
      const response = await axios.get("http://localhost:2001/foundDeclarations");
      setFoundDeclarations(response.data);

    } catch (error) {
      console.error(error);
    }
  };


  useEffect(() => {
    getFoundDeclarations()
  }, [])


  const deleteDeclaration = async (DeclarationID) => {
    const response = await fetch(`http://localhost:2001/foundDeclarations/${DeclarationID}`, {
      method: "DELETE",
    })
    const data = await response.json()
    console.log(data)
    setFoundDeclarations(FoundDeclarations.filter(FoundDeclarations => FoundDeclarations.id !== DeclarationID))
    toast.success(`déclaration supprimé supprimé`);
  }


  const handleCatChange = (event) => {
    setIsCatChecked(event.target.checked);
  };
  const handleDogChange = (event) => {
    setIsDogChecked(event.target.checked);
  };

  const handleIsYours = (event) => {
    setIsYours(event.target.checked);
  };

  const handleTodayChange = (event) => {
    setIsTodayChecked(event.target.checked);
  };
  const handleMonthChange = (event) => {
    setIsmonthChecked(event.target.checked);
  };
  const handleWeekChange = (event) => {
    setIsWeekChecked(event.target.checked);
  };
  const handleYearChange = (event) => {
    setIsyearChecked(event.target.checked);
  };
  const filteredAnimals = FoundDeclarations.filter((FoundDeclaration) => {
    let showFoundDeclaration = true;

    // Filter by animal
    if ((isCatChecked && FoundDeclaration.animal !== "chat") ||
      (isDogChecked && FoundDeclaration.animal !== "chien")) {
      showFoundDeclaration = false;
    }

    const yourDeclaration = FoundDeclaration.userId === connectedUser.userId
    if (isYours && !yourDeclaration) {
      showFoundDeclaration = false;
    }

    // Filter by date
    if (isTodayChecked && !moment(FoundDeclaration.dateFound).isSame(moment(), "day")) {
      showFoundDeclaration = false;
    }
    if (isWeekChecked && !moment(FoundDeclaration.dateFound).isSame(moment(), "week")) {
      showFoundDeclaration = false;
    }
    if (isMonthChecked && !moment(FoundDeclaration.dateFound).isSame(moment(), "month")) {
      showFoundDeclaration = false;
    }
    if (isYearChecked && !moment(FoundDeclaration.dateFound).isSame(moment(), "year")) {
      showFoundDeclaration = false;
    }

    return showFoundDeclaration;
  });

  // pagination 
  const items = 8;
  const [current, setCurrent] = useState(1);
  const nbPages = Math.ceil(filteredAnimals.length / items);
  const startIndex = (current - 1) * items;
  const endIndex = startIndex + items;
  const dataPerPage = filteredAnimals.slice(startIndex, endIndex)

  const goToNextPage = () => {
    if (current < nbPages) {
      setCurrent(current + 1);
    }
  };

  const goToPrevPage = () => {
    if (current > 1) {
      setCurrent(current - 1);
    }
  };
  return (
    <Layout>
      {console.log(FoundDeclarations)}
      <Breadcrumb pageName="Toutes les déclarations de trouvaille d'animaux" pageTitle="Déclarations de trouvaille" src1="" src = "../../../assets/images/bg/inner-banner-img4.png" />
      <div className="shop-page pt-120 mb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="shop-sidebar">
                <div className="shop-widget">

                  <div className="check-box-item">
                    <div className="checkbox-container">
                      <label className="containerss">

                        <h6 className="shop-widget-title">Vos propres déclarations</h6>
                        <input type="checkbox" checked={isYours}
                          onChange={handleIsYours} />
                        <span className="checkmark"></span>

                      </label>

                    </div>

                  </div>
                </div>
                <div className="shop-widget">
                  <div className="check-box-item">
                    <h5 className="shop-widget-title">animal</h5>
                    <div className="checkbox-container">
                      <label className="containerss">
                        chat
                        <input type="checkbox" checked={isCatChecked}
                          onChange={handleCatChange} />                         <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        chien
                        <input type="checkbox" checked={isDogChecked}
                          onChange={handleDogChange} />                         <span className="checkmark" />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="shop-widget">
                  <div className="check-box-item">
                    <h5 className="shop-widget-title">Date de trouvaille</h5>
                    <div className="checkbox-container">
                      <label className="containerss">
                        Aujourd'hui
                        <input type="checkbox" checked={isTodayChecked}
                          onChange={handleTodayChange} />
                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        cette semaine
                        <input type="checkbox" checked={isWeekChecked}
                          onChange={handleWeekChange} />
                        <span className="checkmark" />

                      </label>

                      <label className="containerss">
                        ce mois
                        <input type="checkbox" checked={isMonthChecked}
                          onChange={handleMonthChange} />
                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        cet année
                        <input type="checkbox" checked={isYearChecked}
                          onChange={handleYearChange} />
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
                    <h6>Déclarations de trouveille </h6>
                    <div className="multiselect-area">
                      <h5>voulez vous aidez quelqu'un a trouver son animal ? cliquez ici :</h5>
                      {connectedUser.userId ? (
                        <Link legacyBehavior href={`/declaration/addFoundDeclaration`}>
                          <button className="primary-btn0">J'ai trouvé un animal
                          </button>
                        </Link>
                      ) : (
                        <button
                          className="primary-btn0"
                          onClick={() => {
                            toast.error("Veuillez vous connectez pour déclarer une trouveille");
                          }}
                        >
                          J'ai trouvé un animal                    </button>)}

                    </div>
                  </div>
                </div>
              </div>
              <div className="row g-4 justify-content-center">
                {dataPerPage.map((item, index) =>
                  <FoundDeclarationCard item={item} key={index} handleDelete={deleteDeclaration} handleGet={getFoundDeclarations} />
                )}
              </div>
              <div className="row pt-70">
                <div className="col-lg-12 d-flex justify-content-center">
                  <div className="paginations-area">
                    <nav aria-label="Page navigation example">
                      <ul className="pagination">
                        <li className="page-item" onClick={goToPrevPage}>
                          <a className="page-link" href="#">
                            <i className="bi bi-arrow-left-short" />
                          </a>
                        </li>
                        {Array.from({ length: nbPages }, (_, i) => i + 1).map(page => {
                          return <li className="page-item">
                            <a className="page-link" href="#" onClick={() => setCurrent(page)}>
                              0{page}
                            </a>
                          </li>
                        })}

                        <li className="page-item" onClick={goToNextPage}>
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