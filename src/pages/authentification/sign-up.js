import Link from "next/link";
import React, { useState } from "react";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import Layout from "../../layout/Layout";
import axios from "axios";
import { useRouter } from "next/router";

function signUpPage() {
  const [file, setFile] = useState(null)
  const [imageUrl, setImageUrl] = useState("");
  const router = useRouter();
  const [imageUploading, setImageUploading] = useState(false);
  const now = new Date();
  const formattedDate = now.toLocaleString("fr-FR"); // formatte la date en jj/mm/aaaa hh:mm
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    email: "",
    password: "",
    photo: "",
    phoneNumber: "",
    createdAt: formattedDate,
    updatedAt: formattedDate,
  });





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
      setImageUrl(result.data.secure_url);
      setImageUploading(false);
    } catch (error) {
      console.error(error);
    }
  }
  const saveData = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:2001/auth/signup",
        {
          ...userData,
          photo: imageUrl
        }
      );
      console.log(response.data); 
      router.push("/login");


    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Layout>
        <Breadcrumb pageName="Sign-Up" pageTitle="Sign-Up" />
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
                    <h3>Sign Up</h3>
                    <p>
                      Do you already have an account?{" "}
                      <Link legacyBehavior href="/login">
                        <a>Log in here</a>
                      </Link>
                    </p>
                  </div>
                  <form
                    className="w-100"
                    onSubmit={handleSubmit}
                    disabled={imageUploading}
                  >                    <div className="row">
                      <div className="col-md-9">
                        <div className="form-inner">
                          <label>First Name </label>
                          <input name="firstName" type="text" placeholder="First Name" onChange={saveData} />
                        </div>
                      </div>
                      <div className="col-md-9">
                        <div className="form-inner">
                          <label>Last Name </label>
                          <input name="lastName" type="text" placeholder="Last Name" onChange={saveData} />
                        </div>
                      </div>
                      <div className="col-md-9">
                        <div className="form-inner">
                          <label>phone Number </label>
                          <input name="phoneNumber" type="text" placeholder="Last Name" onChange={saveData} />
                        </div>
                      </div>
                      <div class="col-md-9">
                        <div class="form-inner">
                          <label>Role   :</label> <br />
                          <select className="form-select" name="role" onChange={saveData}>
                            <option value=""> Sélectionnez un rôle</option>
                            <option value="client">Client</option>
                            <option value="veterinary">Vétérinaire</option>
                            <option value="petTrainer">Dresseur d'animaux de compagnie</option>
                            <option value="petSitter">Garde d'animaux de compagnie</option>
                            <option value="petGroomer">Toiletteur d'animaux de compagnie</option>
                            <option value="petShop">Magasin d'animaux de compagnie</option>
                            <option value="animalOwner">Propriétaire d'animal</option>
                            <option value="petSeller">vendeur d'animaux</option>
                            
                          </select>
                        </div>
                      </div>

                      <div className="col-md-9">
                        <div className="form-inner">
                          <label> choisissez votre photo :  </label>
                          <input name="photo" type="file" onChange={handleImageSelect} />
                        </div>
                      </div>
                      <div className="col-md-9">
                        <div className="form-inner">
                          <label>Enter Your Email *</label>
                          <input name="email" type="email" placeholder="Enter Your Email" onChange={saveData} />
                        </div>
                      </div>
                      <div className="col-md-9">
                        <div className="form-inner">
                          <label>Enter Your password *</label>
                          <input name="password" type="password" placeholder="Enter Your password" onChange={saveData} />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-agreement form-inner d-flex justify-content-between flex-wrap">
                          <div className="form-group">
                            <input type="checkbox" id="html" />
                            <label htmlFor="html">
                              I agree to the Terms &amp; Policy

                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button className="account-btn" >Create Account</button>
                  </form>
                  <div className="alternate-signup-box">
                    <h6>or signup WITH</h6>
                    <div className="btn-group gap-4">
                      <a
                        href="#"
                        className="eg-btn google-btn d-flex align-items-center"
                      >
                        <i className="bx bxl-google" />
                        <span>signup with google</span>
                      </a>
                      <a
                        href="#"
                        className="eg-btn facebook-btn d-flex align-items-center"
                      >
                        <i className="bx bxl-facebook" />
                        signup with facebook
                      </a>
                    </div>
                  </div>
                  <div className="form-poicy-area">
                    <p>
                      By clicking the "signup" button, you create a Cobiro
                      account, and you agree to Cobiro's{" "}
                      <a href="#">Terms &amp; Conditions</a> &amp;{" "}
                      <a href="#">Privacy Policy.</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
export default signUpPage; 
