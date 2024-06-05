import axios from "axios";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const BookMoreInfo = ({ showInfoId, setShowInfo }) => {
  const [data, setData] = useState({});
  useEffect(() => {
    axios
      .get(`https://www.googleapis.com/books/v1/volumes/${showInfoId}`)
      .then((req) => setData(req.data));
  }, []);

  return (
    <>
      {
        <section
          className="bookmoreinfo"
          onClick={(e) =>
            e.target == e.currentTarget ? setShowInfo(false) : ""
          }
        >
          <div className="bookmoreinfo-container" key={data?.etag}>
            <div className="bookmoreinfo-title">
              <h2>{data.volumeInfo?.title}</h2>
              <img
                src="./assets/icons/cross.svg"
                alt="cross svg"
                onClick={() => setShowInfo(false)}
              />
            </div>
            <img
              src={
                data.volumeInfo?.imageLinks?.thumbnail
                  ? data.volumeInfo?.imageLinks?.thumbnail
                  : "./assets/no-img.png"
              }
              alt="book img"
              className="card-img"
            />
            <p
              className="desc"
              dangerouslySetInnerHTML={{
                __html:
                  data.volumeInfo?.description?.length > 1000
                    ? data.volumeInfo?.description?.slice(0, 1000) + "..."
                    : data.volumeInfo?.description,
              }}
            ></p>
            <ul>
              <li>
                <p>Author: </p>
                {data.volumeInfo?.authors?.map((item, index) => {
                  return <span key={index}>{item}</span>;
                })}
              </li>
              <li>
                <p>Published: </p>
                <span>{data.volumeInfo?.publishedDate?.slice(0, 4)}</span>
              </li>
              <li>
                <p>Publishers: </p>
                <span>{data.volumeInfo?.publisher}</span>
              </li>
              <li>
                <p>Categories: </p>
                {data.volumeInfo?.categories?.map((item) => {
                  return item.split(" / ").map((res, index) => {
                    return <span key={index}>{res} </span>;
                  });
                })}
              </li>
              <li>
                <p>Pages Count:</p>
                <span>{data.volumeInfo?.pageCount}</span>
              </li>
            </ul>
            <Link to={data?.volumeInfo?.previewLink} target="_blank">
              <button className="read-btn" title="download e-book">
                Read
              </button>
            </Link>
          </div>
        </section>
      }
    </>
  );
};

BookMoreInfo.propTypes = {
  showInfoId: PropTypes.string,
  setShowInfo: PropTypes.func,
};
