import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from "jwt-decode"



const deleteAnimal = async (animalId) => {
  try {
    const response = await fetch(`http://localhost:2001/animals/${animalId}`, {
      method: "DELETE",
    });
    const data = await response.json();
    console.log(data);
    toast.success("Animal supprimé avec succès!");
    <ToastContainer  />
  } catch (error) {
    console.error(error);
    toast.error("Une erreur s'est produite lors de la suppression de l'animal.");
  }
};

function AnimalCard({ item: { id,
  species, race,
  image,
  age,
  gender,
  price,
  status,
  isVaccinated,
  isEducated,
  userId
} }) {
  const [file, setFile] = useState(null)
  const [imageUrl, setImageUrl] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [animalData, setAnimalData] = useState({
    id ,
    species,
    race ,
    status,
    age,
    isVaccinated,
    isEducated,
    gender,
    image,
    price,
    userId: 3

  });
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
  const [connectedUser1, setConnectedUser1] = useState('')
  const getConnectedUserData1 = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setConnectedUser1(decodedToken.userRole);
    }
  };
  useEffect(() => {
    getConnectedUserData1()
  }, [])

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

      const response = await axios.put(
        `http://localhost:2001/animals/${id}`,
        {
          ...animalData,
          image: imageUrl
        }
      );

      console.log(response.data); // log the response data for debugging purposes
      // TODO: Redirect to a success page or display a success message to the user
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {console.log(animalData)}
 
      <div class="modal fade" id={`detail-${id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
          <div class="modal-header">
              <h5 class="modal-title"> mis à jour cette annonce</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
                  <input name="gender" type="text" placeholder="Enter the sex of your animal" class="form-control input-lg" defaultValue={gender} onChange={saveData} />
                </div>
                <div class="form-group">
                  <label class="control-label">price</label>
                  <input name="price" type="number" placeholder="Enter the price of your animal" class="form-control input-lg" defaultValue={price} onChange={saveData} />
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
            <img className="img-gluid" src={image} alt="" style={{ width: "480px", height: "190px" }} />
            <div className="view-dt-btn">
              <div className="plus-icon">
                <i className="bi bi-plus" />
              </div>

              <Link legacyBehavior href={`/pet/petList/${id}`}>
                <a>View Details</a>
              </Link>
            </div>
            {(connectedUser === userId || connectedUser1==="admin")? (<ul className="cart-icon-list">
            <li>
            <a href="#" class="btn btn-success" data-bs-toggle="modal" data-bs-target={`#detail-${id}`}><i class="bi bi-pencil text-black"></i></a>
              </li>

              <li>
              <a href="#" class="btn btn-danger" onClick={() => deleteAnimal(id)}><i class="bi bi-trash"></i></a>
              </li>
            </ul>) : (<ul></ul>)}

          </div>
          <div className="collection-content text-center">
            <h4>
              <Link legacyBehavior href="/shop-details">
                <a>{species} {race}</a>
              </Link>
            </h4> <br />
            <h5>statut : {status === "toAdopt" ? "pour adoption" : "à vendre"}</h5>
            <div className="price">
              <h6>Prix : {price} Dt</h6>
            </div>
            <div>
              agé de : {age} ans
            </div>


          </div>
        </div>

      </div>
    </>
  );
}

export default AnimalCard;

