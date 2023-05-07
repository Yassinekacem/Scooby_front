import React, { useState, useEffect } from "react";
import Breadcrumb from "../../../components/breadcrumb/Breadcrumb";
import LostDeclarationCard from "../../../components/declaration/LostDeclarationCard";
import Layout from "../../../layout/Layout";
import Link from "next/link";
import moment from "moment";


function lostDeclaration() {
  const [value, setValue] = React.useState(50);
  const [isCatChecked, setIsCatChecked] = useState(false);
  const [isDogChecked, setIsDogChecked] = useState(false);

  const [isRewarded, setIsRewarded] = useState(false)
  const [isNotRewarded, setIsNotRewarded] = useState(false)

  const [isTodayChecked, setIsTodayChecked] = useState(false);
  const [isWeekChecked, setIsWeekChecked] = useState(false);
  const [isMonthChecked, setIsmonthChecked] = useState(false);
  const [isYearChecked, setIsyearChecked] = useState(false);




  const [lostDeclarations, setlostDeclarations] = useState([])
  const getlostDeclarations = async () => {
    const response = await fetch("http://localhost:2001/lostDeclarations");
    const data = await response.json();
    setlostDeclarations(data)
  };

  useEffect(() => {
    getlostDeclarations()
  }, [])


  const handleCatChange = (event) => {
    setIsCatChecked(event.target.checked);
  };
  const handleDogChange = (event) => {
    setIsDogChecked(event.target.checked);
  };

  const handleRewardedChange = (event) => {
    setIsRewarded(event.target.checked);
  };
  const handleNotRewardedChange = (event) => {
    setIsNotRewarded(event.target.checked);
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


  const filteredAnimals = lostDeclarations.filter((LostDeclaration) => {
    let showLostDeclaration = true;

    // Filter by animal
    if ((isCatChecked && LostDeclaration.animal !== "chat") ||
      (isDogChecked && LostDeclaration.animal !== "chien")) {
      showLostDeclaration = false;
    }

    // Filter by reward
    if ((isRewarded && !LostDeclaration.withReward) ||
      (isNotRewarded && LostDeclaration.withReward)) {
      showLostDeclaration = false;
    }

    // Filter by date
    if (isTodayChecked && !moment(LostDeclaration.dateLost).isSame(moment(), "day")) {
      showLostDeclaration = false;
    }
    if (isWeekChecked && !moment(LostDeclaration.dateLost).isSame(moment(), "week")) {
      showLostDeclaration = false;
    }
    if (isMonthChecked && !moment(LostDeclaration.dateLost).isSame(moment(), "month")) {
      showLostDeclaration = false;
    }
    if (isYearChecked && !moment(LostDeclaration.dateLost).isSame(moment(), "year")) {
      showLostDeclaration = false;
    }

    return showLostDeclaration;
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
      {console.log(lostDeclarations)}
      <Breadcrumb pageName="Déclarations de perte" pageTitle="Déclarations de perte" />
      <div className="shop-page pt-120 mb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="shop-sidebar">
                <div className="shop-widget">
                  <div className="check-box-item">
                    <h5 className="shop-widget-title">animal : </h5>
                    <div className="checkbox-container">
                      <label className="containerss">
                        chat
                        <input type="checkbox" checked={isCatChecked}
                          onChange={handleCatChange} />                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        chien
                        <input type="checkbox" checked={isDogChecked}
                          onChange={handleDogChange} />                        <span className="checkmark" />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="shop-widget">
                  <div className="check-box-item">
                    <h5 className="shop-widget-title">récompense : </h5>
                    <div className="checkbox-container">
                      <label className="containerss">
                        avec récompense
                        <input type="checkbox" checked={isRewarded}
                          onChange={handleRewardedChange} />                        <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        sans récompense
                        <input type="checkbox" checked={isNotRewarded}
                          onChange={handleNotRewardedChange} />                        <span className="checkmark" />
                      </label>
                    </div>
                  </div>
                </div>
                <div className="shop-widget">
                  <div className="check-box-item">
                    <h5 className="shop-widget-title">perdu : </h5>
                    <div className="checkbox-container">
                      <label className="containerss">
                        Aujourd'hui
                        <input type="checkbox" checked={isTodayChecked}
                          onChange={handleTodayChange} />                           <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        cette semaine
                        <input type="checkbox" checked={isWeekChecked}
                          onChange={handleWeekChange} />                           <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        ce mois
                        <input type="checkbox" checked={isMonthChecked}
                          onChange={handleMonthChange} />                           <span className="checkmark" />
                      </label>
                      <label className="containerss">
                        cet année
                        <input type="checkbox" checked={isYearChecked}
                          onChange={handleYearChange} />                           <span className="checkmark" />
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
                      <h5>Vous avez perdu votre animal cliquez ici :</h5>

                        <Link legacyBehavior href={`/declaration/addLostDeclaration`}>
                          <button className="primary-btn0">J'ai perdu mon animal</button>
                        </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row g-4 justify-content-center">
                {dataPerPage.map((item, index) =>
                  <LostDeclarationCard item={item} key={index} />
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

export default lostDeclaration;
