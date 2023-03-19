import Link from "next/link";
import React from "react";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Layout from "../layout/Layout";
import { useState } from "react";


function signUpPage() { 
  const [UserData, setUserData] = useState({
    firstName: "",
    lastName : "",
    email: "",
    password: "", 
    confirmPassword : ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(UserData.firstName,UserData.lastName,UserData.email, UserData.password,UserData.confirmPassword);
  };

  const saveData = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData({ ...UserData, [name]: value });
  };
  const registerUser = async (username, email, password) => {
    const response = await fetch("/auth/signUP", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const json = await response.json();
    if (!response.ok) {
     // setError(json.error);
    }
    if (response.ok) {
      //save the user to local storage
      //localStorage.setItem("user", JSON.stringify(json));
      //update the authContext state
      //dispatch(loginUser(json));
    }
  };
  return (
    <>
    {console.log(UserData)}
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
                  <form className="w-100">
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-inner">
                          <label>First Name *</label>
                          <input name="firstName" type="text" placeholder="Frist Name" onChange={saveData} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-inner">
                          <label>Last Name *</label>
                          <input name = "lastName"type="text" placeholder="Last Name"  onChange={saveData}/>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-inner">
                          <label>Enter Your Email *</label>
                          <input name ="email" type="email" placeholder="Enter Your Email"  onChange={saveData}/>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-inner">
                          <label>Password *</label>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Create A Password"
                            onChange={saveData}
                          />
                          <i className="bi bi-eye-slash" id="togglePassword" />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-inner">
                          <label>Confirm Password *</label>
                          <input
                            type="password"
                            name="confirmPassword"
                            id="password2"
                            placeholder="Confirm Password"
                            onChange={saveData}
                          />
                          <i className="bi bi-eye-slash" id="togglePassword2" />
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
                    <button className="account-btn">Create Account</button>
                  </form>
                  <div className="alternate-signup-box">
                    <h6>or signup WITH</h6>
                    <div className="btn-group gap-4">
                      <a
                        href="#"
                        className="eg-btn google-btn d-flex align-items-center"
                      >
                        <i className="bx bxl-google" />
                        <span>signup whit google</span>
                      </a>
                      <a
                        href="#"
                        className="eg-btn facebook-btn d-flex align-items-center"
                      >
                        <i className="bx bxl-facebook" />
                        signup whit facebook
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

