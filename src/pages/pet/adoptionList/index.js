import React, { useState, useEffect } from "react";
import Breadcrumb from "../../../components/breadcrumb/Breadcrumb";
import AnimalAdoptCard from "../../../components/animal/AnimalAdoptCard";
import Layout from "../../../layout/Layout";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from "jwt-decode"


function animal() {
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



  const [isYours, setIsYours] = useState(false);
  const [isNotYours, setIsNotYours] = useState(false);
  const [isCatChecked, setIsCatChecked] = useState(false);
  const [isDogChecked, setIsDogChecked] = useState(false);
  const [isVaccinated, setisVaccinated] = useState(false)
  const [isNotVaccinated, setisNotVaccinated] = useState(false)
  const [isEducated, setisEducated] = useState(false)
  const [isNotEducated, setisNotEducated] = useState(false)


  const [animals, setAnimals] = useState([]);
  const getAnimals = async () => {
    const response = await fetch("http://localhost:2001/animals/toAdopt");
    const data = await response.json();
    setAnimals(data);
  };

  useEffect(() => {
    getAnimals();
  }, []);


  const deleteAnimal = async (animalId) => {
    const response = await fetch(`http://localhost:2001/animals/${animalId}`, {
      method: "DELETE",
    })
    const data = await response.json() 
    console.log(data)
    setAnimals(animals.filter(animal => animal.id !== animalId))
    toast.success(`animal supprimé`);

  }

  const handleIsYours = (event) => {
    setIsYours(event.target.checked);
  };
  const handleEducatedChange = (event) => {
    setisEducated(event.target.checked);
  };
  const handleNotEducatedChange = (event) => {
    setisNotEducated(event.target.checked);
  };
  const handleVaccinatedChange = (event) => {
    setisVaccinated(event.target.checked);
  };
  const handleNotVaccinatedChange = (event) => {
    setisNotVaccinated(event.target.checked);
  };
  const handleCatChange = (event) => {
    setIsCatChecked(event.target.checked);
  };

  const handleDogChange = (event) => {
    setIsDogChecked(event.target.checked);
  };
  

  const filteredAnimals = animals.filter((animal) => {
    let showAnimal = false;
    if (isCatChecked && (animal.species === "cat" || animal.species === "chat")) {
      showAnimal = true;
    } else if (isDogChecked && animal.species === "chien") {
      showAnimal = true;
    } else if (!isCatChecked && !isDogChecked) {
      showAnimal = true;
    }
    if (isVaccinated && !isNotVaccinated) {
      showAnimal = showAnimal && animal.isVaccinated;
    } else if (isNotVaccinated && !isVaccinated) {
      showAnimal = showAnimal && !animal.isVaccinated;
    } else if (!isVaccinated && !isNotVaccinated) {
      showAnimal = showAnimal && true;
    }
    if (isEducated && !isNotEducated) {
      showAnimal = showAnimal && animal.isEducated;
    } else if (isNotEducated && !isEducated) {
      showAnimal = showAnimal && !animal.isEducated;
    } else if (!isEducated && !isNotEducated) {
      showAnimal = showAnimal && true;
    }
    return showAnimal;
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
      <ToastContainer
        position="top-center"
        autoClose={100}
      />
      {console.log(animals)}
      <Breadcrumb pageName="Liste des animaux à adopter" pageTitle="liste d'adoption" />
      <div className="shop-page pt-120 mb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="shop-sidebar">
              {connectedUser.userRole === "animalOwner" ? (   <div className="shop-widget">
                  
                  <div className="check-box-item">
                    <div className="checkbox-container">
                      <label className="containerss">

                        <h6 className="shop-widget-title">Vos propres animaux</h6>
                        <input type="checkbox" checked={isYours}
                          onChange={handleIsYours} />
                        <span className="checkmark"></span>

                      </label>

                    </div>

                  </div>
                </div>) : (<div> </div>)}
                <div className="shop-widget">
                  <div className="check-box-item">
                    <h5 className="shop-widget-title">animal</h5>
                    <div className="checkbox-container">
                      <label className="containerss">
                        chat
                        <input type="checkbox" checked={isCatChecked}
                          onChange={handleCatChange} />
                        <span className="checkmark"></span>
                      </label>
                      <label className="containerss">
                        chien
                        <input type="checkbox" checked={isDogChecked}
                          onChange={handleDogChange} />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="shop-widget">
                  <div className="check-box-item">
                    <h5 className="shop-widget-title">vacciné ou non </h5>
                    <div className="checkbox-container">
                      <label className="containerss">
                        Vacciné
                        <input type="checkbox" onChange={handleVaccinatedChange} checked={isVaccinated} />
                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        Non Vacciné
                        <input type="checkbox" onChange={handleNotVaccinatedChange} checked={isNotVaccinated} />
                        <span className="checkmark" />
                      </label>


                    </div>
                  </div>
                </div>
                <div className="shop-widget">
                  <div className="check-box-item">
                    <h5 className="shop-widget-title">Dressé ou non </h5>
                    <div className="checkbox-container">
                      <label className="containerss">
                        Dressé
                        <input type="checkbox" onChange={handleEducatedChange} checked={isEducated} />
                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        Non Dressé
                        <input type="checkbox" onChange={handleNotEducatedChange} checked={isNotEducated} />
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
                    { (connectedUser.userRole=== "animalOwner" || connectedUser==="admin")? (<div className="multiselect-area">
                      <h5>Vous voulez offrir votre animal ? cliquez ici :</h5>

                        <Link legacyBehavior href={`adoptPet`}>
                        <button className="primary-btn0">offrir mon animal
                          </button>
                        </Link>
                    </div>) : (<div></div>)}
                  </div>
                </div>
              </div>
              <div className="row">
                {dataPerPage
                  .map((item, index) => <AnimalAdoptCard item={item} key={item.id} handleDelete={deleteAnimal}  />)}
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

export default animal;






