import React, { useState } from "react";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import Layout from "../../layout/Layout";
import axios from "axios";

function addFoundDeclaration() {
  const [file, setFile] = useState(null)
  const [imageUrl, setImageUrl] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [foundDeclarationData, setfoundDeclarationData] = useState({
    animal: "",
    race: "",
    description: "",
    image: "",
    dateFound: "",
    placeFound: "",
    phoneNumber: ""
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
    setfoundDeclarationData({ ...foundDeclarationData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:2001/foundDeclarations",
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
      <Layout>
        <Breadcrumb pageName="addFoundDeclaration" pageTitle="addFoundDeclaration" />
        <div className="addFoundDeclaration-section pt-120 pb-120">
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-xl-6 col-lg-8 col-md-10">
                <div
                  className="form-wrapper wow fadeInUp"
                  data-wow-duration="1.5s"
                  data-wow-delay=".2s"
                >
                  <div className="form-title">
                    <h3> announce the finding of an animal </h3>
                  </div>
                  <form
                    className="w-100"
                    onSubmit={handleSubmit}
                    disabled={imageUploading}
                  >
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-inner">
                          <label>animal: *</label>
                          <input name="animal" type="text" placeholder="species of animal" onChange={saveData} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-inner">
                          <label>race: </label>
                          <input name="race" type="text" placeholder="race of animal" onChange={saveData} />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-inner">
                          <label>description: *</label>
                          <textarea name="description" placeholder="description of the animal" onChange={saveData}></textarea>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-inner">
                          <label>image:</label>
                          <input name="image" type="file" onChange={handleImageSelect} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-inner">
                          <label>date found: *</label>
                          <input name="dateFound" type="date" onChange={saveData} />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-inner">
                          <label>place found: *</label>
                          <input name="placeFound" type="text" placeholder="place where the animal was found" onChange={saveData} />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-inner">
                          <label>phone number: *</label>
                          <input name="phoneNumber" type="tel" placeholder="phone number" onChange={saveData} />
                        </div>
                      </div>
                      <button className="account-btn" >Add Declaration</button>

                    </div>
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

export default addFoundDeclaration;
