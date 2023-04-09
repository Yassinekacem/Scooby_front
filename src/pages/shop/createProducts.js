import React, { useState } from "react";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import Layout from "../../layout/Layout";
import axios from "axios";


function CreateProduct() {
  const [file, setFile] = useState(null)
  const [productData, setProductData] = useState({
    category: "",
    description: "",
    brandProduct: "",
    image: "",
    price: 0,
    isDispo: true,
    userId: 3,
    animalCible: ""
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

    setProductData({ ...productData, [name]: value });
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await uploadImage(); // call uploadImage function here
      console.log(typeof Number(productData.price))
      const response = await axios.post(
        "http://localhost:2001/products",
        {
          ...productData,
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
        {console.log(productData)}

      <Layout>
        <Breadcrumb pageName="addProduct" pageTitle="addProduct" />
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
                    <h3> add your product</h3>
                  </div>
                  <form className="w-100" onSubmit={handleSubmit}>
                    <div className="row">

                      <div className="col-md-9">
                        <div className="form-group">
                          <label htmlFor="category">Categorie :</label>
                          <select
                            className="form-control"
                            id="category"
                            name="category"
                            onChange={saveData}
                          >
                            <option value="">Sélectionnez un rôle</option>
                            <option value="food">nourriture</option>
                            <option value="accessory">accessoire</option>
                          </select>
                        </div>
                      </div> <br />
                      <div className="col-md-9">
                        <div className="form-group">
                          <label htmlFor="category">animal Cible :</label>
                          <select
                            className="form-control"
                            name="animalCible"
                            onChange={saveData}
                          >
                            <option value="">Sélectionnez un cible</option>
                            <option value="cat">chats</option>
                            <option value="dog">chiens</option>
                            <option value="fish">poissons de décoration</option>
                            <option value="bird">oiseaux</option>
                            <option value="hamster">hamsters</option>

                          </select>
                        </div>
                      </div> <br />



                      <div className="col-md-9">
                        <div className="form-inner">
                          <label>Enter Your image *</label>
                          <input name="file" type="file" onChange={(e) => setFile(e.target.files[0])} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-inner">
                          <label>Description:</label>
                          <textarea name="description" rows="5" cols="30" placeholder="Description" onChange={saveData}></textarea>
                        </div>
                      </div>
                      <div className="col-md-9">
                        <div className="form-inner">
                          <label>Enter brand *</label>
                          <input name="brandProduct" type="text" placeholder="Enter Your price" onChange={saveData} />
                        </div>
                      </div>

                      
                      <div className="col-md-9">
                        <div className="form-inner">
                          <label>Enter Your price *</label>
                          <input name="price" type="number" placeholder="Enter Your price" onChange={saveData} />
                        </div>
                      </div>

                      <div className="col-md-9">
                        <div className="form-inner">
                          <label>isDispo </label>
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
                    <button className="account-btn" onClick={uploadImage}>Add product</button>
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