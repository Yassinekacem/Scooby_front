import Link from "next/link";
import React from "react";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Layout from "../layout/Layout";
import { useState, useEffect } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode"


function BlogDetailsPage() {

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
  return (
    <Layout>
      {console.log(responseData)}
      {console.log(replyData)
      }
      <Breadcrumb pageName="forum de communication entre les passionnées des animaux" pageTitle="Forum de communication" src="" />
      <div className="blog-details-pages pt-120 mb-120">
        <div className="container">
          <div className="row mb-50">
            <div className="col-lg-12">
              <div className="multiselect-bar">
                <h6> </h6>
                <div className="multiselect-area">
                  <h5>Partagez vos informations et questions sur les animaux en publiant ici ! :</h5>

                  <Link legacyBehavior href={`/addPost`}>
                    <button className="primary-btn0">Créer un post
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div> <br /> <br />
          <div className="row g-lg-4 gy-5 justify-content-center mb-70">
            {posts.map((item) => {
              const {
                id,
                firstName,
                lastName,
                content,
                image,
                createdAt,

              } = item;
              const handleSubmit = async (e) => {
                e.preventDefault();
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

                          <li>
                            <Link legacyBehavior href="">
                              <a style={{ fontSize: "25px", color: "blue" }}>par  {firstName} {lastName}</a>

                            </Link>
                          </li>
                          <li>
                            <Link legacyBehavior href="">
                              <a style={{ fontSize: "18px" }}>le {createdAt}</a>
                            </Link>
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
                          <h2 style={{ fontSize: "25px" }}>commentaires  <i class="fas fa-comment"></i>  </h2>
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
                                          Reply
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
                                        <h5 class="modal-title"> repondre</h5>
                                      </div>
                                      <div class="modal-body">
                                        <form role="form" method="POST" action=""
                                          onSubmit={handleSubmit}

                                        >

                                          <div class="form-group">
                                            <label class="control-label">réponse</label>
                                            <textarea type="text" name="reply" class="form-control input-lg" onChange={saveData} />

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
                        <h3 style={{ fontSize: "25px" }} >Ecrire un commentaire </h3>
                      </div>

                      <form onSubmit={handleSubmit}>
                        <div className="row">
                          <div className="col-lg-9">
                            <div className="form-inner mb-10">
                              <textarea placeholder="Commentez Ici" name="response" style={{ width: "800px", height: "10px", minHeight: "90px" }} onChange={saveData} />
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
