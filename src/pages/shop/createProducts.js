import React, { useState, useEffect } from "react";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import Layout from "../../layout/Layout";
import axios from "axios";
import jwtDecode from "jwt-decode"
import { useRouter } from "next/router";



function CreateProduct() {
  const router = useRouter();
  const [connectedUser, setConnectedUser] = useState('')
  const getConnectedUserData = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setConnectedUser(decodedToken.userId);
    }
  };
  useEffect(() => {
    getConnectedUserData(), protectRoute()
  }, [])

  const protectRoute = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/");
    } else {
      const decodedToken = jwtDecode(token);
      if (decodedToken.userRole !== "petShop" && decodedToken.userRole!== "admin") {
        router.push("/");
      }
    }
  }

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
      const response = await axios.post(
        "http://localhost:2001/products",
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
      {console.log(productData)}

      <Layout>
        <Breadcrumb pageName="ajouter votre produit" pageTitle="ajouter votre produit" />
        <div className="createProduct-section pt-120 pb-120">
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-xl-6 col-lg-8 col-md-10">
                <div
                  className="form-wrapper wow fadeInUp"
                  data-wow-duration="1.5s"
                  data-wow-delay=".2s"
                >
                  <div className="form-title">
                    <h3> ajouter votre produit</h3>
                  </div>
                  <form
                    className="w-100"
                    onSubmit={handleSubmit}
                    disabled={imageUploading}
                  >                    <div className="row">

                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="category">Categorie * <br /></label>
                          <select
                            className="form-control"
                            id="category"
                            name="category"
                            onChange={saveData}
                          >
                            <option disabled selected hidden value="">Sélectionnez une catégorie</option>
                            <option value="food">nourriture</option>
                            <option value="accessory">accessoire</option>
                          </select>
                          <br />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="category">animal destinataire *</label>
                          <select className="form-control" name="animalCible" onChange={saveData}>
                            <option disabled selected hidden value="">Sélectionnez un animal</option>
                            <option value="cat">chats</option>
                            <option value="dog">chiens</option>
                            <option value="fish">poissons de décoration</option>
                            <option value="bird">oiseaux</option>
                            <option value="hamster">hamsters</option>
                          </select>
                        </div>
                        <br />
                      </div>




                      <div className="col-md-6">
                        <div className="form-inner">
                          <label>Importez l'image du produit *</label>
                          <input name="image" type="file" onChange={handleImageSelect} />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-inner">
                          <label>Description *</label>
                          <textarea name="description" rows="5" cols="30" placeholder="Description" onChange={saveData}></textarea>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-inner">
                          <label>marque *</label>
                          <input name="brandProduct" type="text" placeholder="Enter Your price" onChange={saveData} />
                        </div>
                      </div>


                      <div className="col-md-6">
                        <div className="form-inner">
                          <label>prix *</label>
                          <input name="price" type="number" placeholder="Enter Your price" onChange={saveData} />
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-inner">
                          <label>disponible ? </label>
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


                    </div>
                    <button className="account-btn" >ajouter produit</button>
                  </form>


                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
export default CreateProduct; 