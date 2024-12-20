import React, { useState, useHistory, useEffect } from "react";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import Layout from "../../layout/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode"

function CreatePet() {
  const router = useRouter();
  const [connectedUser, setConnectedUser] = useState('')
  const getConnectedUserData = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setConnectedUser(decodedToken.userId);
    }
  };


  useEffect(() => {
    getConnectedUserData(), protectRoute()
  }, [])


  const protectRoute = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    } else {
      const decodedToken = jwtDecode(token);
      if (decodedToken.userRole !== "petSeller") {
        router.push("/");
      }
    }
  }



  const [file, setFile] = useState(null)
  const [imageUrl, setImageUrl] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [PetData, setPetData] = useState({});
  const initialState = {

    species: "",
    race: "",
    age: 0,
    gender: "",
    name : "",
    dateOfBirth : "",
    description : "",
    status: "toAdopt",
    price: 0,
    image: "",
    userId: connectedUser,
    isVaccinated: false,
    isEducated: false

  }
  useEffect(() => {
    setPetData(initialState)
  }, [connectedUser])




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
    if (name === "price" || name === "age") {
      value = parseInt(value); // ou parseFloat(value)
    }

    setPetData({ ...PetData, [name]: value });
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:2001/animals",
        {
          ...PetData,
          image: imageUrl,
        }
      );

      console.log(response.data); // log the response data for debugging purposes

      // redirect to the adoptionList page
      router.push("/pet/adoptionList");

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>

      <Layout>

        {console.log(connectedUser)}

        {console.log(PetData.status)}
        <Breadcrumb pageName="Proposition d'animal" pageTitle="Proposition d'animal" src1="" src=""/>
        <div className="createPet-section pt-120 pb-120">
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-xl-6 col-lg-8 col-md-10">
                <div
                  className="form-wrapper wow fadeInUp"
                  data-wow-duration="1.5s"
                  data-wow-delay=".2s"
                >
                  <div className="form-title">
                    <h3> Déposer votre animal pour adoption ici</h3>
                  </div>
                  <form
                    className="w-100"
                    onSubmit={handleSubmit}
                    disabled={imageUploading}
                  >                   
                  <div className="row">
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="species">Espèce d'animal* <br /></label>
                          <select
                            className="form-control"
                            id="species"
                            name="species"
                            onChange={saveData}
                          >
                            <option disabled selected hidden value="">Sélectionnez un espèce</option>
                            <option value="chat">chat</option>
                            <option value="chien">chien</option>

                          </select>
                          <br />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-inner">
                          <label>race animal*</label>
                          <input name="race" type="text" placeholder="race de l'animal" onChange={saveData} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-inner">
                          <label>nom animal*</label>
                          <input name="name" type="text"placeholder="nom de l'animal"  onChange={saveData} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-inner">
                          <label>date de naissance*</label>
                          <input name="dateOfBirth" type="date"  onChange={saveData} />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-inner">
                          <label>description: *</label>
                          <textarea name="description" placeholder="description de l'animal" onChange={saveData}></textarea>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-inner">
                          <label>Importez l'image de votre animal *</label>
                          <input name="image" type="file" onChange={handleImageSelect} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="gender">sexe de l'animal* <br /></label>
                          <select
                            className="form-control"
                            id="gender"
                            name="gender"
                            onChange={saveData}
                          >
                            <option disabled selected hidden value="">sexe</option>
                            <option value="male">male</option>
                            <option value="female">femelle</option>

                          </select>
                          <br />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-inner">
                          <label> age *</label>
                          <input name="age" type="number" placeholder="Entrer son age" onChange={saveData} />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-inner">
                          <label>dréssé(e) ? </label>
                          <input
                            type="checkbox"
                            name="isEducated"
                            onChange={(e) =>
                              setPetData({
                                ...PetData,
                                isEducated: e.target.checked,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-inner">
                          <label>vacciné(e) ? </label>
                          <input
                            type="checkbox"
                            name="isEducated"
                            onChange={(e) =>
                              setPetData({
                                ...PetData,
                                isVaccinated: e.target.checked,
                              })
                            }
                          />
                        </div>
                      </div>


                    </div>
                    <button className="account-btn" >offre ton animal</button>
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
export default CreatePet; 