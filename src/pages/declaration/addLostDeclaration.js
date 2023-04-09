import React, { useState } from "react";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import Layout from "../../layout/Layout";
import axios from "axios";


function addLostDeclaration() {
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
    const result = await axios.post("https://api.cloudinary.com/v1_1/dxurewunb/upload",form)
    console.log(result.data.secure_url)
    setFile(result.data.secure_url)
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
      await uploadImage();
      const response = await axios.post(
        "http://localhost:2001/lostDeclarations",
        {
          ...lostDeclarationData,
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
      <Layout>
        <Breadcrumb pageName="addLostDeclaration" pageTitle="addLostDeclaration" />
        <div className="addLostDeclaration-section pt-120 pb-120">
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-xl-6 col-lg-8 col-md-10">
                <div
                  className="form-wrapper wow fadeInUp"
                  data-wow-duration="1.5s"
                  data-wow-delay=".2s"
                >
                  <div className="form-title">
                    <h3> announce the loss of your pet </h3>
                  </div>
                  <form className="w-100" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-inner">
                          <label>animal: *</label>

                          <input name="animal" type="text" placeholder="species of animal" onChange={saveData} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-inner">
                          <label>race: *</label>
                          <input name="race" type="text" placeholder="race of your animal" onChange={saveData} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-inner">
                          <label>description: *</label>
                          <textarea name="description" rows="5" cols="30" placeholder="Description" onChange={saveData}></textarea>
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
                          <label>Enter Your dateLost *</label>
                          <input name="dateLost" type="date" placeholder="Enter when dateLost" onChange={saveData} />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-inner">
                          <label>Enter Your placeLost *</label>
                          <input name="placeLost" type="text" placeholder="Enter where you Lost" onChange={saveData} />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-inner">
                          <label>Enter Your phoneNumber *</label>
                          <input name="phoneNumber" type="text" placeholder="Enter your phone Number" onChange={saveData} />
                        </div>
                      </div>

                      
                      <div className="col-md-12">
                        <div className="form-inner">
                          <label>withReward</label>
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


                    </div>
                    <button className="account-btn" onClick={uploadImage}>Add Declaration</button>
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
export default addLostDeclaration; 