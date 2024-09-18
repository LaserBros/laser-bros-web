import React from "react";
import loaderimg from "../assets/img/loader.svg";
function Loader() {
  return (
    <div className="loaderdiv">
      <img src={loaderimg} className="img-fluid" alt=""/>
    </div>
  );
}

export default Loader;
