import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";
import Header from "./components/Header";
import api from "./utils/api";
import { useDispatch } from "react-redux";
import { setError, setJobs, setloading } from "./redux/slices/jobSlice";

const App = () => {
  const dispatch = useDispatch();
  // Api den iş verilerini al ve reducere ilet
  useEffect(() => {
    // reducerdeki yüklenme durumunu ayarla
    dispatch(setloading());
    // apiye istek at ve istek başarılı olursa verileri reducer a ilet
    api
      .get("/jobs")
      .then((res) => dispatch(setJobs(res.data)))
      .catch((err) => dispatch(setError(err)));
  }, []);
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
