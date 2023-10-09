import Link from "next/link";
import React from "react";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Layout from "../layout/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode"
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function BlogDetailsPage() {
  const [isMaladie, setIsMaladie] = useState(false);
  const [isComportement, setIsComportement] = useState(false);
  const [isSauvetage, setIsSauvetage] = useState(false);
  const [isAutre, setIsAutre] = useState(false);
  const [isAmusement, setIsAmusement] = useState(false);
  const [isAlimentation, setIsAlimentation] = useState(false);
  const [isDressage, setIsDressage] = useState(false);

  const handleMaladieChange = (event) => {
    setIsMaladie(event.target.checked);
  };
  const handleComportementChange = (event) => {
    setIsComportement(event.target.checked);
  };
  const handleAmusementChange = (event) => {
    setIsAmusement(event.target.checked);
  };
  const handleAutreChange = (event) => {
    setIsAutre(event.target.checked);
  };
  const handleSauvetgeChange = (event) => {
    setIsSauvetage(event.target.checked);
  };
  const handleAlimentationChange = (event) => {
    setIsAlimentation(event.target.checked);
  };
  const handleDressageChange = (event) => {
    setIsDressage(event.target.checked);
  };

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

  const now = new Date();
  const formattedDate = now.toLocaleString("fr-FR");
  const [responseData, setResponseData] = useState({});
  const initialState = {
    firstName: connectedUser.firstName,
    lastName: connectedUser.lastName,
    response: "",
    image: connectedUser.userImage,
    createdAt: formattedDate,
    userId: connectedUser.userId,
  }
  useEffect(() => {
    setResponseData(initialState)
  }, [connectedUser])



  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    const response = await fetch("http://localhost:2001/posts");
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    getPosts();
  }, []);


  const [responses, setResponses] = useState([]);

  const getResponses = async () => {
    const response = await fetch("http://localhost:2001/responses");
    const data = await response.json();
    setResponses(data)
  };

  useEffect(() => {
    getResponses()
  }, []);
  const [replys, setReplys] = useState([]);

  const getReplys = async () => {
    const response = await fetch("http://localhost:2001/reply");
    const data = await response.json();
    setReplys(data)
  };

  useEffect(() => {
    getReplys()
  }, []);
  const Now = new Date();
  const formattedDate1 = Now.toLocaleString("fr-FR");
  const [replyData, setReplyData] = useState({});
  const initialState1 = {
    firstName: connectedUser.firstName,
    lastName: connectedUser.lastName,
    reply: "",
    image: connectedUser.userImage,
    createdAt: formattedDate1,
    userId: connectedUser.userId,
  }
  useEffect(() => {
    setReplyData(initialState1)
  }, [connectedUser])



  const filtredPosts = posts.filter((post) => {
    let showPost = false;
    if (isMaladie && post.subject === "maladie") {
      showPost = true;
    } else if (isAlimentation && post.subject === "alimentation") {
      showPost = true;
    } else if (isDressage && post.subject === "dressage") {
      showPost = true;
    } else if (isSauvetage && post.subject === "sauvetage") {
      showPost = true;
    } else if (isComportement && post.subject === "comportement") {
      showPost = true;
    } else if (isAmusement && post.subject === "amusement") {
      showPost = true;
    } else if (isAutre && post.subject === "autre") {
      showPost = true;
    }
    else if (!isMaladie && !isDressage && !isAlimentation && !isSauvetage && !isComportement && !isAmusement && !isAutre) {
      showPost = true;
    } return showPost;
  });
  return (

    <Layout>
      {console.log(responseData)}
      {console.log(replyData)
      }
      <ToastContainer
        position="top-center"
        autoClose={900}
      />
      <Breadcrumb pageName="forum de communication entre les passionnées des animaux" pageTitle="Forum de communication" src="../../../assets/images/bg/forum.png" src1="" />
      <div className="blog-details-pages pt-120 mb-120">
        <div className="container">
          <div className="row mb-50">
            <div className="col-lg-12">
              <div className="multiselect-bar">
                <h6> </h6>
                <div className="multiselect-area">
                  <h5>Partagez vos informations et questions sur les animaux en publiant ici ! :</h5>
                  {connectedUser.userId ? (
                    <Link legacyBehavior href={`/addPost`}>
                      <button className="primary-btn0">Créer un post</button>
                    </Link>
                  ) : (
                    <button
                      className="primary-btn0"
                      onClick={() => {
                        toast.error("Veuillez vous connectez pour ajouter un post");
                      }}
                    >
                      Créer un post
                    </button>)}
                </div>
              </div>
            </div>
          </div> <br /> <br />
          <div className="col-lg-20 d-flex justify-content-center align-items-center">
            <div className="widget-area">
              <div className="single-widgets widget_egns_tag mb-30">
                <div className="widget-title">
                 <center><h3 style={{ fontFamily: "Caveat, cursive" , align:"center" }}>    Vous pouvez sélectionner les sujets du forum qui vous intéressent
                  </h3></center> 
                </div>
                <p className="wp-block-tag-cloud">

                  <h6 style={{ fontSize: "19px", color: "#424340" }} >Maladies & Blessures</h6> {" "}
                  <input className="custom-checkbox" type="checkbox" checked={isMaladie}
                    onChange={handleMaladieChange} />

                  <h6 style={{ fontSize: "19px", color: "#424340" }} > Alimentations</h6>
                  <input className="custom-checkbox" type="checkbox" checked={isAlimentation}
                    onChange={handleAlimentationChange} />

                  <h6 style={{ fontSize: "19px", color: "#424340" }}>Dressage</h6>
                  <input className="custom-checkbox" type="checkbox" checked={isDressage}
                    onChange={handleDressageChange} />
                  <h6 style={{ fontSize: "19px", color: "#424340" }}>Comportement</h6>
                  <input className="custom-checkbox" type="checkbox" checked={isComportement}
                    onChange={handleComportementChange} />
                  <h6 style={{ fontSize: "19px", color: "#424340" }}>Amusement</h6>
                  <input className="custom-checkbox" type="checkbox" checked={isAmusement}
                    onChange={handleAmusementChange} />
                  <h6 style={{ fontSize: "19px", color: "#424340" }}>Autres sujets</h6>
                  <input className="custom-checkbox" type="checkbox" checked={isAutre}
                    onChange={handleAutreChange} />
                </p>
              </div>
            </div>
          </div>

          <div className="row g-lg-4 gy-5 justify-content-center mb-70">


            {filtredPosts.map((item) => {
              const {
                id,
                firstName,
                lastName,
                content,
                image,
                photoUser,
                createdAt,

              } = item;
              const handleSubmit = async (e) => {
                e.preventDefault();
                if (connectedUser.userId) {
                  try {
                    const response = await axios.post(
                      "http://localhost:2001/responses",
                      {
                        ...responseData,
                        postId: parseInt(id),
                      }
                    );
                    console.log(response.data);
                    setResponses([...responses, response.data])
                  } catch (error) {
                    console.error(error);
                  }
                } else {
                  toast.error("Veuillez vous connecter pour écrire un commentaire");
                }
              };

              const saveData = (e) => {
                let name = e.target.name;
                let value = e.target.value;

                if (name === "postId") {
                  value = parseInt(id)  // ou parseFloat(value)
                }

                setResponseData({ ...responseData, [name]: value });
              };

              return (
                <div className="col-lg-8">
                  <div className="blog-details-wrap mb-120">
                    <div className="post-thum">
                      <div className="blog-meta">
                        <ul>
                          <li>  <div className="author-area">
                            <div className="author-img">
                              <img src={photoUser !== "" ?  (photoUser) : ("assets/images/bg/team/unkown.png" )} style={{ width: "70px", height: "70px", borderRadius: "50%" }} alt="" />
                            </div>


                          </div></li>
                          <li>

                            <a style={{ fontSize: "25px" }}> {firstName} {lastName}</a>

                          </li>
                          <li>
                            <a style={{ fontSize: "18px", color: "#868686" }}>Publié le {createdAt}</a>
                          </li>
                        </ul>
                      </div>
                      <blockquote>
                        <p style={{ fontSize: "21px", color: "black" }}>
                          {content}{" "}

                        </p>
                      </blockquote>
                      {image !== "" ? (<img
                        className="img-fluid"
                        src={image}
                        style={{ width: "800px", height: "440px" }}
                        alt="blog-dt-img"
                      />) : (<div> </div>)}


                    </div>



                  </div>
                  <>
                    <div className="comment-area">
                      <div className="blog-comments mb-120">
                        <div className="comments-title">
                          <h2 style={{ fontSize: "25px" }}>commentaires&nbsp;&nbsp;&nbsp;<i className="fas fa-comment"></i></h2>
                        </div>

                        {responses.filter(response => response.postId === id).map((item) => {
                          const {
                            id,
                            firstName,
                            lastName,
                            response,
                            image,
                            cretatedAt,
                            userId,
                            postId
                          } = item;
                          const handleSubmit = async (e) => {
                            e.preventDefault();
                            if (connectedUser.userId) {
                              try {
                                const response = await axios.post(
                                  "http://localhost:2001/reply",
                                  {
                                    ...replyData,
                                    responseId: parseInt(id),
                                  }
                                );
                                console.log(response.data);
                                setReplys([...replys, response.data])
                              } catch (error) {
                                console.error(error);
                              }
                            } else {
                              toast.error("Veuillez vous connecter pour répondre a un commentaire");
                            }
                          };

                          const saveData = (e) => {
                            let name = e.target.name;
                            let value = e.target.value;

                            if (name === "responseId") {
                              value = parseInt(id)  // ou parseFloat(value)
                            }

                            setReplyData({ ...replyData, [name]: value });
                          };
                          return (

                            <ul className="comment-list">
                              <li>
                                <div className="single-comment mb-50 d-flex align-items-center justify-content-between flex-md-nowrap flex-wrap">
                                  <div className="comment-content">
                                    <div className="c-header d-flex align-items-center justify-content-between">
                                      <div className="author-area">
                                        <div className="author-img">
                                          <img src={image} style={{ width: "58px", height: "58px" }} alt="" />
                                        </div>
                                        <div className="author-details" >
                                          <h5 className="mb-0">{firstName} {" "} {lastName}</h5>
                                          <div className="c-date">{createdAt}</div>
                                        </div>
                                      </div>
                                      <div className="replay-btn" >
                                        <a href="#reply" id="reply" data-bs-toggle="modal" data-bs-target={`#exampleModal-${id}`}>
                                          <img src="assets/images/icon/replay-icon.svg" alt="" />{" "}
                                          Répond
                                        </a>
                                      </div>
                                    </div>
                                    <div className="c-body">
                                      <p style={{ fontSize: "19px", color: "black" }}>
                                        {response}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div class="modal fade" id={`exampleModal-${id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                  <div class="modal-dialog modal-sm" role="document">
                                    <div class="modal-content">
                                      <div class="modal-header">
                                        <h5 class="modal-title"> Répond cet utilisateur</h5>
                                      </div>
                                      <div class="modal-body">
                                        <form role="form" method="POST" action=""
                                          onSubmit={handleSubmit}

                                        >

                                          <div class="form-group">
                                            <label class="control-label">Votre réponse : </label>
                                            <textarea type="text" name="reply" class="form-control input-lg" placeholder="écrivez votre réponse" onChange={saveData} />

                                          </div>




                                          <br />
                                          <div class="form-group">
                                            <div>
                                              <center><button type="submit" class="primary-btn1" data-bs-dismiss="modal" onClick={handleSubmit}>
                                                répond
                                              </button></center>
                                            </div>
                                          </div>

                                        </form>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                {replys.filter(reply => reply.responseId === id).map((item) => {
                                  const {
                                    id,
                                    firstName,
                                    lastName,
                                    reply,
                                    image,
                                    createdAt,
                                    userId,
                                    responseId
                                  } = item;

                                  return (
                                    <ul className="comment-reply">
                                      <li>
                                        <div className="single-comment d-flex align-items-center justify-content-between flex-md-nowrap flex-wrap">
                                          <div className="comment-content">
                                            <div className="c-header d-flex align-items-center justify-content-between">
                                              <div className="author-area">
                                                <div className="author-img">
                                                  <img src={image} style={{ width: "58px", height: "58px" }} alt="" />
                                                </div>
                                                <div className="author-details">
                                                  <h5 className="mb-0">{firstName} {lastName}</h5>
                                                  <div className="c-date">

                                                    {createdAt}                                        </div>
                                                </div>
                                              </div>

                                            </div>
                                            <div className="c-body">
                                              <p style={{ fontSize: "17px", color: "black" }}>
                                                {reply}
                                              </p>
                                            </div>
                                            <br />
                                            <br />
                                          </div>
                                        </div>
                                      </li>
                                    </ul>



                                  );

                                })}

                                <br />





                              </li>
                            </ul>


                          );

                        })}
                      </div>
                    </div>
                    <div className="comment-form">
                      <div className="comments-title">
                        <h3 style={{ fontSize: "25px", color: "blue" }}>Ecrire votre commentaire Ici {" "} <i className="bi bi-arrow-down"></i>

                        </h3></div>


                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-lg-9">
                            <div className="form-inner mb-10">
                              <textarea placeholder={`Commentez en tant que ${connectedUser.firstName} ${connectedUser.lastName} `} name="response" style={{ width: "800px", height: "10px", minHeight: "90px" }} onChange={saveData} />
                            </div>
                          </div>
                          <div className="col-lg-12">
                            <div className="form-inner two">
                              <button className="primary-btn3 btn-lg" type="submit">
                                <span> Commentez <i class="far fa-paper-plane"></i> </span>
                              </button>
                            </div>
                          </div>

                        </div>
                      </form>
                    </div>

                  </> <br /><div></div><br /><br /><hr style={{
                    border: 'none',
                    borderBottom: '3px solid #999',
                    margin: '20px 0',
                    backgroundColor: 'transparent'
                  }} />
                  <br /><br />
                </div>


              );

            })}

          </div>
        </div>
      </div>
    </Layout>
  );
}

export default BlogDetailsPage;
