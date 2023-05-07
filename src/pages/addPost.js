import Link from "next/link";
import React, { useState, useEffect } from "react";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Layout from "../layout/Layout";
import axios from "axios";
import jwtDecode from "jwt-decode"


function addPostPage() {
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
  const [file, setFile] = useState(null)
  const [imageUrl, setImageUrl] = useState("");
  const [imageUploaded, setImageUploaded] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const now = new Date();
  const formattedDate = now.toLocaleString("fr-FR");
  const [postData, setPostData] = useState({


  });
  const initialState = {
    firstName: connectedUser.firstName,
    lastName: connectedUser.lastName,
    content: "",
    image: "",
    createdAt: formattedDate,
    userId: connectedUser.userId,
  }
  useEffect(() => {
    setPostData(initialState)
  }, [connectedUser])



  const handleImageSelect = async (e) => {
    setFile(e.target.files[0]);
    setImageUploading(true);
    try {
      const form = new FormData();
      form.append("file", e.target.files[0])
      form.append("upload_preset", "yassinekacem")
      const result = await axios.post(
        "https://api.cloudinary.com/v1_1/dxurewunb/upload",
        form
      );
      await setImageUrl(result.data.secure_url);
      setImageUploaded(true);
      setImageUploading(false);
    } catch (error) {
      console.error(error);
      setImageUploaded(false);
      setImageUploading(false);
    }
  }
  const saveData = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "userId") {
      value = parseInt(value);
    }

    setPostData({ ...postData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageUploaded) {
      try {
        const response = await axios.post(
          "http://localhost:2001/posts",
          {
            ...postData,
            image: imageUrl
          }
        );
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Image upload failed");
    }
  };

  return (
    <>
      {console.log(postData)
      }      <Layout>
        <div className="signup-section pt-120 pb-120">
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-xl-6 col-lg-8 col-md-10">
                <div
                  className="form-wrapper wow fadeInUp"
                  data-wow-duration="1.5s"
                  data-wow-delay=".2s"
                >
                  <div className="form-title">
                    <h3> Créer un post</h3>
                  </div>

                  <form
                    className="w-100"
                    onSubmit={handleSubmit}
                    disabled={imageUploading}
                  >                    <div className="row">
                   
                      <div className="col-md-9">
                        <div className="form-inner">
                          <label> contenu de post </label>
                          <textarea name="content" type="text" onChange={saveData} />
                        </div>
                      </div>


                      <div className="col-md-9">
                        <div className="form-inner">
                          <label> importer l'image de la publication :  </label>
                          <input name="image" type="file" onChange={handleImageSelect} />
                        </div>
                      </div>




                    </div>
                    <button className="account-btn" >Publier maintenant</button>
                  </form>


                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
export default addPostPage; 
