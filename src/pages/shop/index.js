import React, { useState, useEffect } from "react"
import ShopCard from "../../components/shop/ShopCard"
import Breadcrumb from "../../components/breadcrumb/Breadcrumb"
import Layout from "../../layout/Layout"
import Link from "next/link"
import jwtDecode from "jwt-decode"

function productList() {
  const [connectedUser, setConnectedUser] = useState('')
  const getConnectedUserData = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setConnectedUser(decodedToken.userRole);
    }
  };
  useEffect(() => {
    getConnectedUserData()
  }, [])

  const [isCatChecked, setIsCatChecked] = useState(false);
  const [isDogChecked, setIsDogChecked] = useState(false);
  const [isBirdChecked, setIsBirdChecked] = useState(false);

  const [isFoodChecked, setIsFoodChecked] = useState(false);
  const [isAccessoryChecked, setIsAccessoryChecked] = useState(false);


  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const response = await fetch("http://localhost:2001/products");
    const data = await response.json();
    setProducts(data);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleCatChanged = (event) => {
    setIsCatChecked(event.target.checked);
  };
  const handleFoodChanged = (event) => {
    setIsFoodChecked(event.target.checked);
  };
  const handleAccessoryChanged = (event) => {
    setIsAccessoryChecked(event.target.checked);
  };

  const handleDogChanged = (event) => {
    setIsDogChecked(event.target.checked);
  };
  const handleBirdChanged = (event) => {
    setIsBirdChecked(event.target.checked);
  };
  const filtredProducts = products.filter((product) => {
    let showProduct = true;

    if (isCatChecked && product.animalCible !== "cat") {
      showProduct = false;
    } else if (isDogChecked && product.animalCible !== "dog") {
      showProduct = false;
    } else if (isBirdChecked && product.animalCible !== "bird") {
      showProduct = false;
    }

    if (isFoodChecked && product.category !== "food") {
      showProduct = false;
    } else if (isAccessoryChecked && product.category !== "accessory") {
      showProduct = false;
    }

    return showProduct;
  });

  // pagination 
  const items = 8;
  const [current, setCurrent] = useState(1);
  const nbPages = Math.ceil(filtredProducts.length / items);
  const startIndex = (current - 1) * items;
  const endIndex = startIndex + items;
  const dataPerPage = filtredProducts.slice(startIndex, endIndex)

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
    <Layout>
      {console.log(products)}
      <Breadcrumb pageName="liste des produits" pageTitle="liste des produits" />
      <div className="shop-page pt-120 mb-120">
        <div className="container">
          <div className="row">
            <div className="col-lg-3">
              <div className="shop-sidebar">
                <div className="shop-widget">
                  <div className="check-box-item">
                    <h5 className="shop-widget-title">animal</h5>
                    <div className="checkbox-container">
                      <label className="containerss">
                        chat
                        <input type="checkbox" checked={isCatChecked}
                          onChange={handleCatChanged} />
                        <span className="checkmark"></span>
                      </label>
                      <label className="containerss">
                        chien
                        <input type="checkbox" checked={isDogChecked}
                          onChange={handleDogChanged} />
                        <span className="checkmark"></span>
                      </label>
                      <label className="containerss">
                        oiseau
                        <input type="checkbox" checked={isBirdChecked}
                          onChange={handleBirdChanged} />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="shop-widget">
                  <div className="check-box-item">
                    <h5 className="shop-widget-title">Catégorie</h5>
                    <div className="checkbox-container">
                      <label className="containerss">
                        nourritures
                        <input type="checkbox" checked={isFoodChecked}
                          onChange={handleFoodChanged} />
                        <span className="checkmark"></span>
                      </label>
                      <label className="containerss">
                        accessoires
                        <input type="checkbox" checked={isAccessoryChecked}
                          onChange={handleAccessoryChanged} />
                        <span className="checkmark"></span>
                      </label>

                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div className="col-lg-9">
              <div className="row mb-50">
                <div className="col-lg-12">
                  <div className="multiselect-bar">
                    <h6>liste des produits </h6>
                    { (connectedUser=== "petShop" || connectedUser==="admin") ? (<div className="multiselect-area">
                      Vous voulez vendre votre article ? cliquez ici :
                      <div className="single-select two">

                        <Link legacyBehavior href={`shop/createProducts`}>
                          <button className="primary-btn0">vendre mon article
                          </button>
                        </Link>
                      </div>
                    </div>) : (<div></div>)}
                  </div>
                </div>
              </div>
              <div className="row">
                {dataPerPage.map((item, index) =>
                  <ShopCard item={item} key={index} />
                )}
              </div>
              <div className="row pt-70">
                <div className="col-lg-12 d-flex justify-content-center">
                  <div className="paginations-area">
                    <nav aria-label="Page navigation example">
                      <ul className="pagination">
                        <li className="page-item" onClick={goToPrevPage}>
                          <a className="page-link" href="#">
                            <i className="bi bi-arrow-left-short" />
                          </a>
                        </li>
                        {Array.from({ length: nbPages }, (_, i) => i + 1).map(page => {
                          return <li className="page-item">
                            <a className="page-link" href="#" onClick={() => setCurrent(page)}>
                              0{page}
                            </a>
                          </li>
                        })}


                        <li className="page-item" onClick={goToNextPage}>
                          <a className="page-link" href="#">
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
      </div>
    </Layout>
  );
}

export default productList;






