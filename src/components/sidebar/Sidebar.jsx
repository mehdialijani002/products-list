import React, { useState } from "react";
import {
  FaBars,
  FaShoppingBag,
  FaListUl,
  FaHome,
  FaWpforms,
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
      path: "/FormInput",
      name: "فرم ثبت کالا",
      icon: <FaWpforms />,
    },
  ];
  return (
    <div className="container">
      <div style={{ width: isOpen ? "170px" : "60px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            فروشگاه انلاین
          </h1>
          <div
            style={{ marginRight: isOpen ? "40px" : "0px" }}
            className="bars"
          >
            <FaBars onClick={toggle} />
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
