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
                    <h3> Inscription</h3>
                    <p>
                      Vous avez déja un compte ?{" "}
                      <Link legacyBehavior href="/login">
                        <a>Connexion</a>
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
                          <label> Votre nom </label>
                          <input name="firstName" type="text"  onChange={saveData} />
                        </div>
                      </div>
                      <div className="col-md-9">
                        <div className="form-inner">
                          <label>Votre prénom </label>
                          <input name="lastName" type="text"  onChange={saveData} />
                        </div>
                      </div>
                      <div className="col-md-9">
                        <div className="form-inner">
                          <label> Numéro de téléphone </label>
                          <input name="phoneNumber" type="text"  onChange={saveData} />
                        </div>
                      </div>
                      <div class="col-md-9">
                        <div class="form-inner">
                          <label> Statut  :</label> <br />
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
                          <label>Email *</label>
                          <input name="email" type="email"  onChange={saveData} />
                        </div>
                      </div>
                      <div className="col-md-9">
                        <div className="form-inner">
                          <label>mot de passe *</label>
                          <input name="password" type="password"  onChange={saveData} />
                        </div>
                      </div>

                      
                    </div>
                    <button className="account-btn" >Créer compte</button>
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
export default signUpPage; 
