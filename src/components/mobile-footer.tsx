import React from "react";
import SelectUser from "./select-user";

const MobileFooter = () => {
  return (
    <div className="w-full p-2 sm:hidden">
      <SelectUser />
    </div>
  );
};

export default MobileFooter;
