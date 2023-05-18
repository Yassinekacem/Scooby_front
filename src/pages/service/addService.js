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
        getConnectedUserData(),protectRoute()
    }, [])


    const protectRoute = () => {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/");
        } else {
          const decodedToken = jwtDecode(token);
          if (decodedToken.userRole !== "petTrainer" && decodedToken.userRole !== "petGroomer" &&decodedToken.userRole !== "petTrainer" && decodedToken.userRole!=="petSitter" && decodedToken.userRole !== "veterinary"&&decodedToken.userRole !== "admin") {
            router.push("/");
          }
        }
      }




    const [file, setFile] = useState(null)
    const [imageUrl, setImageUrl] = useState("");
    const [imageUploading, setImageUploading] = useState(false);
    const [serviceData, setServiceData] = useState({});
    const initialState = {

        firstName: "",
        lastName: "",
        experience: 0,
        description: "",
        contact: "",
        ville: "",
        city: "",
        image: "",
        userId: connectedUser,
        type: "",
        level: ""

    }
    useEffect(() => {
        setServiceData(initialState)
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
        if (name === "experience") {
            value = parseInt(value); // ou parseFloat(value)
        }

        setServiceData({ ...serviceData, [name]: value });
    };




    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:2001/announcements",
                {
                    ...serviceData,
                    image: imageUrl,
                }
            );

            console.log(response.data); // log the response data for debugging purposes
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>

            <Layout>

                {console.log(serviceData)}
                <Breadcrumb pageName="annonce votre service" pageTitle="ajout d'un service" />
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
                                        <h3> annocer votre service sur notre plateforme</h3>
                                    </div>
                                    <form
                                        className="w-100"
                                        onSubmit={handleSubmit}
                                        disabled={imageUploading}
                                    >


                                        <div className="row">
                                            <div className="col-md-9">
                                                <div className="form-group">
                                                    <label htmlFor="type">type du service * <br /></label>
                                                    <select
                                                        className="form-control"
                                                        id="type"
                                                        name="type"
                                                        onChange={saveData}
                                                    >
                                                        <option disabled selected hidden value="">Sélectionnez un type</option>
                                                        <option value="petSitting">gardeur d 'animaux</option>
                                                        <option value="petTraining">dresseur d'animaux</option>
                                                        <option value="petGrooming">toiletteur d'animaux</option>
                                                        <option value="veterinaryCaring">Véterinaire</option>

                                                    </select>
                                                    <br />
                                                </div>
                                            </div>
                                            <div className="col-md-9">
                                                <div className="form-group">
                                                    <label htmlFor="level">level du service * <br /></label>
                                                    <select
                                                        className="form-control"
                                                        id="level"
                                                        name="level"
                                                        onChange={saveData}
                                                    >
                                                        <option disabled selected hidden value="">Sélectionnez un type</option>
                                                        <option value="basique">basique</option>
                                                        <option value="intermediaire">intermediaire</option>
                                                        <option value="personnalise">personnalisé</option>

                                                    </select>
                                                    <br />
                                                </div>
                                            </div>

                                            <div className="col-md-9">
                                                <div className="form-inner">
                                                    <label>ton nom:</label>
                                                    <input name="firstName" type="text" placeholder="nom" onChange={saveData} />
                                                </div>
                                            </div>
                                            <div className="col-md-9">
                                                <div className="form-inner">
                                                    <label>ton prénom:</label>
                                                    <input name="lastName" type="text" placeholder="prénom" onChange={saveData} />
                                                </div>
                                            </div>
                                            <div className="col-md-9">
                                                <div className="form-inner">
                                                    <label>ton numéro de téléphone:</label>
                                                    <input name="contact" type="text" placeholder="contact" onChange={saveData} />
                                                </div>
                                            </div>
                                            <div className="col-md-9">
                                                <div className="form-inner">
                                                    <label>ton gouvernement:</label>
                                                    <input name="city" type="text" onChange={saveData} />
                                                </div>
                                            </div>
                                            <div className="col-md-9">
                                                <div className="form-inner">
                                                    <label>ta ville:</label>
                                                    <input name="ville" type="text" placeholder="ville" onChange={saveData} />
                                                </div>
                                            </div>
                                            <div className="col-md-9">
                                                <div className="form-inner">
                                                    <label>Importez votre image *</label>
                                                    <input name="image" type="file" onChange={handleImageSelect} />
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                        <div className="form-inner">
                          <label>Description *</label>
                          <textarea name="description" rows="5" cols="30" placeholder="Description" onChange={saveData}></textarea>
                        </div>
                      </div>
                                         
                                            <div className="col-md-9">
                                                <div className="form-inner">
                                                    <label>experience (en ans ) dans ce domaine*</label>
                                                    <input name="experience" type="number" placeholder="Enter Your experience" onChange={saveData} />
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <button className="account-btn" > ajoute votre service</button>
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