import React, { Fragment } from "react";
import { useDropdown } from "components/dropdown/dropdown-context";
// import { useDropdown } from "./dropdown-context";

const List = ({ children }) => {
  const { show } = useDropdown();
  return (
    <>
      {" "}
      {show && (
        <div className="absolute left-0 w-full bg-white shadow-sm top-full">
          {children}
        </div>
      )}
    </>
  );
};

export default List;
