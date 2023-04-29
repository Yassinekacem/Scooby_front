import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useReducer, useRef, useState } from "react";
import { useSession, signOut } from "next-auth/react";
import jwtDecode from "jwt-decode"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/*---------Using reducer mange the active or inactive menu----------*/


const initialState = {
  activeMenu: "",
  mobileMenuState: false,
  navState: false,
  scrollY: 0,
};
function reducer(state, action) {
  switch (action.type) {
    case "home":
      return { ...state, activeMenu: "home" };
    case "blog":
      return { ...state, activeMenu: "blog" };
    case "shop":
      return { ...state, activeMenu: "shop" };
    case "services":
      return { ...state, activeMenu: "services" };
    case "pages":
      return { ...state, activeMenu: "pages" };
    case "mobileMenu":
      return { ...state, mobileMenuState: action.isMobileMenu };
    case "setScrollY":
      return { ...state, scrollY: action.payload };
    default:
      throw new Error();
  }
}

function Header1() {
  const router = useRouter();

  const currentRoute = useRouter().pathname;
  const [state, dispatch] = useReducer(reducer, initialState);
  const headerRef = useRef(null);

  const handleScroll = () => {
    const { scrollY } = window;
    dispatch({ type: "setScrollY", payload: scrollY });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  const { data: session } = useSession();
  const [connectedUser, setConnectedUser] = useState('')
  const getConnectedUserData = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setConnectedUser(decodedToken.userId);
    }
  };
  useEffect(() => {
    getConnectedUserData()
  }, [])
  return (
    
    <>
     <ToastContainer
        position="top-center"
        autoClose={100}
      />
      <div className="top-bar">
        <div className="container-lg container-fluid ">
          <div className="row">
            <div className="col-lg-12 d-flex align-items-center justify-content-md-between justify-content-center">
              <div className="social-area">
                <ul>
                  <li>
                    <a href="https://www.facebook.com/">
                      <i className="bx bxl-facebook" />
                    </a>
                  </li>
                  <li>
                    <a href="https://twitter.com/">
                      <i className="bx bxl-twitter" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.pinterest.com/">
                      <i className="bx bxl-pinterest-alt" />
                    </a>
                  </li>
                  <li>
                    <a href="https://www.instagram.com/">
                      <i className="bx bxl-instagram" />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="opening-time text-center">
                <p>
                  Email
                  <br />
                  <span>scoobyDo@gmail.com </span>
                </p>
              </div>
              <div className="contact-number">
                <a href="tel:+1(541)754-3020">
                  +216 95716180{" "}
                  <img src="../../assets/images/icon/support.svg" alt="" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <header
        ref={headerRef}
        className={
          state.scrollY > 150
            ? "header-area style-1 sticky"
            : "header-area style-1"
        }
      >
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="header-logo">
            <Link legacyBehavior href="/">
              <a>
                <img
                  alt="image"
                  className="img-fluid"
                  src="../../assets/images/header1-logo.svg"
                />
              </a>
            </Link>
          </div>
          <div
            className={
              state.mobileMenuState === true
                ? "main-menu show-menu"
                : "main-menu"
            }
          >
            <div className="mobile-logo-area d-lg-none d-flex justify-content-between align-items-center">
              <div className="mobile-logo-wrap">
                <Link legacyBehavior href="/">
                  <a>
                    {" "}
                    <img alt="image" src="../assets/images/header1-logo.svg" />
                  </a>
                </Link>
              </div>
              <div className="menu-close-btn">
                <i
                  className="bi bi-x-lg text-white"
                  onClick={() =>
                    dispatch({ type: "mobileMenu", isMobileMenu: false })
                  }
                />
              </div>
            </div>
            <ul className="menu-list">
              <li className={currentRoute === "/" ? "active" : ""}>
                <Link legacyBehavior href="/">
                  <a>acceuil</a>
                </Link>
              </li>
              <li className="menu-item-has-children">
                <Link legacyBehavior href="#">
                  <a>Declarations</a>
                </Link>
                <i
                  className="bi bi-plus dropdown-icon"
                  onClick={() => dispatch({ type: "declarations" })}
                />
                <ul
                  className={
                    state.activeMenu === "declarations"
                      ? "sub-menu  d-block"
                      : "sub-menu d-xl-block d-none"
                  }
                >
                  <li>
                    <Link legacyBehavior href="/declaration/foundDeclarations">
                      <a
                        className={
                          currentRoute === "/declaration/foundDeclarations" ? "active" : ""
                        }
                      >
                        déclaration de trouveille
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="/declaration/lostDeclarations">
                      <a
                        className={
                          currentRoute === "/declaration/lostDeclarations" ? "active" : ""
                        }
                      >
                        déclaration de perte
                      </a>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="menu-item-has-children">
                <Link legacyBehavior href="#">
                  <a>Services</a>
                </Link>
                <i
                  className="bi bi-plus dropdown-icon"
                  onClick={() => dispatch({ type: "services" })}
                />
                <ul
                  className={
                    state.activeMenu === "services"
                      ? "sub-menu  d-block"
                      : "sub-menu d-xl-block d-none"
                  }
                >
                  <li>
                    <Link legacyBehavior href="/service-details">
                      <a
                        className={
                          currentRoute === "/service-details" ? "active" : ""
                        }
                      >
                        Daycare
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="/service-details">
                      <a>Grooming</a>
                    </Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="/service-details">
                      <a>Boarding</a>
                    </Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="/service-details">
                      <a>Veterinary</a>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className={currentRoute === "/pet/adoptionList" ? "active" : ""}>
                <Link legacyBehavior href="/pet/adoptionList">
                  <a>adoption</a>
                </Link>
              </li>
              <li className={currentRoute === "/pet/petList" ? "active" : ""}>
                <Link legacyBehavior href="/pet/petList">
                  <a>animaux</a>
                </Link>
              </li>


              <li className={currentRoute === "/shop" ? "active" : ""}>
                <Link legacyBehavior href="/shop">
                  <a>Boutique</a>
                </Link>
              </li>

              <li className={currentRoute === "/about" ? "active" : ""}>
                <Link legacyBehavior href="/about">
                  <a>à propos</a>
                </Link>
              </li>
            </ul>
           
          </div>
          <div className="nav-right d-flex jsutify-content-end align-items-center">
            {!connectedUser ? (<ul><li><div>
              <Link legacyBehavior href="/authentification/sign-up">
                <button class="primary-btn0">s'inscrire</button>
              </Link>
              <Link legacyBehavior href="/login">
                <button class="primary-btn0">connexion</button>
              </Link>
            </div></li></ul>) : (<ul><li className="search-btn">
              <div><button className="btn-signout" onClick={() => {
                localStorage.removeItem("token");
                setConnectedUser("");
                toast.success("vous avez déconnecté")
                router.push('/')
              }}>Déconnexion</button></div>
            </li></ul>)}
           




            <div className="sidebar-button mobile-menu-btn">
              <i
                className="bi bi-list"
                onClick={() =>
                  dispatch({ type: "mobileMenu", isMobileMenu: true })
                }
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}


export default Header1;