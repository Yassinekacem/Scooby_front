import Link from "next/link";
import React from "react";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Layout from "../layout/Layout";
import { useState,useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import UserService from "./Services/UserService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




function loginPage() {
  const router = useRouter();
  useEffect(() => {
    protectRoute()
  }, [])
  const protectRoute = () => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    } }
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const saveData = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };
  const login = async (e) => {
    e.preventDefault();
      const data = {
      email: userData.email,
      password: userData.password,
    };

    try {
      const response = await UserService.login(data)
      console.log(response);

      localStorage.setItem('token',response.data.token)
     await  router.push('/');
       toast.success('vous avez connecté')
      setUserData.email=('')
      setUserData.password=('')
    } catch (error) {
      console.log(error);
      toast.error(error.response.data)   }
  };
 
  return (
    <>
    
    <ToastContainer
        position="top-center"
        autoClose={100}
      />
      <Layout>
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
                    <h3>Connexion </h3>
                    <p>
                      nouveau membre ?{" "}
                      <Link legacyBehavior href="/sign-up">
                        <a>s'inscrire ici</a>
                      </Link>
                    </p>
                  </div>
                  <form className="w-100" onSubmit={login}>
                    <div className="row">
                      <div className="col-12">
                        <div className="form-inner">
                          <label>Enter Your Email *</label>
                          <input
                            name="email"
                            type="email"
                            placeholder="Enter Your Email"
                            onChange={saveData}
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-inner">
                          <label>Password *</label>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Password"
                            onChange={saveData}
                          />
                          <i className="bi bi-eye-slash" id="togglePassword" />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-agreement form-inner d-flex justify-content-between flex-wrap">
                        </div>
                      </div>
                    </div>
                    <button className="account-btn">Log in</button>
                  </form>
                  <div className="alternate-signup-box">
                    <h6>or signup WITH</h6>
                    <div className="btn-group gap-4">
                      <a
                        className="eg-btn google-btn d-flex align-items-center"
                        onClick={() => signIn("github")}
                      >
                        <i className="bx bxl-google" />
                        <span>signup whit google</span>
                      </a>
                      <a
                        onClick={() => signOut()}
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
export default loginPage;