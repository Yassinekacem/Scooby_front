

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from "jwt-decode"
import axios from "axios";

function GestionProduitss() {

  // get all products
  const [products, setProducts] = useState([])
  const getProducts = async () => {
    const response = await fetch("http://localhost:2001/products");
    const data = await response.json();
    setProducts(data)
  };
  useEffect(() => {
    getProducts()
  }, [])

  // 
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





  // pagination produits 
  const items = 5;
  const [current, setCurrent] = useState(1);
  const nbPages = Math.ceil(products.length / items);
  const startIndex = (current - 1) * items;
  const endIndex = startIndex + items;
  const dataPerPage = products.slice(startIndex, endIndex)

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


  const [file, setFile] = useState(null)
  const [imageUrl, setImageUrl] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [productData, setProductData] = useState({});
  const initialState = {

    category: "",
    description: "",
    brandProduct: "",
    image: "",
    price: 0,
    isDispo: true,
    userId: connectedUser,
    animalCible: ""

  }
  useEffect(() => {
    setProductData(initialState)
  }, [connectedUser])
  const handleImageSelect1 = async (e) => {
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
  const saveData1 = (e) => {
    let name = e.target.name;
    let value = e.target.value;


    if (name === "price" || name === "userId") {
      value = parseInt(value); // ou parseFloat(value)
    }

    setProductData({ ...productData, [name]: value });
  };




  const handleSubmit1 = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:2001/products`,
        {
          ...productData,
          image: imageUrl
        }
      );

      console.log(response.data);
      router.push('/shop')
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={100}
      />

      <div className="cart-section5 pt-120 pb-120" >
        <div className="container">
          <div className="row">
            <div className="col-12">

              <div className="table-wrapper" style={{ backgroundColor: '#fef5f0' }}>
                <div className="d-flex justify-content-center mb-3">

                  <h1 id="gestion-produits">gestion des produits pour animaux</h1> </div> <br />
                <div className="d-flex justify-content-center mb-3">
                  <button className="btn btn-adduser" data-bs-toggle="modal" data-bs-target={`#exampleModal1`}>
                    Ajouter  produit
                  </button>
                </div>
                <div class="modal fade" id={`exampleModal1`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-xl" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title"> Ajout d'un nouvel produit </h5>
                      </div>
                      <div class="modal-body">
                        <form role="form" method="POST" action="" onSubmit={handleSubmit1}
                          disabled={imageUploading}>
                          <div className="form-group">
                            <label htmlFor="category">Categorie * <br /></label>
                            <select
                              className="form-control"
                              id="category"
                              name="category"
                              class="form-control input-lg"
                              onChange={saveData1}
                            >
                              <option disabled selected hidden value="">Sélectionnez une catégorie</option>
                              <option value="food">nourriture</option>
                              <option value="accessory">accessoire</option>
                            </select>
                            <br />
                          </div>
                          <div className="form-group">
                            <label htmlFor="category">animal destinataire *</label>
                            <select className="form-control" name="animalCible" class="form-control input-lg" onChange={saveData1}>
                              <option disabled selected hidden value="">Sélectionnez un animal</option>
                              <option value="cat">chats</option>
                              <option value="dog">chiens</option>
                              <option value="fish">poissons de décoration</option>
                              <option value="bird">oiseaux</option>
                              <option value="hamster">hamsters</option>
                            </select>
                          </div>
                          <br />
                          <div class="form-group">
                            <label class="control-label">description</label>
                            <textarea name="description" rows="5" cols="30"  placeholder="description du produit" class="form-control input-lg" onChange={saveData1}></textarea>
                          </div>
                          <div class="form-group">
                            <label class="control-label">marque</label>
                            <input type="text" class="form-control input-lg" placeholder="marque du produit" name="brandProduct" onChange={saveData1} />
                          </div>

                          <div class="form-group">
                            <label class="control-label">prix</label>
                            <input name="price" type="number" placeholder="prix du produit" class="form-control input-lg" onChange={saveData1} />
                          </div>




                          <div class="form-group">
                            <label class="control-label">image</label>
                            <div>
                              <input name="image" type="file" onChange={handleImageSelect1} />                  </div>
                          </div>
                          <div className="form-group">
                            <div className="form-inner">
                              <label class="control-label">disponible ?</label>
                              <input
                              defaultChecked
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
                                Ajouter produit
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
                      <th>image</th>
                      <th>catégorie</th>
                      <th>animal cible</th>
                      <th>marque</th>
                      <th>prix</th>
                      <th>Id utilisateur</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((item) => {
                      const {
                        id,
                        category, brandProduct,
                        image, description,
                        animalCible,
                        price,
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

                          console.log(response.data);
                          router.push('/shop')
                        } catch (error) {
                          console.error(error);
                        }
                      };



                      const deleteProduct = async (productId) => {
                        const response = await fetch(`http://localhost:2001/products/${productId}`, {
                          method: "DELETE",
                        })
                        const data = await response.json()
                        console.log(data)
                        setProducts(products.filter(product => product.id !== productId))
                        toast.success(`produit ${id} supprimé`);
                      }
                      return (
                        <tr>
                          <td>
                            {id}
                          </td>
                          <td data-label="Image">
                            <img src={image} alt="" />
                          </td>
                          <td data-label="Catégorie">
                            {category === "accessory" ? "accessoire" : "nourriture"}
                          </td>
                          <td data-label="Animal Cible">
                            {animalCible === "cat" ? "chats" : animalCible === "dog" ? "chiens" : animalCible === "bird" ? "oiseaux" : animalCible === "fish" ? "poissons" : "hamster"}
                          </td>
                          <td data-label="marque">
                            {brandProduct}
                          </td>
                          <td data-label="prix">
                            {price}
                          </td>
                          <td data-label="Id annonceur">{userId}</td>

                          <div class="modal fade" id={`produit-${id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-xl" role="document">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5 class="modal-title"> mis à jour ce de produit </h5>
                                </div>
                                <div class="modal-body">
                                  <form role="form" method="POST" action="" onSubmit={handleSubmit}
                                    disabled={imageUploading}>
                                    <div className="form-group">
                                      <label htmlFor="category">Categorie * <br /></label>
                                      <select
                                        className="form-control"
                                        id="category"
                                        name="category"
                                        class="form-control input-lg"
                                        onChange={saveData}
                                      >
                                        <option disabled selected hidden value="">Sélectionnez une catégorie</option>
                                        <option value="food">nourriture</option>
                                        <option value="accessory">accessoire</option>
                                      </select>
                                      <br />
                                    </div>
                                    <div className="form-group">
                                      <label htmlFor="category">animal destinataire *</label>
                                      <select className="form-control" name="animalCible" class="form-control input-lg" onChange={saveData}>
                                        <option disabled selected hidden value="">Sélectionnez un animal</option>
                                        <option value="cat">chats</option>
                                        <option value="dog">chiens</option>
                                        <option value="fish">poissons de décoration</option>
                                        <option value="bird">oiseaux</option>
                                        <option value="hamster">hamsters</option>
                                      </select>
                                    </div>
                                    <div class="form-group">
                                      <label class="control-label">description</label>
                                      <textarea name="description" rows="5" cols="30" class="form-control input-lg" defaultValue={description} onChange={saveData}></textarea>
                                    </div>
                                    <div class="form-group">
                                      <label class="control-label">marque</label>
                                      <input type="text" class="form-control input-lg" name="brandProduct" defaultValue={brandProduct} onChange={saveData} />
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


                          <td data-label="Action">
                            <a class="btn btn-danger" onClick={() => deleteProduct(id)}><i class="bi bi-trash"></i></a>
                            <a className="btn btn-success p-1.5" data-bs-toggle="modal" data-bs-target={`#produit-${id}`} > <i class="bi bi-pencil text-black"></i></a>
                          </td>
                        </tr>


                      );

                    })}
                  </tbody>
                </table>
                <div className="paginations-area d-flex justify-content-center">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <li className="page-item" onClick={goToPrevPage}>
                        <a className="page-link" href="#gestion-produits">
                          <i className="bi bi-arrow-left-short" />
                        </a>
                      </li>
                      {Array.from({ length: nbPages }, (_, i) => i + 1).map((page) => {
                        return (
                          <li className="page-item" key={page}>
                            <a className="page-link" href="#gestion-produits" onClick={() => setCurrent(page)}>
                              0{page}
                            </a>
                          </li>
                        );
                      })}
                      <li className="page-item" onClick={goToNextPage}>
                        <a className="page-link" href="#gestion-produits">
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

export default GestionProduitss;
