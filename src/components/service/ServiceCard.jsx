import Link from "next/link";
import React from "react";

function ServiceCard({ announcements }) {
  return (
    <>
      {announcements.map((item) => {
        const { id, type, firstName,lastName,contact,level ,city, ville,userId,image } = item;
        return (
          <div key={id} className="col-lg-5 col-md-5 col-sm-6">
        <div className="collection-card">
          <div
            className={
               "offer-card oui"
            }
          >
            <span>{ville}</span>
          </div>

          <div className="collection-img" >
          <img className="img-gluid" src={image} alt="" style={{ width: "280px", height: "220px" }} />

            <div className="view-dt-btn">
              <div className="plus-icon">
                <i className="bi bi-plus" />
              </div>
           
              <Link legacyBehavior href={`/declaration/lostDeclarations/${id}`}>
                <a>View Details</a>
              </Link>
            </div>
            <ul className="cart-icon-list">
            <li>
              <a href="#" class="btn btn-success" ><i class="bi bi-pencil text-black"></i>
                </a>
              </li>

              <li>
              <a href="#" class="btn btn-danger" ><i class="bi bi-trash"></i></a>
              </li>

            </ul>

          </div>
          <div className="collection-content text-center">
            <h4>
              <Link legacyBehavior href="/shop-details">
                <a>{firstName} {lastName}</a>
              </Link>
            </h4>
            <div className="dresseur">
              <h6>{type==="petSitting" ? "gardeur d'animaux" : "petTraining" ? "dresseur d'animaux" : "veterinaryCaring" ? "véterinaire" : "toiletteur d'animaux"}</h6>
            </div>
            <div>
              <h5>niveau de service : {level}</h5>
            </div>
            <div>
              contact :<br />
              <u> {contact}</u>
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
