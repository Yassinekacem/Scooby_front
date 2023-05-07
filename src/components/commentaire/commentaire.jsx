import Link from "next/link";
import {React, useState , useEffect} from "react";
function Commentaire() {

    const [comments, setComments] = useState([])
    
    const getComments = async () => {
        const response = await fetch("http://localhost:2001/comments");
        const data = await response.json();
        setComments(data)
      };
      useEffect(() => {
        getComments()
      }, [])
  


  return (
    <>
      {comments.map((item) => {
        const {
          id,
          firstName,
          stars,
          message,
          lastName,
          announcementId,
          userId,
    
        } = item;
      
        return (
            <div className="review-list-area">
            <ul className="review-list">
              <li>
                <div className="single-review d-flex justify-content-between flex-md-nowrap flex-wrap">
                  
                  <div className="review-content">
                    <div className="c-header d-flex align-items-center">
                      <div className="review-meta">
                        <h5 className="mb-0">
                          <a href="#">{firstName} {lastName}</a>
                        </h5>
                        <div className="c-date">06 july,2022</div>
                      </div>
                      
                    </div>
                    <ul className="product-review">
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
                    <div className="c-body">
                      <p>
                        {message}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
              <li>

              </li>
            </ul>
          </div>
        );
      })}
    </>
  );
}

export default Commentaire;
