
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";

const deleteDeclaration = async (DeclarationID) => {
  const response = await fetch(`http://localhost:2001/lostDeclarations/${DeclarationID}`, {
    method: "DELETE",
  })
  const data = await response.json()
  console.log(data)
}




function LostDeclarationCard({item:{id,
  animal,race,
  image,
  dateLost,
  placeLost,
  description,
  phoneNumber,
  withReward}}) 
  {
    const [file , setFile] = useState(null)
  const [lostDeclarationData, setLostDeclarationData] = useState({
    animal: "",
    race :"",
    description: "",
    image: "",
    dateLost: "",
    withReward: false,
    placeLost: "",
    phoneNumber : ""
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
    setLostDeclarationData({ ...lostDeclarationData, [name]: value });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log( (lostDeclarationData.dateLost))
      
      const response = await axios.put(
        `http://localhost:2001/lostDeclarations/${id}`,
        {
          ...lostDeclarationData,
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
    {console.log(lostDeclarationData)}
    
    
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title">éditer cette declaration</h1>
            </div>
            <div class="modal-body">
                   <form role="form" method="POST" action="" onSubmit={handleSubmit}>
                    <div class="form-group">
                        <label class="control-label">animal</label>
                            <input type="text" class="form-control input-lg" name="animal" defaultValue={animal} onChange={saveData}/>
                    </div>
                    <div class="form-group">
                        <label class="control-label">race</label>
                            <input type="text" class="form-control input-lg" name="race" defaultValue={race} onChange={saveData}/>
                    </div>
                    <div class="form-group">
                        <label class="control-label">description</label>
                        <textarea name="description" rows="5" cols="30" placeholder="description" class="form-control input-lg"defaultValue={description} onChange={saveData}></textarea>
                    </div>
                    <div class="form-group">
                        <label class="control-label">dateLost</label>
                        <input name="dateLost" type="date" placeholder="Enter when dateLost"  class="form-control input-lg" defaultValue={dateLost} onChange={saveData}/>  
                    </div>
                    <div class="form-group">
                        <label class="control-label">place Lost</label>
                        <input name="placeLost" type="text" placeholder="Enter where you Lost" class="form-control input-lg" defaultValue={placeLost} onChange={saveData}/> 
                      
                    </div>

                    <div class="form-group">
                        <label class="control-label">Number</label>
                        <input name="phoneNumber" type="text" placeholder="Enter your phone Number" class="form-control input-lg" defaultValue={phoneNumber} onChange={saveData} />
                    </div>

                    <div class="form-group">
                        <label class="control-label">image</label>
                        <div>
                        <input name="file" type="file" onChange={(e) => setFile(e.target.files[0])}  />
                        </div>
                    </div>
                    <br />
                    <div className="form-group">
                        <div className="form-inner">
                          <label class="control-label">withReward</label>
                          <input
                            type="checkbox"
                            name="withReward"
                            onChange={(e) =>
                              setLostDeclarationData({
                                ...lostDeclarationData,
                                withReward: e.target.checked,
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
                 withReward  ? "offer-card oui" : ""
               }
             >
                  <span>{withReward ? "Avec récomponse" : ""}</span>
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
                  <Link legacyBehavior href={`/declaration/lostDeclarations/${id}`}>
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
                  <h6>perdu à : {placeLost}</h6>
                </div>
                <div>
                  perdu le : {dateLost}
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

export default LostDeclarationCard;
