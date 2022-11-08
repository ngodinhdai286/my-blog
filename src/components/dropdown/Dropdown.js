import React from "react";
import { DropdownProvider } from "components/dropdown/dropdown-context";

const Dropdown = ({ children, ...props }) => {
  return (
    <DropdownProvider {...props}>
      <div className="relative inline-block w-full">{children}</div>
    </DropdownProvider>
  );
};

export default Dropdown;
