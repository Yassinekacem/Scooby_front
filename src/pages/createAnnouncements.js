import React, { useState } from "react";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import Layout from "../layout/Layout";

function createAnnouncement() {
  const [AnnouncementData, setAnnouncementData] = useState({
    type: "",
    description: "",
    animalCible : "",
    city: "",
    userId :0 ,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
      const response = await fetch("http://localhost:2000/announcements", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(AnnouncementData),
      });
      const json = await response.json();
      if (!response.ok) {
        console.log(json)

      }
      if (response.ok) {
        console.log(json)
      }
  
  };


  const saveData = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "userId") {
      value = parseInt(value); // ou parseFloat(value)
    }
    setAnnouncementData({ ...AnnouncementData, [name]: value });
  };
  return (
    <>
    {console.log(AnnouncementData)}
      <Layout>
        <Breadcrumb pageName="Add Announcement" pageTitle="Add Announcement" />
        <div className="createAnnouncement-section pt-120 pb-120">
          <div className="container">
            <div className="row d-flex justify-content-center">
              <div className="col-xl-6 col-lg-8 col-md-10">
                <div
                  className="form-wrapper wow fadeInUp"
                  data-wow-duration="1.5s"
                  data-wow-delay=".2s"
                >
                  <div className="form-title">
                    <h3> Add your service</h3>
                  </div>
                  <form className="w-100" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="form-inner">
                          <label>type </label>
                          <input name="type" type="text" placeholder="type of announcement" onChange={saveData} />
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="form-inner">
                            <label>Description:</label>
                            <textarea name="description" rows="5" cols="30" placeholder="Description" onChange={saveData}></textarea>
                        </div>
                        </div>

                      <div className="col-md-6">
                        <div className="form-inner">
                          <label> animalCible </label>
                          <input name = "animalCible"type="text" placeholder="enter your animalCible"  onChange={saveData}/>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-inner">
                          <label>Enter Your city </label>
                          <input name ="city" type="text" placeholder="Enter Your city"  onChange={saveData}/>
                        </div>
                      </div>
                      <div className="col-md-12">
                        <div className="form-inner">
                          <label>Enter Your id </label>
                          <input name ="userId" type="number" placeholder="Enter Your ID"  onChange={saveData}/>
                        </div>
                      </div>
                      <div className="col-md-12">
 
</div>

                    
                    </div>
                    <button className="account-btn">Add announcement</button>
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
export default createAnnouncement; 

