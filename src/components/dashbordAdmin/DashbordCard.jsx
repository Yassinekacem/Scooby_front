import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import animal from "../../pages/pet/adoptionList";

function DashboardCard() {


  const [users, setUsers] = useState([])
  const getUsers = async () => {
    const response = await fetch("http://localhost:2001/users");
    const data = await response.json();
    setUsers(data)
  };
  useEffect(() => {
    getUsers()
  }, [])

  const [products, setProducts] = useState([])
  const getProducts = async () => {
    const response = await fetch("http://localhost:2001/products");
    const data = await response.json();
    setProducts(data)
  };
  useEffect(() => {
    getProducts()
  }, [])

  const [foundDeclarations, setFoundDeclarations] = useState([])
  const getFoundDeclarations = async () => {
    const response = await fetch("http://localhost:2001/foundDeclarations");
    const data = await response.json();
    setFoundDeclarations(data)
  };
  useEffect(() => {
    getFoundDeclarations()
  }, [])


  const [lostDeclarations, setLostDeclarations] = useState([])
  const getLostDeclarations = async () => {
    const response = await fetch("http://localhost:2001/lostDeclarations");
    const data = await response.json();
    setLostDeclarations(data)
  };
  useEffect(() => {
    getLostDeclarations()
  }, [])

  const [animalAdopt, setAnimalAdopt] = useState([])
  const getAnimals = async () => {
    const response = await fetch("http://localhost:2001/animals/toAdopt");
    const data = await response.json();
    setAnimalAdopt(data)
  };
  useEffect(() => {
    getAnimals()
  }, [])


  const [animalToSell, setAnimalToSell] = useState([])
  const getAnimal = async () => {
    const response = await fetch("http://localhost:2001/animals/toSell");
    const data = await response.json();
    setAnimalToSell(data)
  };
  useEffect(() => {
    getAnimal()
  }, [])
  const items = 8;
  const [current, setCurrent] = useState(1);
  const nbPages = Math.ceil(lostDeclarations.length / items);
  const startIndex = (current - 1) * items;
  const endIndex = startIndex + items;
  const dataPerPage = lostDeclarations.slice(startIndex, endIndex)

  const goToNextPage = () => {
    if (current < nbPages) {
      setCurrent(current + 1);
    }
  };

  const goToPrevPage = () => {
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
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item active">
          <a class="nav-link font-weight-bold" href="#gestionutilisateurs" style={{ fontSize: "20px" }}>Gestion Utilisateurs</a>
        </li>
        <li class="nav-item">
          <a class="nav-link font-weight-bold" href="#gestion-animaux" style={{ fontSize: "20px" }}>Gestion Animaux</a>
        </li>
        <li class="nav-item">
          <a class="nav-link font-weight-bold" href="#gestion-produits" style={{ fontSize: "20px" }}>Gestion Produits</a>
        </li>
        <li class="nav-item">
          <a class="nav-link font-weight-bold" href="#gestion-declarations" style={{ fontSize: "20px" }}>Gestion Déclarations</a>
        </li>
        <li class="nav-item">
          <a class="nav-link font-weight-bold"  style={{ fontSize: "20px" }}>services</a>
        </li>
      </ul>
    </div>
  </div>
</nav>
  








      <div className="cart-section pt-120 pb-120" id="gestionutilisateurs" >
        <div className="container">
          <div className="row">
            <div className="col-12">

              <div  className="table-wrapper" style={{ backgroundColor: '#fef5ff' }}>
                <div className="d-flex justify-content-center mb-3">

                  <h1>gestion des utilisateurs</h1> </div> <br />
                <div className="d-flex justify-content-center mb-3">
                  <button className="btn btn-adduser">
                    Ajouter utilisateur
                  </button>
                </div>
                <table className="eg-table table cart-table">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>PDP</th>
                      <th>Email</th>
                      <th>Nom et prénom</th>
                      <th>Rôle</th>
                      <th>Date de création</th>
                      <th> dernière mise à jour</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((item) => {
                      const {
                        id,
                        firstName,
                        lastName,
                        photo,
                        email,
                        role,
                        createdAt,
                        updatedAt
                      } = item;
                      const deleteUser = async (userId, setUsers, users) => {
                        const response = await fetch(`http://localhost:2001/users/${userId}`, {
                          method: "DELETE",
                        })
                        const data = await response.json()
                        console.log(data)
                        setUsers(users.filter(user => user.id !== userId))
                        toast.success(`Utilisateur ${id} supprimé`);
                      }
                      return (
                        <tr>
                          <td data-label="id">
                            <div className="delete-icon">
                              {id}
                            </div>
                          </td>
                          <td data-label="Image">
                            <img src={photo} alt="" />
                          </td>
                          <td data-label="Food Name">
                            {email}
                          </td>
                          <td data-label="Unite Price">
                            {firstName} {lastName}
                          </td>

                          <td data-label="Discount Price">{role}</td>

                          <td data-label="Food Name">{createdAt}</td>
                          <td data-label="Food Name">{updatedAt}</td>

                          <td data-label="Quantity">
                            <a href="#" class="btn btn-danger" onClick={() => deleteUser(id, setUsers, users)}><i class="bi bi-trash"></i></a>
                            <a href="#" class="btn btn-success p-1.5"><i class="bi bi-pencil text-black"></i></a>
                          </td>


                        </tr>


                      );

                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="cart-section7 pt-120 pb-120" id="gestion-animaux">
        <div className="container">
          <div className="row">
            <div className="col-12">

              <div className="table-wrapper" style={{ backgroundColor: '#fef5f0' }}>
                <div className="d-flex justify-content-center mb-3">

                  <h1>gestion des animaux pour adoption</h1> </div> <br />
                <div className="d-flex justify-content-center mb-3">
                  <button className="btn btn-adduser">
                    Ajouter  animal pour adoption
                  </button>
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
                    {animalAdopt.map((item) => {
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
                          <td data-label="Food Name">
                            {species} {race}
                          </td>
                          <td data-label="Unite Price">
                            {gender}
                          </td>
                          <td data-label="Unite Price">
                            {age}
                          </td>
                          <td data-label="Discount Price">{userId}</td>
                          <td data-label="Quantity">
                            <a href="#" class="btn btn-danger" onClick={() => deleteAnimalAdopt(id)}><i class="bi bi-trash"></i></a>
                            <a href="#" class="btn btn-success p-1.5"><i class="bi bi-pencil text-black"></i></a>
                          </td>


                        </tr>


                      );

                    })}
                  </tbody>
                </table>
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

                  <h1>gestion des animaux à vendre</h1> </div> <br />
                <div className="d-flex justify-content-center mb-3">
                  <button className="btn btn-adduser">
                    Ajouter  animal à vendre
                  </button>
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
                      <th>Supprimer cet animal</th>
                      <th>Editer cet animal</th>

                    </tr>
                  </thead>
                  <tbody>
                    {animalToSell.map((item) => {
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
                          <td data-label="Delete">
                            <div className="delete-icon">
                              {id}
                            </div>
                          </td>
                          <td data-label="Image">
                            <img src={image} alt="" />
                          </td>
                          <td data-label="Food Name">
                            {species} {race}
                          </td>
                          <td data-label="Unite Price">
                            {gender}
                          </td>

                          <td data-label="Discount Price">{age}</td>
                          <td data-label="Discount Price">{price}</td>
                          <td data-label="Quantity">
                            <a href="#" class="btn btn-danger" onClick={() => deleteAnimalSell(id)}><i class="bi bi-trash"></i></a>
                          </td>
                          <td data-label="Subtotal"><a href="#" class="btn btn-success p-1.5"><i class="bi bi-pencil text-black"></i></a>

                          </td>
                        </tr>


                      );

                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div className="cart-section5 pt-120 pb-120" id="gestion-produits">
        <div className="container">
          <div className="row">
            <div className="col-12">

              <div className="table-wrapper"  style={{ backgroundColor: '#fef5f0' }}>
                <div className="d-flex justify-content-center mb-3">

                  <h1>gestion des produits pour animaux</h1> </div> <br />
                <div className="d-flex justify-content-center mb-3">
                  <button className="btn btn-adduser">
                    Ajouter  produit
                  </button>
                </div>
                <table className="eg-table table cart-table">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>image</th>
                      <th>catégorie</th>
                      <th>animal cible</th>
                      <th>marque</th>
                      <th>prix</th>
                      <th>Id utilisateur</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((item) => {
                      const {
                        id,
                        category, brandProduct,
                        image,
                        animalCible,
                        price,
                        userId
                      } = item;
                      const deleteProduct = async (productId) => {
                        const response = await fetch(`http://localhost:2001/products/${productId}`, {
                          method: "DELETE",
                        })
                        const data = await response.json()
                        console.log(data)
                        setProducts(products.filter(product => product.id !== productId))
                        toast.success(`produit ${id} supprimé`);
                      }
                      return (
                        <tr>
                          <td>
                            {id}
                          </td>
                          <td data-label="Image">
                            <img src={image} alt="" />
                          </td>
                          <td data-label="Food Name">
                            {category}
                          </td>
                          <td data-label="Unite Price">
                            {brandProduct}
                          </td>
                          <td data-label="Unite Price">
                            {animalCible}
                          </td>
                          <td data-label="Unite Price">
                            {price}
                          </td>
                          <td data-label="Discount Price">{userId}</td>
                          <td data-label="Quantity">
                            <a href="#" class="btn btn-danger" onClick={() => deleteProduct(id)}><i class="bi bi-trash"></i></a>
                            <a href="#" class="btn btn-success p-1.5"><i class="bi bi-pencil text-black"></i></a>
                          </td>


                        </tr>


                      );

                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>

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
                  <button className="btn btn-adduser">Ajouter  déclaration</button>
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
                    {dataPerPage.map((item) => {
                      const {
                        id,
                        animal,
                        race,
                        image,
                        dateLost,
                        placeLost,
                        withReward,
                        phoneNumber,
                      } = item;
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
                          <td data-label="Food Name">
                            {animal} {race}
                          </td>
                          <td data-label="Unite Price">{placeLost}</td>
                          <td data-label="Unite Price">{dateLost}</td>
                          <td data-label="Discount Price">{phoneNumber}</td>
                          <td data-label="Discount Price">{withReward ? "oui" : "non"}</td>
                          <td data-label="Quantity">
                            <a href="#" className="btn btn-danger" onClick={() => deleteLostDeclaration(id)}>
                              <i className="bi bi-trash"></i>
                            </a>
                            <a href="#" className="btn btn-success p-1.5">
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
                      <li className="page-item" onClick={goToPrevPage}>
                        <a className="page-link" href="#gestion-declarations">
                          <i className="bi bi-arrow-left-short" />
                        </a>
                      </li>
                      {Array.from({ length: nbPages }, (_, i) => i + 1).map((page) => {
                        return (
                          <li className="page-item" key={page}>
                            <a className="page-link" href="#gestion-declarations" onClick={() => setCurrent(page)}>
                              0{page}
                            </a>
                          </li>
                        );
                      })}
                      <li className="page-item" onClick={goToNextPage}>
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
                  <button className="btn btn-adduser">
                    Ajouter  déclaration
                  </button>
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
                    {foundDeclarations.map((item) => {
                      const {
                        id,
                        animal, race,
                        image,
                        dateFound,
                        placeFound,
                        withReward,

                        phoneNumber
                      } = item;
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
                          <td data-label="Food Name">
                            {animal} {race}
                          </td>
                          <td data-label="Unite Price">
                            {placeFound}
                          </td>
                          <td data-label="Unite Price">
                            {dateFound}
                          </td>
                          <td data-label="Discount Price">{phoneNumber}</td>


                          <td data-label="Quantity">
                            <a href="#" class="btn btn-danger" onClick={() => deleteFoundDeclaration(id)}><i class="bi bi-trash"></i></a>
                            <a href="#" class="btn btn-success p-1.5"><i class="bi bi-pencil text-black"></i></a>
                          </td>


                        </tr>


                      );

                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}

export default DashboardCard;
