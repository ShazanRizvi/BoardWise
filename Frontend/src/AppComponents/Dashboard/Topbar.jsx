import React from "react";

//This is the topbar in every dashboard displaying org info and user info
const Topbar = ({ orgName, orgLogo }) => {

     if (!orgName || !orgLogo) {
          return null; // Return null to not render anything if conditions are not met
        }
  return (
     
    <div className="border-b-[1px] p-2  w-full">
      <div className="flex  w-auto">
        <div>
          <img src={orgLogo} alt="org logo" className="w-5 h-5 rounded-md" />
        </div>
        <div>
          <h1 className="text-sm font-normal ml-2">{orgName}</h1>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
