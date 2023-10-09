

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from "jwt-decode"
import axios from "axios"

function gestionDeclarations() {
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
  //  get all found Declarations
  const [foundDeclarations, setFoundDeclarations] = useState([])
  const getFoundDeclarations = async () => {
    const response = await fetch("http://localhost:2001/foundDeclarations");
    const data = await response.json();
    setFoundDeclarations(data)
  };
  useEffect(() => {
    getFoundDeclarations()
  }, [])

  // update Found Declaration 

  const [foundDeclarationData, setFoundDeclarationData] = useState({});
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
    setFoundDeclarationData(initialState)
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
    setFoundDeclarationData({ ...foundDeclarationData, [name]: value });

  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const response = await axios.post(
        `http://localhost:2001/foundDeclarations`,
        {
          ...foundDeclarationData,
          image: imageUrl
        }
      );

      console.log(response.data); 
      getFoundDeclarations()
      toast.success("Déclaration de trouvaille ajoutée avec succées")
    } catch (error) {
      console.error(error);
      toast.error("Erreur d'ajout")

    }
  };


  //  get all lost Declarations 
  const [lostDeclarations, setLostDeclarations] = useState([])
  const getLostDeclarations = async () => {
    const response = await fetch("http://localhost:2001/lostDeclarations");
    const data = await response.json();
    setLostDeclarations(data)
  };
  useEffect(() => {
    getLostDeclarations()
  }, [])
  //   update lost Declarations 

  const [file, setFile] = useState(null)
  const [imageUrl, setImageUrl] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  const [lostDeclarationData, setLostDeclarationData] = useState();
