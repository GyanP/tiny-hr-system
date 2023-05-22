import React, { useState } from "react";
import { Header, Sidebar } from "../../components";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  const [expanded, setExpanded] = useState<boolean>(true);
  const toggleMenu = () => {
    setExpanded(!expanded);
  };
  return (
    <>
      <Header handleToggle={toggleMenu} />
      <Sidebar expanded={expanded}>{<Outlet/>}</Sidebar>
    </>
  );
};

export { MainLayout };
