import React, { useState , useEffect} from "react";
import Breadcrumb from "../../components/breadcrumb/Breadcrumb";
import Layout from "../../layout/Layout";
import axios from "axios";
import { useRouter } from "next/router";
import jwtDecode from "jwt-decode"


function addLostDeclaration() {
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
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [lostDeclarationData, setLostDeclarationData] = useState({});

const initialState = {
  animal: "",
  race: "",
  description: "",
  image: "",
  dateLost: "",
  withReward: false,
  placeLost: "",
  phoneNumber: "",
  userId : connectedUser
}

  useEffect(() => {
    setLostDeclarationData(initialState)
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
    setLostDeclarationData({ ...lostDeclarationData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:2001/LOSTdECLARATIONS",
        {
          ...lostDeclarationData,
          image: imageUrl
        }
      );

      console.log(response.data); 
      router.push("/declaration/lostDeclarations")
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <Layout>
        <Breadcrumb pageName="déclarer la perte de votre animal" pageTitle="déclarer une perte" src="" src1="" />
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
                    <h3> déclarer la perte de votre animal </h3>
                  </div>
                  <form
                    className="w-100"
                    onSubmit={handleSubmit}
                    disabled={imageUploading}
                  >
                    <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="animal">animal perdu *<br /></label>
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
                          <label>race: *</label>
                          <input name="race" type="text" placeholder="race of your animal" onChange={saveData} />
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-inner">
                          <label>description: *</label>
                          <textarea name="description" rows="5" cols="30" placeholder="Description" onChange={saveData}></textarea>
                        </div>
                      </div>

                      <div className="col-md-6">
                        <div className="form-inner">
                          <label> image de l'animal*</label>
                          <input name="file" type="file" onChange={handleImageSelect} />
                        </div>
                      </div>


                      <div className="col-md-6">
                        <div className="form-inner">
                          <label>Date de perte *</label>
                          <input name="dateLost" type="date" placeholder="Enter when dateLost" onChange={saveData} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-inner">
                          <label>lieu de perte *</label>
                          <input name="placeLost" type="text" placeholder="Entrer lieu de perte" onChange={saveData} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-inner">
                          <label>Votre Num telephone *</label>
                          <input name="phoneNumber" type="text" placeholder="Entrer votre numéro de téléphone" onChange={saveData} />
                        </div>
                      </div>


                      <div className="col-md-9">
                        <div className="form-inner">
                          <label>Avec Récomponse ? </label>
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
                    <button className="account-btn" >Déclarer</button>
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









