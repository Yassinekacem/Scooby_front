
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";

const deleteDeclaration = async (DeclarationID) => {
  const response = await fetch(`http://localhost:2001/foundDeclarations/${DeclarationID}`, {
    method: "DELETE",
  })
  const data = await response.json()
  console.log(data)

}




function FoundDeclarationCard({item:{id,
  animal,race,
  image,
  dateFound,
  placeFound,
  description,
  phoneNumber,
  }}) 
  {
    const [showPopup, setShowPopup] = useState(true);

    const [file , setFile] = useState(null)
  const [FoundDeclarationData, setFoundDeclarationData] = useState({
    animal: animal ,
    race : race,
    description: description,
    image: image,
    dateFound: dateFound,
    placeFound: placeFound,
    phoneNumber : phoneNumber
  });

  const handleEdit = () => {
    setShowPopup(false);
  };
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
    setFoundDeclarationData({ ...FoundDeclarationData, [name]: value });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log( (FoundDeclarationData.dateFound))
      console.log( (FoundDeclarationData.file))
      console.log( (FoundDeclarationData.image))



      
      const response = await axios.put(
        `http://localhost:2001/foundDeclarations/${id}`,
        {
          ...FoundDeclarationData,
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
    {console.log(FoundDeclarationData)}
    
    
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title">Editer cette déclaration</h1>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <form class="w-100" onSubmit={handleSubmit}>
          <div class="row">
            <div class="col-md-6">
              <div class="form-inner">
                <label>Animal: *</label>
                <input name="animal" type="text" placeholder="Espèce de l'animal" class="form-control" onChange={saveData} />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-inner">
                <label>Race: *</label>
                <input name="race" type="text" placeholder="Race de l'animal" class="form-control" onChange={saveData} />
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-inner">
                <label>Description: *</label>
                <textarea name="description" rows="5" cols="30" placeholder="Description de l'animal" class="form-control" onChange={saveData}></textarea>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-inner">
                <label>Image de l'animal: *</label>
                <input name="file" type="file" class="form-control-file" onChange={(e) => setFile(e.target.files[0])} />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-inner">
                <label>Date de la découverte: *</label>
                <input name="dateFound" type="date" class="form-control" onChange={saveData} />
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-inner">
                <label>Lieu de la découverte: *</label>
                <input name="placeFound" type="text" class="form-control" onChange={saveData} />
              </div>
            </div>
            <div class="col-md-12">
              <div class="form-inner">
                <label>Numéro de téléphone: *</label>
                <input name="phoneNumber" type="text" placeholder="Entrez votre numéro de téléphone" class="form-control" onChange={saveData} />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
            <button
  type="submit"
  class="btn btn-primary"
  onClick={() => {
    handleEdit();
    uploadImage();
  }}
>
  Editer
</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

          <div key={id} className="col-lg-5 col-md-5 col-sm-6">
            <div className="collection-card">
               
              
              <div className="collection-img" >
                <img className="img-gluid" src={image} alt=""   style={{ width: "480px", height: "190px" }} />
                <div className="view-dt-btn">
                  <div className="plus-icon">
                    <i className="bi bi-plus" />
                  </div>
                  {/* <Link legacyBehavior href={{pathname: '/lostDeclarations/[id]', query: {id:id,name:'yassine'}}} >
                    <a>View Details</a>
                  </Link> */}
                  <Link legacyBehavior href={`/declaration/foundDeclarations/${id}`}>
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
                    <a href="#" onClick={() => deleteDeclaration(id)}  class="btn btn-primary">
                      <img src="../assets/images/icon/Icon-favorites3.svg" alt="" title="delete this products" />
                    
                    </a>
                  </li>

                </ul>
                
              </div>
              <div className="collection-content text-center">
                <h4>
                  <Link legacyBehavior href="/shop-details">
                    <a>{animal==="cat" ? "chat" : "chien"} {race}</a>
                  </Link>
                </h4>
                <div className="price">
                  <h6>trouvé à : {placeFound}</h6>
                </div>
                <div>
                  trouvé le : {dateFound}
                </div>
                <div>
                 contact :<br />
                    <u> {phoneNumber}</u>
                </div>
                
              </div>
            </div>

          </div>
    </>
  );
}

export default FoundDeclarationCard;
