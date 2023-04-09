
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
  const [ProductData, setProductData] = useState({
    animalCible: animalCible,
    category: category,
    description: description,
    brandProduct : brandProduct,
    image: "",
    price: price,
    userId: 3,
    isDispo: isDispo
  });


  const uploadImage = async () => {
    const form = new FormData();
    form.append("file", file)
    form.append("upload_preset", "yassinekacem")
    await axios.post("https://api.cloudinary.com/v1_1/dxurewunb/upload", form)
      .then((result) => {
        console.log(result.data.secure_url)

        setFile(result.data.secure_url)
      })

  }
  const saveData = (e) => {
    let name = e.target.name;
    let value = e.target.value;


    if (name === "price" || name === "userId") {
      value = parseInt(value); // ou parseFloat(value)
    }

    setProductData({ ...ProductData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log((ProductData.price))
      console.log((ProductData.file))

      const response = await axios.put(
        `http://localhost:2001/products/${id}`,
        {
          ...ProductData,
          image: file
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
      {console.log(ProductData)}


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
                      <label>category: *</label>
                      <input name="category" type="text" placeholder="categorie de produit" class="form-control" onChange={saveData} />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-inner">
                      <label>animalCible: *</label>
                      <input name="animalCible" type="text" placeholder=" l'animal" class="form-control" onChange={saveData} />
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
                      <label>Image de produit: *</label>
                      <input name="file" type="file" class="form-control-file" onChange={(e) => setFile(e.target.files[0])} />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-inner">
                      <label>price: *</label>
                      <input name="price" type="number" class="form-control" onChange={saveData} />
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-inner">
                      <label class="control-label">isDispo</label>
                      <input
                        type="checkbox"
                        name="isDispo"
                        onChange={(e) =>
                          setProductData({
                            ...ProductData,
                            isDispo: e.target.checked,
                          })
                        }
                      />
                    </div>
                  </div>

                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-dismiss="modal">Annuler</button>
                  <button
                    type="submit"
                    class="btn btn-primary"
                    onClick={() => {
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
        <div
            className={
              isDispo ? "offer-card oui" :  "offer-card" 
            }
          >
            <span>{isDispo ? "disponible" :"vendu"
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
                <a href="#" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  <img src="assets/images/icon/Icon-cart3.svg" alt="" title="edit this product" />
                </a>
              </li>

              <li>
                <a href="#" onClick={() => deleteProduct(id)} class="btn btn-primary">
                  <img src="assets/images/icon/Icon-favorites3.svg" alt="" title="delete this products" />

                </a>
              </li>

            </ul>

          </div>
          <div className="collection-content text-center">
            <h4>
              <Link legacyBehavior href="/shop-details">
                <a>{brandProduct}</a>
              </Link>
            </h4> <br/>
            <h5>{category==="food" ? "nourriture" : "accessoire" } pour les animaux</h5>
            <div className="price">
              <h6>prix  : {price} Dt</h6>
            </div>
            <div>
              pour  : {animalCible}                </div>


          </div>
        </div>

      </div>
    </>
  );
}

export default ShopCard;
