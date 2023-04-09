import Link from "next/link";
import React from "react";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import Layout from "../../layout/Layout";
import  { useState } from "react";


function loginPage() {
    const [userData, setUserData] = useState({
      email: "",
      password: "",
    });
  
    const handleSubmit = async (e) => {
      e.preventDefault();
   
        const response = await fetch("http://localhost:2008/auth/signIn", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
        const json = await response.json();
        if (!response.ok) {
          console.log(json)
  
        }
        if (response.ok) {
          console.log(json)
          // set token to local storage
          // localStorage.setItem('token', )
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
        <Breadcrumb pageName="Login" pageTitle="Login" />
        <div className="login-section pt-120 pb-120">
          <div className="container">
            <div className="row d-flex justify-content-center g-4">
              <div className="col-xl-6 col-lg-8 col-md-10">
                <div
                  className="form-wrapper wow fadeInUp"
                  data-wow-duration="1.5s"
                  data-wow-delay=".2s"
                >
                  <div className="form-title">
                    <h3>Log In</h3>
                    <p>
                      New Member?{" "}
                      <Link legacyBehavior href="/authentification/sign-up">
                        <a>signup here</a>
                      </Link>
                    </p>
                  </div>
                  <form className="w-100" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-12">
                        <div className="form-inner">
                          <label>Enter Your Email *</label>
                          <input name ="email" type="email" placeholder="Enter Your Email" onChange={saveData}/>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-inner">
                          <label>Password *</label>
                          <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            onChange={saveData}
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-agreement form-inner d-flex justify-content-between flex-wrap">
                          <div className="form-group">
                            <input type="checkbox" id="html" />

                          </div>
                          
                        </div>
                      </div>
                    </div>
                    <button className="account-btn">Log in</button>
                  </form>
                  <div className="alternate-signup-box">
                    <h6>or signup WITH</h6>
                    <div className="btn-group gap-4">
                      <a
                        href="#"
                        className="eg-btn google-btn d-flex align-items-center"
                      >
                        <i className="bx bxl-google" />
                        <span>signup witht google</span>
                      </a>
                      <a
                        href="#"
                        className="eg-btn facebook-btn d-flex align-items-center"
                      >
                        <i className="bx bxl-facebook" />
                        signup witht facebook
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

export default loginPage;