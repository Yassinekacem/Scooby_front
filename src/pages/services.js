import React from "react";
import Breadcrumb from "../components/breadcrumb/Breadcrumb";
import ServiceCard from "../components/service/ServiceCard";
import Layout from "../layout/Layout";

function services() {
  const [value, setValue] = React.useState(50);
  return (
    <Layout>
      <Breadcrumb pageName="services" pageTitle="services" />
     
              <div className="row g-4 justify-content-center">
                <ServiceCard />
              </div>
              
    </Layout>
  );
}

export default services;
