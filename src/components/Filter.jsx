import React from "react";

function Filter({ handleChange, newFilter }) {
  return (
    <>
      <div>
        filter shown with{" "}
        <input name="filter" onChange={handleChange} value={newFilter} />
      </div>
    </>
  );
}

export default Filter;