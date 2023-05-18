import { React, useEffect , useState } from "react";
import GestionUsers from "../components/dashbordAdmin/GestionUsers";
import Gestionanimals from "../components/dashbordAdmin/GestionPets";
import Header1 from "../components/header/Header1";
import GestionProduitss from "../components/dashbordAdmin/gestionProduits";
import GestionDeclarations from "../components/dashbordAdmin/GestionDeclarations";
import GestionServices from "../components/dashbordAdmin/GestionService"
import jwtDecode from "jwt-decode"
import { useRouter } from "next/router";


function dashbordAdminPage() {
  const [activeComponent, setActiveComponent] = useState('utilisateurs');

  const router = useRouter();
  useEffect(() => {
    protectRoute()
  }, [])
  const protectRoute = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    } else {
      const decodedToken = jwtDecode(token);
      if (decodedToken.userRole !== "admin") {
        router.push("/");
      }
    }
  }

  return (
    <>
      <Header1 />
      <div className="inner-page-banner" id="a">
        <div className="breadcrumb-vec-btm"></div>
        <div className="container">
          <div className="row justify-content-center align-items-center text-center">
            <div className="col-lg-12 align-items-center text-center">
              <div className="banner-content">
                <h1 style={{ textAlign: 'center' }}>Tableau de bord</h1>
                <h1 style={{ textAlign: 'center' }}>"Admin"</h1>
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item active" aria-current="page"></li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="banner-img d-lg-block d-none"></div>
            </div>
          </div>
        </div>
      </div>

      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container">
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item active">
                <a className={`nav-link font-weight-bold ${activeComponent === 'utilisateurs' ? 'active' : ''}`}
                  onClick={() => setActiveComponent('utilisateurs')} href="#" style={{ fontSize: "22px", color: "black", textDecoration: "none" }}
                  onMouseOver={(e) => e.target.style.color = "#FF7F50"}
                  onMouseOut={(e) => e.target.style.color = "black"}
                  
                >Gestion Utilisateurs</a>
              </li>
              <li class="nav-item">
                <a className={`nav-link font-weight-bold ${activeComponent === 'animaux' ? 'active' : ''}`}
                  onClick={() => setActiveComponent('animaux')} href="#" style={{ fontSize: "22px", color: "black", textDecoration: "none" }}
                  onMouseOver={(e) => e.target.style.color = "#FF7F50"}
                  onMouseOut={(e) => e.target.style.color = "black"}
                >Gestion Animaux</a>
              </li>
              <li class="nav-item">
                <a className={`nav-link font-weight-bold ${activeComponent === 'produits' ? 'active' : ''}`}
                  onClick={() => setActiveComponent('produits')} href="#" style={{ fontSize: "22px", color: "black", textDecoration: "none" }}
                  onMouseOver={(e) => e.target.style.color = "#FF7F50"}
                  onMouseOut={(e) => e.target.style.color = "black"}
                >Gestion Produits</a>
              </li>
              <li class="nav-item">
                <a className={`nav-link font-weight-bold ${activeComponent === 'declarations' ? 'active' : ''}`}
                  onClick={() => setActiveComponent('declarations')} href="#" style={{ fontSize: "22px", color: "black", textDecoration: "none" }}
                  onMouseOver={(e) => e.target.style.color = "#FF7F50"}
                  onMouseOut={(e) => e.target.style.color = "black"}
                >Gestion Déclarations</a>
              </li>
              <li class="nav-item">
                <a className={`nav-link font-weight-bold ${activeComponent === 'services' ? 'active' : ''}`}
                  onClick={() => setActiveComponent('services')} href="#" style={{ fontSize: "22px", color: "black", textDecoration: "none" }}
                  onMouseOver={(e) => e.target.style.color = "#FF7F50"}
                  onMouseOut={(e) => e.target.style.color = "black"}
                >Gestion  services</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="row g-4 justify-content-center">
        {activeComponent === 'utilisateurs' && <GestionUsers />}
      </div>
      <div>
      {activeComponent === 'animaux' && <Gestionanimals />}
      </div>
      <div>

      {activeComponent === 'services' && <GestionServices />}
      </div>
      <div>
         {activeComponent === 'produits' && <GestionProduitss />}

      </div>
      <div>
      {activeComponent === 'declarations' && <GestionDeclarations />}
      </div>

    </>


  );
}

export default dashbordAdminPage;
