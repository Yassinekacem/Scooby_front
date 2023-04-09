import Link from "next/link";
import React, { useState } from "react";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import Layout from "../../layout/Layout";
import axios from "axios";

function signUpPage() {
  const [file, setFile] = useState(null)
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    email: "",
    password: "",
    photo: "",
    phoneNumber: ""

  });
  const uploadImage = async () => {
    const form = new FormData();
    form.append("file", file)
    form.append("upload_preset", "yassinekacem")
    await axios.post("https://api.cloudinary.com/v1_1/dxurewunb/upload", form)
      .then((result) => {
        console.log(result.data.secure_url)
        setFile(result.data.secure_url)
      })

  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:2001/auth/signup", userData);
      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const saveData = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData({ ...userData, [name]: value });
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
                  <form className="w-100" onSubmit={handleSubmit}>
                    <div className="row">
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
                          <select name="role" onChange={saveData}>
                            <option value=""> Sélectionnez un rôle</option>
                            <option value="client">Client</option>
                            <option value="veterinary">Vétérinaire</option>
                            <option value="petTrainer">Dresseur d'animaux de compagnie</option>
                            <option value="petSitter">Garde d'animaux de compagnie</option>
                            <option value="petGroomer">Toiletteur d'animaux de compagnie</option>
                            <option value="petShop">Magasin d'animaux de compagnie</option>
                            <option value="animalOwner">Propriétaire d'animaux</option>
                          </select>
                        </div>
                      </div>

                      <div className="col-md-9">
                        <div className="form-inner">
                          <label> photo :  </label>
                          <input name="file" type="file" placeholder="enter your role" onChange={(e) => setFile(e.target.files[0])} />
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
                    <button className="account-btn" onClick={uploadImage}>Create Account</button>
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
