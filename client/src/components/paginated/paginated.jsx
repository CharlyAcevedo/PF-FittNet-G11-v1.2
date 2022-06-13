import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentPage,
  setPageNumber,
  setCurrentLimit,
} from "../../redux/actions/index";
import leftArrows from "../../asets/icons/leftArrows.svg";
import rightArrows from "../../asets/icons/rightArrows.svg";
import firstPage from "../../asets/icons/firstPage.svg";
import lastPage from "../../asets/icons/lastPage.svg";
import style from "./styles/paginated.module.css";

export default function Paginated() {
  const dispatch = useDispatch();

  const defaultRecipesXPage = useSelector((state) => state.currentLimit);

  const gymsToShow = useSelector((state) => state.gymsToShow);
  const currentPage = useSelector((state) => state.currentPage);

  const [recipesXPage, setRecipesXPage] = useState(defaultRecipesXPage);

  const totalPages = Math.ceil(gymsToShow.length / recipesXPage);

  const limit = currentPage * recipesXPage;
  const offset = limit - recipesXPage;

  useEffect(() => {
    const payload = {
      currentPage: currentPage,
      offset: offset,
      limit: limit,
    };
    dispatch(setCurrentPage(payload)); // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const payload = {
      currentPage: currentPage,
      offset: offset,
      limit: limit,
    };
    dispatch(setCurrentPage(payload));
  }, [dispatch, offset, limit, currentPage]);

  const defaultButtonsPerPage = 6;
  const halfPages = Math.ceil(defaultButtonsPerPage / 2);
  const maxButtons = (() => {
    if (totalPages <= defaultButtonsPerPage) {
      return totalPages;
    } else if (
      currentPage + halfPages <= totalPages &&
      currentPage >= halfPages
    ) {
      return currentPage + halfPages;
    } else if (currentPage < halfPages) {
      return defaultButtonsPerPage;
    } else {
      return totalPages;
    }
  })();

  const initButton = (() => {
    if (totalPages <= defaultButtonsPerPage) {
      return 1;
    } else if (
      currentPage + halfPages <= totalPages &&
      currentPage >= halfPages
    ) {
      return currentPage - halfPages + 1;
    } else if (currentPage < halfPages) {
      return 1;
    } else {
      return totalPages - defaultButtonsPerPage + 1;
    }
  })();

  const pages = [];
  for (let i = initButton; i <= maxButtons; i++) {
    pages.push(i);
  }

  const pagination = (pageNumber) => {
    const payload = {
      currentPage: pageNumber,
      offset: 0,
      limit: recipesXPage,
    };
    dispatch(setCurrentPage(payload));
  };

  const nextPage = () => {
    if (currentPage === totalPages) return;
    if (currentPage < gymsToShow.length) {
      dispatch(setPageNumber(currentPage + 1));
    }
  };
  const prevPage = () => {
    if (currentPage === 1) return;
    if (currentPage !== 1) {
      dispatch(setPageNumber(currentPage - 1));
    }
  };

  const handlelastPage = () => {
    if (currentPage === totalPages) return;
    dispatch(setPageNumber(totalPages));
  };

  const handleFirstPage = () => {
    if (currentPage === 1) return;
    dispatch(setPageNumber(1));
  };

  function handlePageSelect(e) {
    e.preventDefault();
    dispatch(setPageNumber(1));
    dispatch(setCurrentLimit(e.target.value));
    setRecipesXPage(e.target.value);
  }

  return (
    <div className={style.cont}>
      {/* Bloque de info de pag */}
      <section className={style.labelPagOfContainer}>
        <div className={style.labelCurrentPage}>
          Pag: <div className={style.currentPageInput}>{currentPage}</div>
        </div>
        <div className={style.labelCurrentPage}>
          Of: <div className={style.currentPageInput}>{totalPages}</div>
        </div>
      </section>

      {/* Bloque de seleccion de pagina */}
      {/* <ul className={style.paginatedContainer}>
        <li className={style.btnPaginated} onClick={() => handleFirstPage()}>
          <div className={style.btnPrevNext}>
            <img src={firstPage} alt="last Page" />
          </div>
        </li>
        <li className={style.btnPaginated} onClick={() => prevPage()}>
          <div className={style.btnPrevNext}>
            <img src={leftArrows} alt="previous" />
          </div>
        </li>
        <div className={style.btnConteinerNumber}>
          {pages ? (
            pages.map((page, num) => (
              <li className={style.btnPaginatedNumber} key={num}>
                <div
                  className={style.btnNumber}
                  onClick={() => pagination(page)}
                  value={page}
                >
                  {page}
                </div>
              </li>
            ))
          ) : (
            <li></li>
          )}
        </div>
        <li className={style.btnPaginated} onClick={() => nextPage()}>
          <button className={style.btnPrevNext}>
            <img src={rightArrows} alt="next" />
          </button>
        </li>
        <li className={style.btnPaginated} onClick={() => handlelastPage()}>
          <button className={style.btnPrevNext}>
            <img src={lastPage} alt="last Page" />
          </button>
        </li>
      </ul> */}

      {/* Bloque de cantidad de cards por pag */}
      {/* <section className={style.toShowSelector}>
        <label className={style.selectLageLabel}>
          Pages to show:{" "}
          <select
            className={style.selectPage}
            value={recipesXPage}
            onChange={(e) => handlePageSelect(e)}
          >
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
          </select>
        </label>
      </section> */}
      <div>
        <section className={style.toShowSelector}>
          <label className={style.selectLageLabel}>
            Pages to show:{" "}
            <select
              className={style.selectPage}
              value={recipesXPage}
              onChange={(e) => handlePageSelect(e)}
            >
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
          </label>
        </section>
        <div className={style.containerPagination}>
          <ul className={style.paginationPrueba}>
            <li onClick={() => prevPage()} style={{ cursor: "pointer" }}>
              <span>Prev</span>
            </li>
            {pages ? (
              pages.map((page, num) => (
                <li key={num}>
                  <span
                    onClick={() => pagination(page)}
                    style={{ cursor: "pointer" }}
                    value={page}
                  >
                    {page}
                  </span>
                </li>
              ))
            ) : (
              <li style={{ cursor: "pointer" }}></li>
            )}
            <li onClick={() => nextPage()} style={{ cursor: "pointer" }}>
              <span>Next</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
