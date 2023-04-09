
import Link from "next/link";
import React, { useEffect, useState } from "react";
function ServiceCard() {

  const [announcements,setAnnouncements]= useState([])

  const getAnnouncements = async () => {
    const response = await fetch("http://localhost:2000/announcements");
    const data = await response.json();
    setAnnouncements(data)
  };  

  useEffect(() => {
    getAnnouncements()
  }, [])
  return (
    <>
      {announcements.map((item) => {
        const {
          id,
          type,
          animlaCible,
          description,
          city,
          userId,
        } = item;
        return (
          <div key={id} className="col-lg-4 col-md-4 col-sm-6">
            <div className="collection-card">
              {userId == "" ? (
                ""
              ) : (
                
                  <span>{userId}</span>
              )}

                <div className="view-dt-btn">
                  <div className="plus-icon">
                    <i className="bi bi-plus" />
                  </div>
                  
                <ul className="cart-icon-list">
                  <li>
                    <a href="#">
                      <img src="assets/images/icon/Icon-cart3.svg" alt="" />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <img
                        src="assets/images/icon/Icon-favorites3.svg"
                        alt=""
                      />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="collection-content text-center">
                <h4>
                  <Link legacyBehavior href="/shop-details">
                    <a>{type}</a>
                  </Link>
                </h4>
                <div className="price">
                  <h6>${city}</h6>
                  
                </div>
                <div className="review">
                  <ul>
                    <li>
                      <i className="bi bi-star-fill" />
                    </li>
                    <li>
                      <i className="bi bi-star-fill" />
                    </li>
                    <li>
                      <i className="bi bi-star-fill" />
                    </li>
                    <li>
                      <i className="bi bi-star-fill" />
                    </li>
                    <li>
                      <i className="bi bi-star-fill" />
                    </li>
                  </ul>
                  <span>({animlaCible})</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default ServiceCard;
