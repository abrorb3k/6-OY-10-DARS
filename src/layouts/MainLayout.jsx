import React from "react";
import Header from "../component/Header";

function MainLayout({ children }) {
  return (
    <div>
      <Header></Header>
      <div className="container mx-auto">{children}</div>
    </div>
  );
}

export default MainLayout;
