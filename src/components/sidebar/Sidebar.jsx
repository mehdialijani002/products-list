import React, { useState } from "react";
import {
  FaExclamationCircle,
  FaBars,
  FaShoppingBag,
  FaListUl,
  FaHome,
} from "react-icons/fa";
import { NavLink } from "react-router-dom";
const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/",
      name: "خانه",
      icon: <FaHome />,
    },
    {
      path: "/productList",
      name: " لیست کالاها",
      icon: <FaListUl />,
    },
    {
      path: "/product",
      name: "کالا منتخب",
      icon: <FaShoppingBag />,
    },

    {
      path: "/PageNotFound",
      name: "  404",
      icon: <FaExclamationCircle />,
    },
  ];
  return (
    <div className="container">
      <div style={{ width: isOpen ? "170px" : "60px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            فروشگاه انلاین
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars className="ml-5" onClick={toggle} />
          </div>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link"
            activeclassName="active"
          >
            <div className="icon">{item.icon}</div>
            <div
              style={{ display: isOpen ? "block" : "none" }}
              className="link_text"
            >
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};
export default Sidebar;
