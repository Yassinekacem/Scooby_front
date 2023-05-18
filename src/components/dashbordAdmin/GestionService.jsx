import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import jwtDecode from "jwt-decode"

function gestionServices() {


  const [announcements, setAnnouncements] = useState([])
  const getAnnouncements = async () => {
    const response = await fetch("http://localhost:2001/announcements");
    const data = await response.json();
    setAnnouncements(data)

  };
  useEffect(() => {
    getAnnouncements()
  }, [])
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




  const deleteAnnouncement = async () => {
    const response = await fetch(`http://localhost:2001/announcements/${announcementID}`, {
      method: "DELETE",
    })
    const data = await response.json()
    console.log(data)
    setAnnouncements(announcements.filter(announcement => announcement.id !== announcementID))
    toast.success(`annonce de service ${id} supprimé`);
  }


  const items = 5;
  const [current, setCurrent] = useState(1);
  const nbPages = Math.ceil(announcements.length / items);
  const startIndex = (current - 1) * items;
  const endIndex = startIndex + items;
  const dataPerPage = announcements.slice(startIndex, endIndex)

  const goToNextPage = () => {
    if (current < nbPages) {
      setCurrent(current + 1);
    }
  };

  const goToPrevPage = () => {
    if (current > 1) {
      setCurrent(current - 1);
    }
  };
 
  return (
    <>

      {console.log(announcements)}
      <ToastContainer
        position="top-center"
        autoClose={100}
      />


      <div id="gestion-services"></div><div ></div>
      <div className="cart-section pt-120 pb-120"   >
        <div className="container">
          <div className="row">
            <div className="col-12">

              <div className="table-wrapper" style={{ backgroundColor: '#fef5ff' }}>
                <div className="d-flex justify-content-center mb-3">

                  <h1 id="gestionServices">gestion des services pour animaux</h1> </div> <br />
                <div className="d-flex justify-content-center mb-3">
                  <button className="btn btn-adduser" data-bs-toggle="modal" data-bs-target={`#AjoutService`} >
                    Ajouter  service
                  </button>
                </div>

                <div class="modal fade" id={`AjoutService`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-xl" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">ajout d'une nouvelle annonce de service pour animaux</h5>
                      </div>
                      <div class="modal-body">
                        <form
                          className="w-100"
                          onSubmit={handleSubmit}
                          disabled={imageUploading}
                        >


                          <div className="row">
                            <div className="col-md-12">
                              <div className="form-group">
                                <label htmlFor="type">type du service * <br /></label>
                                <select
                                  class="form-control input-lg"
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
                            <div className="col-md-12">
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

                            <div className="form-inner">
                              <label class="control-label"> nom *</label>
                              <input name="firstName" type="text" placeholder="nom de prestatatire" onChange={saveData} />
                            </div>

                            <div className="form-inner">
                              <label class="control-label"> prénom  *</label>
                              <input name="lastName" type="text" placeholder="prénom de prestataire" onChange={saveData} />
                            </div>

                            <div className="form-inner">
                              <label class="control-label"> numéro de téléphone *</label>
                              <input name="contact" type="text" placeholder="contact de prestataire" onChange={saveData} />
                            </div>

                            <div className="form-inner">
                              <label class="control-label"> gouvernement *</label>
                              <input name="city" type="text" placeholder="Son gouvernerart" onChange={saveData} />
                            </div>
                            <div className="form-inner">
                              <label class="control-label"> ville *</label>
                              <input name="ville" type="text" placeholder=" sa ville" onChange={saveData} />
                            </div>
                            <div className="form-inner">
                              <label class="control-label">Importez  image *</label>
                              <input name="image" type="file" onChange={handleImageSelect} />
                            </div>
                            <div className="form-inner">
                              <label class="control-label">Description *</label>
                              <textarea name="description" rows="5" cols="30" placeholder="Description" onChange={saveData}></textarea>
                            </div>

                            <div className="form-inner">
                              <label class="control-label">experience (en ans ) dans ce domaine *</label>
                              <input name="experience" type="number" placeholder="son experience dans ce domaine" onChange={saveData} />
                            </div>

                          </div>
                          <div class="form-group">
                            <div>
                              <center><button type="submit" class="primary-btn1" data-bs-dismiss="modal">
                                Ajouter service
                              </button></center>
                            </div>
                          </div>
                        </form>

                      </div>
                    </div>
                  </div>
                </div>
                <table className="eg-table table cart-table">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>photo</th>
                      <th>Nom prestataire</th>
                      <th>nature service</th>
                      <th>gouvernement</th>
                      <th>Ville</th>
                      <th> action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataPerPage.map((item) => {
                      const {
                        id,
                        firstName,
                        lastName,
                        type,
                        image,
                        ville,
                        experience,
                        city,
                        userId
                      } = item;
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
                          const response = await axios.put(
                            `http://localhost:2001/announcements/${id}`,
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
                        <tr>
                          <td data-label="ID">
                            <div className="delete-icon">
                              {id}
                            </div>
                          </td>
                          <td data-label="Image">
                            {image.length > 0 ? (<img src={image} alt="" />) : (<img src="assets/images/bg/team/unkown.png" alt="" />)}
                          </td>
                          <td data-label="Nom et pénom">
                            {firstName} {lastName}
                          </td>

                          <td data-label="statut">{type}</td>

                          <td data-label="date de création">{city}</td>
                          <td data-label="dernière mise à jour">{ville}</td>



                          <div class="modal fade" id={`updateService-${id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-xl" role="document">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5 class="modal-title"> mis à jour cette annonce de service </h5>
                                </div>
                                <div class="modal-body">

                                <form
                          className="w-100"
                          onSubmit={handleSubmit}
                          disabled={imageUploading}
                        >


                          <div className="row">
                            <div className="col-md-12">
                              <div className="form-group">
                                <label htmlFor="type">type du service * <br /></label>
                                <select
                                  class="form-control input-lg"
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
                            <div className="col-md-12">
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

                            <div className="form-inner">
                              <label class="control-label"> nom *</label>
                              <input name="firstName" type="text" placeholder="nom de prestatatire" onChange={saveData} />
                            </div>

                            <div className="form-inner">
                              <label class="control-label"> prénom  *</label>
                              <input name="lastName" type="text" placeholder="prénom de prestataire" onChange={saveData} />
                            </div>

                            <div className="form-inner">
                              <label class="control-label"> numéro de téléphone *</label>
                              <input name="contact" type="text" placeholder="contact de prestataire" onChange={saveData} />
                            </div>

                            <div className="form-inner">
                              <label class="control-label"> gouvernement *</label>
                              <input name="city" type="text" placeholder="Son gouvernerart" onChange={saveData} />
                            </div>
                            <div className="form-inner">
                              <label class="control-label"> ville *</label>
                              <input name="ville" type="text" placeholder=" sa ville" onChange={saveData} />
                            </div>
                            <div className="form-inner">
                              <label class="control-label">Importez  image *</label>
                              <input name="image" type="file" onChange={handleImageSelect} />
                            </div>
                            <div className="form-inner">
                              <label class="control-label">Description *</label>
                              <textarea name="description" rows="5" cols="30" placeholder="Description" onChange={saveData}></textarea>
                            </div>

                            <div className="form-inner">
                              <label class="control-label">experience (en ans ) dans ce domaine *</label>
                              <input name="experience" type="number" placeholder="son experience dans ce domaine" onChange={saveData} />
                            </div>

                          </div>
                          <div class="form-group">
                            <div>
                              <center><button type="submit" class="primary-btn1" data-bs-dismiss="modal">
                                Enregistrer ces modifications
                              </button></center>
                            </div>
                          </div>
                        </form>
                                </div>
                              </div>
                            </div>
                          </div>


                          <td data-label="Action">
                            <a href="#" className="btn btn-danger" onClick={() => deleteAnnouncement(id)} ><i class="bi bi-trash"></i></a>
                            <a href="#" className="btn btn-success p-1.5" data-bs-toggle="modal" data-bs-target={`#updateService-${id}`} > <i class="bi bi-pencil text-black"></i></a>
                          </td>


                        </tr>


                      );

                    }
                    )

                    }
                  </tbody>
                </table>
                 <div className="paginations-area d-flex justify-content-center">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <li className="page-item" onClick={goToPrevPage}>
                        <a className="page-link" href="#gestionServices">
                          <i className="bi bi-arrow-left-short" />
                        </a>
                      </li>
                      {Array.from({ length: nbPages }, (_, i) => i + 1).map((page) => {
                        return (
                          <li className="page-item" key={page}>
                            <a className="page-link" href="#gestionServices" onClick={() => setCurrent(page)}>
                              0{page}
                            </a>
                          </li>
                        );
                      })}
                      <li className="page-item" onClick={goToNextPage}>
                        <a className="page-link" href="#gestionServices">
                          <i className="bi bi-arrow-right-short" />
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div> 
              </div>
            </div>
          </div>

        </div>
      </div>

    </>

  );
}

export default gestionServices;