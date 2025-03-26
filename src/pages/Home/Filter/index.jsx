import React, { useEffect, useState } from "react";
import "../../Create/create.scss";
import Input from "../../Create/input";
import Select from "../../Create/Select";
import {
  sortOptions,
  statusOptions,
  typeOptions,
} from "../../../constants/constant";
import api from "../../../utils/api";
import { useDispatch } from "react-redux";
import { setJobs } from "../../../redux/slices/jobSlice";

const Filter = () => {
  const dispatch = useDispatch();
  const [text, setText] = useState();
  const [status, setStatus] = useState();
  const [type, setType] = useState();
  const [sort, setSort] = useState();
  const [debouncedText, setDebouncedText] = useState();
  // text e debounce uygula
  useEffect(() => {
    // text undefined ise fonksiyonu bitir
    if (text === undefined) return;
    // her tuş basışında bir saayaç başlatacam
    const id = setTimeout(() => {
      setDebouncedText(text);
    }, 1000);
    // Eğer süre bitmeden useEffect tekrar çalışırsa yani kullanıcı 3 sn geçmeden tekrar tuşa basarsa önceki sayacı durdurmam lazım.
    return () => clearTimeout(id);
  }, [text]);

  useEffect(() => {
    const params = {
      q: debouncedText,
      status,
      type,
      _sort: sort === "a-z" || sort === "z-a" ? "company" : "date",
      _order: sort === "a-z" || sort === "En Yeni" ? "asc" : "desc",
    };
    api
      .get("/jobs", { params })
      .then((res) => {
        // gelen cevabı reducere haber ver ki state güncellensin
        dispatch(setJobs(res.data));
      })
      .catch((err) => console.log(err));
  }, [debouncedText, status, type, sort]);
  const handleReset = (e) => {
    setDebouncedText();
    setText();
    setType();
    setSort();
    setStatus();
  };
  return (
    <div className="filter-sec">
      <h2>Filtreleme Formu</h2>
      <form>
        <Input label="Ara" handleChange={(e) => setText(e.target.value)} />
        <Select
          label="Durum"
          options={statusOptions}
          handleChange={(e) => setStatus(e.target.value)}
        />
        <Select
          label="Tür"
          options={typeOptions}
          handleChange={(e) => setType(e.target.value)}
        />
        <Select
          label="Sırala"
          options={sortOptions}
          handleChange={(e) => setSort(e.target.value)}
        />

        <button onClick={handleReset} className="button" type="reset">
          Fitlreleri Sıfırla
        </button>
      </form>
    </div>
  );
};

export default Filter;
