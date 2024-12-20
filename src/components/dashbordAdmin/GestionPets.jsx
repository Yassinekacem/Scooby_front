import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from "jwt-decode"
import axios from "axios";


function gestionanimals() {
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


  // get all animals to adopt
  const [animalAdopt, setAnimalAdopt] = useState([])
  const getAnimals = async () => {
    const response = await fetch("http://localhost:2001/animals/toAdopt");
    const data = await response.json();
    setAnimalAdopt(data)
  };
  useEffect(() => {
    getAnimals()
  }, [])

  // get all animals to sell 
  const [animalToSell, setAnimalToSell] = useState([])
  const getAnimal = async () => {
    const response = await fetch("http://localhost:2001/animals/toSell");
    const data = await response.json();
    setAnimalToSell(data)
  };
  useEffect(() => {
    getAnimal()
  }, [])

  const [file, setFile] = useState(null)
  const [imageUrl, setImageUrl] = useState("");
  const [imageUploading, setImageUploading] = useState(false);
  // update animals to Sell 
  const [PetData, setPetData] = useState({});
  const initialState = {

    species: "",
    race: "",
    age: 0,
    gender: "",
    name: "",
    dateOfBirth: "",
    description: "",
    status: "toSell",
    price: 0,
    image: "",
    userId: connectedUser,
    isVaccinated: false,
    isEducated: false

  }

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
    if (name === "price" || name === "age") {
      value = parseInt(value); // ou parseFloat(value)
    }

    setPetData({ ...PetData, [name]: value });
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:2001/animals`,
        {
          ...PetData,
          image: imageUrl,
        }
      );

      console.log(response.data);
      getAnimal();
      toast.success("animal ajouté avec succées")
    } catch (error) {
      console.error(error);
      toast.error("Erreur d'ajout")

    }
  };

  useEffect(() => {
    setPetData(initialState)
  }, [connectedUser])


  // update Animal To Adopt
  const [PetData1, setPetData1] = useState({});
  const initialState1 = {
    species: "",
    race: "",
    age: 0,
    gender: "",
    description: "",
    name: "",
    dateOfBirth: "",
    status: "toAdopt",
    price: 0,
    image: "",
    userId: connectedUser,
    isVaccinated: false,
    isEducated: false

  }
  useEffect(() => {
    setPetData1(initialState1)
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
    if (name === "price" || name === "age") {
      value = parseInt(value); // ou parseFloat(value)
    }

    setPetData1({ ...PetData1, [name]: value });
  };




  const handleSubmit1 = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `http://localhost:2001/animals`,
        {
          ...PetData1,
          image: imageUrl,
        }
      );

      console.log(response.data);
      getAnimals();
      toast.success("Animal ajouté avec succées")
    } catch (error) {
      console.error(error);
      toast.error("Erreur d'ajout")

    }
  };









  // pagination lost declarations 
  const items = 5;
  const [current, setCurrent] = useState(1);
  const nbPages1 = Math.ceil(animalAdopt.length / items);
  const nbPages2 = Math.ceil(animalToSell.length / items);

  const startIndex = (current - 1) * items;
  const endIndex = startIndex + items;
  const dataPerPage1 = animalAdopt.slice(startIndex, endIndex)
  const dataPerPage2 = animalToSell.slice(startIndex, endIndex)


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
      {console.log(PetData1)}

      <div className="cart-section7 pt-120 pb-120" id="gestion-animaux">
        <div className="container">
          <div className="row">
            <div className="col-12">

              <div className="table-wrapper" id="gestion-animauxA" style={{ backgroundColor: '#fef5f0' }}>
                <div className="d-flex justify-content-center mb-3">

                  <h1 >Gestion des animaux pour adoption</h1> </div> <br />
                <div className="d-flex justify-content-center mb-3">
                  <button className="btn btn-adduser" data-bs-toggle="modal" data-bs-target={`#adoptAnimal`} >
                    Ajouter  animal pour adoption
                  </button>
                </div>
                <div class="modal fade" id={`adoptAnimal`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-xl" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title"> ajouter un animal pour adoption</h5>
                      </div>
                      <div class="modal-body">
                        <form role="form" method="POST" action="" onSubmit={handleSubmit1}
                          disabled={imageUploading}>
                          <div class="form-group">
                            <label class="control-label">animal</label>
                            <input type="text" class="form-control input-lg" name="species" placeholder="animal pour adoption" onChange={saveData1} />
                          </div>

                          <div class="form-group">
                            <label class="control-label">race</label>
                            <input type="text" class="form-control input-lg" name="race" placeholder="race de l'animal" onChange={saveData1} />
                          </div>
                          <div class="form-group">
                            <label class="control-label">age</label>
                            <input type="number" class="form-control input-lg" name="age" placeholder="age de l'animal" onChange={saveData1} />
                          </div>

                          <div className="col-md-12">
                            <div className="form-group">
                              <label htmlFor="gender">sexe de l'animal  <br /></label>
                              <select
                                className="form-control"
                                id="gender"
                                name="gender"
                                onChange={saveData1}
                              >
                                <option disabled selected hidden value="">sexe</option>
                                <option value="male">male</option>
                                <option value="female">femelle</option>

                              </select>
                              <br />
                            </div>
                          </div>

                          <div class="form-group">
                            <label class="control-label">nom</label>
                            <input type="text" class="form-control input-lg" name="name" placeholder="nom de l'animal" onChange={saveData1} />
                          </div>
                          <div class="form-group">
                            <label class="control-label">date de naissance</label>
                            <input type="date" class="form-control input-lg" name="dateOfBirth" onChange={saveData1} />
                          </div> <br />
                          <div class="form-group">
                            <label class="control-label">description</label>
                            <textarea class="form-control input-lg" name="description" placeholder="description de l'animal" onChange={saveData1} />
                          </div>


                          <div class="form-group">
                            <label class="control-label">image</label>
                            <div>
                              <input name="image" type="file" onChange={handleImageSelect1} />                  </div>
                          </div>
                          <div className="form-group">
                            <div className="form-inner">
                              <label class="control-label">Vacciné ou non ? </label>
                              <input
                                type="checkbox"
                                name="isVaccinated"
                                onChange={(e) =>
                                  setPetData1({
                                    ...PetData1,
                                    isVaccinated: e.target.checked,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="form-inner">
                              <label class="control-label">dressé ou non ?</label>
                              <input
                                type="checkbox"
                                name="isEducated"
                                onChange={(e) =>
                                  setPetData1({
                                    ...PetData1,
                                    isEducated: e.target.checked,
                                  })
                                }
                              />
                            </div>
                          </div>


                          <br />
                          <div class="form-group">
                            <div>
                              <center><button type="submit" class="primary-btn1" data-bs-dismiss="modal">
                                ajouter cet  animal
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
                      <th>sexe</th>
                      <th>age</th>
                      <th>Id utilisateur</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataPerPage1.map((item) => {
                      const {
                        id,
                        species, race,
                        image,
                        age,
                        gender,
                        price,
                        status,
                        isVaccinated,
                        isEducated,
                        userId
                      } = item;
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
                        if (name === "price" || name === "age") {
                          value = parseInt(value); // ou parseFloat(value)
                        }

                        setPetData1({ ...PetData1, [name]: value });
                      };




                      const handleSubmit1 = async (e) => {
                        e.preventDefault();
                        try {
                          const response = await axios.put(
                            `http://localhost:2001/animals/${id}`,
                            {
                              ...PetData1,
                              image: imageUrl,
                            }
                          );

                          console.log(response.data);
                          getAnimals();
                        } catch (error) {
                          console.error(error);
                        }
                      };
                      const deleteAnimalAdopt = async (animalId) => {
                        const response = await fetch(`http://localhost:2001/animals/${animalId}`, {
                          method: "DELETE",
                        })
                        const data = await response.json()
                        console.log(data)
                        setAnimalAdopt(animalAdopt.filter(animal => animal.id !== animalId))
                        toast.success(`animal ${id} supprimé`);

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
                            {species} {race}
                          </td>
                          <td data-label="Sexe">
                            {gender === "female" ? "femelle" : "male"}
                          </td>
                          <td data-label="Agr">
                            {age} ans
                          </td>
                          <td data-label="id utilisateur Price">{userId}</td>

                          <div class="modal fade" id={`exampleModal-${id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-xl" role="document">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5 class="modal-title"> Mis à jour de cet animal</h5>
                                </div>
                                <div class="modal-body">
                                  <form role="form" method="POST" action="" onSubmit={handleSubmit1}
                                    disabled={imageUploading}>
                                    <div class="form-group">
                                      <label class="control-label">animal</label>
                                      <input type="text" class="form-control input-lg" name="species" defaultValue={species} onChange={saveData1} />
                                    </div>
                                    <div class="form-group">
                                      <label class="control-label">race</label>
                                      <input type="text" class="form-control input-lg" name="race" defaultValue={race} onChange={saveData1} />
                                    </div>
                                    <div class="form-group">
                                      <label class="control-label">age</label>
                                      <input type="number" class="form-control input-lg" name="age" defaultValue={age} onChange={saveData1} />
                                    </div>

                                    <div className="col-md-12">
                        <div className="form-group">
                          <label htmlFor="gender">sexe   <br /></label>
                          <select
                            className="form-control"
                            id="gender"
                            name="gender"
                            onChange={saveData1}
                          >
                            <option disabled selected hidden value="">sexe</option>
                            <option value="male">male</option>
                            <option value="female">femelle</option>
                            
                          </select>
                          <br />
                        </div>
                      </div>


                                  

                                    <div class="form-group">
                                      <label class="control-label">image</label>
                                      <div>
                                        <input name="image" type="file" onChange={handleImageSelect1} />                  </div>
                                    </div>
                                    <div class="form-group">
                                      <label class="control-label">nom</label>
                                      <input type="text" class="form-control input-lg" name="name" placeholder="nom de l'animal" onChange={saveData1} />
                                    </div>
                                    <div class="form-group">
                                      <label class="control-label">date de naissance</label>
                                      <input type="date" class="form-control input-lg" name="dateOfBirth" onChange={saveData1} />
                                    </div> <br />
                                    <div class="form-group">
                                      <label class="control-label">description</label>
                                      <textarea class="form-control input-lg" name="description" placeholder="description de l'animal" onChange={saveData1} />
                                    </div>
                                    <div className="form-group">
                                      <div className="form-inner">
                                        <label class="control-label">Vacciné ?</label>
                                        <input
                                          type="checkbox"
                                          name="isVaccinated"
                                          onChange={(e) =>
                                            setPetData1({
                                              ...PetData1,
                                              isVaccinated: e.target.checked,
                                            })
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <div className="form-inner">
                                        <label class="control-label">dressé ?</label>
                                        <input
                                          type="checkbox"
                                          name="isEducated"
                                          onChange={(e) =>
                                            setPetData1({
                                              ...PetData1,
                                              isEducated: e.target.checked,
                                            })
                                          }
                                        />
                                      </div>
                                    </div>


                                    <br />
                                    <div class="form-group">
                                      <div>
                                        <center><button type="submit" class="primary-btn1" data-bs-dismiss="modal">
                                          Enregistrer ces  modifications
                                        </button></center>
                                      </div>
                                    </div>

                                  </form>
                                </div>
                              </div>
                            </div>
                          </div>
                          <td data-label="Action">
                            <a href="#" class="btn btn-danger" onClick={() => deleteAnimalAdopt(id)}><i class="bi bi-trash"></i></a>
                            <a href="#" className="btn btn-success p-1.5" data-bs-toggle="modal" data-bs-target={`#exampleModal-${id}`} > <i class="bi bi-pencil text-black"></i></a>
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
                        <a className="page-link" href="#gestion-animauxA">
                          <i className="bi bi-arrow-left-short" />
                        </a>
                      </li>
                      {Array.from({ length: nbPages1 }, (_, i) => i + 1).map((page) => {
                        return (
                          <li className="page-item" key={page}>
                            <a className="page-link" href="#gestion-animauxA" onClick={() => setCurrent(page)}>
                              0{page}
                            </a>
                          </li>
                        );
                      })}
                      <li className="page-item" onClick={goToNextPage1}>
                        <a className="page-link" href="#gestion-animauxA">
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
      <div className="cart-section6 pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-12">

              <div className="table-wrapper" style={{ backgroundColor: '#fef5f0' }}>
                <div className="d-flex justify-content-center mb-3">

                  <h1 id="gestion-animauxV">Gestion des animaux à vendre</h1> </div> <br />
                <div className="d-flex justify-content-center mb-3">
                  <button className="btn btn-adduser" data-bs-toggle="modal" data-bs-target={`#sellAnimal`} >
                    Ajouter  animal à vendre
                  </button>
                </div>
                <div class="modal fade" id={`sellAnimal`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-xl" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title"> Ajouter un animal à vendre</h5>
                      </div>
                      <div class="modal-body">
                        <form role="form" method="POST" action="" onSubmit={handleSubmit}
                          disabled={imageUploading}>
                          <div class="form-group">
                            <label class="control-label">animal</label>
                            <input type="text" class="form-control input-lg" placeholder="animal à vendre" name="species" onChange={saveData} />
                          </div>
                          <div class="form-group">
                            <label class="control-label">race</label>
                            <input type="text" class="form-control input-lg" placeholder="race de l'animal" name="race" onChange={saveData} />
                          </div>
                          <div class="form-group">
                            <label class="control-label">age</label>
                            <input type="number" class="form-control input-lg" placeholder="age de l'animal" name="age" onChange={saveData} />
                          </div>

                          <div className="col-md-6">
                        <div className="form-group">
                          <label htmlFor="gender">sexe  <br /></label>
                          <select
                            className="form-control"
                            id="gender"
                            name="gender"
                            onChange={saveData}
                          >
                            <option disabled selected hidden value="">sexe</option>
                            <option value="male">male</option>
                            <option value="female">femelle</option>
                            
                          </select>
                          <br />
                        </div>
                      </div>
                          <div class="form-group">
                            <label class="control-label">prix</label>
                            <input name="price" type="number" placeholder="prix de cet animal" class="form-control input-lg" onChange={saveData} />
                          </div>

                          <div class="form-group">
                            <label class="control-label">nom animal</label>
                            <input type="text" class="form-control input-lg" name="name" placeholder="nom de l'animal" onChange={saveData} />
                          </div>
                          <div class="form-group">
                            <label class="control-label">date de naissance</label>
                            <input type="date" class="form-control input-lg" name="dateOfBirth" onChange={saveData} />
                          </div> <br />
                          <div class="form-group">
                            <label class="control-label">description</label>
                            <textarea class="form-control input-lg" name="description" placeholder="description de l'animal" onChange={saveData} />
                          </div>

                          <div class="form-group">
                            <label class="control-label">image</label>
                            <div>
                              <input name="image" type="file" onChange={handleImageSelect} />                  </div>
                          </div>

                          <div className="form-group">
                            <div className="form-inner">
                              <label class="control-label">Vacciné ? </label>
                              <input
                                type="checkbox"
                                name="isVaccinated"
                                onChange={(e) =>
                                  setPetData({
                                    ...PetData,
                                    isVaccinated: e.target.checked,
                                  })
                                }
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="form-inner">
                              <label class="control-label">Dressé ?</label>
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


                          <br />
                          <div class="form-group">
                            <div>
                              <center><button type="submit" class="primary-btn1" data-bs-dismiss="modal">
                                ajouter cet  animal
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
                      <th>sexe</th>
                      <th>age</th>
                      <th>prix</th>
                      <th>Action </th>

                    </tr>
                  </thead>
                  <tbody>
                    {dataPerPage2.map((item) => {
                      const {
                        id,
                        species, race,
                        image,
                        age,
                        gender,
                        price,
                        status,
                        isVaccinated,
                        isEducated,
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
                        if (name === "price" || name === "age") {
                          value = parseInt(value); // ou parseFloat(value)
                        }

                        setPetData({ ...PetData, [name]: value });
                      };




                      const handleSubmit = async (e) => {
                        e.preventDefault();
                        try {
                          const response = await axios.put(
                            `http://localhost:2001/animals/${id}`,
                            {
                              ...PetData,
                              image: imageUrl,
                            }
                          );

                          console.log(response.data);
                          toast.success("animal modifié avec succées")
                          getAnimal();
                        } catch (error) {
                          console.error(error);
                          toast.error("Erreur de modification")

                        }
                      };

                      const deleteAnimalSell = async (animalId) => {
                        const response = await fetch(`http://localhost:2001/animals/${animalId}`, {
                          method: "DELETE",
                        })
                        const data = await response.json()
                        console.log(data)
                        setAnimalToSell(animalToSell.filter(animal => animal.id !== animalId))
                        toast.success(`animal ${id} supprimé`);
                      }


                      return (
                        <tr>
                          <td data-label="id">
                            <div>
                              {id}
                            </div>
                          </td>
                          <td data-label="Image">
                            <img src={image} alt="" />
                          </td>
                          <td data-label="Animal">
                            {species} {race}
                          </td>
                          <td data-label="sexe">
                            {gender === "female" ? "femelle" : "male"}
                          </td>

                          <td data-label="Age">{age} ans</td>
                          <td data-label="Prix">{price} TND</td>



                          <div class="modal fade" id={`exempleModal-${id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-xl" role="document">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5 class="modal-title"> Mis à jour cet animal</h5>
                                </div>
                                <div class="modal-body">
                                  <form role="form" method="POST" action="" onSubmit={handleSubmit}
                                    disabled={imageUploading}>
                                    <div class="form-group">
                                      <label class="control-label">animal</label>
                                      <input type="text" class="form-control input-lg" name="species" defaultValue={species} onChange={saveData} />
                                    </div>
                                    <div class="form-group">
                                      <label class="control-label">race</label>
                                      <input type="text" class="form-control input-lg" name="race" defaultValue={race} onChange={saveData} />
                                    </div>
                                    <div class="form-group">
                                      <label class="control-label">age</label>
                                      <input type="number" class="form-control input-lg" name="age" defaultValue={age} onChange={saveData} />
                                    </div>

                                    <div className="col-md-12">
                                      <div className="form-group">
                                        <label htmlFor="gender">sexe  <br /></label>
                                        <select
                                          className="form-control"
                                          id="gender"
                                          name="gender"
                                          onChange={saveData}
                                        >
                                          <option disabled selected hidden value="">sexe</option>
                                          <option value="male">male</option>
                                          <option value="female">femelle</option>

                                        </select>
                                        <br />
                                      </div>
                                    </div>
                                    <div class="form-group">
                                      <label class="control-label">prix</label>
                                      <input name="price" type="number" placeholder="Enter the price of your animal" class="form-control input-lg" defaultValue={price} onChange={saveData} />
                                    </div>

                                    <div class="form-group">
                                      <label class="control-label">image</label>
                                      <div>
                                        <input name="image" type="file" onChange={handleImageSelect} />                  </div>
                                    </div>

                                    <div class="form-group">
                                      <label class="control-label">nom</label>
                                      <input type="text" class="form-control input-lg" name="name" placeholder="nom de l'animal" onChange={saveData} />
                                    </div>
                                    <div class="form-group">
                                      <label class="control-label">date de naissance</label>
                                      <input type="date" class="form-control input-lg" name="dateOfBirth" onChange={saveData} />
                                    </div> <br />
                                    <div class="form-group">
                                      <label class="control-label">description</label>
                                      <textarea class="form-control input-lg" name="description" placeholder="description de l'animal" onChange={saveData} />
                                    </div>
                                    <div className="form-group">
                                      <div className="form-inner">
                                        <label class="control-label">Vacciné ? </label>
                                        <input
                                          type="checkbox"
                                          name="isVaccinated"
                                          onChange={(e) =>
                                            setPetData({
                                              ...PetData,
                                              isVaccinated: e.target.checked,
                                            })
                                          }
                                        />
                                      </div>
                                    </div>
                                    <div className="form-group">
                                      <div className="form-inner">
                                        <label class="control-label">Dressé ?</label>
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
                            <a href="#" className="btn btn-danger" onClick={() => deleteAnimalSell(id)} ><i class="bi bi-trash"></i></a>
                            <a href="#" className="btn btn-success p-1.5" data-bs-toggle="modal" data-bs-target={`#exempleModal-${id}`} > <i class="bi bi-pencil text-black"></i></a>

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
                        <a className="page-link" href="#gestion-animauxV">
                          <i className="bi bi-arrow-left-short" />
                        </a>
                      </li>
                      {Array.from({ length: nbPages2 }, (_, i) => i + 1).map((page) => {
                        return (
                          <li className="page-item" key={page}>
                            <a className="page-link" href="#gestion-animauxV" onClick={() => setCurrent(page)}>
                              0{page}
                            </a>
                          </li>
                        );
                      })}
                      <li className="page-item" onClick={goToNextPage2}>
                        <a className="page-link" href="#gestion-animauxV">
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

export default gestionanimals;
