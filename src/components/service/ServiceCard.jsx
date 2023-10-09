import Link from "next/link";
import { React, useState, useEffect } from "react";
import jwtDecode from "jwt-decode"
import axios from "axios";


function ServiceCard({ announcements }) {
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

  const deleteAnnouncement = async (announcementId) => {
    const response = await fetch(`http://localhost:2001/announcements/${announcementId}`, {
      method: "DELETE",
    })
    const data = await response.json()
    console.log(data)
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



  return (
    <>
    {console.log(serviceData)}
      {announcements.map((item) => {
        const { id, type, firstName, lastName, contact, level, city, ville, userId, experience, image } = item;
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
          <div key={id} className="col-lg-5 col-md-5 col-sm-6">
            <div className="collection-card">
              <div
                className={
                  "offer-card oui"
                }
              >
                <span>{ville}</span>
              </div>

              <div className="collection-img" >
                <img className="img-gluid" src={image} alt="" style={{ width: "280px", height: "250px" }} />

                <div className="view-dt-btn">
                  <div className="plus-icon">
                    <i className="bi bi-plus" />
                  </div>

                  <Link legacyBehavior href={`/service/${type}/${city}/${id}`}>
                    <a>View Details</a>
                  </Link>
                </div>


                <div class="modal fade" id={`detail-${id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title"> Mis à jour Votre service </h5>
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
                                <label class="control-label" htmlFor="type">type du service * <br /></label>
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
                            <div className="col-md-12">
                              <div className="form-group">
                                <label htmlFor="level" class="control-label">level du service * <br /></label>
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

                            <div className="col-md-12">
                              <div className="form-inner">
                                <label class="control-label">ton nom:</label>
                                <input name="firstName" type="text" placeholder="nom" onChange={saveData} />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-inner">
                                <label>ton prénom:</label>
                                <input name="lastName" type="text" placeholder="prénom" onChange={saveData} />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-inner">
                                <label class="control-label">ton numéro de téléphone:</label>
                                <input name="contact" type="text" placeholder="contact" onChange={saveData} />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-inner">
                                <label class="control-label">ton gouvernement:</label>
                                <input name="city" type="text" onChange={saveData} />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-inner">
                                <label class="control-label">ta ville:</label>
                                <input name="ville" type="text" placeholder="ville" onChange={saveData} />
                              </div>
                            </div>
                            <div className="col-md-12">
                              <div className="form-inner">
                                <label>Importez votre image *</label>
                                <input name="image" type="file" onChange={handleImageSelect} />
                              </div>
                            </div>
                            <div className="col-md-6">
                              <div className="form-inner">
                                <label class="control-label">Description *</label>
                                <textarea name="description" rows="5" cols="30" placeholder="Description" onChange={saveData}></textarea>
                              </div>
                            </div>

                            <div className="col-md-12">
                              <div className="form-inner">
                                <label class="control-label">experience (en ans ) dans ce domaine*</label>
                                <input name="experience" type="number" placeholder="Enter Your experience" onChange={saveData} />
                              </div>
                            </div>

                          </div>
                          <br />
                          <div class="form-group">
                            <div>
                              <center><button type="submit" class="primary-btn1" data-bs-dismiss="modal">
                                enregistrer ces modifications
                              </button></center>
                            </div>
                          </div>                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                {connectedUser=== userId ? (<ul className="cart-icon-list">
                  <li>
                    <a href="#" class="btn btn-success" data-bs-toggle="modal" data-bs-target={`#detail-${id}`}><i class="bi bi-pencil text-black"></i>
                    </a>
                  </li>


                  <li>
                    <a href="#" class="btn btn-danger" onClick={() => deleteAnnouncement(id)}><i class="bi bi-trash"></i></a>
                  </li>

                </ul>) : (<ul></ul>)}

              </div>
              <div className="collection-content text-center">
                <h4>
                  <Link legacyBehavior href={`/service/${type}/${city}/${id}`}>
                    <a>{firstName} {lastName}</a>
                  </Link>
                </h4>
                <div className="dresseur">
                  <h6>{type === "petSitting" ? "gardeur d'animaux" : type === "petTraining" ? "dresseur d'animaux" : type === "veterinaryCaring" ? "véterinaire" : "toiletteur d'animaux"}</h6>
                </div>
                <div>
                  <h5>Experience dans {type === "petSitting" ? "garde d'animaux" : type === "veterinaryCaring" ? "le soignement des animaux" : "le dressage des animaux"} :  <br/>{experience} ans</h5>
                </div>
                <div>
                  <h5>Niveau de service : {level}</h5>
                </div>
                <div>
                  contact :<br />
                  <a><u> {contact}</u></a>
                </div>

              </div>
            </div>

          </div>
        );
      })}
    </>
  );
}

export default ServiceCard;
