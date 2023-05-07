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
                  src="../../../assets/images/header1-logo.svg"
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
              <li className={currentRoute === "/service-details" ? "active" : ""}>
                <Link legacyBehavior href="/service-details">
                  <a>Service</a>
                </Link>
              </li>
              <li className="menu-item-has-children">
                <Link legacyBehavior href="#">
                  <a>Animaux</a>
                </Link>
                <i
                  className="bi bi-plus dropdown-icon"
                  onClick={() => dispatch({ type: "animaux" })}
                />
                <ul
                  className={
                    state.activeMenu === "declarations"
                      ? "sub-menu  d-block"
                      : "sub-menu d-xl-block d-none"
                  }
                >
                  <li>
                    <Link legacyBehavior href="/pet/petList">
                      <a
                        className={
                          currentRoute === "/pet/petList" ? "active" : ""
                        }
                      >
                        à vendre
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link legacyBehavior href="/pet/adoptionList">
                      <a
                        className={
                          currentRoute === "/pet/adoptionList" ? "active" : ""
                        }
                      >
                      pour adoption
                      </a>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className={currentRoute === "/forum" ? "active" : ""}>
                <Link legacyBehavior href="/forum">
                  <a>forum</a>
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
            </div></li></ul>) : (<ul>
              <li>
              <Link legacyBehavior href="/check-out">
                <a >
                  <svg
                    width={22}
                    height={23}
                    viewBox="0 0 15 15"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clipPath="url(#clip0_1585_341)">
                      <path d="M6.98716 0.938832C6.28609 1.04711 5.65949 1.38227 5.169 1.90563C4.62972 2.48055 4.3498 3.14571 4.31128 3.94235C4.25735 5.0561 4.80177 6.12086 5.74167 6.73703C6.20391 7.04125 6.64818 7.19594 7.18747 7.23977C8.18643 7.31711 9.03901 7.00258 9.72724 6.29875C10.2742 5.74188 10.5516 5.13344 10.6183 4.35743C10.7108 3.32102 10.3205 2.3568 9.54234 1.68133C9.03901 1.24821 8.57676 1.03164 7.93733 0.938832C7.62916 0.895004 7.26964 0.892426 6.98716 0.938832Z" />
                      <path d="M4.65531 7.29655C3.49456 7.4203 2.68821 8.25561 2.31327 9.7303C2.06418 10.7126 1.99998 11.8933 2.15919 12.5405C2.29016 13.0587 2.71902 13.5846 3.21465 13.8373C3.43807 13.9507 3.75907 14.0435 4.02871 14.0744C4.18793 14.0951 5.40004 14.1002 7.71896 14.0951L11.1729 14.0873L11.3912 14.0255C12.2027 13.8037 12.7574 13.2572 12.9603 12.4889C13.0656 12.0893 13.0527 11.1354 12.9295 10.3826C12.6598 8.70678 11.9767 7.70131 10.8956 7.38678C10.6491 7.31459 10.2074 7.26045 10.0764 7.28623C9.95057 7.30944 9.77594 7.40225 9.38047 7.65749C8.95931 7.93077 8.90025 7.9617 8.58438 8.0803C8.21972 8.21694 7.91926 8.27624 7.56745 8.27624C7.20792 8.27624 6.93058 8.22467 6.56592 8.09577C6.2218 7.97202 6.20639 7.96428 5.66711 7.62139C5.38463 7.44092 5.17405 7.32491 5.09187 7.3017C4.94806 7.26561 4.94806 7.26561 4.65531 7.29655Z" />
                    </g>
                  </svg>
                </a>
              </Link>
            </li><li className="search-btn">
              <div><button className="btn-signout" onClick={() => {
                localStorage.removeItem("token");
                setConnectedUser("");
                toast.success("vous avez déconnecté")
                router.push('/')
              }}>Déconnexion</button> 
              
              </div>
            </li>
            </ul>)}
           




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