import Link from "next/link";
import React from "react";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Layout from "../layout/Layout";
import { useState, useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import UserService from "./userServices/UserService";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from 'jwt-decode';




function loginPage() {
  const router = useRouter();
  useEffect(() => {
    protectRoute()
  }, [])
  const protectRoute = () => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push("/");
    }
  }
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

      localStorage.setItem('token', response.data.token)
      const decodedToken1 = jwtDecode(response.data.token);
      if (decodedToken1.userRole === "admin") {
        router.push("/dashboard");
      } else if (decodedToken1.userRole === "petSeller") {
        router.push("/pet/petList");
      }
      else if (decodedToken1.userRole === "petShop") {
        router.push("/shop");
      }
      else if (decodedToken1.userRole === "veterinary" || decodedToken1.userRole === "petTrainer" || decodedToken1.userRole === "petGroomer" || decodedToken1.userRole === "petSitter") {
        router.push("/service");
      } else {
        router.push("/");

      }

      toast.success('vous avez connecté')
      setUserData.email = ('')
      setUserData.password = ('')
    } catch (error) {
      console.log(error);
      toast.error(error.response.data)
    }
  };
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword)
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
                      Vous êtes un nouveau membre ?{" "}
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
                            type={showPassword ? "text" : "password"}
                            name="password"
                            id="password"
                            placeholder="Password"
                            onChange={saveData}
                          />
                          <i
                            className={`bi bi-${showPassword ? "eye" : "eye-slash"}`}
                            onClick={toggleShowPassword}
                          />                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-agreement form-inner d-flex justify-content-between flex-wrap">
                        </div>
                      </div>
                    </div>
                    <button className="account-btn">Connexion</button>
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
export default loginPage;