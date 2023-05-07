
import Link from "next/link";
import React, { useEffect, useState } from "react";
import axios from "axios";

const deleteProduct = async (ProductId) => {
  const response = await fetch(`http://localhost:2001/products/${ProductId}`, {
    method: "DELETE",
  })
  const data = await response.json()
  console.log(data)

}




function ShopCard({ item: {
  id,
  category,
  animalCible,
  brandProduct,
  image,
  price,
  userId,
  description,
  isDispo,
} }) {

  const [file, setFile] = useState(null)
  const [imageUrl, setImageUrl] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [productData, setProductData] = useState({
    animalCible: animalCible,
    category: category,
    description: description,
    brandProduct: brandProduct,
    image: "",
    price: price,
    userId: 3,
    isDispo: isDispo
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


    if (name === "price" || name === "userId") {
      value = parseInt(value); // ou parseFloat(value)
    }

    setProductData({ ...productData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:2001/products/${id}`,
        {
          ...productData,
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
      {console.log(productData)}


      <div class="modal fade" id={`detail-${id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title"> mis à jour cette annonce </h5>
            </div>
            <div class="modal-body">
              <form role="form" method="POST" action="" onSubmit={handleSubmit}
                disabled={imageUploading}>
                <div class="form-group">
                  <label class="control-label">catégorie</label>
                  <input type="text" class="form-control input-lg" name="category" defaultValue={category} onChange={saveData} />
                </div>
                <div class="form-group">
                  <label class="control-label">cible animal</label>
                  <input type="text" class="form-control input-lg" name="animalCible" defaultValue={animalCible} onChange={saveData} />
                </div>
                <div class="form-group">
                  <label class="control-label">description</label>
                  <textarea name="description" rows="5" cols="30" class="form-control input-lg" defaultValue={description} onChange={saveData}></textarea>
                </div>
                <div class="form-group">
                  <label class="control-label">marque</label>
                  <input type="text" class="form-control input-lg" name="age" defaultValue={brandProduct} onChange={saveData} />
                </div>

                <div class="form-group">
                  <label class="control-label">prix</label>
                  <input name="price" type="number" placeholder="Enter the sex of your animal" class="form-control input-lg" defaultValue={price} onChange={saveData} />
                </div>




                <div class="form-group">
                  <label class="control-label">image</label>
                  <div>
                    <input name="image" type="file" onChange={handleImageSelect} />                  </div>
                </div>
                <div className="form-group">
                  <div className="form-inner">
                    <label class="control-label">disponible ?</label>
                    <input
                      type="checkbox"
                      name="isDispo"
                      onChange={(e) =>
                        setProductData({
                          ...productData,
                          isDispo: e.target.checked,
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
              isDispo ? "offer-card oui" : "offer-card"
            }
          >
            <span>{isDispo ? "disponible" : "vendu"
            }</span>
          </div>

          <div className="collection-img" >
            <img className="img-gluid" src={image} alt="" />
            <div className="view-dt-btn">
              <div className="plus-icon">
                <i className="bi bi-plus" />
              </div>
              {/* <Link legacyBehavior href={{pathname: '/lostDeclarations/[id]', query: {id:id,name:'yassine'}}} >
                    <a>View Details</a>
                  </Link> */}
              <Link legacyBehavior href={`shop/${id}`}>
                <a>View Details</a>
              </Link>
            </div>
            <ul className="cart-icon-list">
              <li>
                <a href="#" class="btn btn-success" data-bs-toggle="modal" data-bs-target={`#detail-${id}`}><i class="bi bi-pencil text-black"></i>
                </a>
              </li>

              <li>
                <a href="#" class="btn btn-danger" onClick={() => deleteProduct(id)}><i class="bi bi-trash"></i></a>
              </li>

            </ul>

          </div>
          <div className="collection-content text-center">
            <h4>
              <Link legacyBehavior href="/shop-details">
                <a>{brandProduct}</a>
              </Link>
            </h4> <br />
            <h5>{category === "food" ? "nourriture" : "accessoire"} pour les animaux</h5>
            <div className="price">
              <h6>prix  : {price} Dt</h6>
            </div>
            <div>
              {category === "accessory" ? "accessoire" : "nourriture"} pour  : {animalCible === "cat" ? "chats" : animalCible === "dog" ? "chiens" : animalCible === "bird" ? "oiseaux" : animalCible === "fish" ? "poissons" : "hamster"}</div>


          </div>
        </div>

      </div>
    </>
  );
}

export default ShopCard;
