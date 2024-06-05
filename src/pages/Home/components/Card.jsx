import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
export const Card = ({
  booksData,
  setShowInfo,
  setShowInfoId,
  id,
  marksArr,
  setMarked,
  moreInfoId,
  removeBookmark,
}) => {
  const { imageLinks, authors, title, publishedDate } = booksData.volumeInfo;
  const [isMarked, setIsMarked] = useState(false);
  useEffect(() => {
    setIsMarked(marksArr?.find((e) => e.title === title));
  }, [marksArr]);

  return (
    <div className="book-card" id={id}>
      <div className="card-img">
        <img
          src={
            imageLinks?.smallThumbnail
              ? imageLinks?.smallThumbnail
              : "./assets/no-img.png"
          }
          alt="book img"
          className="img"
        />
      </div>
      <h2 title={title}>
        {title?.length
          ? title?.length > 28
            ? title?.slice(0, 28) + "..."
            : title
          : "notfound"}
      </h2>
      <p title="author">
        {authors?.length
          ? authors[0].lengths > 35
            ? authors[0].slice(0, 34) + "..."
            : authors[0]
          : "notfound"}
      </p>
      <p title="puplished date">
        {publishedDate?.length ? publishedDate?.slice(0, 4) : "notfound"}
      </p>
      <div>
        {!isMarked && (
          <button
            className="bookmark-btn"
            title="change as bookmarked"
            onClick={() =>
              setMarked({
                id: booksData.etag,
                authors: authors || "notfound",
                title: title || "notfound",
                previewLink: booksData.volumeInfo.previewLink,
              })
            }
          >
            Bookmark
          </button>
        )}
        {isMarked && (
          <button
            className="bookmard-btn_added"
            onClick={() => removeBookmark(booksData.etag)}
          >
            Bookmarked
          </button>
        )}
        <button
          className="info-btn"
          title="show more info"
          onClick={() => {
            setShowInfoId(moreInfoId);
            setShowInfo(true);
          }}
        >
          More Info
        </button>
      </div>
      <Link to={booksData.volumeInfo.previewLink} target="_blank">
        <button className="read-btn" title="download e-book">
          Read
        </button>
      </Link>
    </div>
  );
};

Card.propTypes = {
  booksData: PropTypes.any,
  setShowInfo: PropTypes.func,
  setShowInfoId: PropTypes.func,
  setMarked: PropTypes.func,
  id: PropTypes.any,
  marksArr: PropTypes.any,
  moreInfoId: PropTypes.string,
  removeBookmark: PropTypes.func,
};
