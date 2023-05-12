import Link from "next/link";
import { useState, useEffect, React } from "react";
import axios from "axios";
import Layout from "../../../../layout/Layout";
import Breadcrumb from "../../../../components/breadcrumb/Breadcrumb";
import SingleProductDescription from "../../../../components/shop/SingleProductDescription";
function ServiceDetail(props) {

    const now = new Date();
    const formattedDate = now.toLocaleString("fr-FR");
    const [commentData, setCommentData] = useState({
        firstName: "",
        lastName: "",
        message: "",
        stars: 0,
        userId: 1,
        createdAt: formattedDate,
        announcementId: props.announcement.id,
    });

    const saveData = (e) => {
        e.preventDefault();
        let name = e.target.name;
        let value = e.target.value;
        if (name === "userId" || name === "announcementId" || name === "stars") {
            value = parseInt(value);
        }
        setCommentData({ ...commentData, [name]: value });
    };




    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                `http://localhost:2001/comments`,
                {
                    ...commentData
                }
            );
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    const [comments, setComments] = useState([])

    const getComments = async () => {
        const response = await fetch(`http://localhost:2001/comments/${props.announcement.id}`);
        const data = await response.json();
        setComments(data)
    };
    useEffect(() => {
        getComments()
    }, [])


    const [avgStars, setAvgStars] = useState([])

    const getAvgStars = async () => {
        const response = await fetch(`http://localhost:2001/announcements/review/avg-stars/${props.announcement.id}`);
        const data = await response.json();
        setAvgStars(data)
    };
    useEffect(() => {
        getAvgStars()
    }, [])

    return (


        <Layout>
            <Breadcrumb pageName="Détaille d'une annonce pour un service" pageTitle="Détaille annonce" src="" src1="" />
            {console.log(avgStars)
            }

            <div className="shop-details-page pt-120 mb-120">
                <div className="container">
                    <div className="row g-lg-4 gy-5 mb-120">
                        <div className="col-lg-7">
                            <div
                                className="tab-pane fade active show"
                                id="v-pills-img1"
                                role="tabpanel"
                                aria-labelledby="v-pills-img1-tab"
                            >
                                <img
                                    className="img-fluid rounded-circle"
                                    src={props.announcement.image}
                                    alt=""
                                    style={{ width: "500px", height: "550px", borderRadius: "50%" }}
                                />
                            </div>






                        </div>

                        <div className="col-lg-5">
                            <div className="shop-details-content" >
                                <h3 style={{ fontFamily: "Caveat, cursive" }}>
                                    {props.announcement.firstName} {props.announcement.lastName}
                                </h3>

                                <ul className="shopuct-review2 d-flex flex-row align-items-left mb-25">
                                    {[...Array(avgStars?.avgStars?.avgStars)].map((_, i) => (
                                        <li key={i} className="d-flex align-items-left justify-content-left">
                                            <i className="bi bi-star-fill" />
                                        </li>
                                    ))}
                                    <li>
                                            <h5>  ( {avgStars?.avgStars?.commentCount} avis d'utilisateurs ) </h5>
                                    </li>
                                </ul>






                                <br />
                                <div className="price-tag">
                                    <h4>
                                        {props.announcement.type === "veterinaryCaring" ? "Véterinaire" : props.announcement.type === "petSitting" ? "gardeur d'animaux" : props.announcement.type === "petGrooming" ? "Toiletteur d'animaux" : props.announcement.type === "petTraining" ? "Dresseur d'animaux" : ""}
                                    </h4>
                                </div>
                                <br />
                                <i><h5 style={{ fontWeight: 'bold', color: 'black' }}>
                                    Ville : {props.announcement.ville}-{props.announcement.city}
                                </h5></i>
                                <br />
                                <i><h5 style={{ fontWeight: 'bold', color: 'black' }} >Experience: {props.announcement.experience} ans </h5> </i><br />
                                <i><h5 style={{ fontWeight: 'bold', color: 'black' }}>niveau de service : {props.announcement.level}</h5></i>  <br />



                                <br />
                                <div className="model-number">
                                    <h4>Contact: {props.announcement.contact}</h4>
                                </div>

                                <p>
                                    {props.announcement.description}.{" "}
                                </p>
                                <div className="shop-quantity d-flex align-items-center justify-content-start mb-20">


                                </div>
                                <h4 style={{ fontFamily: "Montserrat, sans-serif" }}>
                                    contactez moi pour plus d'informations :
                                </h4>
                                <br />
                                <div className="buy-now-btn">
                                    <Link legacyBehavior href={`tel:+216${props.announcement.contact}`}>
                                        <a>
                                            Appelez maintenant  <i className="fa fa-phone"></i>
                                        </a>
                                    </Link>
                                </div>


                            </div>
                        </div>
                    </div>
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
                                                    <h3>les avis pour cette annonce</h3>
                                                </div>
                                                {comments.map((item) => {
                                                    const {
                                                        id,
                                                        createdAt,
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
                                                                                    <div className="c-date">{createdAt}</div>
                                                                                </div>

                                                                            </div>

                                                                            {stars === 1 ? (<ul className="product-review">
                                                                                <li>
                                                                                    <i className="bi bi-star-fill" />
                                                                                </li> </ul>) : stars === 2 ? (<ul className="product-review">
                                                                                    <li>
                                                                                        <i className="bi bi-star-fill" />
                                                                                    </li>
                                                                                    <li>
                                                                                        <i className="bi bi-star-fill" />
                                                                                    </li> </ul>) : stars === 3 ? (<ul className="product-review">


                                                                                        <li>
                                                                                            <i className="bi bi-star-fill" />
                                                                                        </li>
                                                                                        <li>
                                                                                            <i className="bi bi-star-fill" />
                                                                                        </li>
                                                                                        <li>
                                                                                            <i className="bi bi-star-fill" />
                                                                                        </li>
                                                                                    </ul>) : stars === 4 ? (<ul className="product-review">
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

                                                                                    </ul>) : (<ul className="product-review">
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
                                                                                    </ul>)}


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
                                            </div>
                                            <div className="col-lg-4">
                                                <div className="review-form">
                                                    <div className="number-of-review">
                                                        <h3>donner votre avis </h3>
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

                </div>

            </div>
        </Layout >
    );
}


export default ServiceDetail;



export async function getServerSideProps(context) {
    const res = await fetch(`http://localhost:2001/announcements/${context.params.id}`)
    const data = await res.json()
    return {
        props: {
            announcement: data
        }
    }
}