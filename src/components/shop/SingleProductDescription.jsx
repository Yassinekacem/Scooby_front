import { useState, React } from "react";
import axios from "axios";
import event from "react-range-slider/event";
import Commentaire from "../commentaire/commentaire";

function SingleProductDescription() {

  const [commentData, setCommentData] = useState({
    firstName: "",
    lastName: "",
    message: "",
    stars: 0,
    userId: 1,
    announcementId: 2,
  });

  const saveData = (e) => {
    e.preventDefault(); // empêcher le comportement par défaut du navigateur
    let name = e.target.name;
    let value = e.target.value;
    if (name === "userId" || name === "announcementId" || name ==="stars") {
      value = parseInt(value); // ou parseFloat(value)
    }
    setCommentData({ ...commentData, [name]: value });
  };
  
  const  handleRatingClick = (e)  => {
    e.preventDefault();
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:2001/comments",
        {
          ...commentData
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <>
      {console.log(commentData)
      }
      <div className="row mb-120">
        <div className="col-lg-12">
          <div
            className="nav nav2 nav  nav-pills"
            id="v-pills-tab2"
            role="tablist"
            aria-orientation="vertical"
          >



          </div>
          <div className="tab-content tab-content2" id="v-pills-tabContent2">
            <div
              className="tab-pane fade active show"
              id="v-pills-home"
              role="tabpanel"
              aria-labelledby="v-pills-home-tab"
            >
              <div className="reviews-area">
                <div className="row g-lg-4 gy-5">
                  <div className="col-lg-8">
                    <div className="number-of-review">
                      <h3>Tous les commentaires :</h3>
                    </div>
                    <Commentaire />
                  </div>
                  <div className="col-lg-4">
                    <div className="review-form">
                      <div className="number-of-review">
                        <h3>ajouter votre commentaire ici</h3>
                      </div>
                      <form onSubmit={handleSubmit}
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="form-inner mb-20">
                              <input type="text" name="firstName" placeholder="votre nom*" required onChange={saveData} />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="form-inner mb-20">
                              <input type="text" name="lastName" placeholder="votre prenom*" required onChange={saveData} />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="form-inner mb-20">
                              <textarea type="text" name="message" placeholder="votre commentaire*" required onChange={saveData} />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="form-inner2 mb-30">
                              <div className="review-rate-area">
                                <p>Votre notation</p>
                                <div className="rate">
                                  <input
                                    type="radio"
                                    id="star5"
                                    name="stars"
                                    value={5}
                                    onChange={saveData}
                                  />
                                  <label htmlFor="star5" >
                                    5 stars
                                  </label>
                                  <input
                                    name="stars"
                                    onChange={saveData}
                                    
                                    type="radio"
                                    id="star4"
                                    value={4} />
                                  <label htmlFor="star4" >
                                    4 stars
                                  </label>
                                  <input
                                    type="radio"
                                    name="stars"
                                    onChange={saveData}
                                    value={3}
                                  />
                                  <label htmlFor="star3" >
                                    3 stars
                                  </label>
                                  <input
                                    type="radio"
                                    id="star2"
                                    name="stars"
                                    href="#a"
                                    onChange={saveData}
                                    value={2}
                                  />
                                  <label htmlFor="star2" >
                                    2 stars
                                  </label>
                                  <input
                                    type="radio"
                                    id="star1"
                                    name="stars"
                                    href="#a"
                                    onClick={(e) => handleRatingClick(e)}
                                    onChange={saveData}
                                    value={1}
                                  />
                                  <label htmlFor="star1" >
                                    1 star
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="form-inner two">
                              <button
                                className="primary-btn3 btn-lg"
                                type="submit" id="a"
                              >
                                Ajouter votre commentaire
                              </button>
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="tab-pane fade"
              id="v-pills-common"
              role="tabpanel"
              aria-labelledby="v-pills-common-tab"
            >

            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleProductDescription;
