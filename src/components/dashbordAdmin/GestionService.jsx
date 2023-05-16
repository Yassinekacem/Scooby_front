import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
function gestionServices() {


  const [announcements, setAnnouncements] = useState([])
  const getAnnouncements = async () => {
    const response = await fetch("http://localhost:2001/announcements");
    const data = await response.json();
    setAnnouncements(data)

  };
  useEffect(() => {
    getAnnouncements()
  }, [])

//   const [file, setFile] = useState(null)
//   const [imageUrl, setImageUrl] = useState("");
//   const [imageUploading, setImageUploading] = useState(false);
//   const now = new Date();
//   const formattedDate = now.toLocaleString("fr-FR"); // formatte la date en jj/mm/aaaa hh:mm
//   const [userData, setUserData] = useState({
//     firstName: "",
//     lastName: "",
//     role: "",
//     email: "",
//     password: "",
//     photo: "",
//     phoneNumber: "",
//     createdAt: formattedDate,
//     updatedAt: formattedDate,
//   });
//   const handleImageSelect1 = async (e) => {
//     setFile(e.target.files[0]);
//     setImageUploading(true);
//     try {
//       const form = new FormData();
//       form.append("file", e.target.files[0])
//       form.append("upload_preset", "yassinekacem")
//       const result = await axios.post(
//         "https://api.cloudinary.com/v1_1/dxurewunb/upload",
//         form
//       );
//       setImageUrl(result.data.secure_url);
//       setImageUploading(false);
//     } catch (error) {
//       console.error(error);
//     }
//   }
//   const saveData1 = (e) => {
//     let name = e.target.name;
//     let value = e.target.value;
//     setUserData({ ...userData, [name]: value });
//   };
//   const handleSubmit1 = async () => {
//     // e.preventDefault();
//     try {
//       const response = await axios.post(
//         `http://localhost:2001/auth/signUp`,
//         {
//           ...userData,
//           photo: imageUrl
//         }
//       );
//       console.log(response.data);
//       toast.success(`utilisateur ajouté avec succées`)

//     } catch (error) {
//       console.error(error);
//     }
//   };







//   // pagination lost declarations 
//   const items = 5;
//   const [current, setCurrent] = useState(1);
//   const nbPages = Math.ceil(users.length / items);
//   const startIndex = (current - 1) * items;
//   const endIndex = startIndex + items;
//   const dataPerPage = users.slice(startIndex, endIndex)

//   const goToNextPage = () => {
//     if (current < nbPages) {
//       setCurrent(current + 1);
//     }
//   };

//   const goToPrevPage = () => {
//     if (current > 1) {
//       setCurrent(current - 1);
//     }
//   };

  const deleteAnnouncement = async (userId, setUsers, users) => {
    const response = await fetch(`http://localhost:2001/announcements/${announcementID}`, {
      method: "DELETE",
    })
    const data = await response.json()
    console.log(data)
    setAnnouncements(announcements.filter(announcement => announcement.id !== announcementID))
    toast.success(`annonce de service ${id} supprimé`);
  }



  return (
    <>

      {console.log(announcements)}
      <ToastContainer
        position="top-center"
        autoClose={100}
      />


<div id="gestion-services"></div><div ></div>
      <div className="cart-section pt-120 pb-120"   >
        <div className="container">
          <div className="row">
            <div className="col-12">

              <div className="table-wrapper" style={{ backgroundColor: '#fef5ff' }}>
                <div className="d-flex justify-content-center mb-3">

                  <h1 >gestion des services pour animaux</h1> </div> <br />
                <div className="d-flex justify-content-center mb-3">
                  <button className="btn btn-adduser" data-bs-toggle="modal" data-bs-target={`#exampleModal`} >
                    Ajouter  service
                  </button>
                </div>
                
                {/* <div class="modal fade" id={`exampleModal`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title">ajout d'un nouvel utilisateur</h5>
                      </div>
                      <div class="modal-body">
                        <form role="form" method="POST" action=""
                          onSubmit={handleSubmit1}
                          disabled={imageUploading}
                        >
                          <div class="form-group">
                            <label class="control-label">nom </label>
                            <input type="text" class="form-control input-lg" name="firstName" onChange={saveData1}  />
                          </div>
                          <div class="form-group">
                            <label class="control-label">prénom</label>
                            <input type="text" class="form-control input-lg" name="lastName" onChange={saveData1}  />
                          </div>

                          <div class="form-group">
                            <label class="control-label">email</label>
                            <input name="email" type="text" class="form-control input-lg"  onChange={saveData1} />
                          </div>
                          <div class="form-group">
                            <label class="control-label">password </label>
                            <input name="password" type="text" onChange={saveData1} class="form-control input-lg" />
                          </div>
                          <div class="form-group">
                            <label class="control-label">numero de telephone </label>
                            <input name="phoneNumber" type="text" onChange={saveData1} class="form-control input-lg" />
                          </div>
                          <div class="form-group">
                            <label class="control-label">rôle</label>
                            <input name="role" type="text"  class="form-control input-lg" onChange={saveData1} />

                          </div>



                          <div class="form-group">
                            <label class="control-label">image</label>
                            <div>
                              <input name="photo" type="file" onChange={handleImageSelect1} />
                            </div>
                          </div>


                          <br />
                          <div class="form-group">
                            <div>
                              <center><button type="submit" class="primary-btn1" data-bs-dismiss="modal">
                                Ajouter Utilisateur
                              </button></center>
                            </div>
                          </div>

                        </form>
                      </div>
                    </div>
                  </div>
                </div> */}
                <table className="eg-table table cart-table">
                  <thead>
                    <tr>
                      <th>Id</th>
                      <th>photo</th>
                      <th>Nom prestataire</th>
                      <th>nature service</th>
                      <th>gouvernement</th>
                      <th>Ville</th>
                      <th> action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {announcements.map((item) => {
                      const {
                        id,
                        firstName,
                        lastName,
                        type,
                        image,
                        ville,
                        experience,
                        city,
                        userId
                      } = item;
                    //   const handleImageSelect = async (e) => {
                    //     setFile(e.target.files[0]);
                    //     setImageUploading(true);
                    //     try {
                    //       const form = new FormData();
                    //       form.append("file", e.target.files[0])
                    //       form.append("upload_preset", "yassinekacem")
                    //       const result = await axios.post(
                    //         "https://api.cloudinary.com/v1_1/dxurewunb/upload",
                    //         form
                    //       );
                    //       setImageUrl(result.data.secure_url);
                    //       setImageUploading(false);
                    //     } catch (error) {
                    //       console.error(error);
                    //     }
                    //   }
                    //   const saveData = (e) => {
                    //     let name = e.target.name;
                    //     let value = e.target.value;
                    //     setUserData({ ...userData, [name]: value });
                    //   };
                    //   const handleSubmit = async () => {
                    //     // e.preventDefault();
                    //     try {
                    //       const response = await axios.put(
                    //         `http://localhost:2001/auth/${id}`,
                    //         {
                    //           ...userData,
                    //           photo: imageUrl
                    //         }
                    //       );
                    //       console.log(response.data);
                    //       toast.success(`utilisateur ${id} édité avec succées`)

                    //     } catch (error) {
                    //       console.error(error);
                    //     }
                    //   };
                      return (
                        <tr>
                          <td data-label="ID">
                            <div className="delete-icon">
                              {id}
                            </div>
                          </td>
                          <td data-label="Image">
                            {image.length > 0 ? (<img src={image} alt="" />) : (<img src="assets/images/bg/team/unkown.png" alt="" />)}
                          </td>
                          <td data-label="Nom et pénom">
                            {firstName} {lastName}
                          </td>

                          <td data-label="statut">{type}</td>

                          <td data-label="date de création">{city}</td>
                          <td data-label="dernière mise à jour">{ville}</td>



                          {/* <div class="modal fade" id={`exampleModal-${id}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog modal-xl" role="document">
                              <div class="modal-content">
                                <div class="modal-header">
                                  <h5 class="modal-title"> mis à jour cette annonce</h5>
                                </div>
                                <div class="modal-body">
                                  <form role="form" method="POST" action=""
                                    onSubmit={handleSubmit}
                                    disabled={imageUploading}
                                  >
                                    <div class="form-group">
                                      <label class="control-label">nom </label>
                                      <input type="text" class="form-control input-lg" name="firstName" onChange={saveData} defaultValue={lastName} />
                                    </div>
                                    <div class="form-group">
                                      <label class="control-label">prénom</label>
                                      <input type="text" class="form-control input-lg" name="lastName" onChange={saveData} defaultValue={lastName} />
                                    </div>

                                    <div class="form-group">
                                      <label class="control-label">email</label>
                                      <input name="email" type="text" class="form-control input-lg" defaultValue={email} onChange={saveData} />
                                    </div>
                                    <div class="form-group">
                                      <label class="control-label">password </label>
                                      <input name="password" type="text" onChange={saveData} class="form-control input-lg" />
                                    </div>
                                    <div class="form-group">
                                      <label class="control-label">numero de telephone </label>
                                      <input name="phoneNumber" type="text" onChange={saveData} class="form-control input-lg" />
                                    </div>
                                    <div class="form-group">
                                      <label class="control-label">rôle</label>
                                      <input name="role" type="text" defaultValue={role} class="form-control input-lg" onChange={saveData} />

                                    </div>



                                    <div class="form-group">
                                      <label class="control-label">image</label>
                                      <div>
                                        <input name="photo" type="file" onChange={handleImageSelect} />
                                      </div>
                                    </div>


                                    <br />
                                    <div class="form-group">
                                      <div>
                                        <center><button type="submit" class="primary-btn1" data-bs-dismiss="modal" onClick={handleSubmit}>
                                          enregistrer ces modifications
                                        </button></center>
                                      </div>
                                    </div>

                                  </form>
                                </div>
                              </div>
                            </div>
                          </div> */}


                          <td data-label="Action">
                            <a href="#" className="btn btn-danger" ><i class="bi bi-trash"></i></a>
                            <a href="#" className="btn btn-success p-1.5" > <i class="bi bi-pencil text-black"></i></a>
                          </td>


                        </tr>


                      );

                    }
                    )

                    }
                  </tbody>
                </table>
                {/* <div className="paginations-area d-flex justify-content-center">
                  <nav aria-label="Page navigation example">
                    <ul className="pagination">
                      <li className="page-item" onClick={goToPrevPage}>
                        <a className="page-link" href="ggestionServices">
                          <i className="bi bi-arrow-left-short" />
                        </a>
                      </li>
                      {Array.from({ length: nbPages }, (_, i) => i + 1).map((page) => {
                        return (
                          <li className="page-item" key={page}>
                            <a className="page-link" href="ggestionServices" onClick={() => setCurrent(page)}>
                              0{page}
                            </a>
                          </li>
                        );
                      })}
                      <li className="page-item" onClick={goToNextPage}>
                        <a className="page-link" href="#gestionServices">
                          <i className="bi bi-arrow-right-short" />
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div> */}
              </div>
            </div>
          </div>

        </div>
      </div>

    </>

  );
}

export default gestionServices;