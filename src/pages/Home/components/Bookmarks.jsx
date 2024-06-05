import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const Bookmarks = ({
  marksArr = JSON.parse(localStorage.getItem("bookmarks")),
  removeBookmark,
}) => {
  return (
    <div className="bookmarks-container">
      <h2>Bookmarks</h2>
      <p className="mark-desc">
        If you don’t like to read, you haven’t found the right book
      </p>
      {marksArr?.map((item, index) => {
        return (
          <div className="bookmark" key={index}>
            <div className="bookmark-title">
              <h2 title={item.title}>
                {item?.title?.length > 12
                  ? item.title?.slice(0, 12) + "..."
                  : item.title}
              </h2>
              <p>{item?.authors?.[0]}</p>
            </div>
            <Link to={item.previewLink} target="_blank">
              <button className="book-btn">
                <img src="./assets/icons/book.svg" alt="book svg" />
              </button>
            </Link>
            <button
              className="del-btn"
              id={index}
              onClick={() => removeBookmark(item.id)}
            >
              <img src="./assets/icons/del.svg" alt="del svg" id={index} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

Bookmarks.propTypes = {
  marksArr: PropTypes.array,
  removeBookmark: PropTypes.func,
};
