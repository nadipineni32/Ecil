import React, { useState } from "react";

const FilterResults = (props) => {
  const { results } = props;
  const [limit, setLimit] = useState(4);
  const [showResultTag, setShowResultTag] = useState(true);

  const showAllResults = () => {
    setLimit(results.length);
    setShowResultTag(false);
  };

  return (
    <div className="results">
      {showResultTag && (
        <p onClick={showAllResults}>
          Displaying {results.length > 3 ? 4 : results.length} of{" "}
          {results.length} results. (Show all)
        </p>
      )}

      {results.slice(0, limit).map((result) => (
        <div className="card" key={result._id}>
          <img src={result.picture} alt="productName" />
          <div className="product-name">
            <p>{result.name}</p>
            <p style={{ fontSize: 15 }}>Price : ${result.price}</p>
            {result.isActive ? (
              <p style={{ fontSize: 15, color: "green" }}>IN-STOCK</p>
            ) : (
              <p style={{ fontSize: 15, color: "red" }}>Not Available!!</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterResults;
