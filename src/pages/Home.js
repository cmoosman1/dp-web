import React, { useEffect } from "react";
import SideNav from "../components/SideNav";
import { navigate } from "@reach/router";

function Home() {
  // temporary until welcome page design
  useEffect(() => {
    navigate("/orders/search");
  })

  return (
    <div className="customer-wrapper">
      <SideNav />
      <div className="content-wrapper">
        <div className="content-body">Welcome</div>
      </div>
    </div>
  );
}

export default Home;
