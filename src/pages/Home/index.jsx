import React from "react";
import { useSelector } from "react-redux";
import Loader from "../../components/Loader";
import Error from "../../components/Error";
import Card from "../Create/Card";
import "./home.scss";
import Filter from "./Filter";

const Home = () => {
  // store abone ol ve jobs verisini consola yazdır
  const { error, İsLoading, jobs } = useSelector((store) => store.jobReducer);

  return (
    <div className="home-page">
      {/* Filter */}
      <Filter />
      {/* Jobs data */}

      {/* Yükleniyorsa Loader hata varsa Error veriler geldiyse Jobs dataları render et */}
      {İsLoading ? (
        <Loader />
      ) : error ? (
        <Error info={error} />
      ) : (
        <div className="card-wrapper">
          {jobs.length === 0 ? (
            <p className="text-warn">Aranılan Başvuru Bulunamadı</p>
          ) : (
            jobs.map((job) => <Card key={job.id} job={job} />)
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
