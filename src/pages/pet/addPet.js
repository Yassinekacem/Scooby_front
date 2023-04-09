import React, { useState } from "react";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import Layout from "../../layout/Layout";
import axios from "axios";


function CreatePet() {
  const [file , setFile] = useState(null)
  const [PetData, setPetData] = useState({
    species: "",
    race: "",
    age: 0,
    gender: "",
    status: "",
    price: 0,
    image : "",
    userId: 3,
    isVaccinated : false,
    isEducated : false
   
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

    setPetData({ ...PetData, [name]: value });
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(typeof (PetData.price))
      console.log(typeof (PetData.age))
      console.log(typeof (PetData.userId))
      const response = await axios.post(
        "http://localhost:2001/animals",
        {
          ...PetData,
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
      <Layout>
        <Breadcrumb pageName="addPet" pageTitle="addPet" />
        <div className="createPet-section pt-120 pb-120">
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-xl-6 col-lg-8 col-md-10">
                <div
                  className="form-wrapper wow fadeInUp"
                  data-wow-duration="1.5s"
                  data-wow-delay=".2s"
                >
                  <div className="form-title">
                    <h3> add your Pet</h3>
                  </div>
                  <form className="w-100" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-inner">
                          <label>species </label>

                          <input name="species" type="text" placeholder="species of pet" onChange={saveData} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-inner">
                          <label>race:</label>
                          <input name="race" type="text" placeholder="race of pet" onChange={saveData} />
                        </div>
                      </div>

                      <div className="col-md-12">
                        <div className="form-inner">
                          <label>Enter Your image *</label>
                          <input name="file" type="file" onChange={(e) => setFile(e.target.files[0])} />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-inner">
                          <label>Enter his gender </label>
                          <input name="gender" type="text" placeholder="Enter his gender" onChange={saveData} />
                        </div>
                      </div>



                      <div className="col-md-12">
                        <div className="form-inner">
                          <label>Enter Your price *</label>
                          <input name="price" type="number" placeholder="Enter Your price" onChange={saveData} />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-inner">
                          <label>Enter his age *</label>
                          <input name="age" type="number" placeholder="Enter his age" value={PetData.age} onChange={saveData} />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-inner">
                          <label>Enter Your status </label>
                          <input name="status" type="text" placeholder="Enter his status" onChange={saveData} />
                        </div>
                      </div>
                      <div className="col-md-9">
                        <div className="form-inner">
                          <label>isEducated </label>
                          <input
                            type="checkbox"
                            name="isEducated"
                            onChange={(e) =>
                              setPetData({
                                ...PetData,
                                isEducated: e.target.checked,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div className="col-md-9">
                        <div className="form-inner">
                          <label>isVaccinated </label>
                          <input
                            type="checkbox"
                            name="isEducated"
                            onChange={(e) =>
                              setPetData({
                                ...PetData,
                                isVaccinated: e.target.checked,
                              })
                            }
                          />
                        </div>
                      </div>
                      

                    </div>
                    <button className="account-btn" onClick={uploadImage}>Add pet</button>
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
export default CreatePet; 