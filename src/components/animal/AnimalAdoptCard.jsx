

import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";

const deleteAnimal = async (animalId) => {
  const response = await fetch(`http://localhost:2001/animals/${animalId}`, {
    method: "DELETE",
  })
  const data = await response.json()
  console.log(data)
}
function AnimalAdoptCard({item:{id,
  species,race,
  image,
  age,
  gender,
  price,
  status,
  isVaccinated,
  isEducated,
  userId
  }}) 
  {
    const [file , setFile] = useState(null)
  const [animalData, setAnimalData] = useState({
    species: species,
    race :race,
    status: status,
    age: age,
    isVaccinated : isVaccinated,
    isEducated : isEducated,
    gender: gender,
    image: image,
    price : price,
    userId : 3
    
  });


  const uploadImage = async () =>{
    const form = new FormData();
    form.append("file",file)
    form.append("upload_preset","yassinekacem")
    await axios.post("https://api.cloudinary.com/v1_1/dxurewunb/upload",form)
    .then((result) => {console.log(result.data.secure_url)

      setFile(result.data.secure_url)
    })

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
      console.log( (animalData.price))
      
      const response = await axios.put(
        `http://localhost:2001/animals/${id}`,
        {
          ...animalData,
          image :file
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
    
    
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title">éditer cet annonce</h1>
            </div>
            <div class="modal-body">
                   <form role="form" method="POST" action="" onSubmit={handleSubmit}>
                    <div class="form-group">
                        <label class="control-label">animal</label>
                            <input type="text" class="form-control input-lg" name="species" defaultValue={species} onChange={saveData}/>
                    </div>
                    <div class="form-group">
                        <label class="control-label">race</label>
                            <input type="text" class="form-control input-lg" name="race" defaultValue={race} onChange={saveData}/>
                    </div>
                    <div class="form-group">
                        <label class="control-label">age</label>
                        <input type="number" class="form-control input-lg" name="age" defaultValue={age} onChange={saveData}/>
                    </div>
                    <div class="form-group">
                        <label class="control-label">gender</label>
                        <input name="dateLost" type="gender" placeholder="Enter when dateLost"  class="form-control input-lg" defaultValue={gender} onChange={saveData}/>  
                    </div>

                    <div class="form-group">
                        <label class="control-label">status</label>
                        <input name="status" type="text" placeholder="Enter your phone Number" class="form-control input-lg" defaultValue={status} onChange={saveData} />
                    </div>

                    <div class="form-group">
                        <label class="control-label">image</label>
                        <div>
                        <input name="file" type="file" onChange={(e) => setFile(e.target.files[0])}  />
                        </div>
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
                  

                      <br/>
                      <div class="form-group">
    <div>
        <button type="submit" class="btn btn-primary" onClick={uploadImage}>
            éditer
        </button>
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
              isEducated && isVaccinated ? "offer-card oui" : isEducated && !isVaccinated ? "offer-card " : isVaccinated && !isEducated ? "offer-card toSell" : "offer-card toAdopt"
            }
          >
            <span>{isEducated && isVaccinated ? "Vacciné et dressé" : isEducated && !isVaccinated ? "Dressé" : isVaccinated && !isEducated ? "vacciné" : ""
            }</span>
          </div>
              
              <div className="collection-img" >
                <img className="img-gluid" src={image} alt=""   style={{ width: "480px", height: "190px" }} />
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
                <ul className="cart-icon-list">
                  <li>
                    <a href="#" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"> 
                      <img src="../assets/images/icon/Icon-cart3.svg" alt="" title="edit this product" />
                    </a>
                  </li>

                  <li>
                    <a href="#" onClick={() => deleteAnimal(id)}  class="btn btn-primary">
                      <img src="../assets/images/icon/Icon-favorites3.svg" alt="" title="delete this products" />
                    
                    </a>
                  </li>

                </ul>
                
              </div>
              <div className="collection-content text-center">
                <h4>
                  <Link legacyBehavior href="/shop-details">
                    <a>{species} {race}</a>
                  </Link>
                </h4> <br />
                <h5>statut : {status === "toAdopt" ? "pour adoption" : "à vendre"}</h5>
                <div className="price">
                  <h6>{status==="toAdopt" ? "free" : "" }</h6>
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

export default AnimalAdoptCard;

