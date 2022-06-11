import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./styles/Search.module.css";
import {  getSearch } from "../../redux/actions";


export default function Sarch() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");

  function handleInput(e) {
    e.preventDefault();
    setSearch(e.target.value);
    console.log(e.target.value);
    dispatch(getSearch(e.target.value));
  }


  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBox}>
        <input
          className={styles.searchImp}
          type="text"
          placeholder="Buscar..."
          onChange={(e) => handleInput(e)}
        />
      
      </div>
    </div>
  );
}

