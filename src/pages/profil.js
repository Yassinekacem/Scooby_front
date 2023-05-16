import React from "react";
import Layout from "../layout/Layout";
import { useState , useEffect } from "react";
import jwtDecode from "jwt-decode"
import Link from "next/link";
import axios from "axios";
function checOutPage() {
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
  }, [connectedUser])


  const [user, setUser] = useState([]);
  const getUser = async () => {
    const response = await fetch(`http://localhost:2001/users/${connectedUser}`);
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, [connectedUser]);


  const [file, setFile] = useState(null)
  const [imageUrl, setImageUrl] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const now = new Date();
  const formattedDate = now.toLocaleString("fr-FR"); // formatte la date en jj/mm/aaaa hh:mm
  const [userData, setUserData] = useState({});
  const beforeUpdate = {
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.password,
    email: user.email,
    password: user.password,
    photo: user.photo,
    phoneNumber: user.phoneNumber,
    createdAt: user.createdAt,
    updatedAt: formattedDate,
  }



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
      const response = await axios.put(
        `http://localhost:2001/auth/${connectedUser}`,
        {
          ...userData,
          photo: imageUrl
        }
      );
      console.log(response.data); 


    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Layout>
      <div className="checkout-section pt-120 pb-120">
        <div className="container">
          <div className="row g-4">

           
          <aside className="col-lg-5">
        <div className="added-product-summary mb-90">
          <h5 className="title-25 checkout-title">Votre profil</h5>
          <ul className="added-products">
            <li className="single-product d-flex justify-content-start">
              <div className="product-img">
                <img src={user.photo !== "" ? (user.photo) : ("assets/images/bg/team/unkown.png" )} alt="" style={{ borderRadius: '50%', overflow: 'hidden', width: '100px', height: '100px' }} />
              </div>

              <div className="product-info">
                <h5 className="product-title">
                  <center><a href="#"> {user.firstName} {" "} {user.lastName}</a></center>
                </h5>
                <h6>{user.role}</h6>
              </div>

            </li>

          </ul>
        </div>
      </aside>
      <div className="col-lg-7">
        <div className="form-wrap box--shadow mb-30">
          <h4 className="title-25 mb-20">
            Vos informations <p>( vous pouvez mettre a jour ces données) </p>
          </h4>
          <form   onSubmit={handleSubmit}
                    disabled={imageUploading}>
            <div className="row">
              <div className="col-lg-6">
                <div className="form-inner">
                  <label>First Name</label>
                  <input type="text" name="firstName" defaultValue={user.firstName}  onChange={saveData} />
                </div>
              </div>
              <div className="col-lg-6">
                <div className="form-inner">
                  <label>Last Name</label>
                  <input type="text" name="lastName" defaultValue={user.lastName}  onChange={saveData} />
                </div>
              </div>
              <div className="col-12">
                <div className="form-inner">
                  <label>Email</label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    name="email"
                    onChange={saveData}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-inner">
                  <label>Mot de passe</label>
                  <input
                    type="password"
                    onChange={saveData}
                    name="password"
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="form-inner">
                  <label>photo de profil</label>
                  <input name="photo" type="file" onChange={handleImageSelect} />
                </div>
              </div>
              <div className="col-12">
                <div className="form-inner">
                 <label> Statut  :</label> 
                          <select name="role" onChange={saveData} >
                            <option disabled selected hidden value=""> Sélectionnez votre statut</option>
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

              <div className="col-12">
                <div className="form-inner">
                  <label>Numéro de telephone</label>
                  <input
                    type="text"
                    name="phoneNumber"
                    defaultValue={user.phoneNumber}
                    onChange={saveData}

                  />
                </div>
              </div>
              <div className="shop-quantity d-flex flex-wrap align-items-center justify-content-start mb-5">
                  <button className="primary-btn3" style={{padding: '6px 6px'}}>Modifier profil</button>
              </div>


            </div>



          </form>
        </div>
      </div>


           
          </div>
        </div>
      </div>

      

    </Layout>
  );
}

export default checOutPage;
