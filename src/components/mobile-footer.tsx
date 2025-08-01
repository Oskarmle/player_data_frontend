import React from "react";
import SelectUser from "./select-user";

const MobileFooter = () => {
  return (
    <div className="fixed bottom-0 w-full p-2 sm:hidden">
      <SelectUser />
    </div>
  );
};

export default MobileFooter;