const initialState1 = 
  {
    animal: "",
    race: "",
    description: "",
    image: "",
    dateLost: "",
    withReward: "",
    placeLost: "",
    phoneNumber: "" ,
    userId : connectedUser
  
}
useEffect(() => {
  setLostDeclarationData(initialState1)
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
    setLostDeclarationData({ ...lostDeclarationData, [name]: value });

  };

  const handleSubmit1 = async (e) => {
    e.preventDefault();
    try {

      const response = await axios.post(
        `http://localhost:2001/lostDeclarations`,
        {
          ...lostDeclarationData,
          image: imageUrl
        }
      );

      console.log(response.data); 
      getLostDeclarations()
      toast.success("Déclaration de perte ajoutée avec succées")
    } catch (error) {
      console.error(error);
      toast.error("Erreur d'ajout")
    }
  };


  //  pagination 
  const items = 5;
  const [current, setCurrent] = useState(1);
  const nbPages1 = Math.ceil(lostDeclarations.length / items);
  const nbPages2 = Math.ceil(foundDeclarations.length / items);
  const startIndex = (current - 1) * items;
  const endIndex = startIndex + items;
  const dataPerPage1 = lostDeclarations.slice(startIndex, endIndex)
  const dataPerPage2 = foundDeclarations.slice(startIndex, endIndex)
  const goToNextPage1 = () => {
    if (current < nbPages1) {
      setCurrent(current + 1);
    }
  };
  const goToNextPage2 = () => {
    if (current < nbPages2) {
      setCurrent(current + 1);
    }
  };
  const goToPrevPage1 = () => {
    if (current > 1) {
      setCurrent(current - 1);
    }
  };
  const goToPrevPage2 = () => {
    if (current > 1) {
      setCurrent(current - 1);
    }
  };





  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={100}
      />
            {console.log(lostDeclarationData)}
            {console.log(foundDeclarationData)}


      <div className="cart-section2 pt-120 pb-120" id="gestiondeclaration">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="table-wrapper" style={{ backgroundColor: '#fef5f0' }}>
                <div className="d-flex justify-content-center mb-3">
                  <h1 id="gestion-declarations">Gestion des déclarations de perte d'animaux</h1>
                </div>
                <br />
                <div className="d-flex justify-content-center mb-3">
                  <button className="btn btn-adduser" data-bs-toggle="modal" data-bs-target={`#lost`}>Ajouter  déclaration de perte</button>
                </div>
                <div class="modal fade" id={`lost`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-xl" role="document">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5 class="modal-title"> ajouter une déclaration de perte d'un animal</h5>
                                </div>
                                <div class="modal-body">
                                  <form role="form" method="POST" action="" onSubmit={handleSubmit1}
                                    disabled={imageUploading}>
                                    <div class="form-group">
                                      <label class="control-label">animal</label>
                                      <input type="text" class="form-control input-lg" placeholder="animal perdu" name="animal"  onChange={saveData1} />
                                    </div>
                                    <div class="form-group">
                                      <label class="control-label">race</label>
                                      <input type="text" class="form-control input-lg" name="race" placeholder="race de cet animal"  onChange={saveData1} />
                                    </div>
                                    <div class="form-group">
                                      <label class="control-label">description</label>
                                      <textarea name="description" rows="5" cols="30" placeholder="description" class="form-control input-lg"  onChange={saveData1}></textarea>
                                    </div>
                                    <div class="form-group">
                                      <label class="control-label">date de perte</label>
                                      <input name="dateLost" type="date" placeholder="date de perte" class="form-control input-lg"  onChange={saveData1} />
                                    </div>
                                    <div class="form-group">
                                      <label class="control-label">lieu de perte</label>
                                      <input name="placeLost" type="text" placeholder="lieu de perte" class="form-control input-lg"  onChange={saveData1} />

                                    </div>

                                    <div class="form-group">
                                      <label class="control-label">contact </label>
                                      <input name="phoneNumber" type="text" placeholder="contact" class="form-control input-lg"  onChange={saveData1} />
                                    </div>

                                    <div class="form-group">
                                      <label class="control-label">image</label>
                                      <div>
                                        <input name="image" type="file" onChange={handleImageSelect1} />                  </div>
                                    </div>
                                    <br />
                                    <div className="form-group">
                                      <div className="form-inner">
                                        <label class="control-label">Avec récomponse</label>
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

                                    <br />
                                    <div class="form-group">
                                      <div>
                                        <center><button type="submit" class="primary-btn1" data-bs-dismiss="modal">
                                          ajouter déclaration
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
                      <th>animal</th>
                      <th>lieu de perte</th>
                      <th>date de perte</th>
                      <th>contact</th>
                      <th>avec récomponse</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataPerPage1.map((item) => {
                      const {
                        id,
                        animal,
                        race,
                        description,
                        image,
                        dateLost,
                        placeLost,
                        withReward,
                        phoneNumber,
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
                        setLostDeclarationData({ ...lostDeclarationData, [name]: value });

                      };

                      const handleSubmit = async (e) => {
                        e.preventDefault();
                        try {

                          const response = await axios.put(
                            `http://localhost:2001/lostDeclarations/${id}`,
                            {
                              ...lostDeclarationData,
                              image: imageUrl
                            }
                          );

                          console.log(response.data); 
                          getLostDeclarations();
                          toast.success("Déclaration de perte modifiée avec succées")
                        } catch (error) {
                          console.error(error);
                          toast.error("Erreur de modification")
                        }
                      };




                      const deleteLostDeclaration = async (declarationId) => {
                        const response = await fetch(`http://localhost:2001/lostDeclarations/${declarationId}`, {
                          method: "DELETE",
                        });
                        const data = await response.json();
                        console.log(data);
                        setLostDeclarations(lostDeclarations.filter((declaration) => declaration.id !== declarationId));
                        toast.success(`declaration de perte ${id} supprimé`);
                      };
                      return (
                        <tr key={id}>
                          <td>{id}</td>
                          <td data-label="Image">
                            <img src={image} alt="" />
                          </td>
                          <td data-label="animal">
                            {animal} {race}
                          </td>
                          <td data-label="lieu de perte">{placeLost}</td>
                          <td data-label="date de perte">{dateLost}</td>
                          <td data-label="contact">{phoneNumber}</td>
                          <td data-label="avec récompense">{withReward ? "oui" : "non"}</td>

                        


                          <div class="modal fade" id={`updateLost-${id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-xl" role="document">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5 class="modal-title"> mis à jour cette déclaration de perte</h5>
                                </div>
                                <div class="modal-body">
                                  <form role="form" method="POST" action="" onSubmit={handleSubmit}
                                    disabled={imageUploading}>
                                    <div class="form-group">
                                      <label class="control-label">animal</label>
                                      <input type="text" class="form-control input-lg" name="animal" defaultValue={animal} onChange={saveData} />
                                    </div>
                                    <div class="form-group">
                                      <label class="control-label">race</label>
                                      <input type="text" class="form-control input-lg" name="race" defaultValue={race} onChange={saveData} />
                                    </div>
                                    <div class="form-group">
                                      <label class="control-label">description</label>
                                      <textarea name="description" rows="5" cols="30" placeholder="description" class="form-control input-lg" defaultValue={description} onChange={saveData}></textarea>
                                    </div>
                                    <div class="form-group">
                                      <label class="control-label">date de perte</label>
                                      <input name="dateLost" type="date"  class="form-control input-lg" defaultValue={dateLost} onChange={saveData} />
                                    </div>
                                    <div class="form-group">
                                      <label class="control-label">lieu de perte</label>
                                      <input name="placeLost" type="text"  class="form-control input-lg" defaultValue={placeLost} onChange={saveData} />

                                    </div>

                                    <div class="form-group">
                                      <label class="control-label">contact </label>
                                      <input name="phoneNumber" type="text"  class="form-control input-lg" defaultValue={phoneNumber} onChange={saveData} />
                                    </div>

                                    <div class="form-group">
                                      <label class="control-label">image</label>
                                      <div>
                                        <input name="image" type="file" onChange={handleImageSelect} />                  </div>
                                    </div>
                                    <br />
                                    <div className="form-group">
                                      <div className="form-inner">
                                        <label class="control-label">Avec récomponse</label>
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
                            <a href="#" className="btn btn-danger"  onClick={() => deleteLostDeclaration(id)} >
                              <i className="bi bi-trash"></i>
                            </a>
                            <a className="btn btn-success p-1.5" data-bs-toggle="modal" data-bs-target={`#updateLost-${id}`}>
                              <i className="bi bi-pencil text-black"></i>
                            </a>
                          </td>
                        </tr>

                      );

                    })}
                  </tbody>
                </table>
                <div className="paginations-area d-flex justify-content-center">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <li className="page-item" onClick={goToPrevPage1}>
                        <a className="page-link" href="#gestion-declarations">
                          <i className="bi bi-arrow-left-short" />
                        </a>
                      </li>
                      {Array.from({ length: nbPages1 }, (_, i) => i + 1).map((page) => {
                        return (
                          <li className="page-item" key={page}>
                            <a className="page-link" href="#gestion-declarations" onClick={() => setCurrent(page)}>
                              0{page}
                            </a>
                          </li>
                        );
                      })}
                      <li className="page-item" onClick={goToNextPage1}>
                        <a className="page-link" href="#gestion-declarations">
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

      <div className="cart-section3 pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-12">

              <div className="table-wrapper" style={{ backgroundColor: '#fef5f0' }}>
                <div className="d-flex justify-content-center mb-3">

                  <h1>Gestion des déclarations de trouvaille d'animaux</h1> </div> <br />
                <div className="d-flex justify-content-center mb-3">
                  <button className="btn btn-adduser" data-bs-toggle="modal" data-bs-target={`#foundDeclaration`}>
                    Ajouter  déclaration de trouvaille
                  </button>
                </div>
                <div class="modal fade" id={`foundDeclaration`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-xl" role="document">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5 class="modal-title"> ajouter une déclaration de trouvaille</h5>
                                </div>
                                <div class="modal-body">
                                  <form role="form" method="POST" action="" onSubmit={handleSubmit}
                                    disabled={imageUploading}>
                                    <div class="form-group">
                                      <label class="control-label">animal</label>
                                      <input type="text" class="form-control input-lg" name="animal" placeholder="animal trouvé"  onChange={saveData} />
                                    </div>
                                    <div class="form-group">
                                      <label class="control-label">race</label>
                                      <input type="text" class="form-control input-lg" name="race" placeholder="la race de cet animal"  onChange={saveData} />
                                    </div>
                                    <div class="form-group">
                                      <label class="control-label">description</label>
                                      <textarea name="description" rows="5" cols="30" placeholder="description" class="form-control input-lg" onChange={saveData}></textarea>
                                    </div>
                                    <div class="form-group">
                                      <label class="control-label">date de trouvaille</label>
                                      <input name="dateFound" type="date" placeholder="date de trouvaille" class="form-control input-lg"  onChange={saveData} />
                                    </div>
                                    <div class="form-group">
                                      <label class="control-label">lieu de trouvaille</label>
                                      <input name="placeFound" type="text" placeholder="lieu de trouvaille" class="form-control input-lg"  onChange={saveData} />

                                    </div>

                                    <div class="form-group">
                                      <label class="control-label">contact </label>
                                      <input name="phoneNumber" type="text" placeholder="Votre contact" class="form-control input-lg" onChange={saveData} />
                                    </div>

                                    <div class="form-group">
                                      <label class="control-label">image</label>
                                      <div>
                                        <input name="image" type="file" onChange={handleImageSelect} />                  </div>
                                    </div>
                                    <br />


                                    <br />
                                    <div class="form-group">
                                      <div>
                                        <center><button type="submit" class="primary-btn1" data-bs-dismiss="modal">
                                          ajouter déclaration
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
                      <th>animal</th>
                      <th>lieu de trouvaille</th>
                      <th>date de trouvaille</th>
                      <th>contact</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataPerPage2.map((item) => {
                      const {
                        id,
                        animal, race,
                        image,
                        dateFound,
                        description,
                        placeFound,
                        withReward,
                        phoneNumber
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
                        setFoundDeclarationData({ ...foundDeclarationData, [name]: value });

                      };

                      const handleSubmit = async (e) => {
                        e.preventDefault();
                        try {

                          const response = await axios.put(
                            `http://localhost:2001/foundDeclarations/${id}`,
                            {
                              ...foundDeclarationData,
                              image: imageUrl
                            }
                          );

                          console.log(response.data); 
                          getFoundDeclarations();
                          toast.success("Déclaration de trouvaille modifiée avec succées")
                        } catch (error) {
                          console.error(error);
                          toast.error("Erreur de modification")
                        }
                      };



                      const deleteFoundDeclaration = async (declarationId) => {
                        const response = await fetch(`http://localhost:2001/foundDeclarations/${declarationId}`, {
                          method: "DELETE",
                        })
                        const data = await response.json()
                        console.log(data)
                        setLostDeclarations(lostDeclarations.filter(declaration => declaration.id !== declarationId))
                        toast.success(`declaration de trouvaille ${id} supprimé`);
                      }
                      return (
                        <tr>
                          <td>
                            {id}
                          </td>
                          <td data-label="Image">
                            <img src={image} alt="" />
                          </td>
                          <td data-label="Animal">
                            {animal} {race}
                          </td>
                          <td data-label="lieu de trouvaille">
                            {placeFound}
                          </td>
                          <td data-label="date de trouvaille">
                            {dateFound}
                          </td>
                          <td data-label="contact">{phoneNumber}</td>
                          
                          <div class="modal fade" id={`updateFound-${id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-xl" role="document">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5 class="modal-title"> mis à jour cette déclaration de trouvaille</h5>
                                </div>
                                <div class="modal-body">
                                  <form role="form" method="POST" action="" onSubmit={handleSubmit}
                                    disabled={imageUploading}>
                                    <div class="form-group">
                                      <label class="control-label">animal</label>
                                      <input type="text" class="form-control input-lg" name="animal" defaultValue={animal} onChange={saveData} />
                                    </div>
                                    <div class="form-group">
                                      <label class="control-label">race</label>
                                      <input type="text" class="form-control input-lg" name="race" defaultValue={race} onChange={saveData} />
                                    </div>
                                    <div class="form-group">
                                      <label class="control-label">description</label>
                                      <textarea name="description" rows="5" cols="30" placeholder="description" class="form-control input-lg" defaultValue={description} onChange={saveData}></textarea>
                                    </div>
                                    <div class="form-group">
                                      <label class="control-label">date de trouvaille</label>
                                      <input name="dateFound" type="date" placeholder="date de trouvaille" class="form-control input-lg" defaultValue={dateFound} onChange={saveData} />
                                    </div>
                                    <div class="form-group">
                                      <label class="control-label">lieu de trouvaille</label>
                                      <input name="placeFound" type="text" placeholder="lieu de trouvaille" class="form-control input-lg" defaultValue={placeFound} onChange={saveData} />

                                    </div>

                                    <div class="form-group">
                                      <label class="control-label">contact </label>
                                      <input name="phoneNumber" type="text" placeholder="Contact" class="form-control input-lg" defaultValue={phoneNumber} onChange={saveData} />
                                    </div>

                                    <div class="form-group">
                                      <label class="control-label">image</label>
                                      <div>
                                        <input name="image" type="file" onChange={handleImageSelect} />                  </div>
                                    </div>
                                    <br />


                                    <br />
                                    <div class="form-group">
                                      <div>
                                        <center><button type="submit" class="primary-btn1" data-bs-dismiss="modal">
                                          Enregistrer ces modifications
                                        </button></center>
                                      </div>
                                    </div>

                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>

                          <td data-label="Action">
                            <a  class="btn btn-danger" onClick={() => deleteFoundDeclaration(id)}><i class="bi bi-trash"></i></a>
                            <a  class="btn btn-success p-1.5" data-bs-toggle="modal" data-bs-target={`#updateFound-${id}`}><i class="bi bi-pencil text-black"></i></a>
                          </td>


                        </tr>


                      );

                    })}
                  </tbody>
                </table>
                <div className="paginations-area d-flex justify-content-center">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <li className="page-item" onClick={goToPrevPage2}>
                        <a className="page-link" href="#gestion-declarations">
                          <i className="bi bi-arrow-left-short" />
                        </a>
                      </li>
                      {Array.from({ length: nbPages2 }, (_, i) => i + 1).map((page) => {
                        return (
                          <li className="page-item" key={page}>
                            <a className="page-link" href="#gestion-declarations" onClick={() => setCurrent(page)}>
                              0{page}
                            </a>
                          </li>
                        );
                      })}
                      <li className="page-item" onClick={goToNextPage2}>
                        <a className="page-link" href="#gestion-declarations">
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

export default gestionDeclarations;






















