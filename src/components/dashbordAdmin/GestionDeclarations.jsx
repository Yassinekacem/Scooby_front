

import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"

function gestionDeclarations() {

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

  const [foundDeclarationData, setFoundDeclarationData] = useState({
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

      console.log(response.data); // log the response data for debugging purposes
      // TODO: Redirect to a success page or display a success message to the user
    } catch (error) {
      console.error(error);
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
  const [lostDeclarationData, setLostDeclarationData] = useState({
    animal: "",
    race: "",
    description: "",
    image: "",
    dateLost: "",
    withReward: "",
    placeLost: "",
    phoneNumber: ""
  });
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

      console.log(response.data); // log the response data for debugging purposes
      // TODO: Redirect to a success page or display a success message to the user
    } catch (error) {
      console.error(error);
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

      <div className="cart-section2 pt-120 pb-120" id="gestiondeclaration">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="table-wrapper" style={{ backgroundColor: '#fef5f0' }}>
                <div className="d-flex justify-content-center mb-3">
                  <h1 id="gestion-declarations">gestion des déclarations de perte d'animaux</h1>
                </div>
                <br />
                <div className="d-flex justify-content-center mb-3">
                  <button className="btn btn-adduser" data-bs-toggle="modal" data-bs-target={`#lost`}>Ajouter  déclaration</button>
                </div>
                <div class="modal fade" id={`lost`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg" role="document">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5 class="modal-title"> ajouter une déclarationde perte</h5>
                                </div>
                                <div class="modal-body">
                                  <form role="form" method="POST" action="" onSubmit={handleSubmit1}
                                    disabled={imageUploading}>
                                    <div class="form-group">
                                      <label class="control-label">animal</label>
                                      <input type="text" class="form-control input-lg" name="animal"  onChange={saveData1} />
                                    </div>
                                    <div class="form-group">
                                      <label class="control-label">race</label>
                                      <input type="text" class="form-control input-lg" name="race"  onChange={saveData1} />
                                    </div>
                                    <div class="form-group">
                                      <label class="control-label">description</label>
                                      <textarea name="description" rows="5" cols="30" placeholder="description" class="form-control input-lg"  onChange={saveData1}></textarea>
                                    </div>
                                    <div class="form-group">
                                      <label class="control-label">date de perte</label>
                                      <input name="dateLost" type="date" placeholder="Enter when dateLost" class="form-control input-lg"  onChange={saveData1} />
                                    </div>
                                    <div class="form-group">
                                      <label class="control-label">place de perte</label>
                                      <input name="placeLost" type="text" placeholder="Enter where you Lost" class="form-control input-lg"  onChange={saveData1} />

                                    </div>

                                    <div class="form-group">
                                      <label class="control-label">contact </label>
                                      <input name="phoneNumber" type="text" placeholder="Enter your phone Number" class="form-control input-lg"  onChange={saveData1} />
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

                          console.log(response.data); // log the response data for debugging purposes
                          // TODO: Redirect to a success page or display a success message to the user
                        } catch (error) {
                          console.error(error);
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
                            {animal === "cat" ? "chat" : "chien"} {race}
                          </td>
                          <td data-label="lieu de perte">{placeLost}</td>
                          <td data-label="date de perte">{dateLost}</td>
                          <td data-label="contact">{phoneNumber}</td>
                          <td data-label="avec récompense">{withReward ? "oui" : "non"}</td>

                          <div class="modal fade" id={`detail-${id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg" role="document">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5 class="modal-title"> mis à jour cette annonce</h5>
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
                                      <input name="dateLost" type="date" placeholder="Enter when dateLost" class="form-control input-lg" defaultValue={dateLost} onChange={saveData} />
                                    </div>
                                    <div class="form-group">
                                      <label class="control-label">place de perte</label>
                                      <input name="placeLost" type="text" placeholder="Enter where you Lost" class="form-control input-lg" defaultValue={placeLost} onChange={saveData} />

                                    </div>

                                    <div class="form-group">
                                      <label class="control-label">contact </label>
                                      <input name="phoneNumber" type="text" placeholder="Enter your phone Number" class="form-control input-lg" defaultValue={phoneNumber} onChange={saveData} />
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
                            <a href="#" className="btn btn-danger" onClick={() => deleteLostDeclaration(id)}>
                              <i className="bi bi-trash"></i>
                            </a>
                            <a className="btn btn-success p-1.5" data-bs-toggle="modal" data-bs-target={`#detail-${id}`}>
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

                  <h1>gestion des déclarations de trouveille d'animaux</h1> </div> <br />
                <div className="d-flex justify-content-center mb-3">
                  <button className="btn btn-adduser" data-bs-toggle="modal" data-bs-target={`#found`}>
                    Ajouter  déclaration
                  </button>
                </div>
                <div class="modal fade" id={`found`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg" role="document">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5 class="modal-title"> ajouter une déclaration de trouveille</h5>
                                </div>
                                <div class="modal-body">
                                  <form role="form" method="POST" action="" onSubmit={handleSubmit}
                                    disabled={imageUploading}>
                                    <div class="form-group">
                                      <label class="control-label">animal</label>
                                      <input type="text" class="form-control input-lg" name="animal"  onChange={saveData} />
                                    </div>
                                    <div class="form-group">
                                      <label class="control-label">race</label>
                                      <input type="text" class="form-control input-lg" name="race"  onChange={saveData} />
                                    </div>
                                    <div class="form-group">
                                      <label class="control-label">description</label>
                                      <textarea name="description" rows="5" cols="30" placeholder="description" class="form-control input-lg" onChange={saveData}></textarea>
                                    </div>
                                    <div class="form-group">
                                      <label class="control-label">date de trouveille</label>
                                      <input name="dateFound" type="date" placeholder="date de trouveille" class="form-control input-lg"  onChange={saveData} />
                                    </div>
                                    <div class="form-group">
                                      <label class="control-label">place de trouveille</label>
                                      <input name="placeFound" type="text" placeholder="place de" class="form-control input-lg"  onChange={saveData} />

                                    </div>

                                    <div class="form-group">
                                      <label class="control-label">contact </label>
                                      <input name="phoneNumber" type="text" placeholder="Enter your phone Number" class="form-control input-lg" onChange={saveData} />
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
                      <th>lieu de trouveille</th>
                      <th>date de trouveille</th>
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

                          console.log(response.data); // log the response data for debugging purposes
                          // TODO: Redirect to a success page or display a success message to the user
                        } catch (error) {
                          console.error(error);
                        }
                      };



                      const deleteFoundDeclaration = async (declarationId) => {
                        const response = await fetch(`http://localhost:2001/foundDeclarations/${declarationId}`, {
                          method: "DELETE",
                        })
                        const data = await response.json()
                        console.log(data)
                        setLostDeclarations(lostDeclarations.filter(declaration => declaration.id !== declarationId))
                        toast.success(`declaration de trouveille ${id} supprimé`);
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
                          <td data-label="Place de trouveille">
                            {placeFound}
                          </td>
                          <td data-label="date de trouveille">
                            {dateFound}
                          </td>
                          <td data-label="contact">{phoneNumber}</td>

                          <div class="modal fade" id={`details-${id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-lg" role="document">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5 class="modal-title"> mis à jour cette annonce</h5>
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
                                      <label class="control-label">date de trouveille</label>
                                      <input name="dateFound" type="date" placeholder="date de trouveille" class="form-control input-lg" defaultValue={dateFound} onChange={saveData} />
                                    </div>
                                    <div class="form-group">
                                      <label class="control-label">place de trouveille</label>
                                      <input name="placeFound" type="text" placeholder="place de" class="form-control input-lg" defaultValue={placeFound} onChange={saveData} />

                                    </div>

                                    <div class="form-group">
                                      <label class="control-label">contact </label>
                                      <input name="phoneNumber" type="text" placeholder="Enter your phone Number" class="form-control input-lg" defaultValue={phoneNumber} onChange={saveData} />
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
                            <a  class="btn btn-danger" onClick={() => deleteFoundDeclaration(id)}><i class="bi bi-trash"></i></a>
                            <a  class="btn btn-success p-1.5" data-bs-toggle="modal" data-bs-target={`#details-${id}`}><i class="bi bi-pencil text-black"></i></a>
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






















