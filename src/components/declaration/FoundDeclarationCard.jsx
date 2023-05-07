
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";

export const deleteDeclaration = async (DeclarationID) => {
  const response = await fetch(`http://localhost:2001/foundDeclarations/${DeclarationID}`, {
    method: "DELETE",
  })
  const data = await response.json()
  console.log(data)

}




function FoundDeclarationCard({ item: { id,
  animal, race,
  image,
  dateFound,
  placeFound,
  description,
  phoneNumber,
} }) {

  const [file, setFile] = useState(null)
  const [imageUrl, setImageUrl] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [foundDeclarationData, setFoundDeclarationData] = useState({
    animal: animal,
    race: race,
    description: description,
    image: "",
    dateFound: dateFound,
    placeFound: placeFound,
    phoneNumber: phoneNumber
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
    setFoundDeclarationData({ ...foundDeclarationData, [name]: value });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await axios.put(
        `http://localhost:2001/foundDeclarations/${id}`,
        {
          ...foundDeclarationData,
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
      {console.log(foundDeclarationData)}


      
      <div class="modal fade" id={`detail-${id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title"> mis à jour cette annonce</h5>
            </div>
            <div class="modal-body">
            <form role="form" method="POST" action="" onSubmit={handleSubmit}
                    disabled={imageUploading}>
                <div class="form-group">
                  <label class="control-label">animal</label>
                  <input type="text" class="form-control input-lg" name="animal" defaultValue={animal} onChange={saveData} />
                </div>
                <div class="form-group">
                  <label class="control-label">race</label>
                  <input type="text" class="form-control input-lg" name="race" defaultValue={race} onChange={saveData} />
                </div>
                <div class="form-group">
                  <label class="control-label">description</label>
                  <textarea name="description" rows="5" cols="30" placeholder="description" class="form-control input-lg" defaultValue={description} onChange={saveData}></textarea>
                </div>
                <div class="form-group">
                  <label class="control-label">date de trouveille</label>
                  <input name="dateFound" type="date" placeholder="date de trouveille" class="form-control input-lg" defaultValue={dateFound} onChange={saveData} />
                </div>
                <div class="form-group">
                  <label class="control-label">place de trouveille</label>
                  <input name="placeFound" type="text" placeholder="place de" class="form-control input-lg" defaultValue={placeFound} onChange={saveData} />

                </div>

                <div class="form-group">
                  <label class="control-label">contact </label>
                  <input name="phoneNumber" type="text" placeholder="Enter your phone Number" class="form-control input-lg" defaultValue={phoneNumber} onChange={saveData} />
                </div>

                <div class="form-group">
                  <label class="control-label">image</label>
                  <div>
                  <input name="image" type="file" onChange={handleImageSelect} />                  </div>
                </div>
                <br />
                

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


          <div className="collection-img" >
            <img className="img-gluid" src={image} alt="" style={{ width: "420px", height: "250px" }} />
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
              <a href="#" class="btn btn-success" data-bs-toggle="modal" data-bs-target={`#detail-${id}`}><i class="bi bi-pencil text-black"></i>
                </a>
              </li>

              <li>
              <a href="#" class="btn btn-danger" onClick={() => deleteDeclaration(id)}><i class="bi bi-trash"></i></a>
              </li>

            </ul>

          </div>
          <div className="collection-content text-center">
            <h4>
              <Link legacyBehavior href="/shop-details">
                <a>{animal === "cat" ? "chat" : "chien"} {race}</a>
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