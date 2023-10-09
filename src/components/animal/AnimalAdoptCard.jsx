import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import jwtDecode from "jwt-decode"
import { ToastContainer, toast } from 'react-toastify';



function AnimalAdoptCard({ item: { id,
  species, race,
  image,
  age,
  dateOfBirth,
  name,
  description, gender,
  price,
  status,
  isVaccinated,
  isEducated,
  userId
}, handleDelete , handleGet}) {
  const [animal, setAnimal] = useState([]);
  const getAnimal = async () => {
    const response = await fetch(`http://localhost:2001/animals/${id}`);
    const data = await response.json();
    setAnimal(data);
  };
  useEffect(() => {
    getAnimal();
  }, []);
  const [connectedUser, setConnectedUser] = useState('')
  const getConnectedUserData = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setConnectedUser(decodedToken);
    }
  };
  useEffect(() => {
    getConnectedUserData()
  }, [])


  const [file, setFile] = useState(null)
  const [imageUrl, setImageUrl] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [animalData, setAnimalData] = useState({
    species,
    race,
    status,
    age,
    isVaccinated,
    isEducated,
    gender,
    image,
    dateOfBirth,
    name,
    description,
    price,
    userId,

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
    if (name === "price" || name === "age") {
      value = parseInt(value); // ou parseFloat(value)
    }
    setAnimalData({ ...animalData, [name]: value });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let photoUrl = animal.image;
      if (imageUrl !== "") {
        photoUrl = imageUrl;
      }
      const response = await axios.put(
        `http://localhost:2001/animals/${id}`,
        {
          ...animalData,
          image: photoUrl
        }
      );

      console.log(response.data);
      toast.success(" Votre animal éditée avec succées")
      handleGet()
    } catch (error) {
      toast.error("Erreur de modification")
      console.error(error);
    }
  };

  return (
    <>
      {console.log(animalData)}
      <div className="modal" id={`deleteAdopt-${id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Supprimer un animal pour adoption</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body ">
              <center><h4><strong>Vous êtes sûr de supprimer cet animal ?</strong></h4></center>
            </div>
            <div className="modal-footer justify-content-center">
              <button type="button" className="btn btn-success" data-bs-dismiss="modal" onClick={() => handleDelete(id)}
              ><strong> Supprimer </strong></button>
              <button type="button" className="btn btn-danger" data-bs-dismiss="modal" > <strong> Annuler </strong></button>
            </div>
          </div>
        </div>
      </div>

      <div class="modal fade" id={`detail-${id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title"> Editer cette annonce</h5>
              <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form role="form" method="POST" action="" onSubmit={handleSubmit}
                disabled={imageUploading}>
                <div class="form-group">
                  <label class="control-label">animal</label>
                  <input type="text" class="form-control input-lg" name="species" defaultValue={species} onChange={saveData} />
                </div>
                <div class="form-group">
                  <label class="control-label">race</label>
                  <input type="text" class="form-control input-lg" name="race" defaultValue={race} onChange={saveData} />
                </div>
                <div class="form-group">
                  <label class="control-label">age</label>
                  <input type="number" class="form-control input-lg" name="age" defaultValue={age} onChange={saveData} />
                </div>
                <div class="form-group">
                  <label class="control-label">gender</label>
                  <input name="dateLost" type="gender" placeholder="Enter when dateLost" class="form-control input-lg" defaultValue={gender} onChange={saveData} />
                </div>

                <div class="form-group">
                  <label class="control-label">status</label>
                  <input name="status" type="text" placeholder="Enter your phone Number" class="form-control input-lg" defaultValue={status} onChange={saveData} />
                </div>

                <div class="form-group">
                  <label class="control-label">image</label>
                  <div>
                    <input name="image" type="file" onChange={handleImageSelect} />                  </div>
                </div>
                <div className="form-group">
                  <div className="form-inner">
                    <label class="control-label">isVaccinated</label>
                    <input
                      type="checkbox"
                      name="isVaccinated"
                      onChange={(e) =>
                        setAnimalData({
                          ...animalData,
                          isVaccinated: e.target.checked,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="form-inner">
                    <label class="control-label">isEducated</label>
                    <input
                      type="checkbox"
                      name="isEducated"
                      onChange={(e) =>
                        setAnimalData({
                          ...animalData,
                          isEducated: e.target.checked,
                        })
                      }
                    />
                  </div>
                </div>


                <br />
                <div class="form-group">
                  <div>
                    <center><button type="submit" class="primary-btn1" data-bs-dismiss="modal">
                      enregistrer ces modifications
                    </button></center>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
      <div key={id} className="col-lg-5 col-md-5 col-sm-6">
        <div className="collection-card">
          <div
            className={
              isEducated && isVaccinated ? "offer-card oui" : isEducated && !isVaccinated ? "offer-card " : isVaccinated && !isEducated ? "offer-card toSell" : ""
            }
          >
            <span>{isEducated && isVaccinated ? "Vacciné et dressé" : isEducated && !isVaccinated ? "Dressé" : isVaccinated && !isEducated ? "vacciné" : ""
            }</span>
          </div>

          <div className="collection-img" >
            <img className="img-gluid" src={image} alt="" style={{ width: "420px", height: "250px" }} />
            <div className="view-dt-btn">
              <div className="plus-icon">
                <i className="bi bi-plus" />
              </div>
              {/* <Link legacyBehavior href={{pathname: '/lostDeclarations/[id]', query: {id:id,name:'yassine'}}} >
                    <a>View Details</a>
                  </Link> */}
              <Link legacyBehavior href={`/pet/adoptionList/${id}`}>
                <a>View Details</a>
              </Link>
            </div>


            {(connectedUser.userId === userId || connectedUser.userRole === "admin") ? (<ul className="cart-icon-list">
              <li>
                <a href="#" class="btn btn-success" data-bs-toggle="modal" data-bs-target={`#detail-${id}`}><i class="bi bi-pencil text-black"></i></a>
              </li>

              <li>
                <a href="#" class="btn btn-danger" data-bs-toggle="modal" data-bs-target={`#deleteAdopt-${id}`} ><i class="bi bi-trash"></i></a>
              </li>
            </ul>) : (<ul></ul>)}

          </div>
          <div className="collection-content text-center">
            <h4>
              <Link legacyBehavior href={`/pet/adoptionList/${id}`}>
                <a>{species === "cat" ? "chat" : species === "dog" ? "chien" : species === "fish" ? "poisson" : species === "bird" ? "oiseau" : species} {race}</a>
              </Link>
            </h4>
            <div className="price">
              <h6>Pour adoption</h6>
            </div>
            <h5>nom animal : {name}</h5>

            <div>
              <h5>sexe : {gender}</h5>
            </div>
            <div>
              <h5> agé de : {age} ans</h5>
            </div>


          </div>
        </div>

      </div>
    </>
  );
}

export default AnimalAdoptCard;