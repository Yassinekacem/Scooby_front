import Link from "next/link";
import React, { useState } from "react";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Layout from "../layout/Layout";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
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
      toast.success('Votre compte a été créé avec succès')


    } catch (error) {
      console.error(error);
      toast.error(error.response.data)

    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword)
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
                          <label style={{ fontSize: "21px" }}> Entrez votre Votre nom * </label>
                          <input style={{ fontSize: "17px" }} name="firstName" placeholder="nom" type="text" onChange={saveData} />
                        </div>
                      </div>
                      <div className="col-md-9">
                        <div className="form-inner">
                          <label style={{ fontSize: "21px" }}>Entrez votre Votre prénom *</label>
                          <input style={{ fontSize: "17px" }} name="lastName" placeholder="prénom" type="text" onChange={saveData} />
                        </div>
                      </div>
                      <div className="col-md-9">
                        <div className="form-inner">
                          <label style={{ fontSize: "21px" }}>Entrez votre votre Numéro de téléphone *</label>
                          <input style={{ fontSize: "17px" }} name="phoneNumber" placeholder="Num tel" type="tel" onChange={saveData} />
                        </div>
                      </div>

                      <div className="col-md-9">
                        <div className="form-inner">
                          <label style={{ fontSize: "21px" }}>Entrez votre votre Statut *</label> <br />
                          <select className="form-select" name="role" onChange={saveData} style={{ fontSize: "14px" }}>
                            <option disabled selected hidden value="">Sélectionnez votre statut</option>
                            <option value="veterinary" style={{ fontSize: "19px" }}>Vétérinaire</option>
                            <option value="petTrainer" style={{ fontSize: "19px" }}>Dresseur d'animaux de compagnie</option>
                            <option value="petSitter" style={{ fontSize: "19px" }}>Garde d'animaux de compagnie</option>
                            <option value="petGroomer" style={{ fontSize: "19px" }}>Toiletteur d'animaux de compagnie</option>
                            <option value="petShop" style={{ fontSize: "19px" }}>Magasin d'animaux de compagnie</option>
                            <option value="petSeller" style={{ fontSize: "19px" }}>Éleveur d'animaux</option>
                          </select>
                        </div>
                      </div>


                      <div className="col-md-9">
                        <div className="form-inner">
                          <label style={{ fontSize: "21px" }}> choisissez votre photo *  </label>
                          <input name="photo" type="file" onChange={handleImageSelect} />
                        </div>
                      </div>
                      <div className="col-md-9">
                        <div className="form-inner">
                          <label style={{ fontSize: "21px" }}>Entrez votre votre Email *</label>
                          <input style={{ fontSize: "17px" }} name="email" placeholder="Email" type="email" onChange={saveData} />
                        </div>
                      </div>
                      <div className="col-md-9">
                        <div className="form-inner">
                          <label style={{ fontSize: "21px" }}>Entrez votre mot de passe *</label>
                          <input style={{ fontSize: "17px" }} name="password" placeholder="Mot de passe" type={showPassword ? "text" : "password"}
                            onChange={saveData} />
                          <i
                            className={`bi bi-${showPassword ? "eye" : "eye-slash"}`}
                            onClick={toggleShowPassword}
                          />
                        </div>
                      </div>
                      <div className="col-md-9">
                        <div className="form-inner">
                          <label style={{ fontSize: "21px" }}>Confirmez votre mot de passe *</label>
                          <input style={{ fontSize: "17px" }} name="password" placeholder="Mot de passe" type={showPassword ? "text" : "password"}
                            onChange={saveData} />
                          <i
                            className={`bi bi-${showPassword ? "eye" : "eye-slash"}`}
                            onClick={toggleShowPassword}
                          />
                        </div>
                      </div>


                    </div>
                    <button className="account-btn" >Créer votre compte</button>
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
