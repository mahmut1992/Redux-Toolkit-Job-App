import React from "react";
import Input from "./input";
import "./create.scss";
import Select from "./Select";
import { statusOptions, typeOptions } from "../../constants/constant";
import api from "../../utils/api";
import { useDispatch } from "react-redux";
import { createJob } from "../../redux/slices/jobSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Create = () => {
  const navigation = useNavigate();
  // Dispatch ile reducere haber verebilirsin
  const dispatch = useDispatch();
  // Form gönderildiğinde çalışacak fonksiyon
  const handleSubmit = (e) => {
    e.preventDefault();
    // İnputlara FormData ile eriş
    const formData = new FormData(e.target);
    // formData içerisindeki değerleri nesneye çevir
    const jobData = Object.fromEntries(formData.entries());
    // Güncel tarih verisi oluştur ve bunu jobData değişkenine ata
    jobData.date = Date.now();
    // Api ye istek at ve eğer istek başarılı ise reducere haber ver
    api
      .post(`/jobs`, jobData)
      .then((res) => {
        dispatch(createJob(res.data));
        toast.success("Başvuru oluşturuldu");
      })
      .catch((err) => {
        toast.error(`Başvuru sırasında hata oluştu : ${err.message}`);
      });

    // Home sayfasına yönlendir
    navigation("/");
  };
  return (
    <div className="add-page">
      <section className="container">
        {/* title */}
        <h2>Yeni Başvuru ekle</h2>
        {/* Form */}
        <form onSubmit={handleSubmit}>
          <Input label="Pozisyon" name="position" />
          <Input label="Şirket" name="company" />
          <Input label="Lokasyon" name="location" />
          <Select label="Durum" name="status" options={statusOptions} />
          <Select label="Tür" name="type" options={typeOptions} />

          <div className="btn-wrapper">
            <button className="button">Oluştur</button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default Create;
