import React, { useState , useEffect } from "react";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import Layout from "../../layout/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode"

function addFoundDeclaration() {
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
    getConnectedUserData()
  }, [])
 
  const [file, setFile] = useState(null)
  const [imageUrl, setImageUrl] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [foundDeclarationData, setfoundDeclarationData] = useState({
  });
  const initialState = {
    animal: "",
    race: "",
    description: "",
    image: "",
    dateFound: "",
    placeFound: "",
    phoneNumber: "",
    userId : connectedUser
  }
  useEffect(() => {
  setfoundDeclarationData(initialState)
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

      console.log(response.data); 
      router.push("/declaration/foundDeclarations")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Layout>
{        console.log(foundDeclarationData)
}        <Breadcrumb pageName="déclarer une trouvaille d'un animal perdu " pageTitle="Déclarer une trouvaille" src1="" src=""/>
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
                    <h3> Déclarer une trouveille d'un animal </h3>
                  </div>
                  <form
                    className="w-100"
                    onSubmit={handleSubmit}
                    disabled={imageUploading}
                  >
                    <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="animal">animal *<br /></label>
                          <select
                            className="form-control"
                            id="animal"
                            name="animal"
                            onChange={saveData}
                          >
                            <option disabled selected hidden value="">animal </option>
                            <option value="chat">chat</option>
                            <option value="chien">chien</option>

                          </select>
                          <br />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-inner">
                          <label>race * </label>
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
                          <label>image de l'animal: *</label>
                          <input name="image" type="file" onChange={handleImageSelect} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-inner">
                          <label>date de trouvaille: *</label>
                          <input name="dateFound" type="date" onChange={saveData} />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-inner">
                          <label>lieu de trouvaille: *</label>
                          <input name="placeFound" type="text" placeholder="place where the animal was found" onChange={saveData} />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-inner">
                          <label>Votre num telephone: *</label>
                          <input name="phoneNumber" type="tel" placeholder="phone number" onChange={saveData} />
                        </div>
                      </div>
                      <button className="account-btn" >Déclarer</button>

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
