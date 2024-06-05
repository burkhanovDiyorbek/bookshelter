import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PropTypes from "prop-types";

export const CardSkleton = ({ cards }) => {
  return (
    <SkeletonTheme baseColor="#b8b4b4" highlightColor="#dddbdb">
      {Array(cards)
        .fill(0)
        .map((_, key) => {
          return (
            <div className="book-card" key={key}>
              <div className="card-img">
                <Skeleton className="img" style={{opacity:'0.5'}}/>
              </div>
              <Skeleton
                count={3}
                style={{ margin: "8px 0 0 12px", width: "90%" ,opacity:'0.4'}}
              />
              <div style={{ opacity: 0.5}}>
                <Skeleton width={120} height={30} />
                <Skeleton width={120} height={30} />
              </div>
              <Skeleton width={246} height={30} style={{ opacity: 0.5 }} />
            </div>
          );
        })}
    </SkeletonTheme>
  );
};

CardSkleton.propTypes = {
  cards: PropTypes.number,
};
