import "./Home.css";
import { Header } from "./components/Header";
import { Card } from "./components/Card";
import { CardSkleton } from "./components/CardSkleton";
import { Bookmarks } from "./components/Bookmarks";
import { useEffect, useState } from "react";
import { BookMoreInfo } from "./components/BookMoreInfo";
import PropTypes from "prop-types";
import { BsChevronRight, BsChevronLeft } from "react-icons/bs";
import axios from "axios";

export const Home = ({
  addMarkFunc,
  marksArr,
  removeBookmark,
  setMarkedData,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInfo, setShowInfo] = useState(false);
  const [showInfoId, setShowInfoId] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        await axios
          .get(
            `https://www.googleapis.com/books/v1/volumes?q=${
              search || "search+terms"
            }&startIndex=${currentPage * 6}&maxResults=6`
          )
          .then((req) =>
            setTimeout(() => {
              setPages(req.data.items);
              setLoading(false);
            }, 1500)
          );
      } catch {
        alert("not founded");
      }
    };
    getData();
  }, [currentPage, search]);
  useEffect(() => {
    axios.get().then((req) => setPages(req.data.items));
  }, [search]);
  showInfo ? window.scrollTo(0, 0) : "";
  document.body.style = `overflow:${showInfo ? "hidden" : "visible"}`;

  return (
    <>
      <Header setSearch={setSearch} />
      <section className="home-container">
        <div className="container">
          <div className="cards">
            {loading && <CardSkleton cards={6} />}
            {!loading &&
              pages?.map((item, index) => {
                return (
                  <Card
                    booksData={item}
                    moreInfoId={item.id}
                    key={item.etag}
                    etag={item.etag}
                    id={index * currentPage}
                    setShowInfo={setShowInfo}
                    setShowInfoId={setShowInfoId}
                    setMarked={addMarkFunc}
                    marksArr={marksArr}
                    removeBookmark={removeBookmark}
                  />
                );
              })}
          </div>
          {!loading && pages?.length && (
            <div className="paginate-container">
              <ul>
                <li
                  onClick={() =>
                    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
                  }
                  className={currentPage == 1 ? "disabled" : ""}
                >
                  <BsChevronLeft />
                </li>
                {Array(10)
                  .fill(0)
                  .map((_, index) => {
                    return (
                      <li
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={currentPage == index + 1 ? "active" : ""}
                      >
                        {index + 1}
                      </li>
                    );
                  })}
                <li
                  onClick={() =>
                    setCurrentPage((prev) => (prev < 10 ? prev + 1 : prev))
                  }
                  className={currentPage == 10 ? "disabled" : ""}
                >
                  <BsChevronRight />
                </li>
              </ul>
            </div>
          )}
          {!loading && !pages?.length && (
            <div className="show-empty">
              <p >Nothing to see :(</p>
            </div>
          )}
        </div>
        <Bookmarks
          addMarkFunc={addMarkFunc}
          marksArr={marksArr}
          previewLink={pages?.volumeInfo?.previewLink}
          removeBookmark={removeBookmark}
          setMarkedData={setMarkedData}
        />
      </section>
      {showInfo && (
        <BookMoreInfo showInfoId={showInfoId} setShowInfo={setShowInfo} />
      )}
    </>
  );
};

Home.propTypes = {
  addMarkFunc: PropTypes.func,
  marksArr: PropTypes.array,
  removeBookmark: PropTypes.func,
  setMarkedData: PropTypes.func,
};
